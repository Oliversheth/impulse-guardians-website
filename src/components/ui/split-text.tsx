import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words';
}

export const SplitText = ({ 
  text, 
  className = "", 
  delay = 100, 
  duration = 0.6,
  splitType = 'chars'
}: SplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const items = container.querySelectorAll('[data-split-item]');
    
    items.forEach((item, index) => {
      const element = item as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(40px)';
      element.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * delay);
    });
  }, [text, delay, duration]);

  const splitContent = () => {
    if (splitType === 'words') {
      return text.split(' ').map((word, index) => (
        <span key={index} data-split-item className="inline-block">
          {word}{index < text.split(' ').length - 1 ? '\u00A0' : ''}
        </span>
      ));
    } else {
      return text.split('').map((char, index) => (
        <span key={index} data-split-item className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }
  };

  return (
    <div ref={containerRef} className={cn(className)}>
      {splitContent()}
    </div>
  );
};