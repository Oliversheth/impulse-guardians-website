
import { useState } from 'react';
import { Bot, MessageCircle, Calculator, TrendingUp, PiggyBank } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { siteContent } from '@/data/siteContent';
import { useAuth } from '@/contexts/AuthContext';
import ChatInterface from './ChatInterface';
import SampleBudgets from './SampleBudgets';

const iconMap = {
  Calculator, PiggyBank, TrendingUp, MessageCircle
};

const AIAssistant = () => {
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [showSampleBudgets, setShowSampleBudgets] = useState(false);
  const { isAuthenticated } = useAuth();
  
  const features = siteContent.aiAssistant.features.map((feature, index) => ({
    ...feature,
    icon: Object.values(iconMap)[index]
  }));

  const handleStartChat = () => {
    if (!isAuthenticated) {
      alert('Please log in to use Budget Bot');
      return;
    }
    setShowChatInterface(true);
  };

  const handleViewSampleBudgets = () => {
    setShowSampleBudgets(true);
  };

  return (
    <>
      <section id="ai-assistant" className="py-20 bg-gradient-to-br from-cactus-50 to-cerulean-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-cerulean-600 rounded-full">
                <Bot className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-cactus-800 mb-4">
              Budget Bot - Your AI Financial Assistant
            </h2>
            <p className="text-xl text-cactus-600 max-w-3xl mx-auto">
              Meet your personal finance companion powered by artificial intelligence. Get instant help with budgeting, saving, and financial planning tailored to your unique situation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-cactus-200 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cerulean-100 rounded-lg">
                        <feature.icon className="h-5 w-5 text-cerulean-600" />
                      </div>
                      <CardTitle className="text-lg text-cactus-800">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-cactus-600 mb-3">
                      {feature.description}
                    </CardDescription>
                    <Badge variant="secondary" className="bg-cactus-100 text-cactus-700 text-xs">
                      Try: "{feature.example}"
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Demo Chat Interface */}
            <div className="bg-white rounded-xl shadow-xl p-6 border border-cactus-200">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-cactus-100">
                <div className="p-2 bg-cerulean-600 rounded-full">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-cactus-800">Budget Bot</h3>
                  <p className="text-sm text-cactus-600">Ready to help with your finances</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {/* Sample conversation */}
                <div className="flex justify-end">
                  <div className="bg-cerulean-600 text-white p-3 rounded-lg rounded-br-none max-w-xs">
                    Can you help me create a monthly budget for college?
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-cactus-100 text-cactus-800 p-3 rounded-lg rounded-bl-none max-w-xs">
                    I'd be happy to help! To create a personalized budget, I'll need to know your monthly income, major expenses like tuition and housing, and your financial goals. Would you like to start with income tracking?
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-cerulean-600 text-white p-3 rounded-lg rounded-br-none max-w-xs">
                    Yes, I work part-time and make about $600/month
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-cactus-100 text-cactus-800 p-3 rounded-lg rounded-bl-none max-w-xs">
                    Great start! With $600 monthly income, let's build a student-friendly budget. I recommend the 50/30/20 rule adapted for students...
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleStartChat}
                  className="w-full bg-cerulean-600 hover:bg-cerulean-700 text-white"
                >
                  Start Chat with Budget Bot
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-cerulean-600 text-cerulean-600 hover:bg-cerulean-50"
                  onClick={handleViewSampleBudgets}
                >
                  View Sample Budgets
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showChatInterface && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-cerulean-600" />
                <h2 className="text-lg font-semibold">Budget Bot</h2>
              </div>
              <Button variant="ghost" onClick={() => setShowChatInterface(false)} className="text-xl">
                ×
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatInterface />
            </div>
          </div>
        </div>
      )}

      {showSampleBudgets && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <SampleBudgets onClose={() => setShowSampleBudgets(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
