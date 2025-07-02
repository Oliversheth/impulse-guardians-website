
import { useState } from 'react';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onAuthRequired: () => void;
}

const Header = ({ activeSection, setActiveSection, onAuthRequired }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses', requiresAuth: true },
    { id: 'ai-assistant', label: 'Budget Bot', requiresAuth: true },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (sectionId: string, requiresAuth?: boolean) => {
    if (requiresAuth && !isAuthenticated) {
      onAuthRequired();
      return;
    }

    if (location.pathname === '/') {
      // On Index page, use section navigation
      setActiveSection(sectionId);
    } else {
      // On other pages, navigate to home with section
      if (sectionId === 'home') {
        navigate('/');
      } else {
        navigate(`/#${sectionId}`);
      }
    }
    setIsMenuOpen(false);
  };

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      if (location.pathname === '/') {
        setActiveSection('courses');
      } else {
        navigate('/#courses');
      }
    } else {
      onAuthRequired();
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      setActiveSection('home');
    } else {
      navigate('/');
    }
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  };

  const isActiveNav = (itemId: string) => {
    if (location.pathname === '/') {
      return activeSection === itemId;
    }
    // For non-Index pages, highlight based on route
    if (itemId === 'courses' && location.pathname.startsWith('/course')) {
      return true;
    }
    return false;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
            <img 
              src="/lovable-uploads/fc12e82d-c153-4ef3-92d4-c698a1ca2f55.png" 
              alt="NoImpulse Logo" 
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-2xl font-bold text-cerulean-600">NoImpulse</h1>
              <p className="text-xs text-cactus-600">Financial Education for Students</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.requiresAuth)}
                className={`transition-colors ${
                  isActiveNav(item.id)
                    ? 'text-cerulean-600 font-semibold'
                    : 'text-cactus-700 hover:text-cerulean-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{getUserDisplayName()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link to="/account">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                    isActiveNav(item.id)
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
                  <Link to="/account">
                    <Button variant="outline" className="w-fit">
                      Account Settings
                    </Button>
                  </Link>
                  <Button 
                    variant="outline"
                    onClick={logout}
                    className="w-fit"
                  >
                    Sign Out
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
