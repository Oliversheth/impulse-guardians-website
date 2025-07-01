
import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Plus, History, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIChat } from '@/hooks/useAIChat';
import { useAuth } from '@/contexts/AuthContext';

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showConversationList, setShowConversationList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading } = useAIChat();
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage.trim();
    setInputMessage('');
    
    try {
      await sendMessage(message);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const startNewConversation = () => {
    setShowConversationList(false);
  };

  if (showConversationList) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto mx-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Budget Bot Conversations</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={startNewConversation}
              className="w-full bg-cerulean-600 hover:bg-cerulean-700 text-white flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Start New Conversation</span>
            </Button>
            
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center space-x-2">
                <History className="h-4 w-4" />
                <span>Previous Conversations</span>
              </h3>
              <p className="text-sm text-gray-400 text-center py-8">
                No previous conversations yet. Start your first chat with Budget Bot!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b shrink-0">
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Budget Bot - Financial Education Assistant</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowConversationList(true)}
            >
              <History className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          {/* Messages Area with Scroll */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-cerulean-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md max-w-[70%]">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-500">Budget Bot is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="border-t p-4 shrink-0">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask Budget Bot about budgeting, investing, or financial planning..."
                disabled={isLoading}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <Button 
                type="submit" 
                disabled={isLoading || !inputMessage.trim()}
                className="bg-cerulean-600 hover:bg-cerulean-700 px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
