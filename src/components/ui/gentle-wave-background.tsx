import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GentleWaveBackgroundProps {
  className?: string;
  speed?: number;
  amplitude?: number;
}

export const GentleWaveBackground = ({
  className = "",
  speed = 0.015,
  amplitude = 40
}: GentleWaveBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const animate = () => {
      timeRef.current += speed;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw multiple gentle wave layers
      const drawWave = (offsetY: number, frequency: number, phase: number, color: string, opacity: number) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = offsetY + Math.sin((x * frequency) + (timeRef.current * phase)) * amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `rgba(${color}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      };

      // Layer 1: Cerulean wave
      drawWave(canvas.height * 0.6, 0.005, 0.8, '224, 244, 255', 0.08); // cerulean-50
      
      // Layer 2: Cactus wave  
      drawWave(canvas.height * 0.75, 0.008, -0.6, '247, 247, 246', 0.06); // cactus-50
      
      // Layer 3: Mixed wave
      drawWave(canvas.height * 0.85, 0.003, 1.2, '179, 229, 255', 0.04); // cerulean-100

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none', className)}
    />
  );
};