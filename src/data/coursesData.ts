
// Course data structure - easily manageable through your code editor
export interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  students: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  topics: string[];
  content?: string;
  videoUrl?: string;
  assignments?: string[];
  detailedLessons?: {
    title: string;
    description: string;
    videoUrl?: string;
    duration: string;
    keyPoints: string[];
  }[];
}

export const coursesData: Course[] = [
  {
    id: 1,
    title: "Budgeting Basics",
    description: "Learn the fundamentals of creating and maintaining a personal budget that works for your lifestyle.",
    duration: "2 hours",
    students: 2500,
    level: "Beginner",
    progress: 0,
    topics: [
      "Understanding Income and Expenses", 
      "Creating Your First Budget", 
      "Using Budget Apps and Tools", 
      "Building Emergency Funds",
      "Tracking Your Progress"
    ],
    content: "This comprehensive course will teach you the fundamentals of budgeting, from understanding your income and expenses to creating a sustainable budget that works for your lifestyle.",
    assignments: ["Create your first budget", "Track expenses for one week", "Set up emergency fund goal"],
    detailedLessons: [
      {
        title: "Understanding Income and Expenses",
        description: "Learn to identify and categorize all your income sources and expenses",
        duration: "25 minutes",
        keyPoints: ["Fixed vs Variable Income", "Essential vs Non-essential Expenses", "Hidden Costs to Watch For"]
      },
      {
        title: "Creating Your First Budget",
        description: "Step-by-step guide to creating a budget that actually works",
        duration: "30 minutes",
        keyPoints: ["50/30/20 Rule", "Zero-Based Budgeting", "Envelope Method"]
      }
    ]
  },
  {
    id: 2,
    title: "Smart Saving Strategies",
    description: "Discover proven techniques to save money effectively and build your financial safety net.",
    duration: "3 hours",
    students: 1800,
    level: "Beginner",
    progress: 0,
    topics: [
      "Setting Realistic Savings Goals",
      "High-Yield Savings Accounts", 
      "Automated Savings Systems", 
      "Money-Saving Tips for Students",
      "Building Multiple Savings Funds"
    ],
    content: "Master the art of saving with strategies designed specifically for students and young adults.",
    assignments: ["Set up a savings goal", "Research high-yield savings accounts", "Implement one money-saving tip daily"]
  },
  {
    id: 3,
    title: "Credit & Debt Management",
    description: "Understand credit scores, manage debt responsibly, and build a strong credit history.",
    duration: "4 hours",
    students: 1200,
    level: "Intermediate",
    progress: 0,
    topics: [
      "Understanding Credit Scores",
      "Building Credit History", 
      "Managing Credit Cards Wisely", 
      "Student Loan Strategies",
      "Debt Payoff Methods"
    ],
    content: "Learn how to build and maintain excellent credit while managing debt responsibly.",
    assignments: ["Check your credit score", "Create a debt payoff plan", "Research student loan options"]
  },
  {
    id: 4,
    title: "Investment Fundamentals",
    description: "Start your investment journey with basics of stocks, bonds, and long-term wealth building.",
    duration: "5 hours",
    students: 950,
    level: "Intermediate",
    progress: 0,
    topics: [
      "Stock Market Basics",
      "Understanding Index Funds", 
      "Risk Management Principles", 
      "Retirement Planning for Young Adults",
      "Building a Diversified Portfolio"
    ],
    content: "Begin your investment journey with fundamental concepts and practical strategies.",
    assignments: ["Research index funds", "Create an investment plan", "Set up retirement account"]
  },
  {
    id: 5,
    title: "Financial Planning for Students",
    description: "Navigate college finances, student loans, and prepare for post-graduation financial life.",
    duration: "3 hours",
    students: 3200,
    level: "Beginner",
    progress: 0,
    topics: [
      "College Budget Management",
      "Student Loan Navigation", 
      "Part-time Income Optimization", 
      "Post-Graduation Financial Planning",
      "Building Credit as a Student"
    ],
    content: "Comprehensive financial planning specifically designed for students at all stages of their academic journey.",
    assignments: ["Create a college budget", "Research student loan options", "Plan post-graduation finances"]
  },
  {
    id: 6,
    title: "Entrepreneurship & Side Hustles",
    description: "Learn how to start a side business and manage multiple income streams as a student.",
    duration: "4 hours",
    students: 800,
    level: "Advanced",
    progress: 0,
    topics: [
      "Business Planning Fundamentals",
      "Tax Basics for Entrepreneurs", 
      "Marketing on a Budget", 
      "Financial Tracking for Businesses",
      "Scaling Your Side Hustle"
    ],
    content: "Turn your skills and interests into profitable side businesses while managing your studies.",
    assignments: ["Develop a business plan", "Research side hustle opportunities", "Set up business tracking system"]
  }
];
