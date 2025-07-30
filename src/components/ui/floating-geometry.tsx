import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Shape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'hexagon' | 'triangle' | 'circle';
  speed: number;
  direction: number;
}

interface FloatingGeometryProps {
  className?: string;
  count?: number;
  speed?: number;
  maxSize?: number;
}

export const FloatingGeometry = ({
  className = "",
  count = 15,
  speed = 0.5,
  maxSize = 40
}: FloatingGeometryProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const shapesRef = useRef<Shape[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initializeShapes();
    };

    const initializeShapes = () => {
      shapesRef.current = [];
      for (let i = 0; i < count; i++) {
        shapesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * maxSize + 10,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.3 + 0.1,
          type: ['hexagon', 'triangle', 'circle'][Math.floor(Math.random() * 3)] as Shape['type'],
          speed: Math.random() * speed + 0.2,
          direction: Math.random() * Math.PI * 2
        });
      }
    };

    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x - size * 0.866, y + size * 0.5);
      ctx.lineTo(x + size * 0.866, y + size * 0.5);
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapesRef.current.forEach((shape) => {
        // Update position
        shape.x += Math.cos(shape.direction) * shape.speed;
        shape.y += Math.sin(shape.direction) * shape.speed;
        shape.rotation += shape.rotationSpeed;

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

        // Draw shape
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        
        // Create gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size);
        gradient.addColorStop(0, `hsla(195, 100%, 80%, ${shape.opacity})`);
        gradient.addColorStop(1, `hsla(170, 100%, 85%, ${shape.opacity * 0.3})`);
        
        ctx.fillStyle = gradient;
        ctx.strokeStyle = `hsla(195, 100%, 70%, ${shape.opacity * 0.5})`;
        ctx.lineWidth = 1;

        switch (shape.type) {
          case 'hexagon':
            drawHexagon(ctx, 0, 0, shape.size);
            break;
          case 'triangle':
            drawTriangle(ctx, 0, 0, shape.size);
            break;
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
            break;
        }
        
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

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
  }, [count, speed, maxSize]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none', className)}
    />
  );
};