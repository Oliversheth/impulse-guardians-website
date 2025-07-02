
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Courses from '@/components/Courses';
import AIAssistant from '@/components/AIAssistant';
import About from '@/components/About';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Handle section navigation from hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && ['home', 'courses', 'ai-assistant', 'about'].includes(hash)) {
      setActiveSection(hash);
    } else {
      setActiveSection('home');
    }
  }, [location.hash]);

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
    <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderActiveSection()}
    </Layout>
  );
};

export default Index;
