import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SubtleMeshBackgroundProps {
  className?: string;
  speed?: number;
  nodeCount?: number;
}

export const SubtleMeshBackground = ({
  className = "",
  speed = 0.2,
  nodeCount = 4
}: SubtleMeshBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
          radius: Math.random() * 300 + 200,
          opacity: Math.random() * 0.1 + 0.05
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodesRef.current.forEach((node, index) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Create radial gradient using exact cerulean/cactus colors
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius
        );
        
        // Alternate between cerulean and cactus tones
        if (index % 2 === 0) {
          gradient.addColorStop(0, `rgba(224, 244, 255, ${node.opacity})`); // cerulean-50
          gradient.addColorStop(0.5, `rgba(179, 229, 255, ${node.opacity * 0.5})`); // cerulean-100
        } else {
          gradient.addColorStop(0, `rgba(247, 247, 246, ${node.opacity})`); // cactus-50
          gradient.addColorStop(0.5, `rgba(232, 232, 230, ${node.opacity * 0.5})`); // cactus-100
        }
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
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
  }, [speed, nodeCount]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none', className)}
    />
  );
};
