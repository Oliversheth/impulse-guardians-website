// Course data structure - easily manageable through your code editor
export interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  completed: boolean;
  locked: boolean;
  quiz: {
    questions: QuizQuestion[];
    passingScore: number;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

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
  objectives: string[];
  lessons: Lesson[];
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
    content: "This comprehensive course will teach you the fundamentals of budgeting, helping you take control of your finances and build a solid foundation for your financial future.",
    objectives: [
      "Understand the basics of income and expense tracking",
      "Learn to categorize expenses effectively",
      "Master the use of budgeting apps and tools",
      "Build and maintain an emergency fund",
      "Create a personalized budget that works for your lifestyle"
    ],
    lessons: [
      {
        id: 1,
        title: "Introduction to Budgeting",
        description: "Understanding what a budget is and why it's essential for financial health.",
        duration: "15 minutes",
        completed: false,
        locked: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What is the primary purpose of a budget?",
              options: ["To restrict spending", "To track and plan your money", "To save money", "To invest money"],
              correctAnswer: 1,
              explanation: "A budget helps you track where your money goes and plan for future expenses."
            },
            {
              id: 2,
              question: "How often should you review your budget?",
              options: ["Once a year", "Once a month", "Once a week", "Daily"],
              correctAnswer: 1,
              explanation: "Monthly reviews help you stay on track and make necessary adjustments."
            }
          ]
        }
      },
      {
        id: 2,
        title: "Income Tracking",
        description: "Learn how to accurately track all sources of income.",
        duration: "20 minutes",
        completed: false,
        locked: true,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "Which of these should be included in your income calculation?",
              options: ["Only salary", "Salary and bonuses", "All money received", "Only guaranteed income"],
              correctAnswer: 2,
              explanation: "Include all sources of income for accurate budgeting."
            }
          ]
        }
      },
      {
        id: 3,
        title: "Expense Categories",
        description: "How to categorize your expenses for better tracking.",
        duration: "25 minutes",
        completed: false,
        locked: true,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What are the two main types of expenses?",
              options: ["Big and small", "Fixed and variable", "Monthly and yearly", "Necessary and unnecessary"],
              correctAnswer: 1,
              explanation: "Fixed expenses stay the same each month, while variable expenses can change."
            }
          ]
        }
      },
      {
        id: 4,
        title: "Emergency Funds",
        description: "Building and maintaining your financial safety net.",
        duration: "18 minutes",
        completed: false,
        locked: true,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "How many months of expenses should an emergency fund cover?",
              options: ["1-2 months", "3-6 months", "12 months", "24 months"],
              correctAnswer: 1,
              explanation: "3-6 months of expenses provides a good safety net for most people."
            }
          ]
        }
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
    topics: ["Savings goals", "High-yield accounts", "Automated savings", "Money-saving tips"],
    objectives: [
      "Set realistic and achievable savings goals",
      "Compare and choose high-yield savings accounts",
      "Set up automated saving systems",
      "Implement daily money-saving strategies"
    ],
    lessons: [
      {
        id: 1,
        title: "Setting Savings Goals",
        description: "Learn how to set SMART savings goals that you can actually achieve.",
        duration: "20 minutes",
        completed: false,
        locked: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What does SMART stand for in goal setting?",
              options: ["Simple, Measurable, Achievable, Realistic, Timely", "Specific, Measurable, Achievable, Relevant, Time-bound", "Smart, Modern, Advanced, Reliable, Tested", "Savings, Money, Assets, Returns, Timeline"],
              correctAnswer: 1,
              explanation: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound."
            }
          ]
        }
      },
      {
        id: 2,
        title: "High-Yield Savings Accounts",
        description: "Understanding different types of savings accounts and their benefits.",
        duration: "25 minutes",
        completed: false,
        locked: true,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What is the main advantage of a high-yield savings account?",
              options: ["No fees", "Higher interest rates", "Better customer service", "More ATM locations"],
              correctAnswer: 1,
              explanation: "High-yield savings accounts offer better interest rates than traditional savings accounts."
            }
          ]
        }
      }
    ]
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
    objectives: [
      "Understand how credit scores work",
      "Learn responsible credit card usage",
      "Develop debt payoff strategies",
      "Build and maintain good credit"
    ],
    lessons: [
      {
        id: 1,
        title: "Understanding Credit Scores",
        description: "Learn what affects your credit score and how to improve it.",
        duration: "30 minutes",
        completed: false,
        locked: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What is the range of FICO credit scores?",
              options: ["0-100", "300-850", "500-900", "1-1000"],
              correctAnswer: 1,
              explanation: "FICO credit scores range from 300 to 850, with higher scores being better."
            }
          ]
        }
      }
    ]
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
    objectives: [
      "Understand basic investment principles",
      "Learn about different investment vehicles",
      "Develop risk management strategies",
      "Plan for retirement investing"
    ],
    lessons: [
      {
        id: 1,
        title: "Investment Basics",
        description: "Introduction to the world of investing.",
        duration: "35 minutes",
        completed: false,
        locked: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What is compound interest?",
              options: ["Interest on interest", "High interest rates", "Complex calculations", "Investment returns"],
              correctAnswer: 0,
              explanation: "Compound interest is earning interest on both your original investment and previously earned interest."
            }
          ]
        }
      }
    ]
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
    objectives: [
      "Understand student loan options",
      "Create a college budget",
      "Manage part-time income effectively",
      "Plan for post-graduation finances"
    ],
    lessons: [
      {
        id: 1,
        title: "Student Loan Basics",
        description: "Understanding different types of student loans and their terms.",
        duration: "25 minutes",
        completed: false,
        locked: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What's the difference between subsidized and unsubsidized loans?",
              options: ["Interest rates", "When interest accrues", "Loan amounts", "Repayment terms"],
              correctAnswer: 1,
              explanation: "Subsidized loans don't accrue interest while you're in school, unsubsidized loans do."
            }
          ]
        }
      }
    ]
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
    objectives: [
      "Develop a business plan",
      "Understand basic tax requirements",
      "Learn marketing fundamentals",
      "Track business finances"
    ],
    lessons: [
      {
        id: 1,
        title: "Business Planning Basics",
        description: "How to create a simple but effective business plan.",
        duration: "40 minutes",
        completed: false,
        locked: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What should be the first step in starting a business?",
              options: ["Get funding", "Market research", "Register the business", "Create a website"],
              correctAnswer: 1,
              explanation: "Market research helps you understand if there's demand for your product or service."
            }
          ]
        }
      }
    ]
  }
];
