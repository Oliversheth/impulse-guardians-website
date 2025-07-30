import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGradientBackgroundProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

export const AnimatedGradientBackground = ({
  className = "",
  colors = ['#e0f4ff', '#b3e5ff', '#80d4ff', '#f7f7f6'],
  speed = 0.02
}: AnimatedGradientBackgroundProps) => {
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

      // Create animated gradient
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(timeRef.current) * 100,
        canvas.height * 0.3 + Math.cos(timeRef.current * 0.8) * 80,
        0,
        canvas.width * 0.3 + Math.sin(timeRef.current) * 100,
        canvas.height * 0.3 + Math.cos(timeRef.current * 0.8) * 80,
        canvas.width * 0.6
      );
      
      gradient1.addColorStop(0, colors[0] + '80'); // 50% opacity
      gradient1.addColorStop(1, colors[1] + '40'); // 25% opacity

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(timeRef.current * 1.2) * 120,
        canvas.height * 0.7 + Math.sin(timeRef.current * 0.6) * 100,
        0,
        canvas.width * 0.7 + Math.cos(timeRef.current * 1.2) * 120,
        canvas.height * 0.7 + Math.sin(timeRef.current * 0.6) * 100,
        canvas.width * 0.8
      );
      
      gradient2.addColorStop(0, colors[2] + '60'); // 37.5% opacity
      gradient2.addColorStop(1, colors[3] + '30'); // 18.75% opacity

      // Draw animated gradients
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalCompositeOperation = 'source-over';

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
  }, [colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none', className)}
    />
  );
};