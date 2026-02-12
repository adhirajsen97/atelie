import { useState, useRef, useEffect } from 'react';
import { CATEGORIES } from '@/types';
import type { Category } from '@/types';
import { ChevronDown, Filter } from 'lucide-react';

interface RainbowCategoryProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categoryEmojis: Record<Category, string> = {
  'All': '✨',
  'AI': '🤖',
  'Productivity': '⚡',
  'Design': '🎨',
  'Health': '💚',
  'Finance': '💰',
  'Education': '📚',
  'Entertainment': '🎬',
  'Developer Tools': '💻',
};

export function RainbowCategory({ selectedCategory, onCategoryChange }: RainbowCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (category: Category) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative z-40">
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 
          px-4 py-2.5 
          bg-white 
          border border-[#E6E6E2]
          rounded-full
          text-sm font-medium
          transition-all duration-300
          hover:border-[#5B8DEF] hover:shadow-sm
          ${isOpen ? 'border-[#5B8DEF] shadow-sm' : ''}
        `}
      >
        <Filter className="w-4 h-4 text-[#9A9A9A]" />
        <span className="text-[#1C1C1C]">
          {categoryEmojis[selectedCategory]} {selectedCategory}
        </span>
        <ChevronDown 
          className={`
            w-4 h-4 text-[#9A9A9A] 
            transition-transform duration-300
            ${isOpen ? 'rotate-180' : ''}
          `} 
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="
          absolute top-full right-0 mt-2 
          min-w-[200px]
          bg-white 
          rounded-[14px] 
          shadow-[0_12px_32px_rgba(0,0,0,0.12)]
          border border-[#E6E6E2]/50
          p-2
          animate-scale-in
        ">
          <div className="space-y-0.5">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleSelect(category)}
                className={`
                  w-full flex items-center gap-3 
                  px-3 py-2.5 
                  rounded-xl
                  text-left text-sm 
                  transition-all duration-200
                  ${selectedCategory === category
                    ? 'bg-[#F1F1EE] text-[#1C1C1C] font-medium'
                    : 'text-[#6B6B6B] hover:bg-[#FAFAF8] hover:text-[#1C1C1C]'
                  }
                `}
              >
                <span>{categoryEmojis[category]}</span>
                <span>{category}</span>
                {selectedCategory === category && (
                  <span className="ml-auto text-[#5B8DEF]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
