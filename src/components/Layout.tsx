import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthDialog from '@/components/AuthDialog';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Update active section based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      // On home page, keep section-based navigation
      return;
    } else if (path.startsWith('/course/')) {
      setActiveSection('courses');
    } else if (path === '/account') {
      setActiveSection('home'); // or could be a separate account section
    } else {
      setActiveSection('home');
    }
  }, [location.pathname]);

  const handleSetActiveSection = (section: string) => {
    if (location.pathname === '/') {
      // On Index page, use section-based navigation
      setActiveSection(section);
    } else {
      // On other pages, navigate to home with section
      if (section === 'home') {
        navigate('/');
      } else {
        navigate(`/#${section}`);
        // After navigation, the Index component will handle section switching
        setTimeout(() => setActiveSection(section), 100);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        activeSection={activeSection} 
        setActiveSection={handleSetActiveSection}
        onAuthRequired={() => setIsAuthDialogOpen(true)}
      />
      <main>{children}</main>
      <Footer />
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onClose={() => setIsAuthDialogOpen(false)} 
      />
    </div>
  );
};

export default Layout;
