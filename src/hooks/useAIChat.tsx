
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
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
  const { user } = useAuth();
  const { toast } = useToast();

  const sendMessage = async (content: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to use Budget Bot",
        variant: "destructive",
      });
      throw new Error('You must be logged in to use Budget Bot');
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log('Sending message to AI chat function...');
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message: content,
          threadId: threadId
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to get response from Budget Bot');
      }

      if (!data || !data.response) {
        throw new Error('No response received from Budget Bot');
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
  };
};
