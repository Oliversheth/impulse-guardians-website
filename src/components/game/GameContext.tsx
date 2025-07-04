import React, { createContext, useContext, useReducer, useCallback } from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface Tower {
  id: string;
  type: 'savings' | 'investment' | 'emergency';
  position: Position;
  damage: number;
  range: number;
  fireRate: number;
  cost: number;
  level: number;
  lastFired: number;
}

export interface Enemy {
  id: string;
  type: 'rent' | 'groceries' | 'entertainment' | 'repairs';
  position: Position;
  health: number;
  maxHealth: number;
  speed: number;
  value: number;
  pathIndex: number;
}

export interface Projectile {
  id: string;
  position: Position;
  target: Position;
  damage: number;
  speed: number;
}

export interface GameState {
  grid: (Tower | null)[][];
  towers: Tower[];
  enemies: Enemy[];
  projectiles: Projectile[];
  currentWave: number;
  money: number;
  lives: number;
  score: number;
  gameStatus: 'playing' | 'paused' | 'victory' | 'defeat';
  selectedTowerType: Tower['type'] | null;
  waveInProgress: boolean;
  enemiesInWave: number;
  enemiesSpawned: number;
}

type GameAction =
  | { type: 'PLACE_TOWER'; tower: Tower; position: Position }
  | { type: 'SPAWN_ENEMY'; enemy: Enemy }
  | { type: 'MOVE_ENEMIES' }
  | { type: 'FIRE_TOWERS' }
  | { type: 'MOVE_PROJECTILES' }
  | { type: 'DAMAGE_ENEMY'; enemyId: string; damage: number }
  | { type: 'REMOVE_ENEMY'; enemyId: string }
  | { type: 'REMOVE_PROJECTILE'; projectileId: string }
  | { type: 'ADD_PROJECTILE'; projectile: Projectile }
  | { type: 'LOSE_LIFE' }
  | { type: 'ADD_MONEY'; amount: number }
  | { type: 'SPEND_MONEY'; amount: number }
  | { type: 'SELECT_TOWER_TYPE'; towerType: Tower['type'] | null }
  | { type: 'START_WAVE'; waveNumber: number; enemyCount: number }
  | { type: 'END_WAVE' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'GAME_OVER'; status: 'victory' | 'defeat' }
  | { type: 'RESET_GAME' };

const GRID_WIDTH = 10;
const GRID_HEIGHT = 8;

const initialState: GameState = {
  grid: Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(null)),
  towers: [],
  enemies: [],
  projectiles: [],
  currentWave: 1,
  money: 500,
  lives: 20,
  score: 0,
  gameStatus: 'playing',
  selectedTowerType: null,
  waveInProgress: false,
  enemiesInWave: 0,
  enemiesSpawned: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'PLACE_TOWER':
      if (state.grid[action.position.y][action.position.x] !== null) {
        return state; // Can't place tower on occupied cell
      }
      const newGrid = state.grid.map(row => [...row]);
      newGrid[action.position.y][action.position.x] = action.tower;
      
      return {
        ...state,
        grid: newGrid,
        towers: [...state.towers, action.tower],
        money: state.money - action.tower.cost,
        selectedTowerType: null,
      };

    case 'SPAWN_ENEMY':
      return {
        ...state,
        enemies: [...state.enemies, action.enemy],
        enemiesSpawned: state.enemiesSpawned + 1,
      };

    case 'MOVE_ENEMIES':
      const updatedEnemies = state.enemies.map(enemy => {
        const path = getPath();
        if (enemy.pathIndex >= path.length - 1) {
          return null; // Enemy reached the end
        }
        
        const nextPoint = path[enemy.pathIndex + 1];
        const dx = nextPoint.x - enemy.position.x;
        const dy = nextPoint.y - enemy.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 0.1) {
          return {
            ...enemy,
            pathIndex: enemy.pathIndex + 1,
            position: nextPoint,
          };
        }
        
        const moveX = (dx / distance) * enemy.speed;
        const moveY = (dy / distance) * enemy.speed;
        
        return {
          ...enemy,
          position: {
            x: enemy.position.x + moveX,
            y: enemy.position.y + moveY,
          },
        };
      }).filter(Boolean) as Enemy[];
      
      const enemiesReachedEnd = state.enemies.length - updatedEnemies.length;
      
      return {
        ...state,
        enemies: updatedEnemies,
        lives: state.lives - enemiesReachedEnd,
        gameStatus: state.lives - enemiesReachedEnd <= 0 ? 'defeat' : state.gameStatus,
      };

    case 'DAMAGE_ENEMY':
      return {
        ...state,
        enemies: state.enemies.map(enemy =>
          enemy.id === action.enemyId
            ? { ...enemy, health: Math.max(0, enemy.health - action.damage) }
            : enemy
        ),
      };

    case 'REMOVE_ENEMY':
      const removedEnemy = state.enemies.find(e => e.id === action.enemyId);
      return {
        ...state,
        enemies: state.enemies.filter(e => e.id !== action.enemyId),
        money: state.money + (removedEnemy?.value || 0),
        score: state.score + (removedEnemy?.value || 0) * 10,
      };

    case 'ADD_PROJECTILE':
      return {
        ...state,
        projectiles: [...state.projectiles, action.projectile],
      };

    case 'MOVE_PROJECTILES':
      return {
        ...state,
        projectiles: state.projectiles.map(projectile => {
          const dx = projectile.target.x - projectile.position.x;
          const dy = projectile.target.y - projectile.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 5) {
            return null; // Projectile reached target
          }
          
          const moveX = (dx / distance) * projectile.speed;
          const moveY = (dy / distance) * projectile.speed;
          
          return {
            ...projectile,
            position: {
              x: projectile.position.x + moveX,
              y: projectile.position.y + moveY,
            },
          };
        }).filter(Boolean) as Projectile[],
      };

    case 'REMOVE_PROJECTILE':
      return {
        ...state,
        projectiles: state.projectiles.filter(p => p.id !== action.projectileId),
      };

    case 'SELECT_TOWER_TYPE':
      return {
        ...state,
        selectedTowerType: action.towerType,
      };

    case 'START_WAVE':
      return {
        ...state,
        currentWave: action.waveNumber,
        waveInProgress: true,
        enemiesInWave: action.enemyCount,
        enemiesSpawned: 0,
      };

    case 'END_WAVE':
      return {
        ...state,
        waveInProgress: false,
        money: state.money + (state.currentWave * 50),
      };

    case 'PAUSE_GAME':
      return {
        ...state,
        gameStatus: 'paused',
      };

    case 'RESUME_GAME':
      return {
        ...state,
        gameStatus: 'playing',
      };

    case 'GAME_OVER':
      return {
        ...state,
        gameStatus: action.status,
      };

    case 'RESET_GAME':
      return initialState;

    default:
      return state;
  }
}

// Predefined path for enemies to follow
function getPath(): Position[] {
  return [
    { x: -50, y: 200 },
    { x: 100, y: 200 },
    { x: 200, y: 200 },
    { x: 200, y: 100 },
    { x: 400, y: 100 },
    { x: 400, y: 300 },
    { x: 600, y: 300 },
    { x: 600, y: 150 },
    { x: 800, y: 150 },
    { x: 900, y: 150 },
  ];
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  placeTower: (type: Tower['type'], position: Position) => void;
  selectTowerType: (type: Tower['type'] | null) => void;
  canAffordTower: (type: Tower['type']) => boolean;
  getTowerCost: (type: Tower['type']) => number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const getTowerCost = useCallback((type: Tower['type']): number => {
    switch (type) {
      case 'savings': return 100;
      case 'investment': return 200;
      case 'emergency': return 150;
      default: return 0;
    }
  }, []);

  const canAffordTower = useCallback((type: Tower['type']): boolean => {
    return state.money >= getTowerCost(type);
  }, [state.money, getTowerCost]);

  const placeTower = useCallback((type: Tower['type'], position: Position) => {
    const cost = getTowerCost(type);
    if (!canAffordTower(type)) return;

    const towerStats = getTowerStats(type);
    const tower: Tower = {
      id: `tower-${Date.now()}-${Math.random()}`,
      type,
      position,
      cost,
      level: 1,
      lastFired: 0,
      ...towerStats,
    };

    dispatch({ type: 'PLACE_TOWER', tower, position });
  }, [canAffordTower, getTowerCost]);

  const selectTowerType = useCallback((type: Tower['type'] | null) => {
    dispatch({ type: 'SELECT_TOWER_TYPE', towerType: type });
  }, []);

  const value: GameContextType = {
    state,
    dispatch,
    placeTower,
    selectTowerType,
    canAffordTower,
    getTowerCost,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

function getTowerStats(type: Tower['type']) {
  switch (type) {
    case 'savings':
      return { damage: 15, range: 100, fireRate: 1000 }; // Steady, reliable
    case 'investment':
      return { damage: 50, range: 120, fireRate: 2000 }; // High damage, slow
    case 'emergency':
      return { damage: 25, range: 80, fireRate: 1500 }; // Area damage
    default:
      return { damage: 10, range: 100, fireRate: 1000 };
  }
}