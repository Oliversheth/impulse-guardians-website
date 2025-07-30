
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthDialog from '@/components/AuthDialog';
import { SubtleMeshBackground } from '@/components/ui/subtle-mesh-background';
import { GentleWaveBackground } from '@/components/ui/gentle-wave-background';
import { FloatingParticlesSubtle } from '@/components/ui/floating-particles-subtle';

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
      {/* Full-page animated background - only show on home page */}
      {location.pathname === '/' && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <SubtleMeshBackground speed={0.2} nodeCount={4} />
          <GentleWaveBackground speed={0.015} amplitude={40} />
          <FloatingParticlesSubtle count={8} speed={0.3} />
        </div>
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
