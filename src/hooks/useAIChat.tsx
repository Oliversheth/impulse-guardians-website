

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  files?: Array<{
    name: string;
    type: string;
    content: string; // base64 content
  }>;
}

interface Conversation {
  id: string;
  thread_id: string;
  last_message: string;
  created_at: string;
  updated_at: string;
}

export const useAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Budget Bot, your AI financial education assistant. I'm here to help you learn about personal finance, budgeting, investing, and money management. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadConversations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ai_conversations')
        .select('id, thread_id, message, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading conversations:', error);
        return;
      }

      // Group by thread_id and get the most recent message for each thread
      const conversationMap = new Map();
      data?.forEach(conv => {
        if (!conversationMap.has(conv.thread_id) || 
            new Date(conv.created_at) > new Date(conversationMap.get(conv.thread_id).created_at)) {
          conversationMap.set(conv.thread_id, conv);
        }
      });

      const conversationList = Array.from(conversationMap.values()).map(conv => ({
        id: conv.id,
        thread_id: conv.thread_id,
        last_message: conv.message.substring(0, 100) + (conv.message.length > 100 ? '...' : ''),
        created_at: conv.created_at,
        updated_at: conv.created_at
      }));

      setConversations(conversationList);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  const loadConversation = async (selectedThreadId: string) => {
    if (!user || !selectedThreadId) return;

    try {
      const { data, error } = await supabase
        .from('ai_conversations')
        .select('message, response, created_at')
        .eq('user_id', user.id)
        .eq('thread_id', selectedThreadId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading conversation:', error);
        return;
      }

      const loadedMessages: Message[] = [
        {
          id: '1',
          content: "Hello! I'm Budget Bot, your AI financial education assistant. I'm here to help you learn about personal finance, budgeting, investing, and money management. What would you like to know?",
          isUser: false,
          timestamp: new Date(),
        }
      ];

      data?.forEach((conv, index) => {
        loadedMessages.push({
          id: `user-${index}`,
          content: conv.message,
          isUser: true,
          timestamp: new Date(conv.created_at),
        });
        loadedMessages.push({
          id: `ai-${index}`,
          content: conv.response,
          isUser: false,
          timestamp: new Date(conv.created_at),
        });
      });

      setMessages(loadedMessages);
      setThreadId(selectedThreadId);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  };

  const sendMessage = async (content: string, files: File[] = []) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to use Budget Bot",
        variant: "destructive",
      });
      throw new Error('You must be logged in to use Budget Bot');
    }

    // Process files to base64
    const processedFiles = await Promise.all(
      files.map(async (file) => {
        return new Promise<{name: string, type: string, content: string}>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64Content = reader.result as string;
            resolve({
              name: file.name,
              type: file.type,
              content: base64Content.split(',')[1] // Remove data:mime;base64, prefix
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
      files: processedFiles.length > 0 ? processedFiles : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log('Sending message to AI chat function...');
      console.log('Request data:', { 
        message: content.substring(0, 100), 
        threadId,
        filesCount: processedFiles.length 
      });
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message: content,
          threadId: threadId,
          files: processedFiles
        },
      });

      console.log('Function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        
        // More specific error handling
        let errorMessage = 'Failed to get response from Budget Bot';
        
        if (error.message?.includes('non-2xx')) {
          errorMessage = 'Budget Bot service is temporarily unavailable. Please try again in a moment.';
        } else if (error.message?.includes('timeout')) {
          errorMessage = 'Request timed out. Please try again with a shorter message.';
        } else if (error.message?.includes('rate limit')) {
          errorMessage = 'Too many requests. Please wait a moment before trying again.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        throw new Error(errorMessage);
      }

      if (!data) {
        console.error('No data received from function');
        throw new Error('No response received from Budget Bot');
      }

      if (!data.response) {
        console.error('No response content in data:', data);
        throw new Error('Budget Bot returned an empty response');
      }

      // Update threadId if it's a new conversation
      if (data.threadId && !threadId) {
        setThreadId(data.threadId);
        console.log('Set new thread ID:', data.threadId);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Reload conversations to update the list
      await loadConversations();
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      const errorAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I encountered an error: ${errorMessage}. Please try again or contact support if the issue persists.`,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewConversation = () => {
    setThreadId(null);
    setMessages([
      {
        id: '1',
        content: "Hello! I'm Budget Bot, your AI financial education assistant. I'm here to help you learn about personal finance, budgeting, investing, and money management. What would you like to know?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    
    toast({
      title: "New Conversation",
      description: "Started a fresh conversation with Budget Bot",
    });
  };

  return {
    messages,
    sendMessage,
    isLoading,
    threadId,
    startNewConversation,
    conversations,
    loadConversations,
    loadConversation,
  };
};

