
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthDialog from '@/components/AuthDialog';
import { HyperspeedBackground } from '@/components/ui/hyperspeed-background';

interface LayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

const Layout = ({ children, activeSection, setActiveSection }: LayoutProps) => {
  const [localActiveSection, setLocalActiveSection] = useState('home');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Use props if provided (for Index page), otherwise use local state
  const currentActiveSection = activeSection || localActiveSection;
  const handleSetActiveSection = setActiveSection || setLocalActiveSection;

  // Update active section based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      // On home page, check hash for section navigation
      const hash = location.hash.replace('#', '');
      if (hash && ['home', 'courses', 'ai-assistant', 'about'].includes(hash)) {
        handleSetActiveSection(hash);
      } else if (!activeSection) {
        // Only set to home if no activeSection prop is provided
        handleSetActiveSection('home');
      }
    } else if (path.startsWith('/course/')) {
      handleSetActiveSection('courses');
    } else if (path === '/account') {
      handleSetActiveSection('home');
    } else {
      handleSetActiveSection('home');
    }
  }, [location.pathname, location.hash, activeSection, handleSetActiveSection]);

  const handleNavigateToSection = (section: string) => {
    if (section === 'home') {
      navigate('/');
    } else {
      navigate(`/#${section}`);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Hyperspeed background for home page */}
      {location.pathname === '/' && (
        <HyperspeedBackground className="fixed inset-0 pointer-events-none z-0" />
      )}
      
      <div className="relative z-10">
        <Header 
          activeSection={currentActiveSection} 
          setActiveSection={handleNavigateToSection}
          onAuthRequired={() => setIsAuthDialogOpen(true)}
        />
        <main>{children}</main>
        <Footer />
        <AuthDialog 
          isOpen={isAuthDialogOpen} 
          onClose={() => setIsAuthDialogOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Layout;
