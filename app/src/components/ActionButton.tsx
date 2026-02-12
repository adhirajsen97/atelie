import { Download, ExternalLink } from 'lucide-react';

interface ActionButtonProps {
  platform: 'iOS' | 'Web App';
  appLink?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ActionButton({ 
  platform, 
  appLink, 
  className = '',
  size = 'md' 
}: ActionButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (appLink) {
      window.open(appLink, '_blank', 'noopener,noreferrer');
    }
  };

  const isIOS = platform === 'iOS';

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
      disabled={!appLink}
      className={`
        ${sizeClasses[size]}
        rounded-full flex items-center justify-center
        transition-all duration-300 ease-out
        ${isIOS 
          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700' 
          : 'bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
        }
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
        hover:scale-110 active:scale-95
        shadow-md hover:shadow-lg
        ${className}
      `}
      title={isIOS ? 'Download on App Store' : 'Visit Website'}
      aria-label={isIOS ? 'Download on App Store' : 'Visit Website'}
    >
      {isIOS ? (
        <Download className={`${iconSizes[size]} text-white`} />
      ) : (
        <ExternalLink className={`${iconSizes[size]} text-white`} />
      )}
    </button>
  );
}
