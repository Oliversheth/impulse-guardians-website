
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Courses from '@/components/Courses';
import AIAssistant from '@/components/AIAssistant';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Courses />
      <AIAssistant />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
