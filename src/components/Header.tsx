
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onAuthRequired: () => void;
}

const Header = ({ activeSection, setActiveSection, onAuthRequired }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses', requiresAuth: true },
    { id: 'ai-assistant', label: 'Budget Bot', requiresAuth: true },
    { id: 'about', label: 'About' },
  ];

  const scrollToSection = (sectionId: string) => {
    // Wait a bit for navigation to complete if needed
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavClick = (sectionId: string, requiresAuth?: boolean) => {
    if (requiresAuth && !isAuthenticated) {
      onAuthRequired();
      return;
    }

    setActiveSection(sectionId);
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 200);
    } else {
      // We're already on home page, just scroll
      scrollToSection(sectionId);
    }
    
    setIsMenuOpen(false);
  };

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      handleNavClick('courses');
    } else {
      onAuthRequired();
    }
  };

  const handleAccountSettings = () => {
    setActiveSection('account');
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection('account');
      }, 200);
    } else {
      scrollToSection('account');
    }
    setShowAccountMenu(false);
    setIsMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand - Now clickable */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/lovable-uploads/fc12e82d-c153-4ef3-92d4-c698a1ca2f55.png" 
              alt="NoImpulse Logo" 
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-2xl font-bold text-cerulean-600">NoImpulse</h1>
              <p className="text-xs text-cactus-600">Financial Education for Students</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.requiresAuth)}
                className={`transition-colors ${
                  activeSection === item.id
                    ? 'text-cerulean-600 font-semibold'
                    : 'text-cactus-700 hover:text-cerulean-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 relative">
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="text-sm text-cactus-600 hover:text-cerulean-600 transition-colors"
                >
                  Welcome, {getUserDisplayName()}
                </button>
                
                {showAccountMenu && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-50">
                    <button
                      onClick={handleAccountSettings}
                      className="block w-full text-left px-4 py-2 text-sm text-cactus-700 hover:bg-cactus-50"
                    >
                      Account Settings
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setShowAccountMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-cactus-700 hover:bg-cactus-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button 
                onClick={handleGetStartedClick}
                className="bg-cerulean-600 hover:bg-cerulean-700 text-white"
              >
                Get Started
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cactus-700 hover:text-cerulean-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.requiresAuth)}
                  className={`text-left transition-colors ${
                    activeSection === item.id
                      ? 'text-cerulean-600 font-semibold'
                      : 'text-cactus-700 hover:text-cerulean-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-cactus-600">Welcome, {getUserDisplayName()}</span>
                  <button
                    onClick={handleAccountSettings}
                    className="text-left text-cactus-700 hover:text-cerulean-600 w-fit"
                  >
                    Account Settings
                  </button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="border-cerulean-600 text-cerulean-600 hover:bg-cerulean-50 w-fit"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleGetStartedClick}
                  className="bg-cerulean-600 hover:bg-cerulean-700 text-white w-fit"
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
