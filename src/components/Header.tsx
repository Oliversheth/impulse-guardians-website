
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'ai-assistant', label: 'AI Assistant' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
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
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors ${
                  activeSection === item.id
                    ? 'text-cerulean-600 font-semibold'
                    : 'text-cactus-700 hover:text-cerulean-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button className="bg-cerulean-600 hover:bg-cerulean-700 text-white">
              Get Started
            </Button>
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
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left transition-colors ${
                    activeSection === item.id
                      ? 'text-cerulean-600 font-semibold'
                      : 'text-cactus-700 hover:text-cerulean-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button className="bg-cerulean-600 hover:bg-cerulean-700 text-white w-fit">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
