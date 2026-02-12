import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ToggleSwitch } from '@/components/ToggleSwitch';
import { RainbowCategory } from '@/components/RainbowCategory';
import { FeedContainer } from '@/components/FeedContainer';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminDashboard } from '@/components/AdminDashboard';
import { AboutPage } from '@/components/AboutPage';
import { LandingAnimation } from '@/components/LandingAnimation';
import type { Category } from '@/types';
import { mockItems, mockSubmissions, mockAdminStats } from '@/data/mockData';
import './App.css';

// Admin route - hidden from public
const ADMIN_ROUTE = '/atelie-admin-2024';

type Page = 'explore' | 'ideas' | 'admin' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('explore');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [, setIsLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  // Check for admin route
  useEffect(() => {
    const path = window.location.pathname;
    if (path === ADMIN_ROUTE) {
      setCurrentPage('admin');
      setShowAnimation(false);
    }
  }, []);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    setIsLoading(false);
  };

  // Handle admin login
  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  // Handle admin logout
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    window.history.pushState({}, '', '/');
    setCurrentPage('explore');
  };

  // Handle category change
  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle between Explore and Ideas
  const handleToggle = (isIdeas: boolean) => {
    setCurrentPage(isIdeas ? 'ideas' : 'explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // About page
  const handleAboutClick = () => {
    setShowAbout(true);
  };

  const handleAboutClose = () => {
    setShowAbout(false);
  };

  // Admin page
  if (currentPage === 'admin') {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <AdminDashboard
          stats={mockAdminStats}
          items={mockItems}
          submissions={mockSubmissions}
          onLogout={handleAdminLogout}
        />
      </div>
    );
  }

  return (
    <>
      {/* Landing Animation */}
      {showAnimation && (
        <LandingAnimation onComplete={handleAnimationComplete} />
      )}

      {/* Main App */}
      <div className="min-h-screen bg-[#FAFAF8]">
        <Navbar onAboutClick={handleAboutClick} />
        
        <main className="pt-24 sm:pt-28 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              {/* Toggle Switch */}
              <ToggleSwitch 
                isChecked={currentPage === 'ideas'}
                onChange={handleToggle}
              />

              {/* Rainbow Category Filter */}
              <RainbowCategory
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Feed */}
            <div className="mt-6 sm:mt-8">
              <FeedContainer
                items={mockItems}
                itemType={currentPage === 'ideas' ? 'idea' : 'app'}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-[#E6E6E2] py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/Atelie_logo.png" 
                  alt="Atelie" 
                  className="h-6 w-auto opacity-60"
                />
                <span className="text-sm text-[#9A9A9A]">
                  Atelie
                </span>
              </div>
              <p className="text-xs text-[#9A9A9A] tracking-wide">
                Quality over Quantity
              </p>
            </div>
          </div>
        </footer>

        {/* About Page Modal */}
        {showAbout && <AboutPage onClose={handleAboutClose} />}
      </div>
    </>
  );
}

export default App;
