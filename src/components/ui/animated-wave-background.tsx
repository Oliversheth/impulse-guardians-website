import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedWaveBackgroundProps {
  className?: string;
  speed?: number;
  amplitude?: number;
  opacity?: number;
}

export const AnimatedWaveBackground = ({
  className = "",
  speed = 0.02,
  amplitude = 50,
  opacity = 0.1
}: AnimatedWaveBackgroundProps) => {
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

      // Draw multiple wave layers
      const drawWave = (offsetY: number, frequency: number, phase: number, opacity: number) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = offsetY + Math.sin((x * frequency) + (timeRef.current * phase)) * amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `hsla(195, 100%, 85%, ${opacity})`);
        gradient.addColorStop(1, `hsla(195, 100%, 95%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      };

      // Layer 1: Main wave
      drawWave(canvas.height * 0.7, 0.008, 1, opacity * 0.8);
      
      // Layer 2: Secondary wave
      drawWave(canvas.height * 0.8, 0.012, -0.8, opacity * 0.6);
      
      // Layer 3: Tertiary wave
      drawWave(canvas.height * 0.9, 0.006, 1.2, opacity * 0.4);

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
  }, [speed, amplitude, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none', className)}
    />
  );
};