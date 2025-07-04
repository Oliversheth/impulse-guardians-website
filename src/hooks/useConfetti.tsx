import { useState, useCallback } from 'react';

export const useConfetti = () => {
  const [isActive, setIsActive] = useState(false);

  const triggerConfetti = useCallback(() => {
    setIsActive(true);
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setIsActive(false);
    }, 3000);
  }, []);

  const stopConfetti = useCallback(() => {
    setIsActive(false);
  }, []);

  return {
    isActive,
    triggerConfetti,
    stopConfetti
  };
};