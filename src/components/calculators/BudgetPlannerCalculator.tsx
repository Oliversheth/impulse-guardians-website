import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Wallet, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useAchievements } from '@/hooks/useAchievements';

const BudgetPlannerCalculator = () => {
  const [income, setIncome] = useState('3000');
  const [expenses, setExpenses] = useState({
    housing: '1000',
    food: '400',
    transportation: '300',
    utilities: '150',
    insurance: '200',
    debt: '250',
    savings: '300',
    entertainment: '200',
    other: '200'
  });
  const [results, setResults] = useState<any>(null);
  const { user } = useAuth();
  const { checkAndUnlockAchievement } = useAchievements();

  const expenseCategories = [
    { key: 'housing', label: 'Housing (Rent/Mortgage)', color: '#0891b2' },
    { key: 'food', label: 'Food & Groceries', color: '#059669' },
    { key: 'transportation', label: 'Transportation', color: '#dc2626' },
    { key: 'utilities', label: 'Utilities', color: '#ca8a04' },
    { key: 'insurance', label: 'Insurance', color: '#9333ea' },
    { key: 'debt', label: 'Debt Payments', color: '#ea580c' },
    { key: 'savings', label: 'Savings & Investments', color: '#16a34a' },
    { key: 'entertainment', label: 'Entertainment', color: '#ec4899' },
    { key: 'other', label: 'Other Expenses', color: '#6b7280' }
  ];

  const calculateBudget = async () => {
    const monthlyIncome = parseFloat(income) || 0;
    const totalExpenses = Object.values(expenses).reduce((sum, exp) => sum + (parseFloat(exp) || 0), 0);
    const remaining = monthlyIncome - totalExpenses;

    // Calculate 50/30/20 rule comparison
    const needs = parseFloat(expenses.housing) + parseFloat(expenses.food) + 
                 parseFloat(expenses.utilities) + parseFloat(expenses.insurance) + 
                 parseFloat(expenses.debt);
    const wants = parseFloat(expenses.entertainment) + parseFloat(expenses.other);
    const savings = parseFloat(expenses.savings);

    const needsPercentage = (needs / monthlyIncome) * 100;
    const wantsPercentage = (wants / monthlyIncome) * 100;
    const savingsPercentage = (savings / monthlyIncome) * 100;

    // Prepare chart data
    const chartData = expenseCategories.map(category => ({
      name: category.label,
      value: parseFloat(expenses[category.key as keyof typeof expenses]) || 0,
      color: category.color
    })).filter(item => item.value > 0);

    const budgetAnalysis = {
      monthlyIncome,
      totalExpenses,
      remaining,
      needsPercentage,
      wantsPercentage,
      savingsPercentage,
      chartData,
      recommendations: generateRecommendations(needsPercentage, wantsPercentage, savingsPercentage, remaining)
    };

    setResults(budgetAnalysis);

    // Save calculator usage
    if (user) {
      try {
        await supabase.from('calculator_usage').insert({
          user_id: user.id,
          calculator_type: 'budget_planner',
          input_data: { income: monthlyIncome, expenses },
          result_data: budgetAnalysis
        });

        // Check for achievements
        await checkAndUnlockAchievement('calculator_use', {
          calculatorType: 'budget_planner',
          count: 1
        });
      } catch (error) {
        console.error('Error saving calculator usage:', error);
      }
    }
  };

  const generateRecommendations = (needs: number, wants: number, savings: number, remaining: number) => {
    const recommendations = [];

    if (needs > 50) {
      recommendations.push({
        type: 'warning',
        title: 'High Essential Expenses',
        message: 'Your needs exceed 50% of income. Consider reducing housing or finding ways to lower essential costs.'
      });
    }

    if (wants > 30) {
      recommendations.push({
        type: 'warning',
        title: 'High Discretionary Spending',
        message: 'Your wants exceed 30% of income. Look for areas to cut back on entertainment and non-essential purchases.'
      });
    }

    if (savings < 20) {
      recommendations.push({
        type: 'warning',
        title: 'Low Savings Rate',
        message: 'Aim to save at least 20% of your income. Consider automating your savings to build this habit.'
      });
    }

    if (remaining < 0) {
      recommendations.push({
        type: 'error',
        title: 'Budget Deficit',
        message: 'You\'re spending more than you earn. Review all expenses and identify areas to cut immediately.'
      });
    } else if (remaining > 0) {
      recommendations.push({
        type: 'success',
        title: 'Budget Surplus',
        message: `You have $${remaining.toFixed(2)} left over. Consider allocating this to savings or debt repayment.`
      });
    }

    if (needs <= 50 && wants <= 30 && savings >= 20) {
      recommendations.push({
        type: 'success',
        title: 'Excellent Budget Balance',
        message: 'Your budget follows the 50/30/20 rule perfectly. Keep up the great work!'
      });
    }

    return recommendations;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const updateExpense = (category: string, value: string) => {
    setExpenses(prev => ({ ...prev, [category]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Wallet className="h-5 w-5 text-cerulean-600" />
            <CardTitle>50/30/20 Budget Planner</CardTitle>
          </div>
          <CardDescription>
            Plan your monthly budget using the proven 50/30/20 rule: 50% needs, 30% wants, 20% savings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Income Input */}
          <div className="space-y-2">
            <Label htmlFor="income">Monthly After-Tax Income</Label>
            <Input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="3000"
              className="text-lg font-semibold"
            />
          </div>

          {/* Expense Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expenseCategories.map((category) => (
              <div key={category.key} className="space-y-2">
                <Label htmlFor={category.key}>{category.label}</Label>
                <Input
                  id={category.key}
                  type="number"
                  value={expenses[category.key as keyof typeof expenses]}
                  onChange={(e) => updateExpense(category.key, e.target.value)}
                  placeholder="0"
                />
              </div>
            ))}
          </div>

          <Button onClick={calculateBudget} className="w-full">
            <Wallet className="h-4 w-4 mr-2" />
            Analyze My Budget
          </Button>

          {results && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className={results.remaining >= 0 ? 'border-green-200' : 'border-red-200'}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-cactus-600">Monthly Balance</p>
                      <p className={`text-2xl font-bold ${results.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(results.remaining)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-cactus-600">Needs (Goal: 50%)</p>
                      <p className="text-2xl font-bold text-cactus-800">
                        {results.needsPercentage.toFixed(1)}%
                      </p>
                      <Progress value={Math.min(results.needsPercentage, 100)} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-cactus-600">Wants (Goal: 30%)</p>
                      <p className="text-2xl font-bold text-cactus-800">
                        {results.wantsPercentage.toFixed(1)}%
                      </p>
                      <Progress value={Math.min(results.wantsPercentage, 100)} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-cactus-600">Savings (Goal: 20%)</p>
                      <p className="text-2xl font-bold text-cactus-800">
                        {results.savingsPercentage.toFixed(1)}%
                      </p>
                      <Progress value={Math.min(results.savingsPercentage, 100)} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Budget Breakdown Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={results.chartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          >
                            {results.chartData.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results.recommendations.map((rec: any, index: number) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        rec.type === 'error' ? 'bg-red-50 border-red-500' :
                        rec.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                        'bg-green-50 border-green-500'
                      }`}>
                        <div className="flex items-start space-x-3">
                          {rec.type === 'error' && <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />}
                          {rec.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                          {rec.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                          <div>
                            <h4 className="font-semibold text-cactus-800">{rec.title}</h4>
                            <p className="text-sm text-cactus-600 mt-1">{rec.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Educational Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Budget Tips & Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-cactus-50 rounded-lg">
                      <h4 className="font-semibold text-cactus-800 mb-2">🏠 Reduce Housing Costs</h4>
                      <p className="text-sm text-cactus-600">
                        Consider house hacking, getting roommates, or moving to a lower-cost area 
                        to reduce your biggest expense.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-cerulean-50 rounded-lg">
                      <h4 className="font-semibold text-cactus-800 mb-2">🍽️ Smart Food Spending</h4>
                      <p className="text-sm text-cactus-600">
                        Meal planning, cooking at home, and buying generic brands can 
                        significantly reduce your food expenses.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-cactus-800 mb-2">💰 Automate Savings</h4>
                      <p className="text-sm text-cactus-600">
                        Set up automatic transfers to your savings account to 
                        "pay yourself first" before spending on other items.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-cactus-800 mb-2">📊 Track Everything</h4>
                      <p className="text-sm text-cactus-600">
                        Use apps or spreadsheets to monitor your spending and 
                        identify areas where you can optimize your budget.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetPlannerCalculator;