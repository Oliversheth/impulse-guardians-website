import { useGame } from './GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Heart, Trophy, Play, Pause } from 'lucide-react';

const GameUI = () => {
  const { state, dispatch } = useGame();

  const handlePauseResume = () => {
    if (state.gameStatus === 'paused') {
      dispatch({ type: 'RESUME_GAME' });
    } else {
      dispatch({ type: 'PAUSE_GAME' });
    }
  };

  const handleRestart = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <div className="space-y-4">
      {/* Game Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Game Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-medium">Money</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ${state.money}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-600" />
              <span className="font-medium">Lives</span>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              {state.lives}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-600" />
              <span className="font-medium">Score</span>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              {state.score}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Wave Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Wave {state.currentWave}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Enemies Defeated</span>
            <span>{state.enemiesSpawned - state.enemies.length}/{state.enemiesInWave}</span>
          </div>
          
          <Progress 
            value={state.enemiesInWave > 0 ? ((state.enemiesSpawned - state.enemies.length) / state.enemiesInWave) * 100 : 0}
            className="h-2"
          />

          <div className="text-xs text-muted-foreground">
            {state.waveInProgress ? 'Wave in progress...' : 'Preparing next wave...'}
          </div>
        </CardContent>
      </Card>

      {/* Game Controls */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <Button
            onClick={handlePauseResume}
            variant="outline"
            className="w-full"
            disabled={state.gameStatus === 'victory' || state.gameStatus === 'defeat'}
          >
            {state.gameStatus === 'paused' ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                Resume
              </>
            ) : (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            )}
          </Button>

          <Button
            onClick={handleRestart}
            variant="destructive"
            className="w-full"
          >
            Restart Game
          </Button>
        </CardContent>
      </Card>

      {/* Game Status */}
      {(state.gameStatus === 'victory' || state.gameStatus === 'defeat') && (
        <Card className={`border-2 ${state.gameStatus === 'victory' ? 'border-green-500' : 'border-red-500'}`}>
          <CardContent className="pt-6 text-center">
            <div className={`text-2xl font-bold mb-2 ${
              state.gameStatus === 'victory' ? 'text-green-600' : 'text-red-600'
            }`}>
              {state.gameStatus === 'victory' ? '🎉 Victory!' : '💔 Game Over'}
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {state.gameStatus === 'victory' 
                ? 'You successfully defended your budget!' 
                : 'Your budget was overwhelmed by expenses.'}
            </p>
            <p className="text-lg font-semibold">
              Final Score: {state.score}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GameUI;