
import { ArrowRight, BookOpen, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/data/siteContent';

interface HeroProps {
  setActiveSection: (section: string) => void;
  visitorCount: number;
}

const Hero = ({ setActiveSection, visitorCount }: HeroProps) => {
  const formattedVisitorCount = Math.round(visitorCount / 100) * 100;

  return (
    <section id="home" className="relative bg-gradient-to-br from-cerulean-50 to-cactus-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cerulean-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cactus-600 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-cactus-800 mb-6 animate-fade-in">
            {siteContent.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-cactus-600 mb-8 max-w-3xl mx-auto animate-fade-in">
            {siteContent.hero.subtitle}
          </p>
          <p className="text-lg text-cactus-500 mb-10 max-w-4xl mx-auto animate-fade-in">
            {siteContent.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
            <Button 
              size="lg" 
              className="bg-cerulean-600 hover:bg-cerulean-700 text-white px-8 py-4 text-lg"
              onClick={() => setActiveSection('courses')}
            >
              Start Learning <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-cerulean-600 text-cerulean-600 hover:bg-cerulean-50 px-8 py-4 text-lg"
              onClick={() => setActiveSection('ai-assistant')}
            >
              Try Budget Bot
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg animate-fade-in">
            <div className="flex justify-center mb-4">
              <Users className="h-8 w-8 text-cerulean-600" />
            </div>
            <h3 className="text-3xl font-bold text-cactus-800 mb-2">{formattedVisitorCount.toLocaleString()}+</h3>
            <p className="text-cactus-600">Students Helped</p>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg animate-fade-in">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-8 w-8 text-cerulean-600" />
            </div>
            <h3 className="text-3xl font-bold text-cactus-800 mb-2">{siteContent.hero.stats.interactiveCourses}</h3>
            <p className="text-cactus-600">Interactive Courses</p>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg animate-fade-in">
            <div className="flex justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-cerulean-600" />
            </div>
            <h3 className="text-3xl font-bold text-cactus-800 mb-2">{siteContent.hero.stats.successRate}</h3>
            <p className="text-cactus-600">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
