import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CreditCard, TrendingDown, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useAchievements } from '@/hooks/useAchievements';

interface Debt {
  id: string;
  name: string;
  balance: number;
  minPayment: number;
  interestRate: number;
}

interface PayoffResult {
  debt: Debt;
  payoffOrder: number;
  totalPayments: number;
  totalInterest: number;
  payoffDate: Date;
}

const DebtPayoffCalculator = () => {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card 1', balance: 5000, minPayment: 150, interestRate: 18.99 },
    { id: '2', name: 'Credit Card 2', balance: 3000, minPayment: 90, interestRate: 15.49 },
    { id: '3', name: 'Student Loan', balance: 15000, minPayment: 200, interestRate: 6.8 }
  ]);
  const [extraPayment, setExtraPayment] = useState('200');
  const [snowballResults, setSnowballResults] = useState<PayoffResult[]>([]);
  const [avalancheResults, setAvalancheResults] = useState<PayoffResult[]>([]);
  const { user } = useAuth();
  const { checkAndUnlockAchievement } = useAchievements();

  const addDebt = () => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      name: `Debt ${debts.length + 1}`,
      balance: 0,
      minPayment: 0,
      interestRate: 0
    };
    setDebts([...debts, newDebt]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const calculatePayoff = (debts: Debt[], strategy: 'snowball' | 'avalanche', extraPayment: number) => {
    const sortedDebts = [...debts].sort((a, b) => {
      if (strategy === 'snowball') {
        return a.balance - b.balance; // Smallest balance first
      } else {
        return b.interestRate - a.interestRate; // Highest interest rate first
      }
    });

    const results: PayoffResult[] = [];
    let currentDate = new Date();
    let remainingDebts = sortedDebts.map(debt => ({ ...debt }));
    let totalExtraPayment = extraPayment;

    while (remainingDebts.length > 0) {
      const targetDebt = remainingDebts[0];
      let monthlyPayment = targetDebt.minPayment + totalExtraPayment;
      let balance = targetDebt.balance;
      let totalInterest = 0;
      let months = 0;

      // Calculate payoff for this debt
      while (balance > 0) {
        const interestPayment = (balance * (targetDebt.interestRate / 100)) / 12;
        const principalPayment = Math.min(monthlyPayment - interestPayment, balance);
        
        balance -= principalPayment;
        totalInterest += interestPayment;
        months++;
        
        if (months > 600) break; // Safety break for infinite loops
      }

      const payoffDate = new Date(currentDate);
      payoffDate.setMonth(payoffDate.getMonth() + months);

      results.push({
        debt: targetDebt,
        payoffOrder: results.length + 1,
        totalPayments: (targetDebt.minPayment + totalExtraPayment) * months,
        totalInterest,
        payoffDate
      });

      // Remove this debt and add its minimum payment to extra payment pool
      totalExtraPayment += targetDebt.minPayment;
      remainingDebts = remainingDebts.slice(1);
      currentDate = new Date(payoffDate);
    }

    return results;
  };

  const runCalculations = async () => {
    const extra = parseFloat(extraPayment) || 0;
    const validDebts = debts.filter(debt => debt.balance > 0 && debt.minPayment > 0);

    if (validDebts.length === 0) return;

    const snowball = calculatePayoff(validDebts, 'snowball', extra);
    const avalanche = calculatePayoff(validDebts, 'avalanche', extra);

    setSnowballResults(snowball);
    setAvalancheResults(avalanche);

    // Save calculator usage
    if (user) {
      try {
        await supabase.from('calculator_usage').insert({
          user_id: user.id,
          calculator_type: 'debt_payoff',
          input_data: { debts: validDebts, extraPayment: extra } as any,
          result_data: { snowball, avalanche } as any
        });

        // Check for achievements
        await checkAndUnlockAchievement('calculator_use', {
          calculatorType: 'debt_payoff',
          count: 1
        });
      } catch (error) {
        console.error('Error saving calculator usage:', error);
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const getTotalSummary = (results: PayoffResult[]) => {
    const totalInterest = results.reduce((sum, result) => sum + result.totalInterest, 0);
    const totalPayments = results.reduce((sum, result) => sum + result.totalPayments, 0);
    const finalPayoffDate = results.length > 0 ? results[results.length - 1].payoffDate : new Date();
    
    return { totalInterest, totalPayments, finalPayoffDate };
  };

  const snowballSummary = getTotalSummary(snowballResults);
  const avalancheSummary = getTotalSummary(avalancheResults);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-cerulean-600" />
            <CardTitle>Debt Payoff Calculator</CardTitle>
          </div>
          <CardDescription>
            Compare debt snowball vs avalanche methods to find the best payoff strategy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Debts Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-cactus-800">Your Debts</h3>
              <Button onClick={addDebt} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Debt
              </Button>
            </div>

            {debts.map((debt) => (
              <Card key={debt.id} className="border-l-4 border-l-red-400">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <Label>Debt Name</Label>
                      <Input
                        value={debt.name}
                        onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                        placeholder="Credit Card"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Balance</Label>
                      <Input
                        type="number"
                        value={debt.balance}
                        onChange={(e) => updateDebt(debt.id, 'balance', parseFloat(e.target.value) || 0)}
                        placeholder="5000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Min Payment</Label>
                      <Input
                        type="number"
                        value={debt.minPayment}
                        onChange={(e) => updateDebt(debt.id, 'minPayment', parseFloat(e.target.value) || 0)}
                        placeholder="150"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Interest Rate (%)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={debt.interestRate}
                        onChange={(e) => updateDebt(debt.id, 'interestRate', parseFloat(e.target.value) || 0)}
                        placeholder="18.99"
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <Button
                        onClick={() => removeDebt(debt.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Extra Payment */}
          <div className="space-y-2">
            <Label htmlFor="extraPayment">Extra Monthly Payment</Label>
            <Input
              id="extraPayment"
              type="number"
              value={extraPayment}
              onChange={(e) => setExtraPayment(e.target.value)}
              placeholder="200"
            />
            <p className="text-sm text-cactus-600">
              Additional amount you can pay beyond minimum payments
            </p>
          </div>

          <Button onClick={runCalculations} className="w-full">
            <CreditCard className="h-4 w-4 mr-2" />
            Calculate Payoff Strategies
          </Button>

          {(snowballResults.length > 0 || avalancheResults.length > 0) && (
            <Tabs defaultValue="comparison" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
                <TabsTrigger value="snowball">Debt Snowball</TabsTrigger>
                <TabsTrigger value="avalanche">Debt Avalanche</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Snowball Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Debt Snowball Method</CardTitle>
                      <CardDescription>Pay off smallest balances first</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-cactus-600">Total Interest:</span>
                          <span className="font-semibold text-red-600">
                            {formatCurrency(snowballSummary.totalInterest)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-cactus-600">Debt-Free Date:</span>
                          <span className="font-semibold">
                            {formatDate(snowballSummary.finalPayoffDate)}
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="w-full justify-center">
                        Better for motivation & quick wins
                      </Badge>
                    </CardContent>
                  </Card>

                  {/* Avalanche Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Debt Avalanche Method</CardTitle>
                      <CardDescription>Pay off highest interest rates first</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-cactus-600">Total Interest:</span>
                          <span className="font-semibold text-red-600">
                            {formatCurrency(avalancheSummary.totalInterest)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-cactus-600">Debt-Free Date:</span>
                          <span className="font-semibold">
                            {formatDate(avalancheSummary.finalPayoffDate)}
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="w-full justify-center">
                        Better for saving money
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                {/* Savings Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle>Interest Savings Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { method: 'Snowball', interest: snowballSummary.totalInterest },
                          { method: 'Avalanche', interest: avalancheSummary.totalInterest }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="method" />
                          <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Bar dataKey="interest" fill="#dc2626" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {avalancheSummary.totalInterest < snowballSummary.totalInterest && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          💰 The avalanche method saves you{' '}
                          <span className="font-semibold">
                            {formatCurrency(snowballSummary.totalInterest - avalancheSummary.totalInterest)}
                          </span>{' '}
                          in interest payments!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="snowball" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Debt Snowball Payoff Order</CardTitle>
                    <CardDescription>Smallest balances first for psychological wins</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {snowballResults.map((result, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-cactus-800">
                                #{result.payoffOrder} - {result.debt.name}
                              </h4>
                              <p className="text-sm text-cactus-600">
                                Balance: {formatCurrency(result.debt.balance)} | 
                                Rate: {result.debt.interestRate}%
                              </p>
                            </div>
                            <Badge>{formatDate(result.payoffDate)}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-cactus-600">Total Interest: </span>
                              <span className="font-semibold text-red-600">
                                {formatCurrency(result.totalInterest)}
                              </span>
                            </div>
                            <div>
                              <span className="text-cactus-600">Total Payments: </span>
                              <span className="font-semibold">
                                {formatCurrency(result.totalPayments)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="avalanche" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Debt Avalanche Payoff Order</CardTitle>
                    <CardDescription>Highest interest rates first for maximum savings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {avalancheResults.map((result, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-cactus-800">
                                #{result.payoffOrder} - {result.debt.name}
                              </h4>
                              <p className="text-sm text-cactus-600">
                                Balance: {formatCurrency(result.debt.balance)} | 
                                Rate: {result.debt.interestRate}%
                              </p>
                            </div>
                            <Badge>{formatDate(result.payoffDate)}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-cactus-600">Total Interest: </span>
                              <span className="font-semibold text-red-600">
                                {formatCurrency(result.totalInterest)}
                              </span>
                            </div>
                            <div>
                              <span className="text-cactus-600">Total Payments: </span>
                              <span className="font-semibold">
                                {formatCurrency(result.totalPayments)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DebtPayoffCalculator;