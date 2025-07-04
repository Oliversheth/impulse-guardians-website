import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useAchievements } from '@/hooks/useAchievements';

interface CompoundInterestData {
  year: number;
  principal: number;
  interest: number;
  total: number;
}

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('1000');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('10');
  const [monthlyContribution, setMonthlyContribution] = useState('100');
  const [results, setResults] = useState<CompoundInterestData[]>([]);
  const [totalReturn, setTotalReturn] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const { user } = useAuth();
  const { checkAndUnlockAchievement } = useAchievements();

  const calculateCompoundInterest = async () => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseInt(years) || 0;
    const pmt = parseFloat(monthlyContribution) || 0;

    const data: CompoundInterestData[] = [];
    let currentPrincipal = p;
    let totalContributions = p;

    for (let year = 0; year <= t; year++) {
      if (year > 0) {
        // Add monthly contributions
        totalContributions += pmt * 12;
        currentPrincipal += pmt * 12;
        
        // Apply compound interest
        currentPrincipal *= (1 + r);
      }

      const interestEarned = currentPrincipal - totalContributions;
      
      data.push({
        year,
        principal: totalContributions,
        interest: interestEarned,
        total: currentPrincipal
      });
    }

    setResults(data);
    setTotalReturn(currentPrincipal);
    setTotalInterest(currentPrincipal - totalContributions);

    // Save calculator usage
    if (user) {
      try {
        await supabase.from('calculator_usage').insert({
          user_id: user.id,
          calculator_type: 'compound_interest',
          input_data: { principal: p, rate: r * 100, years: t, monthlyContribution: pmt },
          result_data: { totalReturn: currentPrincipal, totalInterest: currentPrincipal - totalContributions }
        });

        console.log('Checking compound interest calculator achievement');

        // Check for Investment Insight achievement
        await checkAndUnlockAchievement('calculator_use', {
          calculatorType: 'compound_interest',
          count: 1
        });
        
        // Check for Calculator Pro achievement
        const { data: calculatorUsage } = await supabase
          .from('calculator_usage')
          .select('calculator_type')
          .eq('user_id', user.id);
        
        const uniqueCalculators = new Set(calculatorUsage?.map(c => c.calculator_type) || []).size;
        
        console.log('Unique calculators used:', uniqueCalculators);
        
        await checkAndUnlockAchievement('calculator_use', {
          uniqueCalculators
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-cerulean-600" />
            <CardTitle>Compound Interest Calculator</CardTitle>
          </div>
          <CardDescription>
            See how your investments can grow over time with compound interest
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Initial Investment</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="1000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="7"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="years">Time Period (Years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="monthly">Monthly Contribution</Label>
              <Input
                id="monthly"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                placeholder="100"
              />
            </div>
          </div>

          <Button onClick={calculateCompoundInterest} className="w-full">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Returns
          </Button>

          {results.length > 0 && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-cactus-600">Final Amount</p>
                      <p className="text-2xl font-bold text-cactus-800">
                        {formatCurrency(totalReturn)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-cactus-600">Total Interest Earned</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(totalInterest)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-cactus-600">Total Contributions</p>
                      <p className="text-2xl font-bold text-cerulean-600">
                        {formatCurrency(totalReturn - totalInterest)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Growth Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip
                          formatter={(value: number, name: string) => [
                            formatCurrency(value),
                            name === 'total' ? 'Total Value' :
                            name === 'principal' ? 'Contributions' : 'Interest Earned'
                          ]}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="principal"
                          stroke="#0891b2"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="interest"
                          stroke="#059669"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="#dc2626"
                          strokeWidth={3}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex justify-center space-x-6 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-cyan-600 rounded mr-2"></div>
                      <span className="text-sm">Contributions</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-600 rounded mr-2"></div>
                      <span className="text-sm">Interest Earned</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-600 rounded mr-2"></div>
                      <span className="text-sm">Total Value</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-cactus-50 rounded-lg">
                      <h4 className="font-semibold text-cactus-800 mb-2">💡 Power of Compounding</h4>
                      <p className="text-sm text-cactus-600">
                        Your money grows exponentially over time. The longer you invest, 
                        the more dramatic the growth becomes.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-cerulean-50 rounded-lg">
                      <h4 className="font-semibold text-cactus-800 mb-2">📈 Regular Contributions</h4>
                      <p className="text-sm text-cactus-600">
                        Adding ${monthlyContribution}/month significantly boosts your returns. 
                        Consistency is key to building wealth.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-cactus-800 mb-2">⏰ Time is Your Friend</h4>
                      <p className="text-sm text-cactus-600">
                        Starting early, even with small amounts, can be more powerful 
                        than waiting and investing larger amounts later.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-cactus-800 mb-2">🎯 Interest Rate Impact</h4>
                      <p className="text-sm text-cactus-600">
                        Even a 1-2% difference in annual returns can mean tens of thousands 
                        more over the long term.
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

export default CompoundInterestCalculator;