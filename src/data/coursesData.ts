
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
  videoUrl?: string;
  completed: boolean;
  locked: boolean;
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
    title: "Budgeting Basics for Students",
    description: "Learn the fundamentals of creating and maintaining a budget that works for your student lifestyle.",
    level: "Beginner",
    duration: "2 hours",
    students: 1250,
    topics: [
      "Understanding income and expenses",
      "Creating a realistic budget",
      "Tracking spending habits",
      "Emergency fund basics",
      "Student-specific budgeting tips"
    ],
    lessons: [
      {
        id: 1,
        title: "Introduction to Budgeting",
        description: "Understand the basics of personal finance and why budgeting is crucial for students.",
        duration: "15 min",
        completed: false,
        locked: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "What is the primary purpose of a budget?",
              options: [
                "To restrict your spending completely",
                "To track and plan your income and expenses",
                "To make you wealthy quickly",
                "To impress your friends"
              ],
              correctAnswer: 1,
              explanation: "A budget helps you track where your money comes from and where it goes, allowing you to make informed financial decisions."
            },
            {
              id: 2,
              question: "What percentage of your income should ideally go to savings?",
              options: ["5%", "10-20%", "50%", "1%"],
              correctAnswer: 1,
              explanation: "Financial experts generally recommend saving 10-20% of your income, though even small amounts are beneficial when starting out."
            },
            {
              id: 3,
              question: "Which expense category should be prioritized first in a budget?",
              options: ["Entertainment", "Basic needs (food, shelter)", "Shopping", "Dining out"],
              correctAnswer: 1,
              explanation: "Basic needs like food, shelter, and transportation should always be prioritized in your budget before discretionary spending."
            },
            {
              id: 4,
              question: "How often should you review and update your budget?",
              options: ["Once a year", "Never", "Monthly or when circumstances change", "Only when you're broke"],
              correctAnswer: 2,
              explanation: "Regular monthly reviews help you stay on track and adjust for changing circumstances."
            },
            {
              id: 5,
              question: "What is the 50/30/20 rule in budgeting?",
              options: [
                "50% savings, 30% needs, 20% wants",
                "50% needs, 30% wants, 20% savings",
                "50% wants, 30% needs, 20% savings",
                "It's not a real budgeting rule"
              ],
              correctAnswer: 1,
              explanation: "The 50/30/20 rule suggests allocating 50% to needs, 30% to wants, and 20% to savings and debt repayment."
            },
            {
              id: 6,
              question: "Which of these is considered a 'fixed expense'?",
              options: ["Groceries", "Entertainment", "Rent", "Dining out"],
              correctAnswer: 2,
              explanation: "Fixed expenses like rent remain the same each month, while variable expenses can fluctuate."
            },
            {
              id: 7,
              question: "What should you do if your expenses exceed your income?",
              options: [
                "Ignore it and hope for the best",
                "Cut unnecessary expenses or find additional income",
                "Use credit cards for everything",
                "Stop tracking your money"
              ],
              correctAnswer: 1,
              explanation: "When expenses exceed income, you need to either reduce spending or increase income to avoid debt."
            },
            {
              id: 8,
              question: "What is an emergency fund?",
              options: [
                "Money for vacation",
                "Money set aside for unexpected expenses",
                "Money for shopping",
                "Money for investments only"
              ],
              correctAnswer: 1,
              explanation: "An emergency fund is money specifically saved for unexpected expenses like medical bills or car repairs."
            },
            {
              id: 9,
              question: "Why is budgeting especially important for students?",
              options: [
                "Students have unlimited money",
                "Students typically have limited and irregular income",
                "Budgeting is only for adults",
                "Students don't need to worry about money"
              ],
              correctAnswer: 1,
              explanation: "Students often have limited, irregular income and need to make their money stretch to cover education and living expenses."
            },
            {
              id: 10,
              question: "What's the best first step when creating a budget?",
              options: [
                "Set spending limits immediately",
                "Track your current income and expenses",
                "Cut all entertainment spending",
                "Apply for more credit cards"
              ],
              correctAnswer: 1,
              explanation: "Understanding your current financial situation by tracking income and expenses is the foundation of effective budgeting."
            }
          ]
        }
      },
      {
        id: 2,
        title: "Tracking Your Expenses",
        description: "Learn different methods to track your spending and identify patterns.",
        duration: "20 min",
        completed: false,
        locked: true,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 11,
              question: "What is the most effective way to track expenses?",
              options: [
                "Keep all receipts in a shoebox",
                "Use a budgeting app or spreadsheet consistently", 
                "Try to remember everything",
                "Only track large purchases"
              ],
              correctAnswer: 1,
              explanation: "Consistent tracking using digital tools provides the most accurate and useful data for budgeting decisions."
            },
            {
              id: 12,
              question: "How long should you track expenses to see meaningful patterns?",
              options: ["1 day", "1 week", "At least 1 month", "1 year"],
              correctAnswer: 2,
              explanation: "Tracking for at least a month gives you enough data to identify spending patterns and seasonal variations."
            },
            {
              id: 13,
              question: "What are 'invisible expenses'?",
              options: [
                "Expenses you can't see",
                "Small, frequent purchases that add up",
                "Illegal expenses",
                "Future expenses"
              ],
              correctAnswer: 1,
              explanation: "Small daily purchases like coffee or snacks can add up significantly over time but are often overlooked."
            },
            {
              id: 14,
              question: "Which expense tracking method works best for most people?",
              options: [
                "Cash only",
                "Credit cards only",
                "A combination of methods that fit your lifestyle",
                "Mental tracking only"
              ],
              correctAnswer: 2,
              explanation: "The best method is one you'll actually use consistently, which varies by individual preferences and habits."
            },
            {
              id: 15,
              question: "When should you categorize your expenses?",
              options: [
                "Never",
                "Only at the end of the year",
                "As you make purchases or record them",
                "Only for large expenses"
              ],
              correctAnswer: 2,
              explanation: "Categorizing expenses as you go makes the process easier and provides more accurate budget tracking."
            },
            {
              id: 16,
              question: "What's a spending trigger?",
              options: [
                "A type of gun",
                "Emotions or situations that lead to unplanned spending",
                "A budgeting app feature",
                "A type of expense category"
              ],
              correctAnswer: 1,
              explanation: "Spending triggers are emotional states or situations that often lead to impulse purchases or overspending."
            },
            {
              id: 17,
              question: "Why is it important to track both income and expenses?",
              options: [
                "It's not important",
                "To see the full picture of your financial flow",
                "Only expenses matter",
                "Only income matters"
              ],
              correctAnswer: 1,
              explanation: "Understanding both sides of your financial equation helps you make informed decisions about spending and saving."
            },
            {
              id: 18,
              question: "What should you do with seasonal expenses?",
              options: [
                "Ignore them",
                "Plan and save for them throughout the year",
                "Use credit cards when they come up",
                "Ask family for money"
              ],
              correctAnswer: 1,
              explanation: "Planning ahead for seasonal expenses like textbooks or holiday gifts helps avoid financial stress."
            },
            {
              id: 19,
              question: "How often should you review your expense tracking data?",
              options: ["Never", "Once a year", "Weekly or monthly", "Only when problems arise"],
              correctAnswer: 2,
              explanation: "Regular review helps you stay aware of your spending patterns and make adjustments as needed."
            },
            {
              id: 20,
              question: "What's the benefit of using digital expense tracking tools?",
              options: [
                "They're always free",
                "They automatically categorize and analyze your data",
                "They prevent all overspending",
                "They're only for tech experts"
              ],
              correctAnswer: 1,
              explanation: "Digital tools can automatically categorize transactions and provide insights that would be time-consuming to generate manually."
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Smart Saving Strategies",
    description: "Discover effective ways to save money and build your financial future.",
    level: "Beginner",
    duration: "1.5 hours",
    students: 980,
    topics: [
      "Setting savings goals",
      "Automated saving",
      "Finding the best savings accounts",
      "Avoiding common spending traps"
    ],
    lessons: [
      {
        id: 3,
        title: "Setting Savings Goals",
        description: "Learn how to set realistic and achievable savings goals.",
        duration: "25 min",
        completed: false,
        locked: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 21,
              question: "What makes a savings goal effective?",
              options: [
                "It should be vague and flexible",
                "It should be specific, measurable, and time-bound",
                "It should be impossible to achieve",
                "It should only be short-term"
              ],
              correctAnswer: 1,
              explanation: "SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) are most effective for saving success."
            },
            {
              id: 22,
              question: "What is a good first savings goal for students?",
              options: [
                "Buying a luxury car",
                "A small emergency fund ($500-$1000)",
                "A million-dollar retirement fund",
                "A vacation to Europe"
              ],
              correctAnswer: 1,
              explanation: "A small emergency fund provides financial security and is an achievable first goal for most students."
            },
            {
              id: 23,
              question: "How should you prioritize multiple savings goals?",
              options: [
                "Work on all goals equally",
                "Focus on the most expensive goal first",
                "Prioritize by importance and timeline",
                "Choose randomly"
              ],
              correctAnswer: 2,
              explanation: "Prioritizing by importance and urgency helps you allocate resources effectively and achieve goals systematically."
            },
            {
              id: 24,
              question: "What's the advantage of short-term vs. long-term savings goals?",
              options: [
                "Short-term goals are always better",
                "Long-term goals are always better", 
                "Short-term goals provide motivation while long-term goals build wealth",
                "There's no difference"
              ],
              correctAnswer: 2,
              explanation: "Short-term goals provide quick motivation and success, while long-term goals build substantial wealth through compound growth."
            },
            {
              id: 25,
              question: "How much should you save for textbooks each semester?",
              options: ["$50", "$200-$400", "$1000", "$100"],
              correctAnswer: 1,
              explanation: "Textbooks typically cost $200-$400 per semester, so planning for this expense helps avoid financial stress."
            },
            {
              id: 26,
              question: "What is 'paying yourself first'?",
              options: [
                "Buying things for yourself before others",
                "Saving money before spending on other things",
                "Getting a job that pays well",
                "Using credit cards for purchases"
              ],
              correctAnswer: 1,
              explanation: "Paying yourself first means prioritizing savings by setting aside money before spending on discretionary items."
            },
            {
              id: 27,
              question: "Why should savings goals be written down?",
              options: [
                "It's required by law",
                "It makes them more concrete and increases commitment",
                "It's not necessary",
                "Only for large goals"
              ],
              correctAnswer: 1,
              explanation: "Writing down goals makes them more tangible and increases your psychological commitment to achieving them."
            },
            {
              id: 28,
              question: "What should you do when you reach a savings goal?",
              options: [
                "Spend all the money immediately",
                "Celebrate appropriately and set a new goal",
                "Stop saving altogether",
                "Feel guilty about having money"
              ],
              correctAnswer: 1,
              explanation: "Celebrating achievements reinforces positive behavior, and setting new goals maintains momentum."
            },
            {
              id: 29,
              question: "How can you make large savings goals less overwhelming?",
              options: [
                "Ignore them",
                "Break them into smaller milestones",
                "Try to save it all at once",
                "Ask others to save for you"
              ],
              correctAnswer: 1,
              explanation: "Breaking large goals into smaller milestones makes them feel more achievable and provides regular motivation."
            },
            {
              id: 30,
              question: "What's a good strategy when you miss a savings target?",
              options: [
                "Give up completely",
                "Analyze what went wrong and adjust your approach",
                "Blame external factors only",
                "Set an even higher target"
              ],
              correctAnswer: 1,
              explanation: "Learning from setbacks and adjusting your strategy is key to long-term savings success."
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "Understanding Credit and Debt",
    description: "Navigate the world of credit cards, loans, and debt management responsibly.",
    level: "Intermediate",
    duration: "3 hours",
    students: 756,
    topics: [
      "Credit scores and reports",
      "Responsible credit card use",
      "Student loan management",
      "Debt repayment strategies"
    ],
    lessons: [
      {
        id: 4,
        title: "Credit Basics",
        description: "Understanding how credit works and its impact on your financial future.",
        duration: "30 min",
        completed: false,
        locked: false,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 31,
              question: "What is a credit score?",
              options: [
                "Your bank account balance",
                "A numerical rating of your creditworthiness",
                "The amount of money you owe",
                "Your monthly income"
              ],
              correctAnswer: 1,
              explanation: "A credit score is a three-digit number that represents your creditworthiness based on your credit history."
            },
            {
              id: 32,
              question: "What is the typical range for credit scores?",
              options: ["0-100", "300-850", "1-10", "100-1000"],
              correctAnswer: 1,
              explanation: "Most credit scores range from 300 to 850, with higher scores indicating better creditworthiness."
            },
            {
              id: 33,
              question: "Which factor has the biggest impact on your credit score?",
              options: [
                "Length of credit history",
                "Payment history",
                "Types of credit",
                "New credit inquiries"
              ],
              correctAnswer: 1,
              explanation: "Payment history accounts for about 35% of your credit score, making it the most important factor."
            },
            {
              id: 34,
              question: "How often should you check your credit report?",
              options: ["Never", "Once a year", "At least once a year, ideally more", "Only when applying for loans"],
              correctAnswer: 2,
              explanation: "Regular monitoring helps you catch errors or fraud early and understand your credit standing."
            },
            {
              id: 35,
              question: "What is credit utilization?",
              options: [
                "How often you use credit cards",
                "The percentage of available credit you're using",
                "The number of credit cards you have",
                "Your credit limit"
              ],
              correctAnswer: 1,
              explanation: "Credit utilization is the ratio of your credit card balances to your credit limits, ideally kept below 30%."
            },
            {
              id: 36,
              question: "What happens if you miss a credit card payment?",
              options: [
                "Nothing happens",
                "Late fees and potential damage to credit score",
                "Your card is automatically cancelled",
                "You get a reward"
              ],
              correctAnswer: 1,
              explanation: "Late payments can result in fees and negative marks on your credit report, damaging your credit score."
            },
            {
              id: 37,
              question: "How long do negative marks typically stay on your credit report?",
              options: ["1 year", "3 years", "7 years", "Forever"],
              correctAnswer: 2,
              explanation: "Most negative information remains on your credit report for 7 years, though some items may stay longer."
            },
            {
              id: 38,
              question: "What is the minimum payment on a credit card?",
              options: [
                "The full balance",
                "A small percentage of the balance plus fees",
                "Always $25",
                "Whatever you want to pay"
              ],
              correctAnswer: 1,
              explanation: "The minimum payment is typically 2-3% of the balance plus any fees, but paying only this amount results in high interest charges."
            },
            {
              id: 39,
              question: "Why might having no credit history be problematic?",
              options: [
                "It's actually ideal",
                "Lenders can't assess your creditworthiness",
                "You'll automatically get the best rates",
                "It has no impact"
              ],
              correctAnswer: 1,
              explanation: "No credit history makes you appear risky to lenders since they have no data to evaluate your payment reliability."
            },
            {
              id: 40,
              question: "What's the best way to build credit as a student?",
              options: [
                "Apply for multiple credit cards",
                "Get a student credit card and use it responsibly",
                "Take out large loans",
                "Never use any credit"
              ],
              correctAnswer: 1,
              explanation: "A student credit card used responsibly (low balances, on-time payments) is an excellent way to build creditHistory."
            }
          ]
        }
      }
    ]
  }
];
