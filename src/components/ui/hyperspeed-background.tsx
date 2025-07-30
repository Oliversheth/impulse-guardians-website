import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface HyperspeedBackgroundProps {
  className?: string;
  particleCount?: number;
  speed?: number;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
}

export const HyperspeedBackground: React.FC<HyperspeedBackgroundProps> = ({
  className,
  particleCount = 150,
  speed = 0.75,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        prevX: 0,
        prevY: 0,
      }));
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(6, 182, 212, 0.05)'; // cyan-500 with transparency
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particlesRef.current.forEach((particle) => {
        // Store previous position for trail
        particle.prevX = particle.x;
        particle.prevY = particle.y;

        // Move particle towards camera
        particle.z -= speed * 2;

        // Reset particle if it reaches the camera
        if (particle.z <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.z = 1000;
        }

        // Project 3D position to 2D screen
        const scale = 200 / particle.z;
        particle.x = centerX + (particle.x - centerX) * scale;
        particle.y = centerY + (particle.y - centerY) * scale;

        // Calculate opacity and size based on distance
        const opacity = Math.min(1, (1000 - particle.z) / 1000);
        const size = Math.max(0.5, scale * 2);

        // Draw particle trail
        if (particle.prevX && particle.prevY) {
          const gradient = ctx.createLinearGradient(
            particle.prevX,
            particle.prevY,
            particle.x,
            particle.y
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.1})`);
          gradient.addColorStop(1, `rgba(0, 212, 255, ${opacity * 0.8})`); // bright cyan

          ctx.strokeStyle = gradient;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(particle.prevX, particle.prevY);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }

        // Draw particle
        const particleGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          size
        );
        particleGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        particleGradient.addColorStop(0.5, `rgba(0, 212, 255, ${opacity * 0.8})`);
        particleGradient.addColorStop(1, `rgba(0, 149, 219, ${opacity * 0.2})`);

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'fixed inset-0 pointer-events-none z-0',
        className
      )}
      style={{ background: 'linear-gradient(to bottom, hsl(var(--cerulean-50)), hsl(var(--cactus-50)))' }}
    />
  );
};