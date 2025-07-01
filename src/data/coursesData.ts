
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  questions: QuizQuestion[];
  passingScore: number;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  duration: string;
  quiz: Quiz;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  imageUrl: string;
  duration: string;
}

export const coursesData: Course[] = [
  {
    id: 1,
    title: "Budgeting Basics",
    description: "Learn the fundamentals of creating and managing a personal budget",
    difficulty: "Beginner",
    category: "Personal Finance",
    imageUrl: "/placeholder.svg",
    duration: "2 hours",
    lessons: [
      {
        id: 1,
        title: "Introduction to Budgeting",
        description: "Understanding what a budget is and why it's important",
        duration: "15 minutes",
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What is a budget?",
              options: [
                "A plan for how you will spend your money",
                "A way to track your expenses only",
                "A savings account",
                "A type of investment"
              ],
              correctAnswer: 0,
              explanation: "A budget is a plan that helps you allocate your income to different expenses and savings goals."
            },
            {
              id: 2,
              question: "What is the main purpose of budgeting?",
              options: [
                "To restrict all spending",
                "To manage money effectively and reach financial goals",
                "To impress others",
                "To avoid paying taxes"
              ],
              correctAnswer: 1,
              explanation: "Budgeting helps you manage your money effectively and work toward your financial goals."
            },
            {
              id: 3,
              question: "How often should you review your budget?",
              options: [
                "Once a year",
                "Never, once it's set",
                "Monthly or when circumstances change",
                "Only when you run out of money"
              ],
              correctAnswer: 2,
              explanation: "Regular review helps you stay on track and adjust for changing circumstances."
            },
            {
              id: 4,
              question: "What should be included in a basic budget?",
              options: [
                "Only fixed expenses",
                "Only variable expenses",
                "Income, fixed expenses, variable expenses, and savings",
                "Just savings goals"
              ],
              correctAnswer: 2,
              explanation: "A comprehensive budget includes all income sources and all types of expenses plus savings."
            },
            {
              id: 5,
              question: "What is the 50/30/20 rule?",
              options: [
                "50% needs, 30% wants, 20% savings",
                "50% savings, 30% needs, 20% wants",
                "50% wants, 30% needs, 20% savings",
                "It's not a real budgeting method"
              ],
              correctAnswer: 0,
              explanation: "The 50/30/20 rule allocates 50% to needs, 30% to wants, and 20% to savings and debt repayment."
            },
            {
              id: 6,
              question: "What are fixed expenses?",
              options: [
                "Expenses that change every month",
                "Expenses that stay the same each month",
                "Expenses you only pay once",
                "Expenses for entertainment"
              ],
              correctAnswer: 1,
              explanation: "Fixed expenses are costs that remain constant each month, like rent or insurance."
            },
            {
              id: 7,
              question: "What are variable expenses?",
              options: [
                "Expenses that stay the same each month",
                "Expenses that change in amount each month",
                "Expenses you never have to pay",
                "Only entertainment costs"
              ],
              correctAnswer: 1,
              explanation: "Variable expenses fluctuate from month to month, like groceries or utility bills."
            },
            {
              id: 8,
              question: "Why is an emergency fund important in budgeting?",
              options: [
                "It's not important",
                "It provides financial security for unexpected expenses",
                "It's only for wealthy people",
                "It replaces the need for insurance"
              ],
              correctAnswer: 1,
              explanation: "An emergency fund helps you handle unexpected expenses without derailing your budget."
            },
            {
              id: 9,
              question: "What should you do if you overspend in one category?",
              options: [
                "Ignore it and hope it doesn't happen again",
                "Adjust other categories or find ways to reduce spending",
                "Give up on budgeting entirely",
                "Borrow money to cover it"
              ],
              correctAnswer: 1,
              explanation: "When you overspend, adjust other categories or find ways to reduce future spending to stay balanced."
            },
            {
              id: 10,
              question: "What's the first step in creating a budget?",
              options: [
                "Set spending limits",
                "Calculate your total income",
                "List all your wants",
                "Open a savings account"
              ],
              correctAnswer: 1,
              explanation: "You need to know how much money you have coming in before you can plan how to spend it."
            }
          ]
        }
      },
      {
        id: 2,
        title: "Creating Your First Budget",
        description: "Step-by-step guide to building a personal budget",
        duration: "20 minutes",
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 11,
              question: "What's the first step in creating a budget?",
              options: [
                "List all expenses",
                "Calculate total monthly income",
                "Set savings goals",
                "Choose budgeting software"
              ],
              correctAnswer: 1,
              explanation: "You must know your income before you can allocate it to different categories."
            },
            {
              id: 12,
              question: "Which expenses should you prioritize first?",
              options: [
                "Entertainment and hobbies",
                "Basic needs like housing, food, and utilities",
                "Luxury items",
                "Non-essential shopping"
              ],
              correctAnswer: 1,
              explanation: "Essential needs should always be prioritized in your budget."
            },
            {
              id: 13,
              question: "How much should you ideally save each month?",
              options: [
                "Whatever is left over",
                "At least 10-20% of your income",
                "Only $50",
                "You don't need to save while in college"
              ],
              correctAnswer: 1,
              explanation: "Financial experts recommend saving 10-20% of your income when possible."
            },
            {
              id: 14,
              question: "What should you do with leftover money at the end of the month?",
              options: [
                "Spend it all immediately",
                "Add it to savings or pay extra on debt",
                "Only use it for entertainment",
                "Keep it in checking forever"
              ],
              correctAnswer: 1,
              explanation: "Leftover money should be put toward your financial goals like savings or debt reduction."
            },
            {
              id: 15,
              question: "How should you handle irregular income?",
              options: [
                "Don't budget at all",
                "Base your budget on your lowest expected income",
                "Only budget in months with high income",
                "Spend everything as you earn it"
              ],
              correctAnswer: 1,
              explanation: "Budgeting based on your lowest expected income helps ensure you can always meet your needs."
            },
            {
              id: 16,
              question: "What's a good way to track your spending?",
              options: [
                "Don't track it",
                "Use apps, spreadsheets, or write it down",
                "Only remember big purchases",
                "Check your account once a year"
              ],
              correctAnswer: 1,
              explanation: "Regular tracking helps you stay aware of your spending patterns and stick to your budget."
            },
            {
              id: 17,
              question: "How often should you update your budget?",
              options: [
                "Never",
                "When your income or major expenses change",
                "Every 5 years",
                "Only when you're broke"
              ],
              correctAnswer: 1,
              explanation: "Your budget should evolve with changes in your financial situation."
            },
            {
              id: 18,
              question: "What should you do if your expenses exceed your income?",
              options: [
                "Use credit cards for everything",
                "Find ways to increase income or decrease expenses",
                "Ignore the problem",
                "Stop budgeting"
              ],
              correctAnswer: 1,
              explanation: "You need to balance your budget by either earning more or spending less."
            },
            {
              id: 19,
              question: "Why is it important to include small purchases in your budget?",
              options: [
                "It's not important",
                "Small purchases add up and can derail your budget",
                "Only for tax purposes",
                "To impress others"
              ],
              correctAnswer: 1,
              explanation: "Small, frequent purchases can add up to significant amounts over time."
            },
            {
              id: 20,
              question: "What's the benefit of automating your savings?",
              options: [
                "It's more complicated",
                "It ensures consistent saving without having to remember",
                "It costs extra money",
                "There are no benefits"
              ],
              correctAnswer: 1,
              explanation: "Automation helps you save consistently by removing the need to remember to transfer money."
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Smart Spending",
    description: "Develop intelligent spending habits and avoid common financial traps",
    difficulty: "Beginner",
    category: "Personal Finance",
    imageUrl: "/placeholder.svg",
    duration: "1.5 hours",
    lessons: [
      {
        id: 3,
        title: "Needs vs Wants",
        description: "Learn to distinguish between essential needs and desires",
        duration: "12 minutes",
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 21,
              question: "Which of these is a 'need'?",
              options: [
                "Designer clothes",
                "Food and shelter",
                "Entertainment subscriptions",
                "Latest smartphone"
              ],
              correctAnswer: 1,
              explanation: "Needs are essential for survival and basic living, like food, shelter, and basic clothing."
            },
            {
              id: 22,
              question: "Which of these is a 'want'?",
              options: [
                "Rent payment",
                "Groceries",
                "Concert tickets",
                "Medical care"
              ],
              correctAnswer: 2,
              explanation: "Wants are things that enhance your life but aren't essential for survival."
            },
            {
              id: 23,
              question: "What should you prioritize in your budget?",
              options: [
                "Wants before needs",
                "Needs before wants",
                "Both equally",
                "Neither matters"
              ],
              correctAnswer: 1,
              explanation: "Always cover your essential needs first, then allocate money for wants if possible."
            },
            {
              id: 24,
              question: "How can you reduce spending on wants?",
              options: [
                "Never buy anything you want",
                "Wait 24-48 hours before purchasing non-essential items",
                "Buy everything immediately",
                "Only shop when you're emotional"
              ],
              correctAnswer: 1,
              explanation: "Waiting before purchasing wants helps you avoid impulse buying and consider if you really need the item."
            },
            {
              id: 25,
              question: "What's a good strategy for managing wants?",
              options: [
                "Eliminate all wants from your life",
                "Set aside a specific amount for discretionary spending",
                "Use credit for all wants",
                "Never plan for wants"
              ],
              correctAnswer: 1,
              explanation: "Budgeting a specific amount for wants helps you enjoy life while staying financially responsible."
            },
            {
              id: 26,
              question: "How can peer pressure affect your spending?",
              options: [
                "It has no effect",
                "It can lead to overspending on wants to fit in",
                "It always helps you save money",
                "It only affects wealthy people"
              ],
              correctAnswer: 1,
              explanation: "Social pressure can lead to spending money on things you don't really need or can't afford."
            },
            {
              id: 27,
              question: "What's the '24-hour rule'?",
              options: [
                "Shop for 24 hours straight",
                "Wait 24 hours before making non-essential purchases",
                "Return items within 24 hours",
                "Check prices for 24 hours"
              ],
              correctAnswer: 1,
              explanation: "The 24-hour rule helps prevent impulse purchases by giving you time to think."
            },
            {
              id: 28,
              question: "Which is an example of lifestyle inflation?",
              options: [
                "Buying cheaper alternatives",
                "Increasing spending as income increases",
                "Saving more money",
                "Paying off debt"
              ],
              correctAnswer: 1,
              explanation: "Lifestyle inflation occurs when you increase your spending proportionally with income increases."
            },
            {
              id: 29,
              question: "How can you satisfy wants without overspending?",
              options: [
                "Use credit cards for everything",
                "Look for free or low-cost alternatives",
                "Ignore all wants",
                "Borrow money from friends"
              ],
              correctAnswer: 1,
              explanation: "Finding free or inexpensive ways to enjoy yourself helps balance wants with financial responsibility."
            },
            {
              id: 30,
              question: "What should you ask yourself before buying something you want?",
              options: [
                "Nothing, just buy it",
                "Do I really need this? Can I afford it? Will I use it?",
                "What will others think?",
                "Is it on sale?"
              ],
              correctAnswer: 1,
              explanation: "These questions help you make thoughtful spending decisions rather than impulse purchases."
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "Saving Strategies",
    description: "Effective methods to build your savings and emergency fund",
    difficulty: "Intermediate",
    category: "Savings",
    imageUrl: "/placeholder.svg",
    duration: "2.5 hours",
    lessons: [
      {
        id: 4,
        title: "Building an Emergency Fund",
        description: "Create a financial safety net for unexpected expenses",
        duration: "18 minutes",
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 31,
              question: "What is an emergency fund?",
              options: [
                "Money for vacation",
                "Money set aside for unexpected expenses",
                "Money for shopping",
                "Money for investments"
              ],
              correctAnswer: 1,
              explanation: "An emergency fund is money saved specifically for unexpected expenses like medical bills or job loss."
            },
            {
              id: 32,
              question: "How much should be in an emergency fund?",
              options: [
                "$100",
                "3-6 months of living expenses",
                "1 month of income",
                "Whatever feels right"
              ],
              correctAnswer: 1,
              explanation: "Most experts recommend 3-6 months of living expenses to cover major emergencies."
            },
            {
              id: 33,
              question: "Where should you keep your emergency fund?",
              options: [
                "Under your mattress",
                "In a high-yield savings account",
                "Invested in stocks",
                "In your checking account"
              ],
              correctAnswer: 1,
              explanation: "A high-yield savings account provides easy access while earning some interest."
            },
            {
              id: 34,
              question: "What qualifies as a true emergency?",
              options: [
                "A sale on clothes you want",
                "Unexpected medical bills or job loss",
                "A vacation opportunity",
                "A new gadget release"
              ],
              correctAnswer: 1,
              explanation: "True emergencies are unexpected, necessary expenses that can't wait or be planned for."
            },
            {
              id: 35,
              question: "How should you start building an emergency fund?",
              options: [
                "Wait until you have a lot of money",
                "Start small, even $25-50 per month",
                "Only save windfalls",
                "Don't worry about it while in college"
              ],
              correctAnswer: 1,
              explanation: "Starting small and building consistently is better than waiting for the 'perfect' time."
            },
            {
              id: 36,
              question: "What should you do after using your emergency fund?",
              options: [
                "Leave it empty",
                "Replenish it as soon as possible",
                "Use it for wants",
                "Close the account"
              ],
              correctAnswer: 1,
              explanation: "After using emergency funds, prioritize rebuilding them for future emergencies."
            },
            {
              id: 37,
              question: "Should you use your emergency fund for planned expenses?",
              options: [
                "Yes, always",
                "No, only for true emergencies",
                "Sometimes",
                "It doesn't matter"
              ],
              correctAnswer: 1,
              explanation: "Emergency funds should be reserved for truly unexpected, urgent expenses."
            },
            {
              id: 38,
              question: "What's a good way to automate emergency fund savings?",
              options: [
                "Don't automate it",
                "Set up automatic transfers from checking to savings",
                "Only save manually",
                "Use credit cards"
              ],
              correctAnswer: 1,
              explanation: "Automatic transfers help you consistently build your emergency fund without having to remember."
            },
            {
              id: 39,
              question: "How can students start an emergency fund with limited income?",
              options: [
                "They can't",
                "Save small amounts consistently, like spare change",
                "Wait until after graduation",
                "Only save large amounts"
              ],
              correctAnswer: 1,
              explanation: "Even small, consistent contributions can build up over time and create a helpful emergency buffer."
            },
            {
              id: 40,
              question: "What's the biggest benefit of having an emergency fund?",
              options: [
                "Earning high returns",
                "Peace of mind and financial security",
                "Impressing others",
                "Tax benefits"
              ],
              correctAnswer: 1,
              explanation: "The main benefit is the security and peace of mind knowing you can handle unexpected expenses."
            }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: "Credit and Debt Management",
    description: "Understanding credit scores, managing debt, and building good credit habits",
    difficulty: "Intermediate",
    category: "Credit",
    imageUrl: "/placeholder.svg",
    duration: "3 hours",
    lessons: [
      {
        id: 5,
        title: "Understanding Credit Scores",
        description: "Learn what affects your credit score and how to improve it",
        duration: "25 minutes",
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 41,
              question: "What is a credit score?",
              options: [
                "Your bank account balance",
                "A number representing your creditworthiness",
                "Your annual income",
                "The amount of debt you have"
              ],
              correctAnswer: 1,
              explanation: "A credit score is a numerical representation of how likely you are to repay borrowed money."
            },
            {
              id: 42,
              question: "What's the typical range for credit scores?",
              options: [
                "0-100",
                "300-850",
                "1-10",
                "100-1000"
              ],
              correctAnswer: 1,
              explanation: "FICO credit scores typically range from 300 to 850, with higher scores being better."
            },
            {
              id: 43,
              question: "What's considered a good credit score?",
              options: [
                "300-500",
                "670-739",
                "200-400",
                "900-1000"
              ],
              correctAnswer: 1,
              explanation: "A credit score of 670-739 is generally considered good by most lenders."
            },
            {
              id: 44,
              question: "What factor has the biggest impact on your credit score?",
              options: [
                "Your age",
                "Payment history",
                "Your income",
                "Where you live"
              ],
              correctAnswer: 1,
              explanation: "Payment history accounts for about 35% of your credit score and is the most important factor."
            },
            {
              id: 45,
              question: "What is credit utilization?",
              options: [
                "How often you check your credit",
                "The percentage of available credit you're using",
                "The number of credit cards you have",
                "How long you've had credit"
              ],
              correctAnswer: 1,
              explanation: "Credit utilization is the ratio of your credit card balances to your credit limits."
            },
            {
              id: 46,
              question: "What's a good credit utilization ratio?",
              options: [
                "90-100%",
                "Below 30%, ideally below 10%",
                "50-70%",
                "It doesn't matter"
              ],
              correctAnswer: 1,
              explanation: "Keeping utilization below 30% is good, but below 10% is even better for your credit score."
            },
            {
              id: 47,
              question: "How long do negative items typically stay on your credit report?",
              options: [
                "Forever",
                "7 years for most items",
                "1 year",
                "30 days"
              ],
              correctAnswer: 1,
              explanation: "Most negative items like late payments stay on your credit report for 7 years."
            },
            {
              id: 48,
              question: "How often should you check your credit report?",
              options: [
                "Never",
                "At least once a year",
                "Every day",
                "Only when applying for credit"
              ],
              correctAnswer: 1,
              explanation: "You should check your credit report at least annually to look for errors or signs of identity theft."
            },
            {
              id: 49,
              question: "What can hurt your credit score?",
              options: [
                "Paying bills on time",
                "Late payments and high credit utilization",
                "Having a job",
                "Saving money"
              ],
              correctAnswer: 1,
              explanation: "Late payments and high credit utilization are two major factors that can negatively impact your score."
            },
            {
              id: 50,
              question: "How can you start building credit with no credit history?",
              options: [
                "You can't",
                "Consider a secured credit card or becoming an authorized user",
                "Take out a large loan",
                "Wait until you're 30"
              ],
              correctAnswer: 1,
              explanation: "Secured credit cards and being added as an authorized user are good ways to start building credit."
            }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: "Investment Basics",
    description: "Introduction to investing and building long-term wealth",
    difficulty: "Advanced",
    category: "Investing",
    imageUrl: "/placeholder.svg",
    duration: "4 hours",
    lessons: [
      {
        id: 6,
        title: "Introduction to Investing",
        description: "Basic concepts and principles of investing",
        duration: "30 minutes",
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 51,
              question: "What is investing?",
              options: [
                "Keeping money in a checking account",
                "Putting money into assets that may grow in value over time",
                "Spending money on consumer goods",
                "Loaning money to friends"
              ],
              correctAnswer: 1,
              explanation: "Investing involves purchasing assets with the expectation that they will generate income or appreciate in value."
            },
            {
              id: 52,
              question: "What is the relationship between risk and return?",
              options: [
                "Higher risk usually means higher potential returns",
                "Risk and return are unrelated",
                "Lower risk always means higher returns",
                "All investments have the same risk"
              ],
              correctAnswer: 0,
              explanation: "Generally, investments with higher potential returns come with higher risk of loss."
            },
            {
              id: 53,
              question: "What is compound interest?",
              options: [
                "Interest paid only on the principal",
                "Interest earned on both principal and previously earned interest",
                "A type of bank account",
                "Interest that decreases over time"
              ],
              correctAnswer: 1,
              explanation: "Compound interest is when you earn interest on your original investment plus any interest already earned."
            },
            {
              id: 54,
              question: "What is diversification?",
              options: [
                "Putting all money in one investment",
                "Spreading investments across different assets to reduce risk",
                "Only investing in stocks",
                "Avoiding all investments"
              ],
              correctAnswer: 1,
              explanation: "Diversification means spreading your investments across different types of assets to reduce overall risk."
            },
            {
              id: 55,
              question: "What is a stock?",
              options: [
                "A loan to a company",
                "Ownership share in a company",
                "A savings account",
                "A type of bond"
              ],
              correctAnswer: 1,
              explanation: "A stock represents partial ownership in a company and gives you a claim on its assets and earnings."
            },
            {
              id: 56,
              question: "What is a bond?",
              options: [
                "Ownership in a company",
                "A loan you make to a government or corporation",
                "A type of savings account",
                "A gambling activity"
              ],
              correctAnswer: 1,
              explanation: "A bond is essentially an IOU where you lend money and receive regular interest payments."
            },
            {
              id: 57,
              question: "When should most people start investing?",
              options: [
                "Only after age 40",
                "As early as possible, even with small amounts",
                "Only when wealthy",
                "Never"
              ],
              correctAnswer: 1,
              explanation: "Starting early, even with small amounts, allows compound interest to work in your favor over time."
            },
            {
              id: 58,
              question: "What should you do before investing?",
              options: [
                "Quit your job",
                "Build an emergency fund and pay off high-interest debt",
                "Buy a house",
                "Take out loans"
              ],
              correctAnswer: 1,
              explanation: "You should have financial stability with an emergency fund and handle high-interest debt before investing."
            },
            {
              id: 59,
              question: "What is dollar-cost averaging?",
              options: [
                "Investing a lump sum all at once",
                "Investing the same amount regularly regardless of market conditions",
                "Only investing when markets are low",
                "Avoiding investments altogether"
              ],
              correctAnswer: 1,
              explanation: "Dollar-cost averaging involves investing fixed amounts regularly, which can help reduce the impact of market volatility."
            },
            {
              id: 60,
              question: "What's a good beginner investment option?",
              options: [
                "Individual stocks only",
                "Index funds or ETFs",
                "Cryptocurrency only",
                "Real estate only"
              ],
              correctAnswer: 1,
              explanation: "Index funds and ETFs provide instant diversification and are often good options for beginner investors."
            }
          ]
        }
      }
    ]
  }
];
