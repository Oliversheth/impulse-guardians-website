
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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

  const sendMessage = async (content: string) => {
    if (!user) {
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
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message: content,
          threadId: threadId
        },
      });

      if (error) throw error;

      // Update threadId if it's a new conversation
      if (data.threadId && !threadId) {
        setThreadId(data.threadId);
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
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error processing your message. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
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
  };

  return {
    messages,
    sendMessage,
    isLoading,
    threadId,
    startNewConversation,
  };
};
