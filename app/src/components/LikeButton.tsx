import { useState } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  initialLiked?: boolean;
  onLike?: (liked: boolean) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LikeButton({ 
  initialLiked = false, 
  onLike, 
  className = '',
  size = 'md' 
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const newLiked = !liked;
    setLiked(newLiked);
    setIsAnimating(true);
    onLike?.(newLiked);
    
    setTimeout(() => setIsAnimating(false), 400);
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${sizeClasses[size]}
        rounded-full flex items-center justify-center
        transition-all duration-300 ease-out
        ${liked 
          ? 'bg-pink-50 border border-pink-200' 
          : 'bg-white/80 border border-[#E6E6E2] hover:border-pink-200 hover:bg-pink-50'
        }
        ${isAnimating ? 'animate-heart-beat' : ''}
        hover:scale-110 active:scale-95
        ${className}
      `}
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      <Heart 
        className={`
          ${iconSizes[size]}
          transition-all duration-300
          ${liked 
            ? 'fill-pink-500 text-pink-500' 
            : 'text-[#9A9A9A]'
          }
        `}
      />
    </button>
  );
}
