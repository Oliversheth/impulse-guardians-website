
import { ArrowRight, BookOpen, Bot, Target, Users, Award, Shield, TrendingUp, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/data/siteContent';

interface HeroProps {
  setActiveSection?: (section: string) => void;
}

const Hero = ({ setActiveSection }: HeroProps) => {
  const iconMap = {
    BookOpen, Bot, Calculator, Target, Users, Award, Shield, TrendingUp
  };

  return (
    <section className="bg-gradient-to-br from-cerulean-50 to-cactus-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Hero Content */}
        <div className="text-center animate-fade-in mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-cactus-800 mb-4">
            {siteContent.hero.title.split(' ').slice(0, 2).join(' ')}
            <span className="text-cerulean-600"> {siteContent.hero.title.split(' ').slice(2).join(' ')}</span>
          </h1>
          <p className="text-lg md:text-xl text-cactus-600 mb-6 max-w-3xl mx-auto">
            {siteContent.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-cerulean-600 mb-2">{siteContent.hero.stats.studentsEducated}</div>
              <div className="text-cactus-600">Students Educated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cerulean-600 mb-2">{siteContent.hero.stats.interactiveCourses}</div>
              <div className="text-cactus-600">Interactive Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cerulean-600 mb-2">{siteContent.hero.stats.successRate}</div>
              <div className="text-cactus-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-cactus-800 mb-4">
            {siteContent.features.title}
          </h2>
          <p className="text-center text-cactus-600 mb-8 max-w-2xl mx-auto">
            {siteContent.features.subtitle}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteContent.features.items.map((feature, index) => {
              const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-cerulean-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-cerulean-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-cactus-800 mb-2">{feature.title}</h3>
                  <p className="text-cactus-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-cactus-800 mb-8">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-cerulean-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-cactus-800 mb-2">Sign Up & Assess</h3>
              <p className="text-cactus-600">
                Create your account and take our quick assessment to understand your current financial knowledge level.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-cerulean-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-cactus-800 mb-2">Learn & Practice</h3>
              <p className="text-cactus-600">
                Complete interactive courses at your own pace and practice with real-world scenarios and simulations.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-cerulean-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-cactus-800 mb-2">Apply & Succeed</h3>
              <p className="text-cactus-600">
                Use your new skills to create budgets, set goals, and build a secure financial future.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-lg p-8 text-center shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-cactus-800 mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-cactus-600 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have already transformed their financial future with NoImpulse. 
            Start your journey today – it's completely free!
          </p>
          <Button 
            size="lg" 
            className="bg-cerulean-600 hover:bg-cerulean-700 text-white px-8 py-4 text-lg"
            onClick={() => setActiveSection?.('courses')}
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
