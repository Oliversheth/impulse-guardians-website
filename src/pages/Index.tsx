
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Courses from '@/components/Courses';
import AIAssistant from '@/components/AIAssistant';
import About from '@/components/About';
import Footer from '@/components/Footer';
import AuthDialog from '@/components/AuthDialog';
import AccountSettings from '@/components/AccountSettings';
import LegalDisclaimer from '@/components/LegalDisclaimer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(5000);

  useEffect(() => {
    // Simulate visitor counter - in real app, this would come from analytics
    const storedCount = localStorage.getItem('visitorCount');
    const baseCount = storedCount ? parseInt(storedCount) : 5000;
    const newCount = baseCount + Math.floor(Math.random() * 10) + 1;
    setVisitorCount(newCount);
    localStorage.setItem('visitorCount', newCount.toString());
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero setActiveSection={setActiveSection} visitorCount={visitorCount} />;
      case 'courses':
        return <Courses />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'about':
        return <About />;
      case 'account':
        return <AccountSettings />;
      case 'legal':
        return <LegalDisclaimer />;
      default:
        return <Hero setActiveSection={setActiveSection} visitorCount={visitorCount} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onAuthRequired={() => setIsAuthDialogOpen(true)}
      />
      {renderActiveSection()}
      <Footer setActiveSection={setActiveSection} />
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onClose={() => setIsAuthDialogOpen(false)} 
      />
    </div>
  );
};

export default Index;
