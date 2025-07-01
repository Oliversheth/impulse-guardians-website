
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
  duration: string;
  completed: boolean;
  quiz: Quiz;
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
    title: "Personal Finance Fundamentals",
    description: "Master the basics of personal finance, budgeting, and money management to build a strong financial foundation.",
    level: "Beginner",
    duration: "4 weeks",
    students: 15420,
    topics: [
      "Understanding Money and Financial Goals",
      "Creating and Managing Budgets",
      "Emergency Fund Planning",
      "Basic Banking and Accounts",
      "Introduction to Credit and Debt"
    ],
    lessons: [
      {
        id: 1,
        title: "Understanding Money and Financial Goals",
        description: "Learn the fundamentals of money management and how to set realistic financial goals.",
        duration: "15 minutes",
        completed: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What is the primary purpose of setting financial goals?",
              options: [
                "To impress others with your ambitions",
                "To provide direction and motivation for your financial decisions",
                "To guarantee financial success",
                "To avoid thinking about money"
              ],
              correctAnswer: 1,
              explanation: "Financial goals provide direction and motivation, helping you make informed decisions about spending, saving, and investing."
            },
            {
              id: 2,
              question: "Which of the following is an example of a SMART financial goal?",
              options: [
                "Save money for vacation",
                "Save $2,000 for a vacation to Europe by December 2024",
                "Be rich someday",
                "Save as much as possible"
              ],
              correctAnswer: 1,
              explanation: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. The vacation goal meets all these criteria."
            },
            {
              id: 3,
              question: "What is the recommended time frame for short-term financial goals?",
              options: [
                "Less than 1 year",
                "1-5 years",
                "5-10 years",
                "More than 10 years"
              ],
              correctAnswer: 0,
              explanation: "Short-term financial goals are typically achieved within one year."
            },
            {
              id: 4,
              question: "Which factor is most important when prioritizing financial goals?",
              options: [
                "The size of the goal",
                "Personal values and circumstances",
                "What others are doing",
                "Current market conditions"
              ],
              correctAnswer: 1,
              explanation: "Your personal values and circumstances should guide your financial priorities, not external factors."
            },
            {
              id: 5,
              question: "What is compound interest?",
              options: [
                "Interest paid only on the principal amount",
                "Interest earned on both principal and previously earned interest",
                "A type of bank fee",
                "Interest that decreases over time"
              ],
              correctAnswer: 1,
              explanation: "Compound interest is when you earn interest on both your original investment and previously earned interest."
            },
            {
              id: 6,
              question: "How often should you review and adjust your financial goals?",
              options: [
                "Never, once set they should remain fixed",
                "Only when you achieve them",
                "Regularly, at least annually",
                "Only during major life changes"
              ],
              correctAnswer: 2,
              explanation: "Regular review helps ensure your goals remain relevant and achievable as your life circumstances change."
            },
            {
              id: 7,
              question: "What is the 50/30/20 budgeting rule?",
              options: [
                "50% savings, 30% needs, 20% wants",
                "50% needs, 30% wants, 20% savings",
                "50% wants, 30% needs, 20% savings",
                "50% debt, 30% savings, 20% spending"
              ],
              correctAnswer: 1,
              explanation: "The 50/30/20 rule allocates 50% to needs, 30% to wants, and 20% to savings and debt repayment."
            },
            {
              id: 8,
              question: "Which is considered a financial need rather than a want?",
              options: [
                "Designer clothes",
                "Expensive restaurant meals",
                "Housing payments",
                "Entertainment subscriptions"
              ],
              correctAnswer: 2,
              explanation: "Housing is a basic need, while the others are wants that enhance quality of life but aren't essential."
            },
            {
              id: 9,
              question: "What is the recommended size for an emergency fund?",
              options: [
                "1 month of expenses",
                "3-6 months of expenses",
                "1 year of expenses",
                "Whatever you can afford"
              ],
              correctAnswer: 1,
              explanation: "Financial experts typically recommend saving 3-6 months of living expenses for emergencies."
            },
            {
              id: 10,
              question: "When should you start investing?",
              options: [
                "Only when you're wealthy",
                "After you retire",
                "As soon as you have some savings and no high-interest debt",
                "Never, it's too risky"
              ],
              correctAnswer: 2,
              explanation: "Starting to invest early, even with small amounts, can help you benefit from compound growth over time."
            }
          ]
        }
      },
      {
        id: 2,
        title: "Creating Your First Budget",
        description: "Learn how to create a practical budget that works for your lifestyle and income.",
        duration: "20 minutes",
        completed: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 11,
              question: "What is the first step in creating a budget?",
              options: [
                "Deciding how much to save",
                "Tracking your current income and expenses",
                "Setting spending limits",
                "Opening a savings account"
              ],
              correctAnswer: 1,
              explanation: "Understanding your current financial situation is essential before creating a budget."
            },
            {
              id: 12,
              question: "Which expense category should be prioritized first in a budget?",
              options: [
                "Entertainment",
                "Shopping",
                "Essential needs (housing, food, utilities)",
                "Luxury items"
              ],
              correctAnswer: 2,
              explanation: "Essential needs should always be prioritized first to ensure basic living requirements are met."
            },
            {
              id: 13,
              question: "How often should you review your budget?",
              options: [
                "Once a year",
                "Monthly",
                "Only when problems arise",
                "Never, once it's set"
              ],
              correctAnswer: 1,
              explanation: "Monthly reviews help you stay on track and make necessary adjustments."
            },
            {
              id: 14,
              question: "What should you do if your expenses exceed your income?",
              options: [
                "Ignore it and hope it improves",
                "Use credit cards to cover the difference",
                "Reduce expenses or increase income",
                "Stop tracking expenses"
              ],
              correctAnswer: 2,
              explanation: "The sustainable solution is to either reduce expenses or find ways to increase income."
            },
            {
              id: 15,
              question: "Which is the best budgeting method for beginners?",
              options: [
                "Zero-based budgeting",
                "50/30/20 rule",
                "Envelope method",
                "Any method you'll actually use consistently"
              ],
              correctAnswer: 3,
              explanation: "The best budgeting method is one you'll stick to consistently, regardless of its complexity."
            },
            {
              id: 16,
              question: "What is zero-based budgeting?",
              options: [
                "Having zero savings",
                "Spending zero money",
                "Assigning every dollar of income to a specific category",
                "Starting with zero knowledge"
              ],
              correctAnswer: 2,
              explanation: "Zero-based budgeting means every dollar of income is allocated to specific expenses, savings, or debt payments."
            },
            {
              id: 17,
              question: "Which tool is most effective for tracking daily expenses?",
              options: [
                "Memory alone",
                "Monthly bank statements",
                "Daily expense tracking app or notebook",
                "Annual tax returns"
              ],
              correctAnswer: 2,
              explanation: "Daily tracking provides the most accurate and timely information about spending patterns."
            },
            {
              id: 18,
              question: "What percentage of income should ideally go to housing costs?",
              options: [
                "No more than 28-30%",
                "50% or more",
                "Whatever is necessary",
                "As little as possible"
              ],
              correctAnswer: 0,
              explanation: "Financial experts recommend keeping housing costs below 28-30% of gross income."
            },
            {
              id: 19,
              question: "How should you handle irregular income when budgeting?",
              options: [
                "Don't budget at all",
                "Base budget on lowest expected income",
                "Only budget during high-income months",
                "Spend freely when income is high"
              ],
              correctAnswer: 1,
              explanation: "Budgeting based on your lowest expected income ensures you can meet expenses during lean months."
            },
            {
              id: 20,
              question: "What's the purpose of having 'fun money' in your budget?",
              options: [
                "It's unnecessary and wasteful",
                "To maintain motivation and prevent budget burnout",
                "Only for wealthy people",
                "To impress others"
              ],
              correctAnswer: 1,
              explanation: "Including some discretionary spending helps maintain motivation and prevents feeling overly restricted."
            }
          ]
        }
      },
      {
        id: 3,
        title: "Building an Emergency Fund",
        description: "Understand the importance of emergency funds and learn strategies to build yours effectively.",
        duration: "18 minutes",
        completed: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 21,
              question: "What is the primary purpose of an emergency fund?",
              options: [
                "To make investments",
                "To cover unexpected expenses without debt",
                "To buy luxury items",
                "To earn high interest"
              ],
              correctAnswer: 1,
              explanation: "An emergency fund provides financial security by covering unexpected expenses without resorting to debt."
            },
            {
              id: 22,
              question: "Where should you keep your emergency fund?",
              options: [
                "In high-risk investments",
                "In a easily accessible savings account",
                "In your checking account",
                "Under your mattress"
              ],
              correctAnswer: 1,
              explanation: "Emergency funds should be easily accessible but separate from daily spending money, making a savings account ideal."
            },
            {
              id: 23,
              question: "Which of these qualifies as a true emergency?",
              options: [
                "A vacation opportunity",
                "Job loss or major medical expense",
                "A sale on your favorite clothes",
                "Holiday gifts"
              ],
              correctAnswer: 1,
              explanation: "True emergencies are unexpected events that significantly impact your financial stability."
            },
            {
              id: 24,
              question: "How should you start building an emergency fund if money is tight?",
              options: [
                "Wait until you have more income",
                "Start with small amounts, even $5-10 per week",
                "Don't bother if you can't save a lot",
                "Use credit instead"
              ],
              correctAnswer: 1,
              explanation: "Starting small builds the habit and creates momentum, even if progress seems slow initially."
            },
            {
              id: 25,
              question: "What should you do after using money from your emergency fund?",
              options: [
                "Leave it empty until the next emergency",
                "Immediately replenish it",
                "Use it for other purposes",
                "Close the account"
              ],
              correctAnswer: 1,
              explanation: "Replenishing your emergency fund quickly ensures you're prepared for future unexpected expenses."
            },
            {
              id: 26,
              question: "Which strategy can help build your emergency fund faster?",
              options: [
                "Waiting for a windfall",
                "Automating transfers to savings",
                "Only saving when you remember",
                "Investing in risky assets"
              ],
              correctAnswer: 1,
              explanation: "Automating transfers ensures consistent saving without relying on memory or willpower."
            },
            {
              id: 27,
              question: "Should you prioritize emergency fund or paying off debt?",
              options: [
                "Always debt first",
                "Always emergency fund first",
                "Build a small emergency fund, then focus on high-interest debt",
                "It doesn't matter"
              ],
              correctAnswer: 2,
              explanation: "A small emergency fund prevents taking on more debt while paying off existing debt, then you can build the full fund."
            },
            {
              id: 28,
              question: "How much should single people vs. families save in emergency funds?",
              options: [
                "Same amount for everyone",
                "Singles need more",
                "Families typically need larger funds due to more dependents",
                "Only families need emergency funds"
              ],
              correctAnswer: 2,
              explanation: "Families often have higher expenses and more potential emergencies, requiring larger emergency funds."
            },
            {
              id: 29,
              question: "What's a good first milestone for emergency fund building?",
              options: [
                "$10,000",
                "$1,000",
                "One year of expenses",
                "$100"
              ],
              correctAnswer: 1,
              explanation: "$1,000 is a common first milestone that can cover many minor emergencies and build confidence."
            },
            {
              id: 30,
              question: "Should you invest your emergency fund to earn higher returns?",
              options: [
                "Yes, always maximize returns",
                "No, keep it in low-risk, accessible accounts",
                "Only in cryptocurrency",
                "Only in real estate"
              ],
              correctAnswer: 1,
              explanation: "Emergency funds should prioritize accessibility and stability over returns, as you may need the money quickly."
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Smart Investing for Beginners",
    description: "Learn the fundamentals of investing, from basic concepts to building your first diversified portfolio.",
    level: "Intermediate",
    duration: "6 weeks",
    students: 12800,
    topics: [
      "Investment Basics and Types",
      "Risk and Return Understanding",
      "Diversification Strategies",
      "Index Funds and ETFs",
      "Getting Started with Brokerage Accounts"
    ],
    lessons: [
      {
        id: 4,
        title: "Investment Basics",
        description: "Understanding different types of investments and how they work.",
        duration: "25 minutes",
        completed: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 31,
              question: "What is the primary difference between stocks and bonds?",
              options: [
                "Stocks are always safer than bonds",
                "Stocks represent ownership, bonds represent debt",
                "Bonds always provide higher returns",
                "There is no difference"
              ],
              correctAnswer: 1,
              explanation: "Stocks represent ownership shares in companies, while bonds represent loans to companies or governments."
            },
            {
              id: 32,
              question: "What does diversification mean in investing?",
              options: [
                "Putting all money in one investment",
                "Spreading investments across different types and sectors",
                "Only investing in your home country",
                "Avoiding all risks"
              ],
              correctAnswer: 1,
              explanation: "Diversification involves spreading investments across different asset types, sectors, and regions to reduce risk."
            },
            {
              id: 33,
              question: "What is compound growth in investing?",
              options: [
                "Growing investments by adding more money monthly",
                "Earning returns on both original investment and previous returns",
                "Complicated investment strategies",
                "Guaranteed investment returns"
              ],
              correctAnswer: 1,
              explanation: "Compound growth occurs when your investment returns generate their own returns over time."
            },
            {
              id: 34,
              question: "Which investment typically offers the highest potential return over long periods?",
              options: [
                "Savings accounts",
                "Government bonds",
                "Stocks",
                "Certificates of deposit"
              ],
              correctAnswer: 2,
              explanation: "Historically, stocks have provided the highest long-term returns, though with higher volatility."
            },
            {
              id: 35,
              question: "What is dollar-cost averaging?",
              options: [
                "Buying investments only when prices are low",
                "Investing the same amount regularly regardless of price",
                "Calculating the average cost of investments",
                "Converting foreign currencies"
              ],
              correctAnswer: 1,
              explanation: "Dollar-cost averaging involves investing fixed amounts regularly, which can reduce the impact of market volatility."
            },
            {
              id: 36,
              question: "What is an index fund?",
              options: [
                "A fund that tracks a specific market index",
                "A fund with the highest fees",
                "A fund that only invests in one company",
                "A government savings program"
              ],
              correctAnswer: 0,
              explanation: "Index funds track specific market indexes, providing broad diversification at low costs."
            },
            {
              id: 37,
              question: "When should you start investing?",
              options: [
                "Only when you're wealthy",
                "After you retire",
                "As early as possible with available funds",
                "Only during bull markets"
              ],
              correctAnswer: 2,
              explanation: "Starting early allows more time for compound growth, even with small initial amounts."
            },
            {
              id: 38,
              question: "What is risk tolerance in investing?",
              options: [
                "How much money you can afford to lose",
                "Your ability to handle investment volatility emotionally and financially",
                "The maximum return you expect",
                "Your age in years"
              ],
              correctAnswer: 1,
              explanation: "Risk tolerance encompasses both your financial ability and emotional comfort with investment fluctuations."
            },
            {
              id: 39,
              question: "What is the relationship between risk and return in investing?",
              options: [
                "Higher risk always means higher returns",
                "Lower risk always means higher returns",
                "Generally, higher potential returns come with higher risk",
                "Risk and return are unrelated"
              ],
              correctAnswer: 2,
              explanation: "While not guaranteed, investments with higher potential returns typically involve higher risk."
            },
            {
              id: 40,
              question: "What should be your first investment priority?",
              options: [
                "Individual stocks",
                "Cryptocurrency",
                "Low-cost, diversified funds",
                "Real estate"
              ],
              correctAnswer: 2,
              explanation: "Low-cost, diversified funds provide instant diversification and are ideal for beginning investors."
            }
          ]
        }
      },
      {
        id: 5,
        title: "Understanding Risk and Return",
        description: "Learn how to balance risk and return to match your investment goals.",
        duration: "22 minutes",
        completed: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 41,
              question: "What is volatility in investing?",
              options: [
                "The speed of investment growth",
                "How much an investment's value fluctuates",
                "The total return of an investment",
                "The cost of buying investments"
              ],
              correctAnswer: 1,
              explanation: "Volatility measures how much an investment's price moves up and down over time."
            },
            {
              id: 42,
              question: "Which factor most affects your ideal asset allocation?",
              options: [
                "Current market conditions",
                "Your age and time horizon",
                "Your friend's investment choices",
                "Last year's best performing asset"
              ],
              correctAnswer: 1,
              explanation: "Your age and investment time horizon are key factors in determining appropriate risk levels."
            },
            {
              id: 43,
              question: "What is systematic risk?",
              options: [
                "Risk that affects only one company",
                "Risk that affects the entire market",
                "Risk that can be eliminated through diversification",
                "Risk of system failures"
              ],
              correctAnswer: 1,
              explanation: "Systematic risk affects the entire market and cannot be eliminated through diversification."
            },
            {
              id: 44,
              question: "How should a 25-year-old's portfolio differ from a 65-year-old's?",
              options: [
                "They should be identical",
                "25-year-old should have more conservative investments",
                "25-year-old can typically handle more risk/stocks",
                "Age doesn't matter in investing"
              ],
              correctAnswer: 2,
              explanation: "Younger investors typically have longer time horizons, allowing them to take more risk for potentially higher returns."
            },
            {
              id: 45,
              question: "What is the purpose of rebalancing a portfolio?",
              options: [
                "To maximize returns every month",
                "To maintain your desired asset allocation",
                "To follow market trends",
                "To minimize all risks"
              ],
              correctAnswer: 1,
              explanation: "Rebalancing maintains your target asset allocation as different investments perform differently over time."
            },
            {
              id: 46,
              question: "Which is considered the 'risk-free' investment?",
              options: [
                "Blue-chip stocks",
                "Corporate bonds",
                "U.S. Treasury bills",
                "Real estate"
              ],
              correctAnswer: 2,
              explanation: "U.S. Treasury bills are considered risk-free because they're backed by the government's full faith and credit."
            },
            {
              id: 47,
              question: "What is unsystematic risk?",
              options: [
                "Risk affecting the entire market",
                "Risk specific to individual companies or sectors",
                "Risk that cannot be reduced",
                "Risk of economic recession"
              ],
              correctAnswer: 1,
              explanation: "Unsystematic risk is company or sector-specific and can be reduced through diversification."
            },
            {
              id: 48,
              question: "How often should you review your investment portfolio?",
              options: [
                "Daily",
                "Weekly",
                "Annually or when major life changes occur",
                "Never, once it's set"
              ],
              correctAnswer: 2,
              explanation: "Annual reviews or major life changes are appropriate times to assess and adjust your portfolio."
            },
            {
              id: 49,
              question: "What is the equity risk premium?",
              options: [
                "The cost of buying stocks",
                "Extra return expected from stocks over risk-free investments",
                "The risk of losing all your money",
                "A type of insurance for investments"
              ],
              correctAnswer: 1,
              explanation: "The equity risk premium is the additional return investors expect for taking on the risk of stock investing."
            },
            {
              id: 50,
              question: "Which investment strategy involves buying and holding for long periods?",
              options: [
                "Day trading",
                "Market timing",
                "Buy and hold",
                "Swing trading"
              ],
              correctAnswer: 2,
              explanation: "Buy and hold strategy involves purchasing investments and holding them for extended periods, regardless of short-term market fluctuations."
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "Credit and Debt Management",
    description: "Master credit building, debt management, and strategies to maintain healthy financial relationships.",
    level: "Intermediate",
    duration: "5 weeks",
    students: 9650,
    topics: [
      "Understanding Credit Scores",
      "Credit Card Management",
      "Debt Reduction Strategies",
      "Student Loan Management",
      "Building Credit History"
    ],
    lessons: [
      {
        id: 6,
        title: "Understanding Credit Scores",
        description: "Learn what credit scores are, how they're calculated, and why they matter.",
        duration: "20 minutes",
        completed: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 51,
              question: "What is the most common credit score range?",
              options: [
                "0-100",
                "300-850",
                "1-10",
                "0-1000"
              ],
              correctAnswer: 1,
              explanation: "The FICO score, the most widely used credit score, ranges from 300 to 850."
            },
            {
              id: 52,
              question: "Which factor has the biggest impact on your credit score?",
              options: [
                "Length of credit history",
                "Payment history",
                "Types of credit used",
                "New credit inquiries"
              ],
              correctAnswer: 1,
              explanation: "Payment history accounts for about 35% of your credit score, making it the most important factor."
            },
            {
              id: 53,
              question: "What is credit utilization?",
              options: [
                "How often you use your credit cards",
                "The percentage of available credit you're using",
                "The number of credit cards you have",
                "How long you've had credit"
              ],
              correctAnswer: 1,
              explanation: "Credit utilization is the ratio of your current credit card balances to your credit limits."
            },
            {
              id: 54,
              question: "What is considered a good credit utilization ratio?",
              options: [
                "Under 30%",
                "50-60%",
                "70-80%",
                "90-100%"
              ],
              correctAnswer: 0,
              explanation: "Keeping credit utilization under 30% is generally recommended, with under 10% being even better."
            },
            {
              id: 55,
              question: "How often should you check your credit report?",
              options: [
                "Never",
                "Once per decade",
                "At least once per year",
                "Daily"
              ],
              correctAnswer: 2,
              explanation: "You should check your credit report at least annually to monitor for errors and signs of identity theft."
            },
            {
              id: 56,
              question: "What happens if you close an old credit card?",
              options: [
                "Always improves your credit score",
                "May hurt your credit score by reducing credit history length",
                "Has no effect on credit score",
                "Immediately removes it from your credit report"
              ],
              correctAnswer: 1,
              explanation: "Closing old cards can reduce your average account age and available credit, potentially lowering your score."
            },
            {
              id: 57,
              question: "What is a hard credit inquiry?",
              options: [
                "Checking your own credit score",
                "A detailed investigation by police",
                "When a lender checks your credit for a loan application",
                "An error on your credit report"
              ],
              correctAnswer: 2,
              explanation: "A hard inquiry occurs when a lender checks your credit as part of their decision-making process for credit."
            },
            {
              id: 58,
              question: "How long do most negative items stay on your credit report?",
              options: [
                "1 year",
                "3 years",
                "7 years",
                "Forever"
              ],
              correctAnswer: 2,
              explanation: "Most negative information, like late payments and collections, stays on your credit report for 7 years."
            },
            {
              id: 59,
              question: "What credit score is generally considered 'excellent'?",
              options: [
                "600-650",
                "650-700",
                "700-750",
                "750 and above"
              ],
              correctAnswer: 3,
              explanation: "Credit scores of 750 and above are generally considered excellent and qualify for the best interest rates."
            },
            {
              id: 60,
              question: "Can you build credit without a credit card?",
              options: [
                "No, credit cards are required",
                "Yes, through other forms of credit like loans",
                "Only if you're over 30",
                "Only with a cosigner"
              ],
              correctAnswer: 1,
              explanation: "You can build credit through various means including auto loans, mortgages, and other credit accounts."
            }
          ]
        }
      }
    ]
  }
];
