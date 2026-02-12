import { Sparkles, Rocket } from 'lucide-react';

interface ToggleSwitchProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleSwitch({ isChecked, onChange }: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Explore Label */}
      <span 
        className={`
          text-sm font-medium transition-colors duration-300
          ${!isChecked ? 'text-[#1C1C1C]' : 'text-[#9A9A9A]'}
        `}
      >
        Explore
      </span>

      {/* Toggle Switch */}
      <button
        onClick={() => onChange(!isChecked)}
        className="relative w-20 h-10 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#5B8DEF] focus:ring-offset-2"
        style={{
          background: isChecked 
            ? 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)' 
            : 'linear-gradient(135deg, #5B8DEF 0%, #3B82F6 100%)',
          boxShadow: '0 2px 8px rgba(91, 141, 239, 0.3)'
        }}
        aria-label={isChecked ? 'Switch to Explore' : 'Switch to Ideas'}
      >
        {/* Track Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2.5">
          <Rocket 
            className={`w-4 h-4 text-white/70 transition-opacity duration-300 ${!isChecked ? 'opacity-100' : 'opacity-30'}`} 
          />
          <Sparkles 
            className={`w-4 h-4 text-white/70 transition-opacity duration-300 ${isChecked ? 'opacity-100' : 'opacity-30'}`} 
          />
        </div>

        {/* Sliding Thumb */}
        <span
          className={`
            absolute top-1 w-8 h-8 bg-white rounded-full shadow-md
            transition-all duration-300 ease-out flex items-center justify-center
          `}
          style={{
            left: isChecked ? 'calc(100% - 2.25rem)' : '0.25rem',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
          }}
        >
          {isChecked ? (
            <Sparkles className="w-4 h-4 text-purple-500" />
          ) : (
            <Rocket className="w-4 h-4 text-blue-500" />
          )}
        </span>
      </button>

      {/* Ideas Label */}
      <span 
        className={`
          text-sm font-medium transition-colors duration-300
          ${isChecked ? 'text-[#1C1C1C]' : 'text-[#9A9A9A]'}
        `}
      >
        Ideas
      </span>
    </div>
  );
}
