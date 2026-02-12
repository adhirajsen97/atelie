import { useState, useEffect } from 'react';
import { Menu, X, Info } from 'lucide-react';

interface NavbarProps {
  onAboutClick: () => void;
}

export function Navbar({ onAboutClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300
        ${isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/Atelie_logo.png" 
              alt="Atelie" 
              className="h-8 w-auto"
            />
            <div className="hidden sm:block">
              <span className="text-xl font-light tracking-wide text-[#1C1C1C]">
                Atelie
              </span>
              <span className="block text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase">
                Quality over Quantity
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={onAboutClick}
              className="
                flex items-center gap-2
                text-sm text-[#6B6B6B] hover:text-[#1C1C1C]
                transition-colors duration-200
                px-4 py-2 rounded-full
                hover:bg-[#F1F1EE]
              "
            >
              <Info className="w-4 h-4" />
              About
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="
              md:hidden p-2.5 rounded-full 
              hover:bg-[#F1F1EE] transition-colors
            "
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-[#6B6B6B]" />
            ) : (
              <Menu className="w-5 h-5 text-[#6B6B6B]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="
            md:hidden py-4 border-t border-[#E6E6E2]
            animate-fade-in
          ">
            <button
              onClick={() => {
                onAboutClick();
                setIsMobileMenuOpen(false);
              }}
              className="
                w-full flex items-center gap-3
                px-4 py-3 rounded-xl
                text-[#6B6B6B] hover:text-[#1C1C1C]
                hover:bg-[#F1F1EE]
                transition-all duration-200
              "
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">About</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
