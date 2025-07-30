import React, { useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends ButtonProps {
  glowColor?: string;
  children: React.ReactNode;
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, glowColor, children, variant = "default", ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    // Determine glow color based on variant
    const getGlowColor = () => {
      if (glowColor) return glowColor;
      
      switch (variant) {
        case 'outline':
          return 'rgba(0, 149, 219, 0.4)'; // cerulean-600
        case 'default':
        default:
          return 'rgba(0, 149, 219, 0.5)'; // cerulean-600
      }
    };

    return (
      <div className="relative">
        <Button
          ref={ref}
          variant={variant}
          className={cn(
            'group relative overflow-hidden transition-all duration-300 transform',
            isHovered ? 'shadow-xl -translate-y-1 scale-105' : 'shadow-lg',
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            '--glow-color': getGlowColor(),
          } as React.CSSProperties}
          {...props}
        >
          {/* Glow effect */}
          <div 
            className={cn(
              "absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10",
              isHovered ? "animate-pulse" : ""
            )}
            style={{
              background: `radial-gradient(circle at center, var(--glow-color), transparent 70%)`,
            }}
          />
          
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_0.8s_ease-out] skew-x-12 transition-opacity duration-300"
            style={{
              transform: 'translateX(-100%)',
              animation: isHovered ? 'shimmer 0.8s ease-out' : 'none',
            }}
          />
          
          {/* Content with icon animation */}
          <div className="relative z-10 flex items-center gap-2">
            {React.Children.map(children, (child, index) => {
              if (React.isValidElement(child) && child.props?.className?.includes('lucide')) {
                return React.cloneElement(child as React.ReactElement, {
                  className: cn(
                    child.props.className,
                    'transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12'
                  ),
                });
              }
              return child;
            })}
          </div>
        </Button>
      </div>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';