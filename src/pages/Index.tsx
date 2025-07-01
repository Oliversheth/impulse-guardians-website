
import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Courses from '@/components/Courses';
import AIAssistant from '@/components/AIAssistant';
import About from '@/components/About';
import Footer from '@/components/Footer';
import AuthDialog from '@/components/AuthDialog';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero setActiveSection={setActiveSection} />;
      case 'courses':
        return <Courses />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'about':
        return <About />;
      default:
        return <Hero setActiveSection={setActiveSection} />;
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
      <Footer />
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onClose={() => setIsAuthDialogOpen(false)} 
      />
    </div>
  );
};

export default Index;
