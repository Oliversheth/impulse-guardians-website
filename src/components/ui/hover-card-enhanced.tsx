import React from 'react';
import { cn } from '@/lib/utils';

interface HoverCardEnhancedProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const HoverCardEnhanced = ({ 
  children, 
  className = "",
  glowColor = "rgba(0, 149, 219, 0.3)"
}: HoverCardEnhancedProps) => {
  return (
    <div 
      className={cn(
        'group relative bg-white rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2',
        className
      )}
      style={{
        '--glow-color': glowColor,
      } as React.CSSProperties}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
        style={{
          background: `radial-gradient(circle at center, var(--glow-color), transparent 70%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};