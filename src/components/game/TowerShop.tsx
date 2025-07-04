import { useGame } from './GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';

const TowerShop = () => {
  const { state, selectTowerType, canAffordTower, getTowerCost } = useGame();

  const towers = [
    {
      type: 'savings' as const,
      name: 'Savings Account',
      icon: '🏦',
      description: 'Steady, reliable defense against expenses',
      damage: 15,
      fireRate: 'Fast',
      range: 'Medium',
      cost: getTowerCost('savings'),
    },
    {
      type: 'investment' as const,
      name: 'Investment Fund',
      icon: '📈',
      description: 'High damage but slower attacks',
      damage: 50,
      fireRate: 'Slow',
      range: 'Long',
      cost: getTowerCost('investment'),
    },
    {
      type: 'emergency' as const,
      name: 'Emergency Fund',
      icon: '🐷',
      description: 'Area damage to multiple expenses',
      damage: 25,
      fireRate: 'Medium',
      range: 'Short',
      cost: getTowerCost('emergency'),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Financial Towers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {towers.map((tower) => {
          const isSelected = state.selectedTowerType === tower.type;
          const canAfford = canAffordTower(tower.type);
          const isDisabled = state.gameStatus !== 'playing' || !canAfford;

          return (
            <div
              key={tower.type}
              className={`p-3 border rounded-lg transition-all cursor-pointer ${
                isSelected 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/50'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isDisabled && selectTowerType(isSelected ? null : tower.type)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{tower.icon}</span>
                  <div>
                    <h3 className="font-semibold text-sm">{tower.name}</h3>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {tower.cost}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-2">
                {tower.description}
              </p>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="font-medium">Damage</div>
                  <div className="text-muted-foreground">{tower.damage}</div>
                </div>
                <div>
                  <div className="font-medium">Speed</div>
                  <div className="text-muted-foreground">{tower.fireRate}</div>
                </div>
                <div>
                  <div className="font-medium">Range</div>
                  <div className="text-muted-foreground">{tower.range}</div>
                </div>
              </div>

              {!canAfford && (
                <div className="mt-2 text-xs text-red-600 font-medium">
                  Not enough money
                </div>
              )}

              {isSelected && (
                <div className="mt-2 text-xs text-primary font-medium">
                  Click on the board to place
                </div>
              )}
            </div>
          );
        })}

        {state.selectedTowerType && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => selectTowerType(null)}
          >
            Cancel Selection
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TowerShop;