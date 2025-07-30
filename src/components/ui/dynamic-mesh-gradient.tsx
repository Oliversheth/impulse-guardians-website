import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ColorNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
}

interface DynamicMeshGradientProps {
  className?: string;
  speed?: number;
  nodeCount?: number;
}

export const DynamicMeshGradient = ({
  className = "",
  speed = 0.3,
  nodeCount = 6
}: DynamicMeshGradientProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<ColorNode[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = [
      'hsla(195, 100%, 90%, 0.8)',
      'hsla(170, 100%, 88%, 0.7)',
      'hsla(200, 100%, 85%, 0.6)',
      'hsla(180, 100%, 92%, 0.5)',
      'hsla(190, 100%, 95%, 0.4)',
      'hsla(160, 100%, 90%, 0.6)'
    ];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initializeNodes();
    };

    const initializeNodes = () => {
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          color: colors[i % colors.length],
          radius: Math.random() * 200 + 150
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodesRef.current.forEach((node) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Create radial gradient
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, 'transparent');

        // Draw the gradient blob
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

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
  }, [speed, nodeCount]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none', className)}
    />
  );
};
