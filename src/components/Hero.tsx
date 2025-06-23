
import { ArrowRight, BookOpen, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  setActiveSection?: (section: string) => void;
}

const Hero = ({ setActiveSection }: HeroProps) => {
  return (
    <section className="bg-gradient-to-br from-cerulean-50 to-cactus-50 py-12 min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-cactus-800 mb-4">
            Master Your
            <span className="text-cerulean-600"> Financial Future</span>
          </h1>
          <p className="text-lg md:text-xl text-cactus-600 mb-8 max-w-3xl mx-auto">
            NoImpulse empowers students with essential personal finance skills through 
            interactive courses and AI-powered tools. Learn to budget, save, and build 
            a secure financial foundation for life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-cerulean-600 hover:bg-cerulean-700 text-white px-8 py-4 text-lg"
              onClick={() => setActiveSection?.('courses')}
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-cerulean-600 text-cerulean-600 hover:bg-cerulean-50 px-8 py-4 text-lg"
              onClick={() => setActiveSection?.('ai-assistant')}
            >
              Try AI Assistant
              <Bot className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cerulean-600 mb-2">10,000+</div>
              <div className="text-cactus-600">Students Educated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cerulean-600 mb-2">15+</div>
              <div className="text-cactus-600">Interactive Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cerulean-600 mb-2">95%</div>
              <div className="text-cactus-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
