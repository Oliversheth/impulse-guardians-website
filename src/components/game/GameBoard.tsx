import { useRef, useEffect } from 'react';
import { useGame } from './GameContext';
import { Card } from '@/components/ui/card';
import GameEngine from './GameEngine';

const CELL_SIZE = 50;
const GRID_WIDTH = 10;
const GRID_HEIGHT = 8;

const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, placeTower } = useGame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#f0f9ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= GRID_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, GRID_HEIGHT * CELL_SIZE);
      ctx.stroke();
    }
    
    for (let y = 0; y <= GRID_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(GRID_WIDTH * CELL_SIZE, y * CELL_SIZE);
      ctx.stroke();
    }

    // Draw path
    const path = [
      { x: 0, y: 4 },
      { x: 2, y: 4 },
      { x: 2, y: 2 },
      { x: 5, y: 2 },
      { x: 5, y: 6 },
      { x: 8, y: 6 },
      { x: 8, y: 3 },
      { x: 10, y: 3 },
    ];

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    path.forEach((point, index) => {
      const x = point.x * CELL_SIZE + CELL_SIZE / 2;
      const y = point.y * CELL_SIZE + CELL_SIZE / 2;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw towers
    state.towers.forEach(tower => {
      const x = tower.position.x * CELL_SIZE + CELL_SIZE / 2;
      const y = tower.position.y * CELL_SIZE + CELL_SIZE / 2;
      
      ctx.fillStyle = getTowerColor(tower.type);
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();
      
      // Tower icon
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(getTowerIcon(tower.type), x, y);
    });

    // Draw enemies
    state.enemies.forEach(enemy => {
      ctx.fillStyle = getEnemyColor(enemy.type);
      ctx.beginPath();
      ctx.arc(enemy.position.x, enemy.position.y, 15, 0, 2 * Math.PI);
      ctx.fill();
      
      // Health bar
      const barWidth = 30;
      const barHeight = 4;
      const healthPercent = enemy.health / enemy.maxHealth;
      
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(enemy.position.x - barWidth/2, enemy.position.y - 25, barWidth, barHeight);
      
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(enemy.position.x - barWidth/2, enemy.position.y - 25, barWidth * healthPercent, barHeight);
    });

    // Draw projectiles
    state.projectiles.forEach(projectile => {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(projectile.position.x, projectile.position.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Highlight selected cell
    if (state.selectedTowerType) {
      canvas.style.cursor = 'crosshair';
    } else {
      canvas.style.cursor = 'default';
    }

  }, [state]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !state.selectedTowerType) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const gridX = Math.floor(x / CELL_SIZE);
    const gridY = Math.floor(y / CELL_SIZE);
    
    if (gridX >= 0 && gridX < GRID_WIDTH && gridY >= 0 && gridY < GRID_HEIGHT) {
      placeTower(state.selectedTowerType, { x: gridX, y: gridY });
    }
  };

  return (
    <Card className="p-4 bg-card">
      <GameEngine />
      <canvas
        ref={canvasRef}
        width={GRID_WIDTH * CELL_SIZE}
        height={GRID_HEIGHT * CELL_SIZE}
        onClick={handleCanvasClick}
        className="border border-border rounded-lg bg-background"
      />
    </Card>
  );
};

function getTowerColor(type: string): string {
  switch (type) {
    case 'savings': return '#10b981';
    case 'investment': return '#3b82f6';
    case 'emergency': return '#f59e0b';
    default: return '#6b7280';
  }
}

function getTowerIcon(type: string): string {
  switch (type) {
    case 'savings': return '🏦';
    case 'investment': return '📈';
    case 'emergency': return '🐷';
    default: return '?';
  }
}

function getEnemyColor(type: string): string {
  switch (type) {
    case 'rent': return '#dc2626';
    case 'groceries': return '#059669';
    case 'entertainment': return '#7c3aed';
    case 'repairs': return '#ea580c';
    default: return '#6b7280';
  }
}

export default GameBoard;