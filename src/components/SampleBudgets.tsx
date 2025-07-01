
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, DollarSign, PieChart, TrendingUp } from 'lucide-react';

interface BudgetTemplate {
  id: number;
  title: string;
  description: string;
  monthlyIncome: number;
  categories: {
    name: string;
    amount: number;
    percentage: number;
    color: string;
  }[];
  tips: string[];
}

const budgetTemplates: BudgetTemplate[] = [
  {
    id: 1,
    title: "College Student Budget",
    description: "Budget template for students with part-time income",
    monthlyIncome: 800,
    categories: [
      { name: "Housing & Utilities", amount: 300, percentage: 37.5, color: "bg-blue-500" },
      { name: "Food & Groceries", amount: 200, percentage: 25, color: "bg-green-500" },
      { name: "Transportation", amount: 80, percentage: 10, color: "bg-yellow-500" },
      { name: "School Supplies", amount: 60, percentage: 7.5, color: "bg-purple-500" },
      { name: "Entertainment", amount: 80, percentage: 10, color: "bg-pink-500" },
      { name: "Savings", amount: 80, percentage: 10, color: "bg-indigo-500" }
    ],
    tips: [
      "Look for student discounts on everything",
      "Cook meals instead of eating out",
      "Use public transportation or bike when possible",
      "Buy used textbooks or rent them"
    ]
  },
  {
    id: 2,
    title: "New Graduate Budget",
    description: "Budget for recent graduates starting their career",
    monthlyIncome: 3500,
    categories: [
      { name: "Housing & Utilities", amount: 1050, percentage: 30, color: "bg-blue-500" },
      { name: "Food & Groceries", amount: 350, percentage: 10, color: "bg-green-500" },
      { name: "Transportation", amount: 350, percentage: 10, color: "bg-yellow-500" },
      { name: "Student Loans", amount: 300, percentage: 8.6, color: "bg-red-500" },
      { name: "Entertainment", amount: 250, percentage: 7.1, color: "bg-pink-500" },
      { name: "Emergency Fund", amount: 350, percentage: 10, color: "bg-orange-500" },
      { name: "Retirement", amount: 350, percentage: 10, color: "bg-indigo-500" },
      { name: "Other Expenses", amount: 500, percentage: 14.3, color: "bg-gray-500" }
    ],
    tips: [
      "Start building an emergency fund immediately",
      "Take advantage of employer 401k matching",
      "Track expenses for the first few months",
      "Avoid lifestyle inflation with your new income"
    ]
  },
  {
    id: 3,
    title: "Tight Budget Template",
    description: "Budget for those with limited income who need to maximize every dollar",
    monthlyIncome: 2000,
    categories: [
      { name: "Housing & Utilities", amount: 700, percentage: 35, color: "bg-blue-500" },
      { name: "Food & Groceries", amount: 300, percentage: 15, color: "bg-green-500" },
      { name: "Transportation", amount: 200, percentage: 10, color: "bg-yellow-500" },
      { name: "Healthcare", amount: 150, percentage: 7.5, color: "bg-red-500" },
      { name: "Debt Payments", amount: 250, percentage: 12.5, color: "bg-orange-500" },
      { name: "Basic Needs", amount: 200, percentage: 10, color: "bg-purple-500" },
      { name: "Emergency Fund", amount: 100, percentage: 5, color: "bg-indigo-500" },
      { name: "Miscellaneous", amount: 100, percentage: 5, color: "bg-gray-500" }
    ],
    tips: [
      "Focus on needs vs wants",
      "Look for free entertainment options",
      "Use coupons and shop sales",
      "Consider a side hustle for extra income",
      "Review and cut unnecessary subscriptions"
    ]
  }
];

interface SampleBudgetsProps {
  onClose: () => void;
}

const SampleBudgets = ({ onClose }: SampleBudgetsProps) => {
  const [selectedBudget, setSelectedBudget] = useState<BudgetTemplate | null>(null);

  if (selectedBudget) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedBudget(null)}
            className="flex items-center text-cerulean-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cactus-800">
              <PieChart className="h-6 w-6 mr-2" />
              {selectedBudget.title}
            </CardTitle>
            <p className="text-cactus-600">{selectedBudget.description}</p>
            <div className="flex items-center mt-2">
              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
              <span className="text-lg font-semibold text-green-600">
                ${selectedBudget.monthlyIncome.toLocaleString()}/month
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="font-semibold text-cactus-800">Budget Breakdown</h3>
              <div className="space-y-3">
                {selectedBudget.categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${category.color}`}></div>
                      <span className="font-medium text-cactus-800">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-cactus-800">${category.amount}</div>
                      <div className="text-sm text-cactus-600">{category.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-cactus-800 mb-3">Money-Saving Tips</h3>
                <ul className="space-y-2">
                  {selectedBudget.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <TrendingUp className="h-4 w-4 mr-2 text-cerulean-600 mt-0.5 flex-shrink-0" />
                      <span className="text-cactus-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cactus-800">Sample Budget Templates</h2>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
      
      <p className="text-cactus-600">
        Explore these budget templates to get started with your personal finance journey. 
        Each template is designed for different life situations and income levels.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgetTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer border-cactus-200">
            <CardHeader>
              <CardTitle className="text-lg text-cactus-800">{template.title}</CardTitle>
              <p className="text-sm text-cactus-600">{template.description}</p>
              <Badge variant="secondary" className="w-fit bg-cerulean-100 text-cerulean-700">
                ${template.monthlyIncome.toLocaleString()}/month
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {template.categories.slice(0, 3).map((category, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-cactus-600">{category.name}</span>
                    <span className="font-medium text-cactus-800">${category.amount}</span>
                  </div>
                ))}
                {template.categories.length > 3 && (
                  <div className="text-sm text-cactus-500">
                    +{template.categories.length - 3} more categories
                  </div>
                )}
              </div>
              <Button 
                onClick={() => setSelectedBudget(template)}
                className="w-full bg-cerulean-600 hover:bg-cerulean-700 text-white"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SampleBudgets;
