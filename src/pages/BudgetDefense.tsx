import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import GameBoard from '@/components/game/GameBoard';
import GameUI from '@/components/game/GameUI';
import TowerShop from '@/components/game/TowerShop';
import { GameProvider } from '@/components/game/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, DollarSign, Target } from 'lucide-react';

const BudgetDefense = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (!gameStarted) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold text-primary flex items-center justify-center gap-3">
                  <Shield className="h-10 w-10" />
                  Budget Defense Tower
                </CardTitle>
                <CardDescription className="text-lg">
                  Defend your budget against unexpected expenses! Use financial towers to stop bills from draining your savings.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    How to Play
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Click grid squares to place towers</li>
                    <li>• Each tower costs monthly income</li>
                    <li>• Stop bills from reaching the end</li>
                    <li>• Survive waves to win!</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Tower Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Savings Account:</strong> Steady defense</li>
                    <li>• <strong>Investment Fund:</strong> High damage</li>
                    <li>• <strong>Emergency Fund:</strong> Area damage</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Enemies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Rent:</strong> Slow but strong</li>
                    <li>• <strong>Groceries:</strong> Medium threat</li>
                    <li>• <strong>Entertainment:</strong> Fast moving</li>
                    <li>• <strong>Repairs:</strong> Unpredictable</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setGameStarted(true)}
                className="px-8 py-3 text-lg"
              >
                Start Game
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <GameProvider>
        <div className="min-h-screen bg-muted p-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-4 h-screen">
              {/* Game Board */}
              <div className="lg:col-span-3">
                <GameBoard />
              </div>
              
              {/* Game UI and Controls */}
              <div className="space-y-4">
                <GameUI />
                <TowerShop />
              </div>
            </div>
          </div>
        </div>
      </GameProvider>
    </Layout>
  );
};

export default BudgetDefense;