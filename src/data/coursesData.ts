
// Course data structure - easily manageable through your code editor
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  content: string;
  duration: string;
  completed: boolean;
  quiz: {
    questions: QuizQuestion[];
    passingScore: number;
  };
}

export interface Course {
  id: number;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: number;
  topics: string[];
  lessons: Lesson[];
}

export const coursesData: Course[] = [
  {
    id: 1,
    title: "Budgeting Basics",
    description: "Learn the fundamentals of creating and maintaining a personal budget",
    level: "Beginner",
    duration: "2 hours",
    students: 1250,
    topics: [
      "Understanding income and expenses",
      "Creating your first budget",
      "Tracking spending habits",
      "Emergency fund planning"
    ],
    lessons: [
      {
        id: 1,
        title: "What is a Budget?",
        description: "Understanding the basics of budgeting and why it's important",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "A budget is a plan for how you'll spend your money. It helps you track income and expenses to make informed financial decisions.",
        duration: "15 min",
        completed: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What is the primary purpose of a budget?",
              options: ["To restrict spending", "To plan and track money", "To increase income", "To pay taxes"],
              correctAnswer: 1,
              explanation: "A budget helps you plan and track your money to make informed financial decisions."
            },
            {
              id: 2,
              question: "How often should you review your budget?",
              options: ["Once a year", "Monthly", "Never", "Only when problems arise"],
              correctAnswer: 1,
              explanation: "Monthly reviews help you stay on track and adjust for changes."
            },
            {
              id: 3,
              question: "What are the two main components of a budget?",
              options: ["Assets and liabilities", "Income and expenses", "Savings and investments", "Cash and credit"],
              correctAnswer: 1,
              explanation: "A budget tracks your income (money coming in) and expenses (money going out)."
            },
            {
              id: 4,
              question: "What percentage of income should ideally go to needs?",
              options: ["30%", "50%", "70%", "90%"],
              correctAnswer: 1,
              explanation: "The 50/30/20 rule suggests 50% for needs, 30% for wants, 20% for savings."
            },
            {
              id: 5,
              question: "What is an emergency fund?",
              options: ["Money for vacations", "Money for unexpected expenses", "Money for shopping", "Money for investments"],
              correctAnswer: 1,
              explanation: "An emergency fund covers unexpected expenses like medical bills or job loss."
            },
            {
              id: 6,
              question: "How many months of expenses should an emergency fund cover?",
              options: ["1-2 months", "3-6 months", "12 months", "24 months"],
              correctAnswer: 1,
              explanation: "Financial experts recommend 3-6 months of living expenses in an emergency fund."
            },
            {
              id: 7,
              question: "What is the difference between needs and wants?",
              options: ["There is no difference", "Needs are essential, wants are optional", "Wants are more expensive", "Needs change monthly"],
              correctAnswer: 1,
              explanation: "Needs are essential for survival (food, housing), wants are things you'd like but don't require."
            },
            {
              id: 8,
              question: "What should you do if your expenses exceed your income?",
              options: ["Ignore it", "Reduce expenses or increase income", "Use credit cards", "Stop budgeting"],
              correctAnswer: 1,
              explanation: "You need to either reduce expenses or find ways to increase income to balance your budget."
            },
            {
              id: 9,
              question: "What is zero-based budgeting?",
              options: ["Having zero money", "Every dollar has a purpose", "No budget at all", "Only spending on necessities"],
              correctAnswer: 1,
              explanation: "Zero-based budgeting means every dollar of income is assigned a specific purpose."
            },
            {
              id: 10,
              question: "Why is tracking expenses important?",
              options: ["It's not important", "To see where money goes", "To increase spending", "To confuse yourself"],
              correctAnswer: 1,
              explanation: "Tracking expenses helps you understand spending patterns and make better financial decisions."
            }
          ]
        }
      },
      {
        id: 2,
        title: "Creating Your First Budget",
        description: "Step-by-step guide to building a personal budget",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn how to calculate your income, categorize expenses, and create a realistic budget that works for your lifestyle.",
        duration: "20 min",
        completed: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What's the first step in creating a budget?",
              options: ["List expenses", "Calculate total income", "Set goals", "Open a bank account"],
              correctAnswer: 1,
              explanation: "You need to know how much money you have coming in before planning how to spend it."
            },
            {
              id: 2,
              question: "What should be included in your income calculation?",
              options: ["Only salary", "All sources of money", "Only regular income", "Only cash payments"],
              correctAnswer: 1,
              explanation: "Include all money sources: salary, part-time work, gifts, scholarships, etc."
            },
            {
              id: 3,
              question: "How should you categorize your expenses?",
              options: ["Don't categorize", "Fixed and variable", "Expensive and cheap", "Monthly and yearly"],
              correctAnswer: 1,
              explanation: "Fixed expenses stay the same (rent), variable expenses change (groceries)."
            },
            {
              id: 4,
              question: "What is a fixed expense?",
              options: ["An expense that varies", "An expense that stays the same", "A one-time expense", "An optional expense"],
              correctAnswer: 1,
              explanation: "Fixed expenses like rent or insurance stay the same each month."
            },
            {
              id: 5,
              question: "What is a variable expense?",
              options: ["An expense that stays the same", "An expense that changes", "A fixed cost", "A required expense"],
              correctAnswer: 1,
              explanation: "Variable expenses like food or entertainment change from month to month."
            },
            {
              id: 6,
              question: "Why should you track small expenses?",
              options: ["They don't matter", "They add up over time", "It's too hard", "Only big expenses matter"],
              correctAnswer: 1,
              explanation: "Small expenses like coffee or snacks can add up to significant amounts over time."
            },
            {
              id: 7,
              question: "What's a good budgeting method for beginners?",
              options: ["Complex spreadsheets", "The 50/30/20 rule", "No method needed", "Guessing"],
              correctAnswer: 1,
              explanation: "The 50/30/20 rule is simple: 50% needs, 30% wants, 20% savings."
            },
            {
              id: 8,
              question: "How often should you update your budget?",
              options: ["Never", "When life changes occur", "Every 5 years", "Only when you're broke"],
              correctAnswer: 1,
              explanation: "Update your budget when income changes, expenses change, or goals change."
            },
            {
              id: 9,
              question: "What should you do with leftover money each month?",
              options: ["Spend it all", "Save or invest it", "Ignore it", "Give it away"],
              correctAnswer: 1,
              explanation: "Leftover money should go toward savings, debt payment, or investments."
            },
            {
              id: 10,
              question: "What's the most important rule for budgeting success?",
              options: ["Be perfect always", "Be consistent and realistic", "Spend less than you earn", "Have lots of money"],
              correctAnswer: 1,
              explanation: "Consistency and realistic expectations lead to long-term budgeting success."
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Saving Strategies",
    description: "Master different saving techniques and build wealth over time",
    level: "Intermediate",
    duration: "1.5 hours",
    students: 892,
    topics: [
      "Setting savings goals",
      "Automated savings",
      "High-yield savings accounts",
      "Investment basics"
    ],
    lessons: [
      {
        id: 1,
        title: "Setting SMART Savings Goals",
        description: "Learn how to set Specific, Measurable, Achievable, Relevant, and Time-bound savings goals",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "SMART goals help you save effectively by providing clear targets and timelines for your financial objectives.",
        duration: "18 min",
        completed: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What does SMART stand for in goal setting?",
              options: ["Simple, Measurable, Achievable, Relevant, Timely", "Specific, Measurable, Achievable, Relevant, Time-bound", "Smart, Modern, Advanced, Reliable, Technical", "Strategic, Meaningful, Actionable, Realistic, Trackable"],
              correctAnswer: 1,
              explanation: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound."
            },
            {
              id: 2,
              question: "Why should savings goals be specific?",
              options: ["To make them harder", "To provide clear direction", "To impress others", "To make them complex"],
              correctAnswer: 1,
              explanation: "Specific goals provide clear direction and make it easier to track progress."
            },
            {
              id: 3,
              question: "What makes a goal measurable?",
              options: ["Having a dollar amount", "Being written down", "Having a deadline", "Being realistic"],
              correctAnswer: 0,
              explanation: "Measurable goals have specific amounts you can track, like saving $1,000."
            },
            {
              id: 4,
              question: "What percentage of income do experts recommend saving?",
              options: ["5%", "10-20%", "50%", "100%"],
              correctAnswer: 1,
              explanation: "Most financial experts recommend saving 10-20% of your income."
            },
            {
              id: 5,
              question: "What is the 'pay yourself first' principle?",
              options: ["Pay bills first", "Save before spending on wants", "Only pay yourself", "Spend all income"],
              correctAnswer: 1,
              explanation: "'Pay yourself first' means saving money before spending on non-essential items."
            },
            {
              id: 6,
              question: "How can you make saving automatic?",
              options: ["Think about it daily", "Set up automatic transfers", "Save only when you remember", "Don't save at all"],
              correctAnswer: 1,
              explanation: "Automatic transfers from checking to savings make saving effortless and consistent."
            },
            {
              id: 7,
              question: "What's a good short-term savings goal timeframe?",
              options: ["1-2 years", "10 years", "20 years", "Never set timeframes"],
              correctAnswer: 0,
              explanation: "Short-term goals are typically achieved within 1-2 years."
            },
            {
              id: 8,
              question: "What should you do if you can't meet your savings goal?",
              options: ["Give up completely", "Adjust the goal to be more realistic", "Ignore the goal", "Feel guilty forever"],
              correctAnswer: 1,
              explanation: "If goals aren't realistic, adjust them rather than giving up entirely."
            },
            {
              id: 9,
              question: "Why is it important to have multiple savings goals?",
              options: ["It's not important", "Different goals serve different purposes", "To confuse yourself", "To impress others"],
              correctAnswer: 1,
              explanation: "Multiple goals help you save for different priorities like emergencies, vacations, and retirement."
            },
            {
              id: 10,
              question: "What should you do when you reach a savings goal?",
              options: ["Spend it all", "Celebrate and set a new goal", "Stop saving", "Feel guilty"],
              correctAnswer: 1,
              explanation: "Celebrate your achievement and then set new goals to continue building wealth."
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "Investment Fundamentals",
    description: "Introduction to investing and building long-term wealth",
    level: "Advanced",
    duration: "3 hours",
    students: 654,
    topics: [
      "Risk vs. return",
      "Diversification",
      "Stock market basics",
      "Retirement planning"
    ],
    lessons: [
      {
        id: 1,
        title: "Understanding Risk and Return",
        description: "Learn the fundamental relationship between investment risk and potential returns",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "All investments carry risk, but understanding the risk-return relationship helps you make informed investment decisions.",
        duration: "25 min",
        completed: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What is the relationship between risk and return?",
              options: ["No relationship", "Higher risk, higher potential return", "Lower risk, higher return", "Risk doesn't matter"],
              correctAnswer: 1,
              explanation: "Generally, investments with higher risk offer higher potential returns."
            },
            {
              id: 2,
              question: "What is diversification?",
              options: ["Putting all money in one investment", "Spreading investments across different assets", "Only investing in stocks", "Avoiding all risk"],
              correctAnswer: 1,
              explanation: "Diversification means spreading investments across different assets to reduce risk."
            },
            {
              id: 3,
              question: "What type of investment is considered safest?",
              options: ["Stocks", "Government bonds", "Cryptocurrency", "Real estate"],
              correctAnswer: 1,
              explanation: "Government bonds are generally considered the safest investments."
            },
            {
              id: 4,
              question: "What is compound interest?",
              options: ["Simple interest", "Interest earned on interest", "High interest rates", "No interest"],
              correctAnswer: 1,
              explanation: "Compound interest is when you earn interest on both your original investment and previously earned interest."
            },
            {
              id: 5,
              question: "When should you start investing?",
              options: ["When you're rich", "As early as possible", "Never", "Only when old"],
              correctAnswer: 1,
              explanation: "Starting early gives compound interest more time to work in your favor."
            },
            {
              id: 6,
              question: "What is dollar-cost averaging?",
              options: ["Investing a lump sum", "Investing the same amount regularly", "Timing the market", "Avoiding investments"],
              correctAnswer: 1,
              explanation: "Dollar-cost averaging means investing the same amount regularly, regardless of market conditions."
            },
            {
              id: 7,
              question: "What should you do before investing?",
              options: ["Nothing", "Have an emergency fund", "Quit your job", "Spend all your money"],
              correctAnswer: 1,
              explanation: "Always have an emergency fund before investing in riskier assets."
            },
            {
              id: 8,
              question: "What is a stock?",
              options: ["A loan to a company", "Ownership in a company", "A type of bond", "Free money"],
              correctAnswer: 1,
              explanation: "A stock represents partial ownership in a company."
            },
            {
              id: 9,
              question: "What is market volatility?",
              options: ["Stable prices", "Price fluctuations", "High returns", "No risk"],
              correctAnswer: 1,
              explanation: "Market volatility refers to how much investment prices fluctuate over time."
            },
            {
              id: 10,
              question: "What's the best investment strategy for beginners?",
              options: ["Day trading", "Long-term, diversified investing", "Gambling", "Avoiding all investments"],
              correctAnswer: 1,
              explanation: "Long-term, diversified investing is typically the best strategy for beginners."
            }
          ]
        }
      }
    ]
  }
];
