
import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Bot, Target, Users, Award, Shield, TrendingUp, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/data/siteContent';
import { SplitText } from '@/components/ui/split-text';
import { CountingNumber } from '@/components/ui/counting-number';
import { RippleButton } from '@/components/ui/ripple-button';
import { HoverCardEnhanced } from '@/components/ui/hover-card-enhanced';
import { AnimatedWaveBackground } from '@/components/ui/animated-wave-background';
import { FloatingGeometry } from '@/components/ui/floating-geometry';
import { DynamicMeshGradient } from '@/components/ui/dynamic-mesh-gradient';

interface HeroProps {
  setActiveSection?: (section: string) => void;
}

const Hero = ({ setActiveSection }: HeroProps) => {
  const [studentsHelped, setStudentsHelped] = useState(5000);
  
  useEffect(() => {
    // Simulate live counter by adding visits
    const interval = setInterval(() => {
      setStudentsHelped(prev => {
        const increment = Math.floor(Math.random() * 3) + 1; // Random 1-3
        const newCount = prev + increment;
        // Round to nearest hundred
        return Math.round(newCount / 100) * 100;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const iconMap = {
    BookOpen, Bot, Calculator, Target, Users, Award, Shield, TrendingUp
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cerulean-50 to-cactus-50">
      {/* Multi-Layer Animated Background */}
      <DynamicMeshGradient 
        className="opacity-40"
        speed={0.3}
        nodeCount={5}
      />
      <AnimatedWaveBackground 
        className="opacity-20"
        speed={0.015}
        amplitude={60}
      />
      <FloatingGeometry 
        count={12}
        speed={0.4}
        maxSize={35}
        className="opacity-70"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Hero Content */}
        <div className="text-center animate-fade-in mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-cactus-800 mb-4">
            <SplitText 
              text={siteContent.hero.title.split(' ').slice(0, 2).join(' ')}
              splitType="words"
              delay={200}
              duration={0.8}
            />
            <span className="text-cerulean-600">
              <SplitText 
                text={` ${siteContent.hero.title.split(' ').slice(2).join(' ')}`}
                splitType="words"
                delay={300}
                duration={0.8}
              />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-cactus-600 mb-6 max-w-3xl mx-auto">
            {siteContent.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <RippleButton 
              size="lg" 
              className="bg-cerulean-600 hover:bg-cerulean-700 text-white px-8 py-4 text-lg group"
              onClick={() => setActiveSection?.('courses')}
              rippleColor="rgba(255, 255, 255, 0.4)"
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </RippleButton>
            <RippleButton 
              variant="outline" 
              size="lg" 
              className="border-cerulean-600 text-cerulean-600 hover:bg-cerulean-50 px-8 py-4 text-lg group"
              onClick={() => setActiveSection?.('ai-assistant')}
              rippleColor="rgba(0, 149, 219, 0.3)"
            >
              Try Budget Bot
              <Bot className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </RippleButton>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-cerulean-600 mb-2">
                <CountingNumber value={studentsHelped} duration={2500} format={(val) => `${val.toLocaleString()}+`} />
              </div>
              <div className="text-cactus-600">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cerulean-600 mb-2">
                <CountingNumber value={parseInt(siteContent.hero.stats.interactiveCourses)} duration={2000} />
              </div>
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
                <HoverCardEnhanced key={index} glowColor="rgba(0, 149, 219, 0.2)">
                  <div className="bg-cerulean-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse">
                    <IconComponent className="h-6 w-6 text-cerulean-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-cactus-800 mb-2">{feature.title}</h3>
                  <p className="text-cactus-600">{feature.description}</p>
                </HoverCardEnhanced>
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
        <HoverCardEnhanced className="text-center" glowColor="rgba(0, 149, 219, 0.3)">
          <h2 className="text-2xl md:text-3xl font-bold text-cactus-800 mb-4">
            <SplitText 
              text="Ready to Take Control of Your Finances?"
              splitType="words"
              delay={150}
              duration={0.6}
            />
          </h2>
          <p className="text-cactus-600 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have already transformed their financial future with NoImpulse. 
            Start your journey today – it's completely free!
          </p>
          <RippleButton 
            size="lg" 
            className="bg-cerulean-600 hover:bg-cerulean-700 text-white px-8 py-4 text-lg group"
            onClick={() => setActiveSection?.('courses')}
            rippleColor="rgba(255, 255, 255, 0.4)"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </RippleButton>
        </HoverCardEnhanced>
      </div>
    </section>
  );
};

export default Hero;
