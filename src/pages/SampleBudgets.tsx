
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, DollarSign, PiggyBank, ShoppingCart, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SampleBudgets = () => {
  const navigate = useNavigate();
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('ai-assistant');

  const handleAuthRequired = () => {
    // Handle auth requirement if needed
  };

  const budgetTemplates = [
    {
      id: 'college-student',
      title: 'College Student Budget',
      monthlyIncome: 800,
      description: 'Perfect for students with part-time jobs or financial aid',
      categories: [
        { name: 'Tuition & Fees', amount: 300, percentage: 37.5, icon: Home },
        { name: 'Food & Dining', amount: 200, percentage: 25, icon: ShoppingCart },
        { name: 'Transportation', amount: 80, percentage: 10, icon: DollarSign },
        { name: 'Books & Supplies', amount: 60, percentage: 7.5, icon: DollarSign },
        { name: 'Entertainment', amount: 80, percentage: 10, icon: DollarSign },
        { name: 'Emergency Fund', amount: 80, percentage: 10, icon: PiggyBank }
      ]
    },
    {
      id: 'young-professional',
      title: 'Young Professional Budget',
      monthlyIncome: 3500,
      description: 'For recent graduates starting their careers',
      categories: [
        { name: 'Housing & Rent', amount: 1200, percentage: 34, icon: Home },
        { name: 'Food & Groceries', amount: 400, percentage: 11, icon: ShoppingCart },
        { name: 'Transportation', amount: 350, percentage: 10, icon: DollarSign },
        { name: 'Savings & Investments', amount: 700, percentage: 20, icon: PiggyBank },
        { name: 'Entertainment', amount: 350, percentage: 10, icon: DollarSign },
        { name: 'Utilities & Bills', amount: 300, percentage: 9, icon: DollarSign },
        { name: 'Miscellaneous', amount: 200, percentage: 6, icon: DollarSign }
      ]
    },
    {
      id: 'tight-budget',
      title: 'Tight Budget Plan',
      monthlyIncome: 1500,
      description: 'Maximizing every dollar for students with limited income',
      categories: [
        { name: 'Essential Housing', amount: 600, percentage: 40, icon: Home },
        { name: 'Food (Basics)', amount: 300, percentage: 20, icon: ShoppingCart },
        { name: 'Transportation', amount: 150, percentage: 10, icon: DollarSign },
        { name: 'Utilities', amount: 150, percentage: 10, icon: DollarSign },
        { name: 'Emergency Fund', amount: 150, percentage: 10, icon: PiggyBank },
        { name: 'Personal Care', amount: 75, percentage: 5, icon: DollarSign },
        { name: 'Miscellaneous', amount: 75, percentage: 5, icon: DollarSign }
      ]
    }
  ];

  const selectedTemplate = budgetTemplates.find(b => b.id === selectedBudget);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onAuthRequired={handleAuthRequired}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-cerulean-600 hover:text-cerulean-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cactus-800 mb-4">Sample Budget Templates</h1>
          <p className="text-xl text-cactus-600 max-w-3xl mx-auto">
            Get started with these proven budget templates designed for students and young professionals.
          </p>
        </div>

        {!selectedBudget ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgetTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer border-cactus-200">
                <CardHeader>
                  <CardTitle className="text-xl text-cactus-800">{template.title}</CardTitle>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-cerulean-100 text-cerulean-700">
                      ${template.monthlyIncome}/month
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-cactus-600 mb-4">{template.description}</p>
                  <div className="space-y-2 mb-4">
                    {template.categories.slice(0, 3).map((category, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-cactus-600">{category.name}</span>
                        <span className="font-medium">${category.amount}</span>
                      </div>
                    ))}
                    <p className="text-xs text-cactus-500">+{template.categories.length - 3} more categories</p>
                  </div>
                  <Button 
                    className="w-full bg-cerulean-600 hover:bg-cerulean-700"
                    onClick={() => setSelectedBudget(template.id)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedBudget(null)}
                className="text-cerulean-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Templates
              </Button>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-cactus-800">{selectedTemplate?.title}</CardTitle>
                    <p className="text-cactus-600 mt-2">{selectedTemplate?.description}</p>
                  </div>
                  <Badge className="bg-cerulean-100 text-cerulean-700 text-lg px-4 py-2">
                    ${selectedTemplate?.monthlyIncome}/month
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-cactus-800 mb-4">Budget Breakdown</h3>
                    <div className="space-y-4">
                      {selectedTemplate?.categories.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-cerulean-100 rounded-lg">
                                <IconComponent className="h-4 w-4 text-cerulean-600" />
                              </div>
                              <span className="font-medium text-cactus-700">{category.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-cactus-800">${category.amount}</div>
                              <div className="text-sm text-cactus-500">{category.percentage}%</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-cactus-800 mb-4">Budget Tips</h3>
                    <div className="bg-cactus-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-cerulean-600 rounded-full mt-2"></div>
                        <p className="text-sm text-cactus-700">Track your expenses weekly to stay on budget</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-cerulean-600 rounded-full mt-2"></div>
                        <p className="text-sm text-cactus-700">Build your emergency fund gradually, even $10/month helps</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-cerulean-600 rounded-full mt-2"></div>
                        <p className="text-sm text-cactus-700">Look for student discounts to reduce expenses</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-cerulean-600 rounded-full mt-2"></div>
                        <p className="text-sm text-cactus-700">Review and adjust your budget monthly</p>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 bg-cerulean-600 hover:bg-cerulean-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download Budget Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SampleBudgets;
