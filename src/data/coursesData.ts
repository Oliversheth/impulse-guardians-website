
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
  content?: string; // Add actual course content here
  videoUrl?: string; // Add video URLs here
  assignments?: string[]; // Add assignments here
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
    topics: ["Income tracking", "Expense categories", "Budget apps", "Emergency funds"],
    content: "This course will teach you the fundamentals of budgeting...",
    assignments: ["Create your first budget", "Track expenses for one week"]
  },
  {
    id: 2,
    title: "Smart Saving Strategies",
    description: "Discover proven techniques to save money effectively and build your financial safety net.",
    duration: "3 hours",
    students: 1800,
    level: "Beginner",
    progress: 0,
    topics: ["Savings goals", "High-yield accounts", "Automated savings", "Money-saving tips"],
    content: "Learn effective saving strategies...",
    assignments: ["Set up a savings goal", "Research high-yield savings accounts"]
  },
  {
    id: 3,
    title: "Credit & Debt Management",
    description: "Understand credit scores, manage debt responsibly, and build a strong credit history.",
    duration: "4 hours",
    students: 1200,
    level: "Intermediate",
    progress: 0,
    topics: ["Credit scores", "Credit cards", "Student loans", "Debt payoff strategies"],
    content: "Master credit and debt management...",
    assignments: ["Check your credit score", "Create a debt payoff plan"]
  },
  {
    id: 4,
    title: "Investment Fundamentals",
    description: "Start your investment journey with basics of stocks, bonds, and long-term wealth building.",
    duration: "5 hours",
    students: 950,
    level: "Intermediate",
    progress: 0,
    topics: ["Stock market basics", "Index funds", "Risk management", "Retirement planning"],
    content: "Introduction to investing...",
    assignments: ["Research index funds", "Create an investment plan"]
  },
  {
    id: 5,
    title: "Financial Planning for Students",
    description: "Navigate college finances, student loans, and prepare for post-graduation financial life.",
    duration: "3 hours",
    students: 3200,
    level: "Beginner",
    progress: 0,
    topics: ["Student loans", "College budgeting", "Part-time income", "Career planning"],
    content: "Financial planning specifically for students...",
    assignments: ["Create a college budget", "Research student loan options"]
  },
  {
    id: 6,
    title: "Entrepreneurship & Side Hustles",
    description: "Learn how to start a side business and manage multiple income streams as a student.",
    duration: "4 hours",
    students: 800,
    level: "Advanced",
    progress: 0,
    topics: ["Business planning", "Tax basics", "Marketing", "Financial tracking"],
    content: "Entrepreneurship for students...",
    assignments: ["Develop a business plan", "Research side hustle opportunities"]
  }
];
