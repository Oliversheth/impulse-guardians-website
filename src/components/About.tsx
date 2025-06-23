
import { Heart, Target, Users, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const values = [
  {
    icon: Heart,
    title: "Empowerment",
    description: "We believe every student deserves access to quality financial education that can transform their future."
  },
  {
    icon: Target,
    title: "Practical Learning",
    description: "Our courses focus on real-world applications and skills students can immediately use in their daily lives."
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive community where students can learn from each other and share financial success stories."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Leveraging cutting-edge AI technology to personalize the learning experience for every student."
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cactus-800 mb-4">
            About NoImpulse
          </h2>
          <p className="text-xl text-cactus-600 max-w-3xl mx-auto">
            We're on a mission to eliminate financial illiteracy among students by providing 
            accessible, engaging, and practical personal finance education.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Story */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-cactus-800">Our Story</h3>
            <p className="text-cactus-600 leading-relaxed">
              NoImpulse was founded with the recognition that financial decisions made during 
              college years can have lasting impacts on a person's life. Many students graduate 
              with debt but without the financial literacy skills needed to manage their money effectively.
            </p>
            <p className="text-cactus-600 leading-relaxed">
              Our nonprofit organization combines proven educational methodologies with innovative 
              AI technology to create a learning experience that's both comprehensive and personalized. 
              We believe that when students understand money management, they make better financial 
              decisions and build stronger futures.
            </p>
            <div className="bg-cerulean-50 p-6 rounded-lg border-l-4 border-cerulean-600">
              <p className="text-cerulean-800 font-medium italic">
                "Our goal is not just to teach about money, but to empower students with the 
                confidence and skills to take control of their financial destiny."
              </p>
              <p className="text-cerulean-600 mt-2">— NoImpulse Founding Team</p>
            </div>
          </div>

          {/* Mission & Impact */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-cerulean-50 to-cactus-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-cactus-800 mb-4">Our Mission</h3>
              <p className="text-cactus-700 leading-relaxed">
                To provide every student with the financial knowledge and tools they need to make 
                informed decisions, avoid common money mistakes, and build a secure financial future.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-cerulean-50 rounded-lg">
                <div className="text-2xl font-bold text-cerulean-600 mb-1">10,000+</div>
                <div className="text-sm text-cactus-600">Students Reached</div>
              </div>
              <div className="text-center p-4 bg-cactus-50 rounded-lg">
                <div className="text-2xl font-bold text-cactus-600 mb-1">50+</div>
                <div className="text-sm text-cactus-600">Partner Schools</div>
              </div>
              <div className="text-center p-4 bg-cerulean-50 rounded-lg">
                <div className="text-2xl font-bold text-cerulean-600 mb-1">$2M+</div>
                <div className="text-sm text-cactus-600">Student Savings</div>
              </div>
              <div className="text-center p-4 bg-cactus-50 rounded-lg">
                <div className="text-2xl font-bold text-cactus-600 mb-1">95%</div>
                <div className="text-sm text-cactus-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-3xl font-bold text-cactus-800 text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-cactus-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto p-3 bg-cerulean-100 rounded-full w-fit mb-4">
                    <value.icon className="h-6 w-6 text-cerulean-600" />
                  </div>
                  <CardTitle className="text-xl text-cactus-800">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cactus-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
