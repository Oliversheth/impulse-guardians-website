
import { BookOpen, Clock, Users, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const courses = [
  {
    id: 1,
    title: "Budgeting Basics",
    description: "Learn the fundamentals of creating and maintaining a personal budget that works for your lifestyle.",
    duration: "2 hours",
    students: 2500,
    level: "Beginner",
    progress: 0,
    topics: ["Income tracking", "Expense categories", "Budget apps", "Emergency funds"]
  },
  {
    id: 2,
    title: "Smart Saving Strategies",
    description: "Discover proven techniques to save money effectively and build your financial safety net.",
    duration: "3 hours",
    students: 1800,
    level: "Beginner",
    progress: 0,
    topics: ["Savings goals", "High-yield accounts", "Automated savings", "Money-saving tips"]
  },
  {
    id: 3,
    title: "Credit & Debt Management",
    description: "Understand credit scores, manage debt responsibly, and build a strong credit history.",
    duration: "4 hours",
    students: 1200,
    level: "Intermediate",
    progress: 0,
    topics: ["Credit scores", "Credit cards", "Student loans", "Debt payoff strategies"]
  },
  {
    id: 4,
    title: "Investment Fundamentals",
    description: "Start your investment journey with basics of stocks, bonds, and long-term wealth building.",
    duration: "5 hours",
    students: 950,
    level: "Intermediate",
    progress: 0,
    topics: ["Stock market basics", "Index funds", "Risk management", "Retirement planning"]
  },
  {
    id: 5,
    title: "Financial Planning for Students",
    description: "Navigate college finances, student loans, and prepare for post-graduation financial life.",
    duration: "3 hours",
    students: 3200,
    level: "Beginner",
    progress: 0,
    topics: ["Student loans", "College budgeting", "Part-time income", "Career planning"]
  },
  {
    id: 6,
    title: "Entrepreneurship & Side Hustles",
    description: "Learn how to start a side business and manage multiple income streams as a student.",
    duration: "4 hours",
    students: 800,
    level: "Advanced",
    progress: 0,
    topics: ["Business planning", "Tax basics", "Marketing", "Financial tracking"]
  }
];

const Courses = () => {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cactus-800 mb-4">
            Personal Finance Courses
          </h2>
          <p className="text-xl text-cactus-600 max-w-3xl mx-auto">
            Our comprehensive curriculum covers everything from basic budgeting to advanced investment strategies, 
            designed specifically for students at every level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300 border-cactus-200">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}
                    className={
                      course.level === 'Beginner' 
                        ? 'bg-cerulean-100 text-cerulean-700' 
                        : course.level === 'Intermediate'
                        ? 'bg-cactus-100 text-cactus-700'
                        : 'bg-cerulean-600 text-white'
                    }
                  >
                    {course.level}
                  </Badge>
                  <BookOpen className="h-6 w-6 text-cerulean-600" />
                </div>
                <CardTitle className="text-xl text-cactus-800">{course.title}</CardTitle>
                <CardDescription className="text-cactus-600">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-cactus-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()} students
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-cactus-700 mb-2">What you'll learn:</h4>
                  <ul className="text-sm text-cactus-600 space-y-1">
                    {course.topics.slice(0, 3).map((topic, index) => (
                      <li key={index} className="flex items-center">
                        <Award className="h-3 w-3 mr-2 text-cerulean-600" />
                        {topic}
                      </li>
                    ))}
                    {course.topics.length > 3 && (
                      <li className="text-cerulean-600 font-medium">
                        +{course.topics.length - 3} more topics
                      </li>
                    )}
                  </ul>
                </div>

                <Button className="w-full bg-cerulean-600 hover:bg-cerulean-700 text-white">
                  Start Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-cerulean-600 text-cerulean-600 hover:bg-cerulean-50">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
