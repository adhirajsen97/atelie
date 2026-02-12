import { useState, useEffect } from 'react';

interface LandingAnimationProps {
  onComplete: () => void;
}

export function LandingAnimation({ onComplete }: LandingAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check if animation has been shown in this session
    const hasSeenAnimation = sessionStorage.getItem('atelie-animation-shown');
    
    if (hasSeenAnimation) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Animation duration is 2.6 seconds
    const timer = setTimeout(() => {
      setIsFading(true);
      
      // Fade out duration
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('atelie-animation-shown', 'true');
        onComplete();
      }, 500);
    }, 2600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[200] bg-[#FAFAF8] flex items-center justify-center
        transition-opacity duration-500 ease-out
        ${isFading ? 'opacity-0' : 'opacity-100'}
      `}
    >
      <div className="relative w-full max-w-2xl px-8">
        {/* Logo Animation GIF */}
        <img 
          src="/atelie-intro.gif" 
          alt="Atelie" 
          className="w-full h-auto"
          style={{ 
            maxWidth: '640px',
            margin: '0 auto',
            display: 'block'
          }}
        />
      </div>
    </div>
  );
}
