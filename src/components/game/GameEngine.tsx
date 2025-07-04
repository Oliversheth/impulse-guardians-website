import { useEffect, useCallback } from 'react';
import { useGame } from './GameContext';
import type { Enemy, Tower, Projectile } from './GameContext';

const GameEngine = () => {
  const { state, dispatch } = useGame();

  // Game loop
  useEffect(() => {
    if (state.gameStatus !== 'playing') return;

    const gameLoop = setInterval(() => {
      // Move enemies
      dispatch({ type: 'MOVE_ENEMIES' });
      
      // Move projectiles
      dispatch({ type: 'MOVE_PROJECTILES' });
      
      // Fire towers
      fireTowers();
      
      // Check for enemy-projectile collisions
      checkCollisions();
      
      // Remove dead enemies
      removeDeadEnemies();
      
      // Check wave completion
      checkWaveCompletion();
      
    }, 50); // 20 FPS

    return () => clearInterval(gameLoop);
  }, [state.gameStatus, state.enemies, state.projectiles, state.towers]);

  // Enemy spawning
  useEffect(() => {
    if (!state.waveInProgress || state.enemiesSpawned >= state.enemiesInWave) return;

    const spawnInterval = setInterval(() => {
      if (state.enemiesSpawned < state.enemiesInWave) {
        spawnEnemy();
      }
    }, 2000); // Spawn every 2 seconds

    return () => clearInterval(spawnInterval);
  }, [state.waveInProgress, state.enemiesSpawned, state.enemiesInWave]);

  // Start first wave
  useEffect(() => {
    if (state.currentWave === 1 && !state.waveInProgress && state.enemies.length === 0) {
      setTimeout(() => {
        dispatch({ type: 'START_WAVE', waveNumber: 1, enemyCount: 5 });
      }, 1000);
    }
  }, [state.currentWave, state.waveInProgress, state.enemies.length]);

  const spawnEnemy = useCallback(() => {
    const enemyTypes: Array<Enemy['type']> = ['rent', 'groceries', 'entertainment', 'repairs'];
    const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    
    const enemy: Enemy = {
      id: `enemy-${Date.now()}-${Math.random()}`,
      type: randomType,
      position: { x: -30, y: 200 },
      health: getEnemyHealth(randomType, state.currentWave),
      maxHealth: getEnemyHealth(randomType, state.currentWave),
      speed: getEnemySpeed(randomType),
      value: getEnemyValue(randomType),
      pathIndex: 0,
    };

    dispatch({ type: 'SPAWN_ENEMY', enemy });
  }, [state.currentWave]);

  const fireTowers = useCallback(() => {
    const now = Date.now();
    
    state.towers.forEach(tower => {
      if (now - tower.lastFired < tower.fireRate) return;
      
      // Find enemies in range
      const enemiesInRange = state.enemies.filter(enemy => {
        const distance = Math.sqrt(
          Math.pow((enemy.position.x - (tower.position.x * 50 + 25)), 2) +
          Math.pow((enemy.position.y - (tower.position.y * 50 + 25)), 2)
        );
        return distance <= tower.range;
      });

      if (enemiesInRange.length === 0) return;

      // Target closest enemy
      const target = enemiesInRange.reduce((closest, enemy) => {
        const distanceToClosest = Math.sqrt(
          Math.pow((closest.position.x - (tower.position.x * 50 + 25)), 2) +
          Math.pow((closest.position.y - (tower.position.y * 50 + 25)), 2)
        );
        const distanceToEnemy = Math.sqrt(
          Math.pow((enemy.position.x - (tower.position.x * 50 + 25)), 2) +
          Math.pow((enemy.position.y - (tower.position.y * 50 + 25)), 2)
        );
        return distanceToEnemy < distanceToClosest ? enemy : closest;
      });

      // Create projectile
      const projectile: Projectile = {
        id: `projectile-${Date.now()}-${Math.random()}`,
        position: { 
          x: tower.position.x * 50 + 25, 
          y: tower.position.y * 50 + 25 
        },
        target: { ...target.position },
        damage: tower.damage,
        speed: 5,
      };

      dispatch({ type: 'ADD_PROJECTILE', projectile });
      
      // Update tower last fired time
      tower.lastFired = now;
    });
  }, [state.towers, state.enemies]);

  const checkCollisions = useCallback(() => {
    state.projectiles.forEach(projectile => {
      state.enemies.forEach(enemy => {
        const distance = Math.sqrt(
          Math.pow(projectile.position.x - enemy.position.x, 2) +
          Math.pow(projectile.position.y - enemy.position.y, 2)
        );

        if (distance < 20) {
          // Hit!
          dispatch({ type: 'DAMAGE_ENEMY', enemyId: enemy.id, damage: projectile.damage });
          dispatch({ type: 'REMOVE_PROJECTILE', projectileId: projectile.id });
        }
      });
    });
  }, [state.projectiles, state.enemies]);

  const removeDeadEnemies = useCallback(() => {
    state.enemies.forEach(enemy => {
      if (enemy.health <= 0) {
        dispatch({ type: 'REMOVE_ENEMY', enemyId: enemy.id });
      }
    });
  }, [state.enemies]);

  const checkWaveCompletion = useCallback(() => {
    if (state.waveInProgress && 
        state.enemiesSpawned >= state.enemiesInWave && 
        state.enemies.length === 0) {
      
      dispatch({ type: 'END_WAVE' });
      
      // Start next wave after delay
      setTimeout(() => {
        const nextWave = state.currentWave + 1;
        const enemyCount = Math.min(5 + Math.floor(nextWave / 2), 15);
        
        if (nextWave <= 10) {
          dispatch({ type: 'START_WAVE', waveNumber: nextWave, enemyCount });
        } else {
          dispatch({ type: 'GAME_OVER', status: 'victory' });
        }
      }, 3000);
    }
  }, [state.waveInProgress, state.enemiesSpawned, state.enemiesInWave, state.enemies.length, state.currentWave]);

  return null; // This component only handles game logic
};

function getEnemyHealth(type: Enemy['type'], wave: number): number {
  const baseHealth = {
    rent: 100,
    groceries: 60,
    entertainment: 40,
    repairs: 120,
  };
  
  return Math.floor(baseHealth[type] * (1 + wave * 0.2));
}

function getEnemySpeed(type: Enemy['type']): number {
  const speeds = {
    rent: 1,
    groceries: 1.5,
    entertainment: 2.5,
    repairs: 1.2,
  };
  
  return speeds[type];
}

function getEnemyValue(type: Enemy['type']): number {
  const values = {
    rent: 50,
    groceries: 30,
    entertainment: 20,
    repairs: 60,
  };
  
  return values[type];
}

export default GameEngine;