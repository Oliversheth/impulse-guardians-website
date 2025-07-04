import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Wallet, CreditCard, PiggyBank, Calculator } from 'lucide-react';
import CompoundInterestCalculator from './CompoundInterestCalculator';
import BudgetPlannerCalculator from './BudgetPlannerCalculator';
import DebtPayoffCalculator from './DebtPayoffCalculator';

const calculators = [
  {
    id: 'compound-interest',
    title: 'Compound Interest Calculator',
    description: 'See how your investments grow exponentially over time',
    icon: TrendingUp,
    category: 'Investment',
    component: CompoundInterestCalculator
  },
  {
    id: 'budget-planner',
    title: '50/30/20 Budget Planner',
    description: 'Plan your monthly budget using the proven 50/30/20 rule',
    icon: Wallet,
    category: 'Budgeting',
    component: BudgetPlannerCalculator
  },
  {
    id: 'debt-payoff',
    title: 'Debt Payoff Calculator',
    description: 'Compare snowball vs avalanche debt repayment strategies',
    icon: CreditCard,
    category: 'Debt',
    component: DebtPayoffCalculator
  },
  {
    id: 'emergency-fund',
    title: 'Emergency Fund Calculator',
    description: 'Calculate how much to save for unexpected expenses',
    icon: PiggyBank,
    category: 'Savings',
    component: () => <EmergencyFundCalculator />
  }
];

const EmergencyFundCalculator = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState('3000');
  const [currentSavings, setCurrentSavings] = useState('1000');
  const [monthsGoal, setMonthsGoal] = useState('6');
  const [monthlySavings, setMonthlySavings] = useState('300');

  const expenses = parseFloat(monthlyExpenses) || 0;
  const current = parseFloat(currentSavings) || 0;
  const months = parseInt(monthsGoal) || 6;
  const savings = parseFloat(monthlySavings) || 0;

  const targetAmount = expenses * months;
  const needToSave = Math.max(targetAmount - current, 0);
  const monthsToGoal = savings > 0 ? Math.ceil(needToSave / savings) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <PiggyBank className="h-5 w-5 text-cerulean-600" />
          <CardTitle>Emergency Fund Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate how much to save for unexpected expenses and job loss
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Monthly Expenses</label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="3000"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Emergency Savings</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="1000"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Months of Expenses Goal</label>
            <select
              value={monthsGoal}
              onChange={(e) => setMonthsGoal(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="3">3 months (minimum)</option>
              <option value="6">6 months (recommended)</option>
              <option value="9">9 months (conservative)</option>
              <option value="12">12 months (very safe)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Monthly Savings Capacity</label>
            <input
              type="number"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-cactus-600">Target Emergency Fund</p>
                <p className="text-2xl font-bold text-cactus-800">
                  ${targetAmount.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-cactus-600">Still Need to Save</p>
                <p className="text-2xl font-bold text-cerulean-600">
                  ${needToSave.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-cactus-600">Months to Goal</p>
                <p className="text-2xl font-bold text-green-600">
                  {monthsToGoal || '∞'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-cerulean-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((current / targetAmount) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-cactus-600">
            {((current / targetAmount) * 100).toFixed(1)}% of goal reached
          </p>
        </div>

        <div className="p-4 bg-cactus-50 rounded-lg">
          <h4 className="font-semibold text-cactus-800 mb-2">💡 Emergency Fund Tips</h4>
          <ul className="text-sm text-cactus-600 space-y-1">
            <li>• Keep your emergency fund in a high-yield savings account</li>
            <li>• Start with $1,000 if 6 months seems overwhelming</li>
            <li>• Automate transfers to build the habit</li>
            <li>• Only use for true emergencies (job loss, medical bills, major repairs)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const CalculatorHub = () => {
  const [activeCalculator, setActiveCalculator] = useState<string>('overview');

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-cactus-800 mb-4">Financial Calculators</h1>
        <p className="text-xl text-cactus-600 max-w-3xl mx-auto">
          Interactive tools to help you plan your financial future and make informed decisions
        </p>
      </div>

      <Tabs value={activeCalculator} onValueChange={setActiveCalculator}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compound-interest">Investment</TabsTrigger>
          <TabsTrigger value="budget-planner">Budget</TabsTrigger>
          <TabsTrigger value="debt-payoff">Debt</TabsTrigger>
          <TabsTrigger value="emergency-fund">Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {calculators.map((calc) => (
              <Card key={calc.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-cerulean-100 rounded-lg">
                      <calc.icon className="h-6 w-6 text-cerulean-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{calc.title}</CardTitle>
                      <CardDescription>{calc.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-cactus-600 mb-4">{calc.description}</p>
                  <Button 
                    onClick={() => setActiveCalculator(calc.id)}
                    className="w-full"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Use Calculator
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Why Use Financial Calculators?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-cactus-50 rounded-lg text-center">
                  <TrendingUp className="h-8 w-8 text-cerulean-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-cactus-800 mb-2">Visualize Growth</h4>
                  <p className="text-sm text-cactus-600">
                    See how your money grows over time with compound interest
                  </p>
                </div>
                
                <div className="p-4 bg-cerulean-50 rounded-lg text-center">
                  <Wallet className="h-8 w-8 text-cerulean-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-cactus-800 mb-2">Plan Better</h4>
                  <p className="text-sm text-cactus-600">
                    Make informed decisions with data-driven insights
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <PiggyBank className="h-8 w-8 text-cerulean-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-cactus-800 mb-2">Reach Goals</h4>
                  <p className="text-sm text-cactus-600">
                    Set realistic timelines and track your progress
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {calculators.map((calc) => (
          <TabsContent key={calc.id} value={calc.id}>
            <calc.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CalculatorHub;