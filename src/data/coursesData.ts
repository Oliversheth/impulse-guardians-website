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
    title: "Budgeting",
    description: "Master the fundamentals of personal budgeting and expense tracking",
    level: "Beginner",
    duration: "2.5 hours",
    students: 2450,
    topics: [
      "Income tracking and categorization",
      "Popular budgeting methods",
      "Emergency fund planning",
      "Budgeting apps and tools"
    ],
    lessons: [
      {
        id: 101,
        title: "Income Tracking",
        description: "Learn how to track and categorize all sources of income",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understanding your income is the foundation of good budgeting. Learn to track salary, side hustles, investments, and other income sources.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What should be included when tracking income?",
              options: ["Only salary", "Salary and bonuses", "All sources of money", "Only regular payments"],
              correctAnswer: 2,
              explanation: "Include all money sources: salary, freelancing, investments, gifts, and any other income."
            },
            {
              id: 2,
              question: "How often should you review your income tracking?",
              options: ["Once a year", "Monthly", "Weekly", "Daily"],
              correctAnswer: 1,
              explanation: "Monthly reviews help you stay current with income changes and plan accordingly."
            },
            {
              id: 3,
              question: "What is gross income?",
              options: ["Income after taxes", "Income before deductions", "Only bonus income", "Investment returns"],
              correctAnswer: 1,
              explanation: "Gross income is your total income before taxes and other deductions are taken out."
            },
            {
              id: 4,
              question: "Why track irregular income separately?",
              options: ["It's not important", "For better budget planning", "Tax purposes only", "To impress others"],
              correctAnswer: 1,
              explanation: "Tracking irregular income helps you plan for months when it might be higher or lower."
            },
            {
              id: 5,
              question: "What's the best way to track multiple income sources?",
              options: ["Mental notes", "Spreadsheet or app", "Bank statements only", "Don't track them"],
              correctAnswer: 1,
              explanation: "A spreadsheet or budgeting app helps organize and categorize different income sources."
            },
            {
              id: 6,
              question: "Should you budget based on gross or net income?",
              options: ["Gross income", "Net income", "Either one", "Neither"],
              correctAnswer: 1,
              explanation: "Budget based on net income - what you actually take home after taxes and deductions."
            },
            {
              id: 7,
              question: "What counts as passive income?",
              options: ["Salary", "Rental property income", "Overtime pay", "Commission"],
              correctAnswer: 1,
              explanation: "Passive income includes rental income, dividends, and other money earned without active work."
            },
            {
              id: 8,
              question: "How should seasonal income be handled?",
              options: ["Ignore it", "Average it over the year", "Only count it when received", "Double count it"],
              correctAnswer: 1,
              explanation: "Average seasonal income over the year to create a more stable monthly budget."
            },
            {
              id: 9,
              question: "What's important about tracking side hustle income?",
              options: ["Nothing special", "Track for taxes and budgeting", "Only if it's large", "Don't track it"],
              correctAnswer: 1,
              explanation: "Side hustle income should be tracked for both tax purposes and accurate budget planning."
            },
            {
              id: 10,
              question: "Why is income tracking the first step in budgeting?",
              options: ["It's not important", "You need to know what you have to allocate", "It's the easiest step", "Banks require it"],
              correctAnswer: 1,
              explanation: "You must know your total income before you can effectively allocate it to different expense categories."
            }
          ]
        }
      },
      {
        id: 102,
        title: "Categorizing Expenses",
        description: "Organize expenses into needs, wants, and savings categories",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn to categorize expenses effectively to understand spending patterns and make informed financial decisions.",
        duration: "25 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What are the three main expense categories?",
              options: ["High, medium, low", "Needs, wants, savings", "Fixed, variable, irregular", "Cash, credit, debit"],
              correctAnswer: 1,
              explanation: "The three main categories are needs (essentials), wants (non-essentials), and savings."
            },
            {
              id: 2,
              question: "Which is considered a 'need'?",
              options: ["Netflix subscription", "Rent payment", "Designer clothes", "Dining out"],
              correctAnswer: 1,
              explanation: "Rent is a basic necessity for shelter, making it a need rather than a want."
            },
            {
              id: 3,
              question: "What percentage of income should go to needs?",
              options: ["30%", "50%", "70%", "90%"],
              correctAnswer: 1,
              explanation: "The 50/30/20 rule suggests 50% for needs, 30% for wants, 20% for savings."
            },
            {
              id: 4,
              question: "How do you categorize groceries?",
              options: ["Always a want", "Always a need", "Depends on what you buy", "Neither"],
              correctAnswer: 2,
              explanation: "Basic groceries are needs, but expensive or luxury food items might be wants."
            },
            {
              id: 5,
              question: "What's a fixed expense?",
              options: ["Varies each month", "Same amount monthly", "Only paid once", "Emergency expense"],
              correctAnswer: 1,
              explanation: "Fixed expenses like rent or insurance stay the same amount each month."
            },
            {
              id: 6,
              question: "Which is a variable expense?",
              options: ["Rent", "Car payment", "Utilities", "Insurance"],
              correctAnswer: 2,
              explanation: "Utilities vary based on usage, unlike fixed expenses that stay the same."
            },
            {
              id: 7,
              question: "Why categorize expenses?",
              options: ["It's not necessary", "To identify spending patterns", "To confuse yourself", "Banks require it"],
              correctAnswer: 1,
              explanation: "Categorizing helps you understand where your money goes and identify areas to cut back."
            },
            {
              id: 8,
              question: "How often should you review expense categories?",
              options: ["Never", "Monthly", "Yearly", "Only when problems arise"],
              correctAnswer: 1,
              explanation: "Monthly reviews help you stay on track and adjust categories as needed."
            },
            {
              id: 9,
              question: "What should you do with miscellaneous expenses?",
              options: ["Ignore them", "Create a miscellaneous category", "Count as wants", "Count as needs"],
              correctAnswer: 1,
              explanation: "A miscellaneous category helps track small, hard-to-categorize expenses."
            },
            {
              id: 10,
              question: "How can expense categorization help with budgeting?",
              options: ["It doesn't help", "Shows where cuts can be made", "Makes spending harder", "Increases expenses"],
              correctAnswer: 1,
              explanation: "Categorization reveals spending patterns and helps identify areas where you can reduce expenses."
            }
          ]
        }
      },
      {
        id: 103,
        title: "Budgeting Methods (Zero-Based, 50/30/20, Envelope System)",
        description: "Explore different budgeting approaches to find what works for you",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Compare popular budgeting methods and learn how to implement the one that best fits your lifestyle and financial goals.",
        duration: "35 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is zero-based budgeting?",
              options: ["Having zero money", "Every dollar has a purpose", "No budget at all", "Only spending on necessities"],
              correctAnswer: 1,
              explanation: "Zero-based budgeting means every dollar of income is assigned a specific purpose."
            },
            {
              id: 2,
              question: "In the 50/30/20 rule, what does the 20% represent?",
              options: ["Needs", "Wants", "Savings and debt payment", "Entertainment"],
              correctAnswer: 2,
              explanation: "The 20% in the 50/30/20 rule is for savings and debt repayment."
            },
            {
              id: 3,
              question: "How does the envelope system work?",
              options: ["Digital only", "Cash in physical envelopes", "Credit card tracking", "Bank account separation"],
              correctAnswer: 1,
              explanation: "The envelope system uses cash in labeled envelopes for different spending categories."
            },
            {
              id: 4,
              question: "Which budgeting method is best for overspenders?",
              options: ["Zero-based", "50/30/20", "Envelope system", "No budget"],
              correctAnswer: 2,
              explanation: "The envelope system helps overspenders by limiting available cash for each category."
            },
            {
              id: 5,
              question: "What's the main advantage of zero-based budgeting?",
              options: ["It's easiest", "Complete control over money", "Requires no tracking", "Works for everyone"],
              correctAnswer: 1,
              explanation: "Zero-based budgeting gives you complete control by assigning every dollar a purpose."
            },
            {
              id: 6,
              question: "When might the 50/30/20 rule not work?",
              options: ["For high earners", "For low earners with high fixed costs", "For young people", "For retirees"],
              correctAnswer: 1,
              explanation: "If fixed costs exceed 50% of income, the 50/30/20 rule needs adjustment."
            },
            {
              id: 7,
              question: "Can you combine budgeting methods?",
              options: ["Never", "Yes, adapt to your needs", "Only two at a time", "Only with permission"],
              correctAnswer: 1,
              explanation: "You can combine elements from different methods to create a personalized approach."
            },
            {
              id: 8,
              question: "What's a disadvantage of the envelope system?",
              options: ["Too complicated", "Inconvenient for online purchases", "Requires math skills", "Too expensive"],
              correctAnswer: 1,
              explanation: "The envelope system is challenging for online purchases and automated payments."
            },
            {
              id: 9,
              question: "How do you start zero-based budgeting?",
              options: ["List all expenses first", "Calculate income first", "Set savings goals", "Pay all bills"],
              correctAnswer: 1,
              explanation: "Start with your income, then assign every dollar to expenses, savings, or debt payment."
            },
            {
              id: 10,
              question: "Which method works best for irregular income?",
              options: ["50/30/20", "Envelope system", "Zero-based budgeting", "No budgeting"],
              correctAnswer: 2,
              explanation: "Zero-based budgeting adapts well to irregular income by reassigning dollars each month."
            }
          ]
        }
      },
      {
        id: 104,
        title: "Emergency Funds: Why and How Much",
        description: "Build a financial safety net for unexpected expenses",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understand the importance of emergency funds and learn how to determine the right amount for your situation.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is an emergency fund?",
              options: ["Money for vacations", "Money for unexpected expenses", "Money for shopping", "Money for investments"],
              correctAnswer: 1,
              explanation: "An emergency fund covers unexpected expenses like medical bills, job loss, or major repairs."
            },
            {
              id: 2,
              question: "How many months of expenses should an emergency fund cover?",
              options: ["1-2 months", "3-6 months", "12 months", "24 months"],
              correctAnswer: 1,
              explanation: "Most experts recommend 3-6 months of living expenses in an emergency fund."
            },
            {
              id: 3,
              question: "Where should you keep your emergency fund?",
              options: ["Under your mattress", "High-yield savings account", "Stock market", "Checking account"],
              correctAnswer: 1,
              explanation: "A high-yield savings account provides safety and some growth while keeping money accessible."
            },
            {
              id: 4,
              question: "What counts as a true emergency?",
              options: ["New clothes", "Job loss", "Vacation", "Holiday gifts"],
              correctAnswer: 1,
              explanation: "True emergencies are unexpected essential expenses like job loss, medical bills, or major repairs."
            },
            {
              id: 5,
              question: "Should you invest your emergency fund?",
              options: ["Yes, for maximum returns", "No, keep it safe and accessible", "Only half of it", "Only in bonds"],
              correctAnswer: 1,
              explanation: "Emergency funds should be easily accessible and safe, not subject to market volatility."
            },
            {
              id: 6,
              question: "When should you start building an emergency fund?",
              options: ["After paying off all debt", "Immediately", "After age 30", "Only if you have kids"],
              correctAnswer: 1,
              explanation: "Start building an emergency fund immediately, even with small amounts."
            },
            {
              id: 7,
              question: "How much should you initially save for emergencies?",
              options: ["$10,000", "$1,000", "$5,000", "6 months expenses"],
              correctAnswer: 1,
              explanation: "Start with a $1,000 starter emergency fund, then build to 3-6 months of expenses."
            },
            {
              id: 8,
              question: "What if you use money from your emergency fund?",
              options: ["Don't worry about it", "Replace it as soon as possible", "Use credit cards instead", "Stop saving"],
              correctAnswer: 1,
              explanation: "Replenish your emergency fund as quickly as possible after using it."
            },
            {
              id: 9,
              question: "Should emergency fund size vary by job security?",
              options: ["No, always the same", "Yes, less secure jobs need more", "Only for contractors", "Job security doesn't matter"],
              correctAnswer: 1,
              explanation: "Less stable jobs or income sources warrant larger emergency funds for protection."
            },
            {
              id: 10,
              question: "Can you have too large an emergency fund?",
              options: ["No, bigger is always better", "Yes, opportunity cost of not investing", "Only if over $100,000", "Never"],
              correctAnswer: 1,
              explanation: "Extremely large emergency funds miss investment opportunities; find the right balance."
            }
          ]
        }
      },
      {
        id: 105,
        title: "Budgeting Apps & Tools (Mint, YNAB, spreadsheets)",
        description: "Choose the right tools to manage your budget effectively",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Compare popular budgeting tools and learn how to select and use the best option for your financial management needs.",
        duration: "25 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is the main advantage of budgeting apps?",
              options: ["They're always free", "Automation and convenience", "They guarantee savings", "They work without internet"],
              correctAnswer: 1,
              explanation: "Budgeting apps automate tracking and provide convenient access to your financial data."
            },
            {
              id: 2,
              question: "What does YNAB stand for?",
              options: ["You Need A Bank", "You Need A Budget", "Year Number Account Balance", "Your New Account Book"],
              correctAnswer: 1,
              explanation: "YNAB stands for 'You Need A Budget' and focuses on zero-based budgeting."
            },
            {
              id: 3,
              question: "What's a disadvantage of using spreadsheets for budgeting?",
              options: ["Too expensive", "Requires manual entry", "Not customizable", "Can't do math"],
              correctAnswer: 1,
              explanation: "Spreadsheets require manual data entry, which can be time-consuming and error-prone."
            },
            {
              id: 4,
              question: "Which budgeting tool offers the most customization?",
              options: ["Mint", "YNAB", "Spreadsheets", "Banking apps"],
              correctAnswer: 2,
              explanation: "Spreadsheets offer unlimited customization since you control every aspect."
            },
            {
              id: 5,
              question: "What should you consider when choosing a budgeting app?",
              options: ["Only the price", "Security and features", "Brand popularity", "Number of downloads"],
              correctAnswer: 1,
              explanation: "Consider security, features, ease of use, cost, and compatibility with your needs."
            },
            {
              id: 6,
              question: "How do most budgeting apps connect to your accounts?",
              options: ["You enter passwords", "Secure API connections", "They guess", "Bank partnerships only"],
              correctAnswer: 1,
              explanation: "Apps use secure API connections to safely access your financial data."
            },
            {
              id: 7,
              question: "What's the main benefit of automatic transaction categorization?",
              options: ["It's always 100% accurate", "Saves time and effort", "Increases security", "Reduces bank fees"],
              correctAnswer: 1,
              explanation: "Automatic categorization saves significant time in tracking and organizing expenses."
            },
            {
              id: 8,
              question: "Should you rely solely on budgeting apps?",
              options: ["Yes, they're perfect", "No, review and verify regularly", "Only for small budgets", "Only if they're expensive"],
              correctAnswer: 1,
              explanation: "Always review and verify app categorizations and calculations for accuracy."
            },
            {
              id: 9,
              question: "What's important about budgeting app security?",
              options: ["It's not important", "Bank-level encryption", "Only password protection", "Security doesn't matter for budgeting"],
              correctAnswer: 1,
              explanation: "Look for apps with bank-level encryption and strong security measures."
            },
            {
              id: 10,
              question: "Can you switch budgeting tools?",
              options: ["Never", "Yes, but consider data transfer", "Only once per year", "Only with bank permission"],
              correctAnswer: 1,
              explanation: "You can switch tools, but consider how to transfer your data and maintain continuity."
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Saving",
    description: "Develop effective saving strategies and build wealth over time",
    level: "Beginner",
    duration: "2 hours",
    students: 1890,
    topics: [
      "SMART savings goals",
      "High-yield accounts",
      "Automated savings",
      "Inflation protection strategies"
    ],
    lessons: [
      {
        id: 201,
        title: "Setting Savings Goals",
        description: "Create specific, measurable, and achievable savings objectives",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn to set SMART savings goals that motivate you and provide clear direction for your financial future.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
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
              question: "What makes a savings goal specific?",
              options: ["Having a dollar amount", "Writing it down", "Setting a deadline", "All of the above"],
              correctAnswer: 3,
              explanation: "Specific goals include exact amounts, deadlines, and clear purposes."
            },
            {
              id: 3,
              question: "What's a good timeline for a short-term savings goal?",
              options: ["1-2 years", "5-10 years", "10+ years", "No timeline needed"],
              correctAnswer: 0,
              explanation: "Short-term goals are typically achieved within 1-2 years."
            },
            {
              id: 4,
              question: "Why should savings goals be measurable?",
              options: ["To impress others", "To track progress", "To make them harder", "They don't need to be"],
              correctAnswer: 1,
              explanation: "Measurable goals allow you to track progress and stay motivated."
            },
            {
              id: 5,
              question: "What's an example of a relevant savings goal?",
              options: ["Saving for someone else's vacation", "Emergency fund for job security", "Saving for items you don't want", "Goals that don't match your values"],
              correctAnswer: 1,
              explanation: "Relevant goals align with your personal values and circumstances."
            },
            {
              id: 6,
              question: "How should you prioritize multiple savings goals?",
              options: ["Save for all equally", "Emergency fund first, then others", "Largest goal first", "Random order"],
              correctAnswer: 1,
              explanation: "Prioritize emergency fund, then order other goals by importance and timeline."
            },
            {
              id: 7,
              question: "What should you do if you can't meet a savings goal?",
              options: ["Give up completely", "Adjust the goal or timeline", "Ignore it", "Start over"],
              correctAnswer: 1,
              explanation: "Adjust unrealistic goals rather than abandoning them entirely."
            },
            {
              id: 8,
              question: "How can you make large savings goals less overwhelming?",
              options: ["Ignore them", "Break them into smaller milestones", "Set unrealistic timelines", "Don't set large goals"],
              correctAnswer: 1,
              explanation: "Breaking large goals into smaller milestones makes them more manageable."
            },
            {
              id: 9,
              question: "Should you share your savings goals?",
              options: ["Never", "With trusted accountability partners", "With everyone", "Only with banks"],
              correctAnswer: 1,
              explanation: "Sharing with trusted people can provide accountability and support."
            },
            {
              id: 10,
              question: "How often should you review your savings goals?",
              options: ["Once set, never change", "Monthly or quarterly", "Only when reached", "Every few years"],
              correctAnswer: 1,
              explanation: "Regular reviews help you stay on track and adjust for life changes."
            }
          ]
        }
      },
      {
        id: 202,
        title: "High-Yield Savings Accounts Explained",
        description: "Maximize your savings with better interest rates",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understand how high-yield savings accounts work and how to choose the best one for your money.",
        duration: "25 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is a high-yield savings account?",
              options: ["A checking account", "A savings account with higher interest rates", "An investment account", "A credit account"],
              correctAnswer: 1,
              explanation: "High-yield savings accounts offer higher interest rates than traditional savings accounts."
            },
            {
              id: 2,
              question: "Where are high-yield savings accounts typically offered?",
              options: ["Only traditional banks", "Online banks and credit unions", "Investment firms only", "Government agencies"],
              correctAnswer: 1,
              explanation: "Online banks and credit unions often offer the highest rates due to lower overhead costs."
            },
            {
              id: 3,
              question: "What is APY?",
              options: ["Annual Percentage Yield", "Average Payment Yearly", "Annual Principal Year", "Automated Payment Yield"],
              correctAnswer: 0,
              explanation: "APY (Annual Percentage Yield) shows the real rate of return including compound interest."
            },
            {
              id: 4,
              question: "Are high-yield savings accounts FDIC insured?",
              options: ["Never", "Only at big banks", "Yes, up to $250,000", "Only if you pay extra"],
              correctAnswer: 2,
              explanation: "FDIC insurance protects deposits up to $250,000 per depositor per bank."
            },
            {
              id: 5,
              question: "What's a potential downside of online high-yield accounts?",
              options: ["Lower security", "No physical branches", "Higher fees", "Lower interest rates"],
              correctAnswer: 1,
              explanation: "Online banks may lack physical branches, which some customers prefer for service."
            },
            {
              id: 6,
              question: "How often do high-yield savings rates change?",
              options: ["Never", "They can change frequently", "Once per year", "Only during recessions"],
              correctAnswer: 1,
              explanation: "Interest rates can change based on Federal Reserve rates and bank policies."
            },
            {
              id: 7,
              question: "What should you compare when choosing a high-yield account?",
              options: ["Only the interest rate", "Rate, fees, minimums, and features", "Only the bank name", "Only the account color"],
              correctAnswer: 1,
              explanation: "Compare APY, fees, minimum balances, and account features comprehensively."
            },
            {
              id: 8,
              question: "Can you lose money in a high-yield savings account?",
              options: ["Yes, frequently", "No, if FDIC insured", "Only during market crashes", "Only if you withdraw early"],
              correctAnswer: 1,
              explanation: "FDIC-insured accounts protect your principal up to $250,000."
            },
            {
              id: 9,
              question: "What's the difference between APR and APY?",
              options: ["No difference", "APY includes compound interest", "APR is always higher", "APY is for loans only"],
              correctAnswer: 1,
              explanation: "APY includes the effect of compounding, making it more accurate for comparing savings accounts."
            },
            {
              id: 10,
              question: "Should you move money for a slightly higher rate?",
              options: ["Always", "Consider fees and convenience", "Never", "Only for 1% difference"],
              correctAnswer: 1,
              explanation: "Consider transfer fees, convenience, and the actual benefit before switching accounts."
            }
          ]
        }
      },
      {
        id: 203,
        title: "Automating Your Savings",
        description: "Set up systems to save money without thinking about it",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn to automate your savings to make consistent progress toward your financial goals effortlessly.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is automated savings?",
              options: ["Manual transfers", "Automatic transfers to savings", "Investment trading", "Bill paying"],
              correctAnswer: 1,
              explanation: "Automated savings involves setting up automatic transfers from checking to savings accounts."
            },
            {
              id: 2,
              question: "What's the main benefit of automating savings?",
              options: ["Higher interest rates", "Consistency and habit formation", "Lower fees", "Better security"],
              correctAnswer: 1,
              explanation: "Automation ensures consistent saving without relying on willpower or memory."
            },
            {
              id: 3,
              question: "When should automatic transfers occur?",
              options: ["Randomly", "Right after payday", "End of month", "When you remember"],
              correctAnswer: 1,
              explanation: "Schedule transfers right after payday when your account balance is highest."
            },
            {
              id: 4,
              question: "What is 'pay yourself first'?",
              options: ["Pay bills first", "Save before spending on wants", "Only pay yourself", "Spend all income first"],
              correctAnswer: 1,
              explanation: "'Pay yourself first' means saving money before spending on non-essential items."
            },
            {
              id: 5,
              question: "How much should you start with for automated savings?",
              options: ["50% of income", "Whatever amount you can consistently manage", "$1000 minimum", "All discretionary income"],
              correctAnswer: 1,
              explanation: "Start with an amount you can consistently manage, even if it's small."
            },
            {
              id: 6,
              question: "Can you automate savings for multiple goals?",
              options: ["No, only one goal", "Yes, with separate accounts or allocations", "Only with expensive software", "Only at large banks"],
              correctAnswer: 1,
              explanation: "You can set up multiple automatic transfers for different savings goals."
            },
            {
              id: 7,
              question: "What should you do if automated savings causes overdrafts?",
              options: ["Keep trying anyway", "Reduce the amount or adjust timing", "Stop automated savings", "Change banks"],
              correctAnswer: 1,
              explanation: "Adjust the amount or timing to avoid overdrafts while maintaining the saving habit."
            },
            {
              id: 8,
              question: "Should you automate savings even with irregular income?",
              options: ["No, impossible", "Yes, but use percentage-based or conservative amounts", "Only during high-income months", "Never"],
              correctAnswer: 1,
              explanation: "Use percentage-based automation or conservative amounts that work with low-income periods."
            },
            {
              id: 9,
              question: "What's micro-saving?",
              options: ["Saving very large amounts", "Saving small amounts frequently", "Saving for microscopes", "Short-term saving only"],
              correctAnswer: 1,
              explanation: "Micro-saving involves automatically saving small amounts, often from round-ups or spare change."
            },
            {
              id: 10,
              question: "How can apps help with automated savings?",
              options: ["They can't help", "Round-up transactions and automatic transfers", "Only by tracking manually", "Only for wealthy people"],
              correctAnswer: 1,
              explanation: "Apps can round up purchases and automatically transfer the spare change to savings."
            }
          ]
        }
      },
      {
        id: 204,
        title: "Inflation-Proofing & Short vs Long-Term Saving",
        description: "Protect your savings from inflation and choose appropriate time horizons",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understand how inflation affects savings and learn strategies for different time horizons to preserve and grow your money.",
        duration: "35 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is inflation?",
              options: ["Decrease in prices", "Increase in general price levels", "Stock market growth", "Interest rate changes"],
              correctAnswer: 1,
              explanation: "Inflation is the general increase in prices over time, reducing purchasing power."
            },
            {
              id: 2,
              question: "How does inflation affect savings?",
              options: ["Increases purchasing power", "Reduces purchasing power", "Has no effect", "Only affects investments"],
              correctAnswer: 1,
              explanation: "Inflation reduces the purchasing power of money saved in low-interest accounts."
            },
            {
              id: 3,
              question: "What's considered a short-term savings goal?",
              options: ["1-2 years", "5-10 years", "10+ years", "Less than 1 month"],
              correctAnswer: 0,
              explanation: "Short-term goals are typically achieved within 1-2 years."
            },
            {
              id: 4,
              question: "What's the best vehicle for short-term savings?",
              options: ["Stocks", "High-yield savings account", "Real estate", "Cryptocurrency"],
              correctAnswer: 1,
              explanation: "High-yield savings accounts provide safety and liquidity for short-term goals."
            },
            {
              id: 5,
              question: "What's a long-term savings goal?",
              options: ["Emergency fund", "Vacation next year", "Retirement", "Holiday gifts"],
              correctAnswer: 2,
              explanation: "Retirement is a classic long-term goal, typically 10+ years away."
            },
            {
              id: 6,
              question: "How can you protect long-term savings from inflation?",
              options: ["Keep in checking account", "Invest in growth assets", "Only use savings accounts", "Avoid all risk"],
              correctAnswer: 1,
              explanation: "Growth assets like stocks and real estate can outpace inflation over time."
            },
            {
              id: 7,
              question: "What's the historical average inflation rate?",
              options: ["1%", "3%", "7%", "10%"],
              correctAnswer: 1,
              explanation: "Historically, inflation has averaged around 3% annually in the United States."
            },
            {
              id: 8,
              question: "Should you invest emergency funds?",
              options: ["Yes, always", "No, keep them safe and accessible", "Only in bonds", "Only half of them"],
              correctAnswer: 1,
              explanation: "Emergency funds should remain safe and easily accessible, not subject to market risk."
            },
            {
              id: 9,
              question: "What's dollar-cost averaging?",
              options: ["Buying stocks all at once", "Investing the same amount regularly", "Only buying low-priced stocks", "Avoiding all investments"],
              correctAnswer: 1,
              explanation: "Dollar-cost averaging involves investing the same amount regularly regardless of market conditions."
            },
            {
              id: 10,
              question: "Why might savings accounts lose value over time?",
              options: ["Bank fees only", "Interest rates below inflation", "Market crashes", "Government regulations"],
              correctAnswer: 1,
              explanation: "When savings account interest rates are below inflation, purchasing power decreases over time."
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "Credit & Debt",
    description: "Master credit building and strategic debt management",
    level: "Intermediate",
    duration: "2.5 hours",
    students: 1654,
    topics: [
      "Credit score building",
      "Credit report analysis",
      "Debt types and management",
      "Strategic debt payoff methods"
    ],
    lessons: [
      {
        id: 301,
        title: "Understanding and Building Your Credit Score",
        description: "Learn how credit scores work and strategies to improve them",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understand the factors that influence your credit score and develop a plan to build excellent credit.",
        duration: "40 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is a credit score?",
              options: ["Your bank balance", "A numerical representation of creditworthiness", "Your income level", "Your age"],
              correctAnswer: 1,
              explanation: "A credit score is a three-digit number representing your creditworthiness to lenders."
            },
            {
              id: 2,
              question: "What's the most common credit score range?",
              options: ["0-100", "300-850", "1-10", "100-1000"],
              correctAnswer: 1,
              explanation: "FICO scores range from 300 to 850, with higher scores indicating better creditworthiness."
            },
            {
              id: 3,
              question: "What's the largest factor in your credit score?",
              options: ["Payment history", "Credit utilization", "Length of credit history", "New credit inquiries"],
              correctAnswer: 0,
              explanation: "Payment history accounts for 35% of your FICO score, making it the most important factor."
            },
            {
              id: 4,
              question: "What's considered a good credit score?",
              options: ["500-600", "600-700", "700-850", "300-500"],
              correctAnswer: 2,
              explanation: "Scores of 700 and above are generally considered good to excellent credit."
            },
            {
              id: 5,
              question: "How does credit utilization affect your score?",
              options: ["Higher is better", "Lower is better", "Doesn't matter", "Only matters for new accounts"],
              correctAnswer: 1,
              explanation: "Lower credit utilization (below 30%, ideally below 10%) improves your credit score."
            },
            {
              id: 6,
              question: "How long do late payments stay on your credit report?",
              options: ["1 year", "3 years", "7 years", "Forever"],
              correctAnswer: 2,
              explanation: "Late payments remain on your credit report for up to 7 years."
            },
            {
              id: 7,
              question: "Should you close old credit cards?",
              options: ["Always", "Usually not, if no annual fee", "Only if you have too many", "Only if they're unused"],
              correctAnswer: 1,
              explanation: "Keeping old accounts open helps your credit age and available credit, improving your score."
            },
            {
              id: 8,
              question: "How often should you check your credit score?",
              options: ["Never", "Monthly", "Once a year", "Only when applying for loans"],
              correctAnswer: 1,
              explanation: "Regular monitoring helps you track progress and catch errors or fraud quickly."
            },
            {
              id: 9,
              question: "What's a credit utilization ratio?",
              options: ["Total debt divided by income", "Credit used divided by credit available", "Number of cards owned", "Monthly payments made"],
              correctAnswer: 1,
              explanation: "Credit utilization is the percentage of available credit you're currently using."
            },
            {
              id: 10,
              question: "Can you build credit without a credit card?",
              options: ["No, impossible", "Yes, through loans and other accounts", "Only through family", "Only through employers"],
              correctAnswer: 1,
              explanation: "You can build credit through auto loans, mortgages, student loans, and other credit accounts."
            }
          ]
        }
      },
      {
        id: 302,
        title: "Credit Reports & How to Read Them",
        description: "Understand your credit report and identify areas for improvement",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn to read and interpret your credit report, spot errors, and understand how it impacts your financial life.",
        duration: "35 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "How many major credit bureaus are there in the US?",
              options: ["1", "2", "3", "5"],
              correctAnswer: 2,
              explanation: "The three major credit bureaus are Experian, Equifax, and TransUnion."
            },
            {
              id: 2,
              question: "How often can you get free credit reports?",
              options: ["Monthly", "Annually from each bureau", "Never", "Only when denied credit"],
              correctAnswer: 1,
              explanation: "You're entitled to one free credit report annually from each of the three bureaus."
            },
            {
              id: 3,
              question: "What should you do if you find an error on your credit report?",
              options: ["Ignore it", "Dispute it with the credit bureau", "Contact your bank only", "Wait for it to fix itself"],
              correctAnswer: 1,
              explanation: "Dispute errors directly with the credit bureau and the creditor reporting the error."
            },
            {
              id: 4,
              question: "What information is included in a credit report?",
              options: ["Only payment history", "Personal info, accounts, payments, inquiries", "Just your credit score", "Only negative information"],
              correctAnswer: 1,
              explanation: "Credit reports include personal information, credit accounts, payment history, and inquiries."
            },
            {
              id: 5,
              question: "How long do most negative items stay on credit reports?",
              options: ["2 years", "5 years", "7 years", "Forever"],
              correctAnswer: 2,
              explanation: "Most negative items remain on credit reports for 7 years (bankruptcies can stay for 10 years)."
            },
            {
              id: 6,
              question: "What's a hard inquiry?",
              options: ["Checking your own credit", "A lender checking credit for loan approval", "A soft credit check", "An error on your report"],
              correctAnswer: 1,
              explanation: "Hard inquiries occur when lenders check your credit for loan or credit approval decisions."
            },
            {
              id: 7,
              question: "Do hard inquiries affect your credit score?",
              options: ["No effect", "Yes, temporarily lower it", "Yes, permanently lower it", "Only if denied"],
              correctAnswer: 1,
              explanation: "Hard inquiries can temporarily lower your credit score by a few points for about a year."
            },
            {
              id: 8,
              question: "What's the difference between a credit report and credit score?",
              options: ["No difference", "Report is detailed history, score is a number", "Score is more important", "Report is newer"],
              correctAnswer: 1,
              explanation: "Credit reports contain detailed credit history; credit scores are numerical summaries of that history."
            },
            {
              id: 9,
              question: "Can different bureaus have different information?",
              options: ["No, always identical", "Yes, creditors may report to different bureaus", "Only for errors", "Only for new accounts"],
              correctAnswer: 1,
              explanation: "Creditors may report to different bureaus, so your reports can vary between agencies."
            },
            {
              id: 10,
              question: "What's considered public record information on credit reports?",
              options: ["Credit card payments", "Bankruptcies and tax liens", "Employment history", "Bank balances"],
              correctAnswer: 1,
              explanation: "Public records like bankruptcies, tax liens, and court judgments appear on credit reports."
            }
          ]
        }
      },
      {
        id: 303,
        title: "Loans & Debt Types (Student, Auto, Personal)",
        description: "Understand different types of debt and their characteristics",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn about various debt types, their terms, and how to evaluate loan options effectively.",
        duration: "40 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What's the difference between secured and unsecured debt?",
              options: ["No difference", "Secured has collateral, unsecured doesn't", "Secured is always better", "Unsecured is always cheaper"],
              correctAnswer: 1,
              explanation: "Secured debt is backed by collateral (like a car or house), unsecured debt is not."
            },
            {
              id: 2,
              question: "Which typically has the lowest interest rate?",
              options: ["Credit cards", "Personal loans", "Auto loans", "Payday loans"],
              correctAnswer: 2,
              explanation: "Auto loans typically have lower rates because the car serves as collateral."
            },
            {
              id: 3,
              question: "What's a benefit of federal student loans over private ones?",
              options: ["Always lower rates", "Income-driven repayment options", "No credit check required", "Unlimited borrowing"],
              correctAnswer: 1,
              explanation: "Federal student loans offer income-driven repayment plans and other borrower protections."
            },
            {
              id: 4,
              question: "What is loan amortization?",
              options: ["Paying interest only", "The process of paying off debt over time", "Skipping payments", "Refinancing"],
              correctAnswer: 1,
              explanation: "Amortization is the process of gradually paying off a debt through regular payments."
            },
            {
              id: 5,
              question: "What's typically the most expensive type of debt?",
              options: ["Mortgage", "Auto loan", "Credit card debt", "Student loans"],
              correctAnswer: 2,
              explanation: "Credit card debt typically has the highest interest rates among common debt types."
            },
            {
              id: 6,
              question: "What should you consider when comparing loans?",
              options: ["Only interest rate", "APR, fees, terms, and conditions", "Only monthly payment", "Only the lender's reputation"],
              correctAnswer: 1,
              explanation: "Compare APR (including fees), loan terms, and all conditions, not just interest rates."
            },
            {
              id: 7,
              question: "What's a cosigner?",
              options: ["A secondary borrower", "Someone who signs with you and shares responsibility", "A bank employee", "A guarantor only"],
              correctAnswer: 1,
              explanation: "A cosigner agrees to be equally responsible for the debt if you can't pay."
            },
            {
              id: 8,
              question: "When might you consider a personal loan?",
              options: ["Never", "For debt consolidation or major expenses", "For daily expenses", "Instead of an emergency fund"],
              correctAnswer: 1,
              explanation: "Personal loans can be useful for debt consolidation or major one-time expenses."
            },
            {
              id: 9,
              question: "What's loan-to-value ratio?",
              options: ["Interest rate calculation", "Loan amount divided by asset value", "Monthly payment ratio", "Credit score factor"],
              correctAnswer: 1,
              explanation: "LTV ratio compares the loan amount to the value of the collateral (like a house or car)."
            },
            {
              id: 10,
              question: "Should you always take the longest loan term available?",
              options: ["Yes, for lower payments", "No, consider total interest paid", "Only for large loans", "Only if rates are low"],
              correctAnswer: 1,
              explanation: "Longer terms mean lower payments but more total interest paid over the loan's life."
            }
          ]
        }
      },
      {
        id: 304,
        title: "Avoiding Traps & Paying Down Debt Strategically",
        description: "Learn debt payoff strategies and avoid common financial traps",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Master debt payoff strategies like avalanche and snowball methods while learning to avoid predatory lending.",
        duration: "35 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What's the debt snowball method?",
              options: ["Pay highest interest first", "Pay smallest balance first", "Pay random debts", "Never pay extra"],
              correctAnswer: 1,
              explanation: "The snowball method focuses on paying off the smallest balance first for psychological wins."
            },
            {
              id: 2,
              question: "What's the debt avalanche method?",
              options: ["Pay smallest balance first", "Pay highest interest rate first", "Pay newest debt first", "Pay oldest debt first"],
              correctAnswer: 1,
              explanation: "The avalanche method prioritizes paying off the highest interest rate debt first to save money."
            },
            {
              id: 3,
              question: "Which method saves more money in interest?",
              options: ["Snowball", "Avalanche", "They're the same", "Neither saves money"],
              correctAnswer: 1,
              explanation: "The avalanche method mathematically saves more money by eliminating high-interest debt first."
            },
            {
              id: 4,
              question: "What's a debt consolidation loan?",
              options: ["Taking on more debt", "Combining multiple debts into one", "Avoiding debt payments", "A type of bankruptcy"],
              correctAnswer: 1,
              explanation: "Debt consolidation combines multiple debts into a single loan, often with better terms."
            },
            {
              id: 5,
              question: "What should you avoid with payday loans?",
              options: ["Nothing, they're great", "The high fees and interest rates", "Using them for emergencies", "Getting them from banks"],
              correctAnswer: 1,
              explanation: "Payday loans have extremely high fees and interest rates, often trapping borrowers in debt cycles."
            },
            {
              id: 6,
              question: "What's a minimum payment trap?",
              options: ["Paying too much", "Only paying minimums extends debt indefinitely", "Missing payments", "Paying early"],
              correctAnswer: 1,
              explanation: "Paying only minimums means most payment goes to interest, barely reducing the principal balance."
            },
            {
              id: 7,
              question: "Should you stop investing to pay off debt?",
              options: ["Always", "Depends on interest rates and employer match", "Never", "Only for credit cards"],
              correctAnswer: 1,
              explanation: "Consider the debt interest rate vs. investment returns, and always capture employer 401(k) matches."
            },
            {
              id: 8,
              question: "What's balance transfer strategy?",
              options: ["Moving debt to lower interest accounts", "Increasing credit limits", "Opening more cards", "Closing all accounts"],
              correctAnswer: 0,
              explanation: "Balance transfers move high-interest debt to lower-interest accounts, often with promotional rates."
            },
            {
              id: 9,
              question: "What's debt settlement?",
              options: ["Paying debt in full", "Negotiating to pay less than owed", "Making minimum payments", "Ignoring debt"],
              correctAnswer: 1,
              explanation: "Debt settlement involves negotiating with creditors to accept less than the full amount owed."
            },
            {
              id: 10,
              question: "When should you consider bankruptcy?",
              options: ["First option always", "As a last resort after other options", "For any debt amount", "Never"],
              correctAnswer: 1,
              explanation: "Bankruptcy should be considered only as a last resort when other debt relief options have failed."
            }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: "Banking & Financial Tools",
    description: "Navigate banking options and choose the right financial tools",
    level: "Beginner",
    duration: "2 hours",
    students: 2180,
    topics: [
      "Account types and differences",
      "Bank selection criteria",
      "Online banking security",
      "Essential financial apps"
    ],
    lessons: [
      {
        id: 401,
        title: "Checking vs Savings Accounts",
        description: "Understand the differences and purposes of each account type",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn the key differences between checking and savings accounts and how to use each effectively.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What's the primary purpose of a checking account?",
              options: ["Long-term savings", "Daily transactions", "Investment", "Retirement planning"],
              correctAnswer: 1,
              explanation: "Checking accounts are designed for daily transactions like paying bills and making purchases."
            },
            {
              id: 2,
              question: "What's the primary purpose of a savings account?",
              options: ["Daily spending", "Storing money and earning interest", "Paying bills", "Making purchases"],
              correctAnswer: 1,
              explanation: "Savings accounts are designed to store money safely while earning interest."
            },
            {
              id: 3,
              question: "Which account typically offers higher interest rates?",
              options: ["Checking", "Savings", "They're always the same", "Neither offers interest"],
              correctAnswer: 1,
              explanation: "Savings accounts typically offer higher interest rates than checking accounts."
            },
            {
              id: 4,
              question: "What is Regulation D?",
              options: ["A checking account rule", "Limits certain savings account withdrawals", "A bank fee structure", "An investment regulation"],
              correctAnswer: 1,
              explanation: "Regulation D historically limited certain types of savings account withdrawals to 6 per month."
            },
            {
              id: 5,
              question: "Which account should you use for your emergency fund?",
              options: ["Checking", "Savings", "Investment account", "Credit card"],
              correctAnswer: 1,
              explanation: "Emergency funds should be in savings accounts for safety and modest interest earning."
            },
            {
              id: 6,
              question: "What's overdraft protection?",
              options: ["Free money", "Covers transactions when account is empty", "Prevents all spending", "Increases interest rates"],
              correctAnswer: 1,
              explanation: "Overdraft protection covers transactions when your account balance is insufficient, usually for a fee."
            },
            {
              id: 7,
              question: "Which account typically comes with a debit card?",
              options: ["Savings only", "Checking only", "Both can", "Neither"],
              correctAnswer: 2,
              explanation: "Both checking and savings accounts can come with debit cards, though checking is more common."
            },
            {
              id: 8,
              question: "What's a minimum balance requirement?",
              options: ["Maximum you can deposit", "Minimum to keep account open or avoid fees", "Interest rate threshold", "Credit score requirement"],
              correctAnswer: 1,
              explanation: "Minimum balance requirements are amounts you must maintain to keep accounts open or avoid fees."
            },
            {
              id: 9,
              question: "Should you have both checking and savings accounts?",
              options: ["No, choose one", "Yes, for different purposes", "Only if wealthy", "Only if required"],
              correctAnswer: 1,
              explanation: "Having both accounts helps separate daily spending money from savings and emergency funds."
            },
            {
              id: 10,
              question: "What's the difference in liquidity between the accounts?",
              options: ["No difference", "Checking is more liquid", "Savings is more liquid", "Neither is liquid"],
              correctAnswer: 1,
              explanation: "Checking accounts offer more liquidity with easier access for daily transactions."
            }
          ]
        }
      },
      {
        id: 402,
        title: "Choosing the Right Bank or Credit Union",
        description: "Compare banking options and select the best fit for your needs",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn how to evaluate banks and credit unions to find the best banking partner for your financial needs.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What's the main difference between banks and credit unions?",
              options: ["No difference", "Credit unions are member-owned, banks are for-profit", "Banks are always better", "Credit unions are only for businesses"],
              correctAnswer: 1,
              explanation: "Credit unions are member-owned cooperatives, while banks are for-profit institutions."
            },
            {
              id: 2,
              question: "Which typically offers better rates and lower fees?",
              options: ["Big banks", "Credit unions", "Online banks", "It varies"],
              correctAnswer: 3,
              explanation: "Credit unions and online banks often offer better rates, but it varies by institution."
            },
            {
              id: 3,
              question: "What should you consider when choosing a bank?",
              options: ["Only interest rates", "Fees, convenience, services, and rates", "Only location", "Only brand name"],
              correctAnswer: 1,
              explanation: "Consider fees, convenience, available services, interest rates, and your specific needs."
            },
            {
              id: 4,
              question: "What's an advantage of online banks?",
              options: ["Physical branches everywhere", "Higher interest rates and lower fees", "More complex services", "Better for cash deposits"],
              correctAnswer: 1,
              explanation: "Online banks often offer higher interest rates and lower fees due to reduced overhead costs."
            },
            {
              id: 5,
              question: "What's a disadvantage of online banks?",
              options: ["Lower interest rates", "Limited physical locations", "Higher fees", "Poor security"],
              correctAnswer: 1,
              explanation: "Online banks have limited or no physical branches, which some customers prefer for service."
            },
            {
              id: 6,
              question: "What does FDIC insurance protect?",
              options: ["Investments", "Deposits up to $250,000 per depositor", "All money regardless of amount", "Only checking accounts"],
              correctAnswer: 1,
              explanation: "FDIC insurance protects deposits up to $250,000 per depositor per insured bank."
            },
            {
              id: 7,
              question: "What's the credit union equivalent of FDIC insurance?",
              options: ["NCUA insurance", "No equivalent", "FDIC also covers credit unions", "State insurance only"],
              correctAnswer: 0,
              explanation: "NCUA (National Credit Union Administration) provides similar insurance for credit union deposits."
            },
            {
              id: 8,
              question: "Should you consider multiple banks?",
              options: ["No, too complicated", "Yes, for different needs and better rates", "Only if required", "Only for wealthy people"],
              correctAnswer: 1,
              explanation: "Using multiple banks can help you access better rates and services for different needs."
            },
            {
              id: 9,
              question: "What's important about ATM networks?",
              options: ["Not important", "Access and fees for withdrawals", "Only the number of ATMs", "Only for business accounts"],
              correctAnswer: 1,
              explanation: "Consider ATM access and fees, especially if you frequently need cash withdrawals."
            },
            {
              id: 10,
              question: "How can you join a credit union?",
              options: ["Anyone can join any credit union", "Meet membership requirements", "Only through employers", "Only if you're wealthy"],
              correctAnswer: 1,
              explanation: "Credit unions have membership requirements based on location, employer, organization, or family."
            }
          ]
        }
      },
      {
        id: 403,
        title: "Online & Mobile Banking Safety",
        description: "Protect yourself while banking digitally",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn essential security practices for safe online and mobile banking.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What's the most important security practice for online banking?",
              options: ["Using public WiFi", "Strong, unique passwords", "Sharing login info with family", "Banking only on weekends"],
              correctAnswer: 1,
              explanation: "Strong, unique passwords are essential for protecting your banking accounts from unauthorized access."
            },
            {
              id: 2,
              question: "Should you bank on public WiFi?",
              options: ["Yes, it's convenient", "No, it's not secure", "Only for checking balances", "Only with VPN"],
              correctAnswer: 1,
              explanation: "Public WiFi is not secure and could expose your banking information to criminals."
            },
            {
              id: 3,
              question: "What is two-factor authentication (2FA)?",
              options: ["Using two passwords", "Extra security layer with second verification", "Banking twice per day", "Two different banks"],
              correctAnswer: 1,
              explanation: "2FA adds security by requiring a second form of verification beyond your password."
            },
            {
              id: 4,
              question: "How often should you check your bank statements?",
              options: ["Once a year", "Monthly", "Weekly or more frequently", "Only when problems arise"],
              correctAnswer: 2,
              explanation: "Regular monitoring helps you catch unauthorized transactions and errors quickly."
            },
            {
              id: 5,
              question: "What should you do if you see unauthorized transactions?",
              options: ["Ignore small amounts", "Contact your bank immediately", "Wait to see if more appear", "Handle it yourself"],
              correctAnswer: 1,
              explanation: "Contact your bank immediately to report unauthorized transactions and protect your account."
            },
            {
              id: 6,
              question: "Is it safe to save passwords in your browser?",
              options: ["Always safe", "Risky, especially on shared computers", "Only for banking", "Required by banks"],
              correctAnswer: 1,
              explanation: "Saving passwords in browsers can be risky, especially on shared or public computers."
            },
            {
              id: 7,
              question: "What's phishing in banking context?",
              options: ["A type of investment", "Fake emails or sites to steal login info", "A banking fee", "Online fishing games"],
              correctAnswer: 1,
              explanation: "Phishing involves fake emails or websites designed to steal your banking credentials."
            },
            {
              id: 8,
              question: "Should you click links in banking emails?",
              options: ["Always", "Never, type URLs directly", "Only from your bank", "Only if they look official"],
              correctAnswer: 1,
              explanation: "Always type bank URLs directly into your browser rather than clicking email links."
            },
            {
              id: 9,
              question: "What's a good practice when logging out?",
              options: ["Just close the browser", "Use the official logout button", "Never log out", "Clear history only"],
              correctAnswer: 1,
              explanation: "Always use the official logout button to properly end your banking session."
            },
            {
              id: 10,
              question: "Should you use banking apps on your phone?",
              options: ["Never", "Yes, they're generally secure", "Only for checking balances", "Only on new phones"],
              correctAnswer: 1,
              explanation: "Official banking apps are generally secure and often more secure than mobile web browsers."
            }
          ]
        }
      },
      {
        id: 404,
        title: "Must-Have Apps & Digital Finance Tools",
        description: "Discover essential apps and tools for managing your finances",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Explore the best digital tools and apps to help you budget, save, invest, and manage your financial life.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What type of app helps you track expenses automatically?",
              options: ["Gaming apps", "Budgeting apps", "Social media apps", "Weather apps"],
              correctAnswer: 1,
              explanation: "Budgeting apps can connect to your accounts and automatically categorize transactions."
            },
            {
              id: 2,
              question: "What should you look for in a financial app?",
              options: ["Fancy graphics only", "Security, functionality, and good reviews", "Highest price", "Most downloads"],
              correctAnswer: 1,
              explanation: "Prioritize security features, useful functionality, and positive user reviews when choosing financial apps."
            },
            {
              id: 3,
              question: "What's the benefit of investment apps?",
              options: ["Guaranteed returns", "Easy access to investing with low minimums", "No fees ever", "Automatic profits"],
              correctAnswer: 1,
              explanation: "Investment apps make investing accessible with low minimums and user-friendly interfaces."
            },
            {
              id: 4,
              question: "Should you connect all your accounts to financial apps?",
              options: ["Always", "Consider security and necessity", "Never", "Only checking accounts"],
              correctAnswer: 1,
              explanation: "Consider the app's security measures and whether the benefits outweigh the risks."
            },
            {
              id: 5,
              question: "What's a robo-advisor?",
              options: ["A human advisor", "Automated investment management", "A budgeting tool", "A banking app"],
              correctAnswer: 1,
              explanation: "Robo-advisors are digital platforms that provide automated investment management services."
            },
            {
              id: 6,
              question: "What's the advantage of payment apps like Venmo or PayPal?",
              options: ["Always free", "Convenient money transfers", "Investment opportunities", "Credit building"],
              correctAnswer: 1,
              explanation: "Payment apps make it convenient to send and receive money digitally."
            },
            {
              id: 7,
              question: "Should you pay for financial apps?",
              options: ["Never pay for apps", "Consider if features justify the cost", "Always pay for better security", "Only free apps are good"],
              correctAnswer: 1,
              explanation: "Evaluate whether paid app features provide enough value to justify the cost."
            },
            {
              id: 8,
              question: "What's important about app permissions?",
              options: ["Grant all permissions", "Review and only grant necessary ones", "Never grant any", "Permissions don't matter"],
              correctAnswer: 1,
              explanation: "Review app permissions carefully and only grant access that's necessary for functionality."
            },
            {
              id: 9,
              question: "How can apps help with saving?",
              options: ["They can't help", "Automatic transfers and round-ups", "By spending more", "Only through investments"],
              correctAnswer: 1,
              explanation: "Apps can automate savings through features like round-ups and scheduled transfers."
            },
            {
              id: 10,
              question: "What's a credit monitoring app?",
              options: ["Tracks spending only", "Monitors credit score and report changes", "Manages credit cards", "Pays bills automatically"],
              correctAnswer: 1,
              explanation: "Credit monitoring apps track changes to your credit score and report, alerting you to potential issues."
            }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: "Income & Careers",
    description: "Maximize your earning potential and understand your paycheck",
    level: "Intermediate",
    duration: "2.5 hours",
    students: 1430,
    topics: [
      "Paycheck components and deductions",
      "Side hustle opportunities",
      "Salary negotiation tactics",
      "Career growth planning"
    ],
    lessons: [
      {
        id: 501,
        title: "Understanding Your Paycheck (Gross, Net, Deductions)",
        description: "Learn what each line item on your paycheck means",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Decode your paycheck to understand gross pay, net pay, and all the deductions that affect your take-home income.",
        duration: "35 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is gross pay?",
              options: ["Pay after taxes", "Total pay before deductions", "Only overtime pay", "Net pay minus taxes"],
              correctAnswer: 1,
              explanation: "Gross pay is your total compensation before any taxes or deductions are taken out."
            },
            {
              id: 2,
              question: "What is net pay?",
              options: ["Pay before taxes", "Take-home pay after deductions", "Only base salary", "Gross pay plus bonuses"],
              correctAnswer: 1,
              explanation: "Net pay is what you actually receive after all taxes and deductions are subtracted."
            },
            {
              id: 3,
              question: "What does FICA stand for?",
              options: ["Federal Income Credit Amount", "Federal Insurance Contributions Act", "Financial Income Control Act", "Federal Investment Credit Association"],
              correctAnswer: 1,
              explanation: "FICA taxes fund Social Security and Medicare programs."
            },
            {
              id: 4,
              question: "What percentage is the Social Security tax rate for employees?",
              options: ["6.2%", "7.65%", "15.3%", "12.4%"],
              correctAnswer: 0,
              explanation: "Employees pay 6.2% for Social Security (employers match this for a total of 12.4%)."
            },
            {
              id: 5,
              question: "What is the Medicare tax rate?",
              options: ["1.45%", "2.9%", "6.2%", "3.8%"],
              correctAnswer: 0,
              explanation: "The Medicare tax rate is 1.45% for employees (employers match for a total of 2.9%)."
            },
            {
              id: 6,
              question: "What are pre-tax deductions?",
              options: ["Deductions after taxes", "Deductions that reduce taxable income", "Only health insurance", "Voluntary deductions only"],
              correctAnswer: 1,
              explanation: "Pre-tax deductions reduce your taxable income, lowering the amount of taxes you pay."
            },
            {
              id: 7,
              question: "Which is typically a pre-tax deduction?",
              options: ["401(k) contributions", "Union dues", "Garnishments", "Life insurance premiums"],
              correctAnswer: 0,
              explanation: "401(k) contributions are usually pre-tax, reducing your current taxable income."
            },
            {
              id: 8,
              question: "What affects how much federal income tax is withheld?",
              options: ["Only your salary", "Filing status and allowances on W-4", "State of residence only", "Company size"],
              correctAnswer: 1,
              explanation: "Your W-4 form determines federal tax withholding based on filing status and allowances."
            },
            {
              id: 9,
              question: "Why might you owe taxes despite paycheck withholding?",
              options: ["Withholding is always perfect", "Insufficient withholding for your situation", "You earned too little", "Only businesses owe taxes"],
              correctAnswer: 1,
              explanation: "If withholding doesn't cover your actual tax liability, you'll owe money when filing."
            },
            {
              id: 10,
              question: "What should you do if your paycheck seems wrong?",
              options: ["Ignore it", "Contact HR or payroll immediately", "Wait until next paycheck", "Assume it's correct"],
              correctAnswer: 1,
              explanation: "Always verify paycheck accuracy and report discrepancies to HR or payroll promptly."
            }
          ]
        }
      },
      {
        id: 502,
        title: "Side Hustles & Passive Income Ideas",
        description: "Explore ways to earn additional income beyond your primary job",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Discover various side hustle opportunities and passive income strategies to boost your earnings.",
        duration: "40 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What's the difference between active and passive income?",
              options: ["No difference", "Active requires ongoing work, passive doesn't", "Passive is always better", "Active is always taxed higher"],
              correctAnswer: 1,
              explanation: "Active income requires ongoing work, while passive income generates money with minimal ongoing effort."
            },
            {
              id: 2,
              question: "Which is an example of a side hustle?",
              options: ["Your full-time job", "Freelance writing", "Watching TV", "Sleeping"],
              correctAnswer: 1,
              explanation: "Freelance writing is work done outside your main job to earn additional income."
            },
            {
              id: 3,
              question: "What's an example of passive income?",
              options: ["Uber driving", "Rental property income", "Freelance work", "Part-time job"],
              correctAnswer: 1,
              explanation: "Rental property can generate income without daily active involvement."
            },
            {
              id: 4,
              question: "What should you consider before starting a side hustle?",
              options: ["Nothing", "Time, skills, market demand, and employer policies", "Only potential income", "Only time required"],
              correctAnswer: 1,
              explanation: "Consider your available time, relevant skills, market demand, and any employer restrictions."
            },
            {
              id: 5,
              question: "How are side hustle earnings typically taxed?",
              options: ["Tax-free", "As self-employment income", "Same as regular salary", "Lower tax rate"],
              correctAnswer: 1,
              explanation: "Side hustle income is usually subject to self-employment tax in addition to income tax."
            },
            {
              id: 6,
              question: "What's important about tracking side hustle expenses?",
              options: ["Not necessary", "Can be tax-deductible", "Only for large businesses", "Only if profitable"],
              correctAnswer: 1,
              explanation: "Business expenses for side hustles can often be deducted, reducing your taxable income."
            },
            {
              id: 7,
              question: "Which platform is commonly used for freelance work?",
              options: ["Facebook", "Upwork", "Instagram", "YouTube"],
              correctAnswer: 1,
              explanation: "Upwork is a popular platform connecting freelancers with clients for various services."
            },
            {
              id: 8,
              question: "What's a risk of depending too heavily on side hustle income?",
              options: ["No risks", "Income instability", "Too much money", "Automatic success"],
              correctAnswer: 1,
              explanation: "Side hustle income can be unpredictable, so don't rely on it for essential expenses."
            },
            {
              id: 9,
              question: "How can you turn a hobby into income?",
              options: ["It's impossible", "Monetize skills through services or products", "Only through employment", "Hobbies can't make money"],
              correctAnswer: 1,
              explanation: "Many hobbies can be monetized through teaching, selling products, or offering services."
            },
            {
              id: 10,
              question: "What's important about scaling a side hustle?",
              options: ["Always scale immediately", "Consider time investment vs. income potential", "Never scale", "Only scale if full-time"],
              correctAnswer: 1,
              explanation: "Evaluate whether the time and effort required to scale provides proportional income benefits."
            }
          ]
        }
      },
      {
        id: 503,
        title: "Negotiating Salary & Growing Your Career",
        description: "Learn to advocate for yourself and advance professionally",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Master salary negotiation techniques and career development strategies to maximize your earning potential.",
        duration: "40 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "When is the best time to negotiate salary?",
              options: ["After accepting an offer", "During the interview process", "Your first day", "Never"],
              correctAnswer: 1,
              explanation: "The best time to negotiate is after receiving an offer but before accepting it."
            },
            {
              id: 2,
              question: "What should you research before salary negotiation?",
              options: ["Nothing", "Market rates for your role and location", "Only company profits", "Only your current salary"],
              correctAnswer: 1,
              explanation: "Research market rates, company compensation, and your value to negotiate effectively."
            },
            {
              id: 3,
              question: "What besides salary can you negotiate?",
              options: ["Nothing else", "Benefits, vacation, flexible work, title", "Only vacation time", "Only benefits"],
              correctAnswer: 1,
              explanation: "Total compensation includes benefits, vacation time, flexible work arrangements, and job title."
            },
            {
              id: 4,
              question: "How should you present your salary request?",
              options: ["Demand the highest amount", "Present a well-researched range with justification", "Ask for whatever sounds good", "Let them decide everything"],
              correctAnswer: 1,
              explanation: "Present a researched range with specific justification based on your value and market rates."
            },
            {
              id: 5,
              question: "What's important for career growth?",
              options: ["Only working hard", "Continuous learning and networking", "Staying in one role forever", "Avoiding new challenges"],
              correctAnswer: 1,
              explanation: "Career growth requires continuous skill development, networking, and seeking new opportunities."
            },
            {
              id: 6,
              question: "How often should you update your resume?",
              options: ["Only when job searching", "Regularly as you gain experience", "Never", "Once per decade"],
              correctAnswer: 1,
              explanation: "Keep your resume current by updating it regularly as you gain new skills and experience."
            },
            {
              id: 7,
              question: "What's the value of professional networking?",
              options: ["No value", "Access to opportunities and advice", "Only for sales people", "Only for executives"],
              correctAnswer: 1,
              explanation: "Networking provides access to job opportunities, mentorship, and industry insights."
            },
            {
              id: 8,
              question: "Should you negotiate salary for internal promotions?",
              options: ["Never", "Yes, research and prepare like external negotiations", "Only if they offer first", "Only for big promotions"],
              correctAnswer: 1,
              explanation: "Internal promotions deserve the same negotiation preparation as external job offers."
            },
            {
              id: 9,
              question: "What if your employer says no to your salary request?",
              options: ["Accept defeat", "Ask what you can do to earn it in the future", "Quit immediately", "Never ask again"],
              correctAnswer: 1,
              explanation: "If denied, ask for specific criteria or timeline for earning the increase in the future."
            },
            {
              id: 10,
              question: "How can you demonstrate value to your employer?",
              options: ["Just show up", "Document achievements and quantify impact", "Work longer hours only", "Complain about salary"],
              correctAnswer: 1,
              explanation: "Document your achievements and quantify your impact on the company's success."
            }
          ]
        }
      },
      {
        id: 504,
        title: "Planning for Future Income Growth",
        description: "Develop strategies for long-term income and career advancement",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Create a roadmap for increasing your income and advancing your career over time.",
        duration: "35 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What's important for long-term income growth?",
              options: ["Staying in one job forever", "Continuous skill development", "Avoiding all risks", "Working more hours only"],
              correctAnswer: 1,
              explanation: "Continuous learning and skill development are key to increasing your value and income over time."
            },
            {
              id: 2,
              question: "How often should you review your career goals?",
              options: ["Never", "Annually or when circumstances change", "Once in your lifetime", "Only when unhappy"],
              correctAnswer: 1,
              explanation: "Regular review helps ensure your career path aligns with your evolving goals and market conditions."
            },
            {
              id: 3,
              question: "What's the value of additional education or certifications?",
              options: ["Always unnecessary", "Can increase earning potential and opportunities", "Only for teachers", "Only for entry-level workers"],
              correctAnswer: 1,
              explanation: "Additional qualifications can lead to higher-paying positions and new career opportunities."
            },
            {
              id: 4,
              question: "Should you consider changing careers for income growth?",
              options: ["Never change careers", "Consider if it aligns with goals and offers better prospects", "Always change for more money", "Only if forced"],
              correctAnswer: 1,
              explanation: "Career changes can be strategic if they offer better growth prospects and align with your goals."
            },
            {
              id: 5,
              question: "What's the importance of industry trends?",
              options: ["Not important", "Help identify growing fields and opportunities", "Only for investors", "Only for business owners"],
              correctAnswer: 1,
              explanation: "Understanding industry trends helps you position yourself in growing fields with better income potential."
            },
            {
              id: 6,
              question: "How can mentorship help with income growth?",
              options: ["It can't help", "Provides guidance and opens doors", "Only for new graduates", "Only in large companies"],
              correctAnswer: 1,
              explanation: "Mentors can provide valuable advice, connections, and insights that accelerate career growth."
            },
            {
              id: 7,
              question: "What's the role of performance reviews in income planning?",
              options: ["No role", "Opportunity to discuss growth and compensation", "Only for negative feedback", "Only for entry-level employees"],
              correctAnswer: 1,
              explanation: "Performance reviews are opportunities to discuss career development and compensation goals."
            },
            {
              id: 8,
              question: "Should you develop multiple income streams?",
              options: ["No, too complicated", "Yes, for financial security and growth", "Only if unemployed", "Only for entrepreneurs"],
              correctAnswer: 1,
              explanation: "Multiple income streams provide financial security and additional growth opportunities."
            },
            {
              id: 9,
              question: "What's important about personal branding for income growth?",
              options: ["Not important", "Helps establish expertise and attract opportunities", "Only for celebrities", "Only for salespeople"],
              correctAnswer: 1,
              explanation: "Personal branding helps establish your expertise and can attract better opportunities and higher compensation."
            },
            {
              id: 10,
              question: "How far ahead should you plan your career?",
              options: ["No planning needed", "5-10 years with flexibility for changes", "Exactly plan every detail", "Only plan next month"],
              correctAnswer: 1,
              explanation: "Long-term planning with flexibility allows you to work toward goals while adapting to opportunities."
            }
          ]
        }
      }
    ]
  },
  {
    id: 6,
    title: "Taxes",
    description: "Navigate the tax system and optimize your filing strategy",
    level: "Intermediate",
    duration: "2.5 hours",
    students: 1320,
    topics: [
      "Tax fundamentals",
      "Employment types and tax implications",
      "Filing processes and requirements",
      "Deductions and credits optimization"
    ],
    lessons: [
      {
        id: 601,
        title: "Taxes 101: What They Are and Why We Pay Them",
        description: "Understand the basics of the tax system and your obligations",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn the fundamentals of taxation, different types of taxes, and how they fund government services.",
        duration: "40 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is the primary purpose of income taxes?",
              options: ["To punish workers", "To fund government services", "To make people poor", "To benefit businesses only"],
              correctAnswer: 1,
              explanation: "Income taxes fund government services like roads, schools, defense, and social programs."
            },
            {
              id: 2,
              question: "What does 'progressive tax system' mean?",
              options: ["Taxes decrease as income increases", "Higher earners pay higher rates", "Everyone pays the same rate", "Only the poor pay taxes"],
              correctAnswer: 1,
              explanation: "In a progressive system, tax rates increase as taxable income increases."
            },
            {
              id: 3,
              question: "What is taxable income?",
              options: ["Gross income", "Income after deductions and exemptions", "Only salary", "Only investment income"],
              correctAnswer: 1,
              explanation: "Taxable income is your gross income minus allowable deductions and exemptions."
            },
            {
              id: 4,
              question: "What are tax brackets?",
              options: ["Types of taxes", "Income ranges with different tax rates", "Tax forms", "Filing deadlines"],
              correctAnswer: 1,
              explanation: "Tax brackets are income ranges that determine the rate at which income is taxed."
            },
            {
              id: 5,
              question: "Do you pay the highest bracket rate on all your income?",
              options: ["Yes, on all income", "No, only on income within each bracket", "Only on the first dollar", "Only on the last dollar"],
              correctAnswer: 1,
              explanation: "Marginal tax rates mean you pay different rates on income within each bracket."
            },
            {
              id: 6,
              question: "What is FICA tax used for?",
              options: ["Roads and bridges", "Social Security and Medicare", "Education only", "Military only"],
              correctAnswer: 1,
              explanation: "FICA taxes fund Social Security and Medicare programs."
            },
            {
              id: 7,
              question: "What's the difference between federal and state taxes?",
              options: ["No difference", "Federal goes to US government, state to state government", "State taxes are always higher", "Federal taxes are optional"],
              correctAnswer: 1,
              explanation: "Federal taxes fund national programs, while state taxes fund state-level services."
            },
            {
              id: 8,
              question: "When are federal income taxes typically due?",
              options: ["December 31", "April 15", "January 1", "June 30"],
              correctAnswer: 1,
              explanation: "Federal income tax returns are typically due on April 15th (or the next business day)."
            },
            {
              id: 9,
              question: "What happens if you don't pay taxes owed?",
              options: ["Nothing", "Penalties, interest, and potential legal action", "Just a warning", "They forget about it"],
              correctAnswer: 1,
              explanation: "The IRS can impose penalties, interest, and take collection actions for unpaid taxes."
            },
            {
              id: 10,
              question: "Can you get money back when filing taxes?",
              options: ["Never", "Yes, if you overpaid through withholding", "Only if you're wealthy", "Only if you owe money"],
              correctAnswer: 1,
              explanation: "Tax refunds occur when your withholding or estimated payments exceed your actual tax liability."
            }
          ]
        }
      },
      {
        id: 602,
        title: "W-2 vs 1099: Employee vs Contractor",
        description: "Understand the tax implications of different employment types",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn the key differences between employee and contractor status and how each affects your taxes.",
        duration: "35 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is a W-2 form?",
              options: ["Contract agreement", "Tax form showing employee wages and withholdings", "Business license", "Insurance form"],
              correctAnswer: 1,
              explanation: "A W-2 shows your annual wages, tips, and tax withholdings as an employee."
            },
            {
              id: 2,
              question: "What is a 1099 form?",
              options: ["Employee wage form", "Form for independent contractor payments", "Tax return", "Bank statement"],
              correctAnswer: 1,
              explanation: "Form 1099 reports payments made to independent contractors and freelancers."
            },
            {
              id: 3,
              question: "Who pays the employer portion of FICA taxes for contractors?",
              options: ["The employer", "The contractor pays both portions", "The government", "No one"],
              correctAnswer: 1,
              explanation: "Independent contractors pay both the employee and employer portions of FICA taxes (self-employment tax)."
            },
            {
              id: 4,
              question: "What is self-employment tax?",
              options: ["Extra tax for being self-employed", "Combined Social Security and Medicare tax for contractors", "Tax on business profits only", "Voluntary tax"],
              correctAnswer: 1,
              explanation: "Self-employment tax covers Social Security and Medicare for independent contractors (15.3% total)."
            },
            {
              id: 5,
              question: "Do contractors receive benefits like health insurance?",
              options: ["Always", "Typically no, they're independent", "Only large contractors", "Only in certain states"],
              correctAnswer: 1,
              explanation: "Independent contractors typically don't receive employee benefits and must provide their own."
            },
            {
              id: 6,
              question: "How do contractors handle tax withholding?",
              options: ["Employer handles it", "Make quarterly estimated tax payments", "Pay annually only", "No payments required"],
              correctAnswer: 1,
              explanation: "Contractors usually make quarterly estimated tax payments since no taxes are withheld."
            },
            {
              id: 7,
              question: "Can contractors deduct business expenses?",
              options: ["Never", "Yes, legitimate business expenses", "Only large expenses", "Only if incorporated"],
              correctAnswer: 1,
              explanation: "Independent contractors can deduct legitimate business expenses from their income."
            },
            {
              id: 8,
              question: "What determines if you're an employee or contractor?",
              options: ["Your preference", "Degree of control and independence", "Amount of pay", "Type of work only"],
              correctAnswer: 1,
              explanation: "The IRS considers factors like control, financial relationship, and type of relationship."
            },
            {
              id: 9,
              question: "What's the minimum to receive a 1099?",
              options: ["$1", "$600", "$1,000", "$5,000"],
              correctAnswer: 1,
              explanation: "Businesses must issue 1099s for non-employee compensation of $600 or more."
            },
            {
              id: 10,
              question: "Can someone be both an employee and contractor?",
              options: ["Never", "Yes, for different employers or roles", "Only in certain industries", "Only if part-time"],
              correctAnswer: 1,
              explanation: "You can be an employee for one company and an independent contractor for another."
            }
          ]
        }
      },
      {
        id: 603,
        title: "Filing Your First Tax Return",
        description: "Navigate the process of preparing and filing your tax return",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn step-by-step how to prepare and file your first tax return, including required documents and deadlines.",
        duration: "40 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What documents do you need to file taxes as an employee?",
              options: ["Only bank statements", "W-2 forms and any other income documents", "Just pay stubs", "Only receipts"],
              correctAnswer: 1,
              explanation: "You need W-2s from all employers plus any 1099s or other income documentation."
            },
            {
              id: 2,
              question: "What is the standard deduction?",
              options: ["A business expense", "A fixed amount you can deduct without itemizing", "Required for everyone", "Only for homeowners"],
              correctAnswer: 1,
              explanation: "The standard deduction is a fixed amount you can deduct from income without itemizing expenses."
            },
            {
              id: 3,
              question: "When should you itemize deductions instead of taking the standard deduction?",
              options: ["Always", "When itemized deductions exceed the standard deduction", "Never", "Only if wealthy"],
              correctAnswer: 1,
              explanation: "Itemize only when your total itemized deductions exceed the standard deduction amount."
            },
            {
              id: 4,
              question: "What is AGI?",
              options: ["After-tax income", "Adjusted Gross Income", "Annual Government Income", "Average Gross Income"],
              correctAnswer: 1,
              explanation: "AGI (Adjusted Gross Income) is your total income minus specific deductions."
            },
            {
              id: 5,
              question: "Can you file taxes online for free?",
              options: ["Never", "Yes, through IRS Free File or other programs", "Only if you pay", "Only for businesses"],
              correctAnswer: 1,
              explanation: "The IRS offers Free File and many companies provide free filing for simple returns."
            },
            {
              id: 6,
              question: "What happens if you file your return late?",
              options: ["Nothing", "Penalties and interest on amount owed", "Just a warning", "They file for you"],
              correctAnswer: 1,
              explanation: "Late filing can result in penalties and interest, especially if you owe taxes."
            },
            {
              id: 7,
              question: "Should you file even if you don't owe taxes?",
              options: ["No, waste of time", "Yes, to claim refunds and establish filing history", "Only if required", "Only every other year"],
              correctAnswer: 1,
              explanation: "Filing even when not required can help you claim refunds and establish a filing history."
            },
            {
              id: 8,
              question: "How long should you keep tax records?",
              options: ["1 year", "At least 3-7 years", "Forever", "Until next filing"],
              correctAnswer: 1,
              explanation: "Keep tax records for at least 3-7 years depending on your situation and potential audits."
            },
            {
              id: 9,
              question: "What if you made a mistake on your filed return?",
              options: ["Nothing you can do", "File an amended return (Form 1040X)", "File a new return", "Call and explain"],
              correctAnswer: 1,
              explanation: "Use Form 1040X to amend a previously filed return to correct errors."
            },
            {
              id: 10,
              question: "Can you get help with tax preparation?",
              options: ["No help available", "Yes, from tax professionals, software, or volunteer programs", "Only if you pay a lot", "Only for businesses"],
              correctAnswer: 1,
              explanation: "Many resources exist including paid preparers, software, and free volunteer programs."
            }
          ]
        }
      },
      {
        id: 604,
        title: "Deductions, Credits & Filing Tools",
        description: "Maximize your tax savings and choose the right filing method",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn about tax deductions, credits, and various tools available to help you file your taxes efficiently.",
        duration: "35 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What's the difference between a deduction and a credit?",
              options: ["No difference", "Deductions reduce taxable income, credits reduce tax owed", "Credits are always better", "Deductions are always better"],
              correctAnswer: 1,
              explanation: "Deductions reduce the income that's taxed, while credits directly reduce the tax you owe."
            },
            {
              id: 2,
              question: "Which is typically more valuable?",
              options: ["Always deductions", "Usually credits", "They're always equal", "Depends on tax bracket only"],
              correctAnswer: 1,
              explanation: "Credits are usually more valuable because they directly reduce tax owed dollar-for-dollar."
            },
            {
              id: 3,
              question: "What is the Earned Income Tax Credit (EITC)?",
              options: ["Credit for wealthy taxpayers", "Refundable credit for low-to-moderate income workers", "Deduction for business owners", "Credit for retirees only"],
              correctAnswer: 1,
              explanation: "EITC is a refundable credit designed to help low-to-moderate income working individuals and families."
            },
            {
              id: 4,
              question: "What does 'refundable credit' mean?",
              options: ["Can be returned to store", "Can result in refund even if no tax owed", "Only for business expenses", "Must be paid back"],
              correctAnswer: 1,
              explanation: "Refundable credits can result in a refund even if you owe no tax or the credit exceeds your tax liability."
            },
            {
              id: 5,
              question: "Which expenses might be deductible for employees?",
              options: ["All work expenses", "Very limited work expenses (unreimbursed, over 2% AGI)", "Only business owners can deduct", "No employee expenses"],
              correctAnswer: 1,
              explanation: "Most employee work expenses are no longer deductible under current tax law, with limited exceptions."
            },
            {
              id: 6,
              question: "What is the Child Tax Credit?",
              options: ["Credit for childcare expenses", "Credit for having qualifying children", "Deduction for children's clothes", "Credit for adoption only"],
              correctAnswer: 1,
              explanation: "The Child Tax Credit provides a credit for each qualifying child under 17."
            },
            {
              id: 7,
              question: "Can you deduct charitable contributions?",
              options: ["Never", "Yes, if you itemize and they're to qualified organizations", "Only business donations", "Only large amounts"],
              correctAnswer: 1,
              explanation: "Charitable contributions to qualified organizations can be deducted if you itemize."
            },
            {
              id: 8,
              question: "What are some popular tax software options?",
              options: ["Only expensive professional software", "TurboTax, H&R Block, FreeTaxUSA, others", "Only government software", "No software available"],
              correctAnswer: 1,
              explanation: "Many tax software options exist ranging from free to paid versions with different features."
            },
            {
              id: 9,
              question: "Should you pay for tax preparation if your return is simple?",
              options: ["Always pay for professional help", "Consider free options for simple returns", "Never pay for help", "Only pay if wealthy"],
              correctAnswer: 1,
              explanation: "Simple returns can often be prepared for free using software or volunteer programs."
            },
            {
              id: 10,
              question: "What records should you keep for deductions?",
              options: ["No records needed", "Receipts, statements, and documentation", "Only verbal agreements", "Only bank statements"],
              correctAnswer: 1,
              explanation: "Keep detailed records including receipts, statements, and documentation to support any deductions claimed."
            }
          ]
        }
      }
    ]
  },
  {
    id: 7,
    title: "Investing (Beginner Level)",
    description: "Start your investment journey with fundamental concepts",
    level: "Intermediate",
    duration: "3 hours",
    students: 1120,
    topics: [
      "Investment fundamentals and compound growth",
      "Basic investment types and vehicles",
      "Risk management and portfolio diversification",
      "Retirement account basics"
    ],
    lessons: [
      {
        id: 701,
        title: "Why Investing Is Crucial (Compound Growth & Inflation)",
        description: "Understand the power of compound interest and the necessity of investing",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn why investing is essential for building wealth and protecting your money from inflation over time.",
        duration: "45 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is compound interest?",
              options: ["Simple interest", "Interest earned on both principal and previous interest", "High interest rates", "Government interest"],
              correctAnswer: 1,
              explanation: "Compound interest is when you earn interest on both your original investment and previously earned interest."
            },
            {
              id: 2,
              question: "Why is time important for investing?",
              options: ["It's not important", "More time allows compound growth to work", "Markets only go up with time", "Older investors are smarter"],
              correctAnswer: 1,
              explanation: "Time allows compound interest to work its magic, with returns generating their own returns."
            },
            {
              id: 3,
              question: "How does inflation affect your purchasing power?",
              options: ["Increases it", "Decreases it over time", "No effect", "Only affects investments"],
              correctAnswer: 1,
              explanation: "Inflation reduces purchasing power, meaning your money buys less over time."
            },
            {
              id: 4,
              question: "What's the historical average inflation rate?",
              options: ["1%", "3%", "7%", "10%"],
              correctAnswer: 1,
              explanation: "Historically, inflation has averaged around 3% annually in the United States."
            },
            {
              id: 5,
              question: "If you keep money in a 1% savings account and inflation is 3%, what happens?",
              options: ["You gain purchasing power", "You lose purchasing power", "No change", "You double your money"],
              correctAnswer: 1,
              explanation: "When savings rates are below inflation, you lose purchasing power over time."
            },
            {
              id: 6,
              question: "What is the 'Rule of 72'?",
              options: ["Investment law", "Estimates how long to double money", "Tax rule", "Retirement rule"],
              correctAnswer: 1,
              explanation: "The Rule of 72 estimates how many years it takes to double your money (72 ÷ interest rate)."
            },
            {
              id: 7,
              question: "When should you start investing?",
              options: ["When you're wealthy", "As early as possible", "Only after age 40", "Never"],
              correctAnswer: 1,
              explanation: "Starting early gives compound interest more time to work in your favor."
            },
            {
              id: 8,
              question: "What should you do before investing?",
              options: ["Invest everything immediately", "Have emergency fund and pay off high-interest debt", "Quit your job", "Buy a house"],
              correctAnswer: 1,
              explanation: "Establish an emergency fund and pay off high-interest debt before investing in riskier assets."
            },
            {
              id: 9,
              question: "Can investing guarantee returns?",
              options: ["Yes, always", "No, all investments have risk", "Only government bonds", "Only for large amounts"],
              correctAnswer: 1,
              explanation: "All investments carry some level of risk; there are no guaranteed returns."
            },
            {
              id: 10,
              question: "What's opportunity cost in investing?",
              options: ["Cost of buying investments", "Returns you miss by not investing", "Investment fees only", "Tax on investments"],
              correctAnswer: 1,
              explanation: "Opportunity cost is the potential returns you miss by not investing your money."
            }
          ]
        }
      },
      {
        id: 702,
        title: "Investment Basics: Stocks, Bonds, ETFs",
        description: "Learn about the fundamental investment vehicles",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understand the basic investment options including stocks, bonds, and ETFs, and how each fits into a portfolio.",
        duration: "45 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is a stock?",
              options: ["A loan to a company", "Ownership share in a company", "Government debt", "Bank deposit"],
              correctAnswer: 1,
              explanation: "A stock represents partial ownership in a company."
            },
            {
              id: 2,
              question: "What is a bond?",
              options: ["Company ownership", "Loan to government or corporation", "Insurance policy", "Real estate investment"],
              correctAnswer: 1,
              explanation: "A bond is essentially a loan you make to a government or corporation that pays interest."
            },
            {
              id: 3,
              question: "What does ETF stand for?",
              options: ["Exchange Traded Fund", "Electronic Trading Fund", "Equity Transfer Fund", "Emergency Trading Fund"],
              correctAnswer: 0,
              explanation: "ETF stands for Exchange Traded Fund, which trades like a stock but holds multiple investments."
            },
            {
              id: 4,
              question: "Which typically has higher potential returns but more risk?",
              options: ["Bonds", "Stocks", "Savings accounts", "CDs"],
              correctAnswer: 1,
              explanation: "Stocks generally offer higher potential returns but come with greater risk than bonds."
            },
            {
              id: 5,
              question: "What is diversification?",
              options: ["Buying one stock", "Spreading investments across different assets", "Only investing in bonds", "Avoiding all risk"],
              correctAnswer: 1,
              explanation: "Diversification means spreading investments across different assets to reduce risk."
            },
            {
              id: 6,
              question: "What's an advantage of ETFs over individual stocks?",
              options: ["Higher fees", "Built-in diversification", "Guaranteed returns", "No risk"],
              correctAnswer: 1,
              explanation: "ETFs provide instant diversification by holding many different investments in one fund."
            },
            {
              id: 7,
              question: "What is dividend?",
              options: ["Stock price increase", "Company profit payment to shareholders", "Government tax", "Bond interest"],
              correctAnswer: 1,
              explanation: "Dividends are payments some companies make to shareholders from their profits."
            },
            {
              id: 8,
              question: "Are government bonds generally safer than corporate bonds?",
              options: ["No, riskier", "Yes, government backing makes them safer", "Same risk level", "Impossible to compare"],
              correctAnswer: 1,
              explanation: "Government bonds are generally considered safer due to government backing and taxing power."
            },
            {
              id: 9,
              question: "What is expense ratio in ETFs?",
              options: ["Profit margin", "Annual fee for managing the fund", "Tax rate", "Dividend rate"],
              correctAnswer: 1,
              explanation: "Expense ratio is the annual fee charged by the fund for management and operations."
            },
            {
              id: 10,
              question: "Can you lose money in bonds?",
              options: ["Never", "Yes, if interest rates rise or issuer defaults", "Only if you sell early", "Only corporate bonds"],
              correctAnswer: 1,
              explanation: "Bond values can decline if interest rates rise or if the issuer faces financial difficulties."
            }
          ]
        }
      },
      {
        id: 703,
        title: "Risk Tolerance & Diversification",
        description: "Assess your risk tolerance and build a diversified portfolio",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn to evaluate your risk tolerance and create a diversified investment portfolio appropriate for your goals.",
        duration: "45 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is risk tolerance?",
              options: ["How much money you have", "Your ability and willingness to accept investment losses", "Your age only", "Your job title"],
              correctAnswer: 1,
              explanation: "Risk tolerance is your emotional and financial ability to handle investment losses."
            },
            {
              id: 2,
              question: "How does age typically affect risk tolerance?",
              options: ["No relationship", "Younger investors can typically take more risk", "Older investors take more risk", "Age doesn't matter"],
              correctAnswer: 1,
              explanation: "Younger investors typically have more time to recover from losses, allowing for higher risk tolerance."
            },
            {
              id: 3,
              question: "What is asset allocation?",
              options: ["Buying one type of investment", "How you divide investments among different asset classes", "Only for wealthy investors", "Government requirement"],
              correctAnswer: 1,
              explanation: "Asset allocation is how you divide your portfolio among stocks, bonds, and other asset classes."
            },
            {
              id: 4,
              question: "What's a common rule of thumb for stock allocation?",
              options: ["100% stocks always", "100 minus your age in stocks", "Age equals stock percentage", "Never own stocks"],
              correctAnswer: 1,
              explanation: "A common guideline is to hold (100 - your age)% in stocks, with the rest in bonds."
            },
            {
              id: 5,
              question: "What types of diversification should you consider?",
              options: ["Only by company", "By asset class, geography, sector, and company", "Only by country", "Diversification isn't needed"],
              correctAnswer: 1,
              explanation: "Diversify across asset classes, geographic regions, sectors, and individual investments."
            },
            {
              id: 6,
              question: "What is rebalancing?",
              options: ["Selling all investments", "Adjusting portfolio back to target allocation", "Only buying new investments", "Ignoring your portfolio"],
              correctAnswer: 1,
              explanation: "Rebalancing means adjusting your portfolio back to your target asset allocation."
            },
            {
              id: 7,
              question: "How often should you rebalance?",
              options: ["Daily", "Annually or when significantly off target", "Never", "Only when markets crash"],
              correctAnswer: 1,
              explanation: "Rebalance annually or when your allocation drifts significantly from your target."
            },
            {
              id: 8,
              question: "What is correlation in investing?",
              options: ["Investment returns", "How similarly investments move", "Investment fees", "Tax rates"],
              correctAnswer: 1,
              explanation: "Correlation measures how similarly two investments move in relation to each other."
            },
            {
              id: 9,
              question: "Should you invest only in your home country?",
              options: ["Always", "No, international diversification reduces risk", "Only if wealthy", "Only in emerging markets"],
              correctAnswer: 1,
              explanation: "International diversification can reduce risk by spreading investments across different economies."
            },
            {
              id: 10,
              question: "What happens if you're not diversified?",
              options: ["Guaranteed success", "Higher concentration risk", "Lower returns always", "No effect"],
              correctAnswer: 1,
              explanation: "Lack of diversification increases concentration risk - if one investment fails, it can devastate your portfolio."
            }
          ]
        }
      },
      {
        id: 704,
        title: "Getting Started with Retirement Accounts (401(k), IRA)",
        description: "Understand retirement accounts and their tax advantages",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn about 401(k)s, IRAs, and other retirement accounts, including contribution limits and tax benefits.",
        duration: "45 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is a 401(k)?",
              options: ["Government savings account", "Employer-sponsored retirement plan", "Type of loan", "Insurance policy"],
              correctAnswer: 1,
              explanation: "A 401(k) is an employer-sponsored retirement plan that allows pre-tax contributions."
            },
            {
              id: 2,
              question: "What is employer matching?",
              options: ["Employer copies your investments", "Employer contributes money based on your contributions", "Employer manages your account", "Employer guarantees returns"],
              correctAnswer: 1,
              explanation: "Employer matching is when your employer contributes money to your 401(k) based on your contributions."
            },
            {
              id: 3,
              question: "Should you always contribute enough to get full employer match?",
              options: ["No, it's not important", "Yes, it's free money", "Only if you're wealthy", "Only if over age 50"],
              correctAnswer: 1,
              explanation: "Employer matching is essentially free money - you should contribute enough to get the full match."
            },
            {
              id: 4,
              question: "What does IRA stand for?",
              options: ["Investment Retirement Account", "Individual Retirement Account", "Insurance Retirement Account", "Internal Revenue Account"],
              correctAnswer: 1,
              explanation: "IRA stands for Individual Retirement Account."
            },
            {
              id: 5,
              question: "What's the difference between traditional and Roth accounts?",
              options: ["No difference", "Traditional is pre-tax, Roth is after-tax", "Roth has higher limits", "Traditional is only for young people"],
              correctAnswer: 1,
              explanation: "Traditional contributions are pre-tax (tax deferred), while Roth contributions are after-tax (tax-free growth)."
            },
            {
              id: 6,
              question: "When can you withdraw from retirement accounts without penalty?",
              options: ["Anytime", "Generally after age 59½", "Only at retirement", "Never"],
              correctAnswer: 1,
              explanation: "Generally, you can withdraw from retirement accounts without penalty after age 59½."
            },
            {
              id: 7,
              question: "What are Required Minimum Distributions (RMDs)?",
              options: ["Minimum you must contribute", "Minimum you must withdraw starting at age 73", "Maximum withdrawal allowed", "Only for Roth accounts"],
              correctAnswer: 1,
              explanation: "RMDs are minimum amounts you must withdraw from traditional retirement accounts starting at age 73."
            },
            {
              id: 8,
              question: "Can you have both a 401(k) and an IRA?",
              options: ["No, choose one", "Yes, you can have both", "Only if over certain income", "Only if self-employed"],
              correctAnswer: 1,
              explanation: "You can have both a 401(k) and an IRA, though there may be income limits for IRA deductibility."
            },
            {
              id: 9,
              question: "What should you do if your 401(k) has high fees?",
              options: ["Don't participate", "Contribute enough for match, then use IRA", "Complain to government", "Switch jobs immediately"],
              correctAnswer: 1,
              explanation: "If 401(k) fees are high, contribute enough for the match, then consider using an IRA for additional savings."
            },
            {
              id: 10,
              question: "What is vesting in a 401(k)?",
              options: ["Your contribution timeline", "When employer contributions become yours", "Investment selection", "Account balance"],
              correctAnswer: 1,
              explanation: "Vesting determines when employer contributions to your 401(k) become fully yours to keep."
            }
          ]
        }
      }
    ]
  },
  {
    id: 8,
    title: "Insurance & Risk Management",
    description: "Protect your financial future with appropriate insurance coverage",
    level: "Beginner",
    duration: "2 hours",
    students: 1580,
    topics: [
      "Insurance fundamentals and importance",
      "Types of insurance coverage",
      "Understanding policy terms and costs",
      "Emergency planning and financial protection"
    ],
    lessons: [
      {
        id: 801,
        title: "Insurance Fundamentals: Why It Matters",
        description: "Understand the role of insurance in financial planning",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn why insurance is crucial for protecting your financial well-being and how it fits into your overall financial plan.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is the primary purpose of insurance?",
              options: ["To make money", "To transfer financial risk", "To avoid taxes", "To increase wealth"],
              correctAnswer: 1,
              explanation: "Insurance transfers financial risk from you to the insurance company in exchange for premiums."
            },
            {
              id: 2,
              question: "What is a premium?",
              options: ["Amount you pay for coverage", "Amount insurance pays you", "Deductible amount", "Coverage limit"],
              correctAnswer: 0,
              explanation: "A premium is the amount you pay to the insurance company for coverage."
            },
            {
              id: 3,
              question: "What is a deductible?",
              options: ["Monthly payment", "Amount you pay before insurance covers costs", "Maximum coverage", "Insurance profit"],
              correctAnswer: 1,
              explanation: "A deductible is the amount you must pay out-of-pocket before insurance coverage begins."
            },
            {
              id: 4,
              question: "How does a higher deductible typically affect premiums?",
              options: ["No effect", "Lower premiums", "Higher premiums", "Eliminates premiums"],
              correctAnswer: 1,
              explanation: "Higher deductibles typically result in lower premiums since you're taking on more risk."
            },
            {
              id: 5,
              question: "What is a policy limit?",
              options: ["Minimum coverage", "Maximum amount insurance will pay", "Deductible amount", "Premium cost"],
              correctAnswer: 1,
              explanation: "Policy limits are the maximum amounts an insurance company will pay for covered claims."
            },
            {
              id: 6,
              question: "When might you not need insurance?",
              options: ["Never", "When you can afford to self-insure the risk", "Always need all types", "Only when young"],
              correctAnswer: 1,
              explanation: "You might skip insurance when you can afford to cover the potential loss yourself."
            },
            {
              id: 7,
              question: "What is risk pooling?",
              options: ["Swimming pool insurance", "Sharing risk among many policyholders", "Individual risk only", "Government insurance"],
              correctAnswer: 1,
              explanation: "Risk pooling spreads risk among many policyholders, making insurance economically viable."
            },
            {
              id: 8,
              question: "Should you insure against small losses?",
              options: ["Always", "Generally no, focus on catastrophic risks", "Only small losses matter", "Never insure anything"],
              correctAnswer: 1,
              explanation: "Focus insurance on large, catastrophic risks rather than small losses you can afford."
            },
            {
              id: 9,
              question: "What factors affect insurance premiums?",
              options: ["Only age", "Risk factors, coverage amount, and deductibles", "Only income", "Random factors"],
              correctAnswer: 1,
              explanation: "Premiums are based on risk factors, coverage amounts, deductibles, and other relevant criteria."
            },
            {
              id: 10,
              question: "What is underwriting?",
              options: ["Writing policies", "Process of evaluating and pricing risk", "Paying claims", "Selling insurance"],
              correctAnswer: 1,
              explanation: "Underwriting is the process insurance companies use to evaluate and price risk."
            }
          ]
        }
      },
      {
        id: 802,
        title: "Types of Insurance (Health, Auto, Renters, Life)",
        description: "Explore the main types of insurance and their purposes",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn about different types of insurance coverage and when each is necessary for financial protection.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What does health insurance primarily cover?",
              options: ["Only doctor visits", "Medical expenses and treatments", "Only prescription drugs", "Only emergency care"],
              correctAnswer: 1,
              explanation: "Health insurance covers various medical expenses including doctor visits, treatments, and prescriptions."
            },
            {
              id: 2,
              question: "What is auto liability insurance?",
              options: ["Covers your car damage", "Covers damage you cause to others", "Covers theft only", "Optional coverage"],
              correctAnswer: 1,
              explanation: "Auto liability insurance covers damage and injuries you cause to others in an accident."
            },
            {
              id: 3,
              question: "What does renters insurance cover?",
              options: ["The building structure", "Your personal belongings and liability", "Only electronics", "Landlord's property"],
              correctAnswer: 1,
              explanation: "Renters insurance covers your personal belongings and provides liability protection."
            },
            {
              id: 4,
              question: "What is the main purpose of life insurance?",
              options: ["Investment growth", "Provide income replacement for beneficiaries", "Tax avoidance", "Retirement planning"],
              correctAnswer: 1,
              explanation: "Life insurance primarily provides financial support to beneficiaries after the insured's death."
            },
            {
              id: 5,
              question: "Who typically needs life insurance?",
              options: ["Everyone", "People with financial dependents", "Only wealthy people", "Only business owners"],
              correctAnswer: 1,
              explanation: "Life insurance is most important for people with financial dependents who rely on their income."
            },
            {
              id: 6,
              question: "What's the difference between term and whole life insurance?",
              options: ["No difference", "Term is temporary, whole is permanent with cash value", "Term is more expensive", "Whole is temporary"],
              correctAnswer: 1,
              explanation: "Term life is temporary coverage, while whole life is permanent with a cash value component."
            },
            {
              id: 7,
              question: "Is auto insurance required?",
              options: ["Never required", "Required in most states", "Only for new cars", "Only for commercial vehicles"],
              correctAnswer: 1,
              explanation: "Auto insurance is legally required in most states, typically at least liability coverage."
            },
            {
              id: 8,
              question: "What does comprehensive auto coverage include?",
              options: ["Only collision damage", "Non-collision damage like theft, weather, vandalism", "Only liability", "Medical payments only"],
              correctAnswer: 1,
              explanation: "Comprehensive covers non-collision damage like theft, weather, fire, and vandalism."
            },
            {
              id: 9,
              question: "Should college students have renters insurance?",
              options: ["Never needed", "Yes, if they have valuable belongings", "Only if required by school", "Only if they own the property"],
              correctAnswer: 1,
              explanation: "Renters insurance is valuable for students with electronics, clothes, and other personal belongings."
            },
            {
              id: 10,
              question: "What is disability insurance?",
              options: ["Health insurance", "Income replacement if you can't work due to disability", "Car insurance for disabled", "Property insurance"],
              correctAnswer: 1,
              explanation: "Disability insurance replaces income if you become unable to work due to illness or injury."
            }
          ]
        }
      },
      {
        id: 803,
        title: "Understanding Premiums, Deductibles, and Coverage",
        description: "Learn how insurance costs and coverage work",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understand how insurance premiums, deductibles, and coverage limits work together to determine your costs and protection.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "How do premiums and deductibles typically relate?",
              options: ["No relationship", "Higher deductible usually means lower premium", "Always the same amount", "Higher deductible means higher premium"],
              correctAnswer: 1,
              explanation: "Higher deductibles typically result in lower premiums since you're assuming more of the risk."
            },
            {
              id: 2,
              question: "What is a copay?",
              options: ["Monthly premium", "Fixed amount you pay for certain services", "Deductible amount", "Maximum coverage"],
              correctAnswer: 1,
              explanation: "A copay is a fixed amount you pay for specific covered services, like doctor visits."
            },
            {
              id: 3,
              question: "What is coinsurance?",
              options: ["Type of insurance", "Percentage you pay after meeting deductible", "Premium payment", "Coverage limit"],
              correctAnswer: 1,
              explanation: "Coinsurance is the percentage of costs you pay after meeting your deductible."
            },
            {
              id: 4,
              question: "What is an out-of-pocket maximum?",
              options: ["Deductible amount", "Premium cost", "Maximum you pay in a year", "Coverage limit"],
              correctAnswer: 2,
              explanation: "Out-of-pocket maximum is the most you'll pay in a year for covered services."
            },
            {
              id: 5,
              question: "Should you choose the lowest deductible available?",
              options: ["Always", "Not necessarily - consider total costs", "Never", "Only for health insurance"],
              correctAnswer: 1,
              explanation: "Consider both premiums and deductibles to find the best total cost for your situation."
            },
            {
              id: 6,
              question: "What affects your insurance premiums?",
              options: ["Only age", "Risk factors, coverage amount, location, claims history", "Only income", "Random factors"],
              correctAnswer: 1,
              explanation: "Premiums are based on risk factors, coverage levels, location, claims history, and other relevant factors."
            },
            {
              id: 7,
              question: "What is a waiting period?",
              options: ["Time to pay premium", "Time before coverage begins", "Time to file claims", "Time between payments"],
              correctAnswer: 1,
              explanation: "A waiting period is the time you must wait before certain coverage begins."
            },
            {
              id: 8,
              question: "What are exclusions in insurance?",
              options: ["Covered items", "Items or events not covered", "Premium discounts", "Deductible amounts"],
              correctAnswer: 1,
              explanation: "Exclusions are specific items, events, or circumstances that are not covered by the policy."
            },
            {
              id: 9,
              question: "Should you file a claim for every small loss?",
              options: ["Always file claims", "Consider if cost exceeds deductible and impact on premiums", "Never file claims", "Only for large losses"],
              correctAnswer: 1,
              explanation: "Consider whether the claim amount exceeds your deductible and potential premium increases."
            },
            {
              id: 10,
              question: "What is replacement cost vs. actual cash value?",
              options: ["Same thing", "Replacement cost is current price, ACV is depreciated value", "ACV is always higher", "Only for auto insurance"],
              correctAnswer: 1,
              explanation: "Replacement cost covers current replacement price, while ACV considers depreciation."
            }
          ]
        }
      },
      {
        id: 804,
        title: "Emergency Planning & Financial Protection",
        description: "Create comprehensive protection for financial emergencies",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn to create a comprehensive emergency plan that combines insurance coverage with other financial protection strategies.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What are the key components of financial emergency planning?",
              options: ["Only insurance", "Emergency fund, insurance, and estate planning", "Only savings", "Only investments"],
              correctAnswer: 1,
              explanation: "Comprehensive emergency planning includes emergency funds, appropriate insurance, and basic estate planning."
            },
            {
              id: 2,
              question: "How do emergency funds and insurance work together?",
              options: ["They don't relate", "Emergency funds cover deductibles and gaps in coverage", "Choose one or the other", "Insurance replaces emergency funds"],
              correctAnswer: 1,
              explanation: "Emergency funds help cover deductibles, gaps in coverage, and expenses insurance doesn't cover."
            },
            {
              id: 3,
              question: "What should be included in an emergency contact list?",
              options: ["Only family", "Insurance companies, financial institutions, medical contacts", "Only employers", "Only doctors"],
              correctAnswer: 1,
              explanation: "Include insurance companies, banks, medical providers, and key family or professional contacts."
            },
            {
              id: 4,
              question: "Where should you keep important documents?",
              options: ["Only at home", "Secure, accessible location with copies in different places", "Only in safety deposit box", "Only digitally"],
              correctAnswer: 1,
              explanation: "Keep originals secure but accessible, with copies stored separately (physical and digital)."
            },
            {
              id: 5,
              question: "What documents are important for emergency planning?",
              options: ["Only insurance policies", "Insurance policies, IDs, financial accounts, medical info", "Only bank statements", "Only medical records"],
              correctAnswer: 1,
              explanation: "Include insurance policies, identification, financial account information, and medical records."
            },
            {
              id: 6,
              question: "Should you review your insurance coverage regularly?",
              options: ["Once is enough", "Yes, annually and after major life changes", "Only when required", "Never needed"],
              correctAnswer: 1,
              explanation: "Review coverage annually and after major life changes to ensure adequate protection."
            },
            {
              id: 7,
              question: "What is beneficiary designation?",
              options: ["Insurance coverage type", "Person who receives benefits upon your death", "Premium payment method", "Deductible amount"],
              correctAnswer: 1,
              explanation: "A beneficiary is the person designated to receive insurance benefits or account funds upon your death."
            },
            {
              id: 8,
              question: "Why is estate planning part of emergency preparation?",
              options: ["It's not related", "Ensures assets transfer according to your wishes", "Only for wealthy people", "Only for older people"],
              correctAnswer: 1,
              explanation: "Basic estate planning ensures your assets transfer according to your wishes and can provide for dependents."
            },
            {
              id: 9,
              question: "What should you do after a major life event?",
              options: ["Nothing", "Review and update insurance and beneficiaries", "Only update resume", "Only change address"],
              correctAnswer: 1,
              explanation: "Major life events (marriage, children, divorce, new job) often require insurance and beneficiary updates."
            },
            {
              id: 10,
              question: "How can you prepare for natural disasters financially?",
              options: ["Hope for the best", "Appropriate insurance, emergency fund, document copies", "Move away", "Only rely on government aid"],
              correctAnswer: 1,
              explanation: "Prepare with appropriate insurance coverage, emergency funds, and secure copies of important documents."
            }
          ]
        }
      }
    ]
  },
  {
    id: 9,
    title: "Financial Psychology",
    description: "Understand the mental and emotional aspects of money management",
    level: "Beginner",
    duration: "2 hours",
    students: 1750,
    topics: [
      "Money mindsets and beliefs",
      "Behavioral spending patterns",
      "Self-discipline and delayed gratification",
      "Managing financial stress and anxiety"
    ],
    lessons: [
      {
        id: 901,
        title: "Money Mindsets & Habits",
        description: "Explore your relationship with money and develop healthy financial habits",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understand how your beliefs about money shape your financial behavior and learn to develop positive money habits.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is a money mindset?",
              options: ["Amount of money you have", "Your beliefs and attitudes about money", "Your investment strategy", "Your bank account type"],
              correctAnswer: 1,
              explanation: "Money mindset refers to your underlying beliefs and attitudes about money that influence your financial behavior."
            },
            {
              id: 2,
              question: "Where do money beliefs typically come from?",
              options: ["Only personal experience", "Family, culture, experiences, and society", "Only from school", "Only from employers"],
              correctAnswer: 1,
              explanation: "Money beliefs are shaped by family upbringing, cultural background, personal experiences, and societal influences."
            },
            {
              id: 3,
              question: "What is a scarcity mindset?",
              options: ["Having little money", "Believing there's never enough money", "Being careful with money", "Saving money"],
              correctAnswer: 1,
              explanation: "A scarcity mindset is the belief that there's never enough money, leading to fear-based financial decisions."
            },
            {
              id: 4,
              question: "What is an abundance mindset?",
              options: ["Having lots of money", "Believing opportunities and resources are available", "Spending freely", "Ignoring money"],
              correctAnswer: 1,
              explanation: "An abundance mindset believes that opportunities and resources are available, leading to more confident financial decisions."
            },
            {
              id: 5,
              question: "How long does it typically take to form a new habit?",
              options: ["1 week", "21-66 days depending on complexity", "1 year", "1 day"],
              correctAnswer: 1,
              explanation: "Research shows it takes 21-66 days to form a new habit, depending on the complexity of the behavior."
            },
            {
              id: 6,
              question: "What's the best way to change a financial habit?",
              options: ["Change everything at once", "Start small and build gradually", "Wait for motivation", "Only change when forced"],
              correctAnswer: 1,
              explanation: "Start with small, manageable changes and build gradually to create lasting habit change."
            },
            {
              id: 7,
              question: "What role does environment play in financial habits?",
              options: ["No role", "Significant - environment influences behavior", "Only for wealthy people", "Only affects spending"],
              correctAnswer: 1,
              explanation: "Your environment significantly influences financial behavior - changing your environment can help change habits."
            },
            {
              id: 8,
              question: "What is emotional spending?",
              options: ["Spending on emotions", "Making purchases based on feelings rather than needs", "Buying gifts", "Happy spending only"],
              correctAnswer: 1,
              explanation: "Emotional spending is making purchases based on feelings rather than actual needs or planned budgets."
            },
            {
              id: 9,
              question: "How can you identify your money beliefs?",
              options: ["They're obvious", "Reflect on your financial behavior and reactions", "Others tell you", "They don't matter"],
              correctAnswer: 1,
              explanation: "Identify money beliefs by reflecting on your financial behavior, reactions to money situations, and patterns."
            },
            {
              id: 10,
              question: "Can negative money beliefs be changed?",
              options: ["Never", "Yes, with awareness and intentional effort", "Only by professionals", "Only if you're young"],
              correctAnswer: 1,
              explanation: "Negative money beliefs can be changed through awareness, reflection, and intentional effort to develop new patterns."
            }
          ]
        }
      },
      {
        id: 902,
        title: "Impulse Spending & Lifestyle Creep",
        description: "Learn to control impulse purchases and lifestyle inflation",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understand the psychology behind impulse spending and lifestyle creep, and develop strategies to maintain control over your finances.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is impulse spending?",
              options: ["Planned purchases", "Unplanned purchases made without consideration", "Only expensive purchases", "Buying necessities"],
              correctAnswer: 1,
              explanation: "Impulse spending is making unplanned purchases without careful consideration of need or budget impact."
            },
            {
              id: 2,
              question: "What triggers impulse spending?",
              options: ["Only sales", "Emotions, marketing, social pressure, and convenience", "Only being wealthy", "Only being poor"],
              correctAnswer: 1,
              explanation: "Impulse spending is triggered by emotions, marketing tactics, social pressure, and convenient purchase opportunities."
            },
            {
              id: 3,
              question: "What is lifestyle creep?",
              options: ["Living below your means", "Gradually increasing spending as income rises", "Decreasing spending", "Only affects wealthy people"],
              correctAnswer: 1,
              explanation: "Lifestyle creep is the gradual increase in spending that typically occurs as income rises."
            },
            {
              id: 4,
              question: "Why is lifestyle creep problematic?",
              options: ["It's not problematic", "It can prevent saving and building wealth", "It only affects spending", "It's required for happiness"],
              correctAnswer: 1,
              explanation: "Lifestyle creep can prevent you from saving and building wealth despite earning more money."
            },
            {
              id: 5,
              question: "What's a good strategy to avoid impulse purchases?",
              options: ["Buy immediately", "Wait 24-48 hours before purchasing", "Only shop when emotional", "Never go shopping"],
              correctAnswer: 1,
              explanation: "Waiting 24-48 hours before making non-essential purchases helps you evaluate if you really need the item."
            },
            {
              id: 6,
              question: "How can you combat lifestyle creep?",
              options: ["Spend all increases", "Automatically save salary increases", "Ignore income increases", "Only buy expensive items"],
              correctAnswer: 1,
              explanation: "Automatically saving salary increases helps prevent lifestyle creep and builds wealth."
            },
            {
              id: 7,
              question: "What is the 'want vs. need' evaluation?",
              options: ["They're the same", "Distinguishing between necessary and desired purchases", "Only for poor people", "Not important"],
              correctAnswer: 1,
              explanation: "Want vs. need evaluation helps distinguish between necessary purchases and things you merely desire."
            },
            {
              id: 8,
              question: "How do social media and advertising influence spending?",
              options: ["They don't", "Create desire and social pressure to purchase", "Only affect young people", "Only affect wealthy people"],
              correctAnswer: 1,
              explanation: "Social media and advertising create desire and social pressure that can lead to unnecessary spending."
            },
            {
              id: 9,
              question: "What's a good alternative to emotional spending?",
              options: ["Spend more", "Find non-spending activities for emotional needs", "Only shop when happy", "Avoid all emotions"],
              correctAnswer: 1,
              explanation: "Find alternative activities like exercise, calling friends, or hobbies to address emotional needs without spending."
            },
            {
              id: 10,
              question: "How can budgeting help with impulse spending?",
              options: ["It can't help", "Provides awareness and spending limits", "Makes spending harder", "Eliminates all spending"],
              correctAnswer: 1,
              explanation: "Budgeting creates awareness of spending patterns and provides clear limits to help control impulse purchases."
            }
          ]
        }
      },
      {
        id: 903,
        title: "Delayed Gratification & Financial Discipline",
        description: "Develop the ability to prioritize long-term financial goals",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn the importance of delayed gratification for financial success and develop strategies to strengthen your financial discipline.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is delayed gratification?",
              options: ["Never enjoying anything", "Postponing immediate pleasure for greater future benefit", "Only for wealthy people", "Avoiding all purchases"],
              correctAnswer: 1,
              explanation: "Delayed gratification is the ability to postpone immediate pleasure in order to achieve greater future benefits."
            },
            {
              id: 2,
              question: "Why is delayed gratification important for finances?",
              options: ["It's not important", "Enables saving and investing for long-term goals", "Only matters for retirement", "Makes life boring"],
              correctAnswer: 1,
              explanation: "Delayed gratification enables you to save and invest for long-term financial goals instead of spending immediately."
            },
            {
              id: 3,
              question: "What was the main finding of the Stanford Marshmallow Experiment?",
              options: ["Children like marshmallows", "Children who delayed gratification had better life outcomes", "Marshmallows are unhealthy", "All children are the same"],
              correctAnswer: 1,
              explanation: "The study found that children who could delay gratification tended to have better life outcomes later."
            },
            {
              id: 4,
              question: "How can you strengthen your delayed gratification skills?",
              options: ["You can't change", "Practice with small delays and build up", "Only professionals can help", "It's genetic only"],
              correctAnswer: 1,
              explanation: "Like a muscle, delayed gratification can be strengthened through practice, starting with small delays."
            },
            {
              id: 5,
              question: "What role do goals play in delayed gratification?",
              options: ["No role", "Clear goals make it easier to delay immediate wants", "Goals make it harder", "Only financial goals matter"],
              correctAnswer: 1,
              explanation: "Clear, meaningful goals make it easier to resist immediate temptations and delay gratification."
            },
            {
              id: 6,
              question: "How can visualization help with financial discipline?",
              options: ["It doesn't help", "Imagining future benefits strengthens motivation", "Only for creative people", "Makes you spend more"],
              correctAnswer: 1,
              explanation: "Visualizing the future benefits of financial discipline helps strengthen motivation to make good choices."
            },
            {
              id: 7,
              question: "What is the 'pay yourself first' principle?",
              options: ["Be selfish", "Save money before spending on wants", "Only pay yourself", "Ignore bills"],
              correctAnswer: 1,
              explanation: "'Pay yourself first' means saving money for your future before spending on non-essential items."
            },
            {
              id: 8,
              question: "How can automation help with financial discipline?",
              options: ["It can't help", "Removes the need for willpower in the moment", "Makes everything complicated", "Only for wealthy people"],
              correctAnswer: 1,
              explanation: "Automation removes the need for in-the-moment willpower by making good financial choices automatic."
            },
            {
              id: 9,
              question: "What is temptation bundling?",
              options: ["Avoiding all temptation", "Pairing something you want with something you should do", "Only buying in bundles", "Tempting others to spend"],
              correctAnswer: 1,
              explanation: "Temptation bundling pairs something you want to do with something you should do to increase motivation."
            },
            {
              id: 10,
              question: "How can you make delayed gratification easier?",
              options: ["Make it harder", "Remove temptations and create barriers to spending", "Always have access to money", "Never plan ahead"],
              correctAnswer: 1,
              explanation: "Make delayed gratification easier by removing temptations and creating barriers to impulsive spending."
            }
          ]
        }
      },
      {
        id: 904,
        title: "Mental Health & Financial Stress",
        description: "Manage the psychological impact of financial challenges",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understand the relationship between mental health and financial stress, and learn coping strategies for financial anxiety.",
        duration: "30 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "How does financial stress affect mental health?",
              options: ["No effect", "Can cause anxiety, depression, and other mental health issues", "Only makes you stronger", "Only affects sleep"],
              correctAnswer: 1,
              explanation: "Financial stress can significantly impact mental health, causing anxiety, depression, and other psychological issues."
            },
            {
              id: 2,
              question: "How does mental health affect financial decisions?",
              options: ["No effect", "Can impair judgment and lead to poor financial choices", "Always improves decisions", "Only affects spending"],
              correctAnswer: 1,
              explanation: "Poor mental health can impair judgment and lead to impulsive or poor financial decision-making."
            },
            {
              id: 3,
              question: "What are common signs of financial stress?",
              options: ["Only crying", "Sleep problems, anxiety, relationship conflicts, health issues", "Only anger", "No visible signs"],
              correctAnswer: 1,
              explanation: "Financial stress can manifest as sleep problems, anxiety, relationship conflicts, and physical health issues."
            },
            {
              id: 4,
              question: "What's a healthy way to cope with financial anxiety?",
              options: ["Ignore it completely", "Face it, make a plan, and seek support when needed", "Spend more to feel better", "Isolate yourself"],
              correctAnswer: 1,
              explanation: "Healthy coping involves acknowledging the stress, creating a financial plan, and seeking support when needed."
            },
            {
              id: 5,
              question: "How can budgeting help reduce financial stress?",
              options: ["It increases stress", "Provides control and clarity about finances", "Only for organized people", "Makes no difference"],
              correctAnswer: 1,
              explanation: "Budgeting can reduce stress by providing a sense of control and clear understanding of your financial situation."
            },
            {
              id: 6,
              question: "When should you seek professional help for financial stress?",
              options: ["Never", "When stress significantly impacts daily life or relationships", "Only when wealthy", "Only when bankrupt"],
              correctAnswer: 1,
              explanation: "Seek professional help when financial stress significantly impacts your daily functioning or relationships."
            },
            {
              id: 7,
              question: "What role does social support play in financial stress?",
              options: ["No role", "Can provide emotional support and practical advice", "Always makes it worse", "Only for emergencies"],
              correctAnswer: 1,
              explanation: "Social support can provide emotional relief and practical advice for managing financial challenges."
            },
            {
              id: 8,
              question: "How can mindfulness help with financial stress?",
              options: ["It can't help", "Helps manage anxiety and improve decision-making", "Only for meditation experts", "Makes you spend more"],
              correctAnswer: 1,
              explanation: "Mindfulness practices can help manage anxiety and improve the quality of financial decision-making."
            },
            {
              id: 9,
              question: "What's important about financial communication in relationships?",
              options: ["Avoid talking about money", "Open communication reduces stress and conflict", "Only one person should handle money", "Money doesn't affect relationships"],
              correctAnswer: 1,
              explanation: "Open, honest communication about finances reduces stress and prevents conflicts in relationships."
            },
            {
              id: 10,
              question: "How can you maintain perspective during financial difficulties?",
              options: ["Panic about everything", "Remember that situations can improve and focus on what you can control", "Ignore the problems", "Blame others"],
              correctAnswer: 1,
              explanation: "Maintain perspective by remembering that financial situations can improve and focusing on actions you can control."
            }
          ]
        }
      }
    ]
  },
  {
    id: 10,
    title: "Fraud & Consumer Protection",
    description: "Protect yourself from scams and understand your consumer rights",
    level: "Beginner",
    duration: "1.5 hours",
    students: 2050,
    topics: [
      "Common scams and fraud prevention",
      "Identity theft protection",
      "Safe online and digital practices",
      "Consumer rights and protections"
    ],
    lessons: [
      {
        id: 1001,
        title: "Spotting and Avoiding Common Scams",
        description: "Learn to identify and protect yourself from financial scams",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understand common scam tactics and develop skills to protect yourself from financial fraud and deception.",
        duration: "25 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is a common characteristic of most scams?",
              options: ["Slow, careful process", "Pressure to act quickly", "Lots of documentation", "Government endorsement"],
              correctAnswer: 1,
              explanation: "Most scams create urgency and pressure you to act quickly without time to think or research."
            },
            {
              id: 2,
              question: "What is a phishing scam?",
              options: ["Fishing for real fish", "Fake communications to steal personal information", "Legitimate business communication", "Government tax collection"],
              correctAnswer: 1,
              explanation: "Phishing involves fake emails, texts, or calls designed to steal personal or financial information."
            },
            {
              id: 3,
              question: "What should you do if someone calls claiming to be from your bank?",
              options: ["Give them all requested information", "Hang up and call your bank directly", "Ask for their personal information", "Wire them money"],
              correctAnswer: 1,
              explanation: "Never give information to unsolicited callers. Hang up and call your bank using the number on your card or statement."
            },
            {
              id: 4,
              question: "What is a 'too good to be true' investment?",
              options: ["Any investment opportunity", "Promises of high returns with no risk", "Legitimate investments", "Bank savings accounts"],
              correctAnswer: 1,
              explanation: "Be wary of investment opportunities promising high returns with little or no risk - they're often scams."
            },
            {
              id: 5,
              question: "What is a romance scam?",
              options: ["Dating advice service", "Criminals using fake relationships to steal money", "Legitimate dating", "Marriage counseling"],
              correctAnswer: 1,
              explanation: "Romance scams involve criminals creating fake romantic relationships online to eventually request money."
            },
            {
              id: 6,
              question: "Should you give personal information to verify your identity?",
              options: ["Always", "Only if you initiated the contact", "Never", "Only to people who sound official"],
              correctAnswer: 1,
              explanation: "Only provide personal information when you initiated the contact through official channels."
            },
            {
              id: 7,
              question: "What is a red flag in email communications?",
              options: ["Professional formatting", "Poor grammar and spelling errors", "Company logos", "Contact information"],
              correctAnswer: 1,
              explanation: "Poor grammar, spelling errors, and urgent language are common red flags in scam emails."
            },
            {
              id: 8,
              question: "What should you do if you think you've been scammed?",
              options: ["Keep it secret", "Report it to authorities and financial institutions", "Try to get revenge", "Ignore it"],
              correctAnswer: 1,
              explanation: "Report suspected scams to relevant authorities, your bank, and credit card companies immediately."
            },
            {
              id: 9,
              question: "Are older adults the only targets of scams?",
              options: ["Yes, only older adults", "No, scammers target people of all ages", "Only wealthy people", "Only poor people"],
              correctAnswer: 1,
              explanation: "Scammers target people of all ages, using different tactics for different demographic groups."
            },
            {
              id: 10,
              question: "What's the best defense against scams?",
              options: ["Avoiding all communication", "Education and healthy skepticism", "Only using cash", "Never using technology"],
              correctAnswer: 1,
              explanation: "Education about common scams and maintaining healthy skepticism are your best defenses."
            }
          ]
        }
      },
      {
        id: 1002,
        title: "Identity Theft: Prevention & What to Do",
        description: "Protect your identity and respond effectively if it's stolen",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn how to prevent identity theft and the steps to take if your identity is compromised.",
        duration: "25 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is identity theft?",
              options: ["Forgetting your name", "Someone using your personal information without permission", "Changing your identity legally", "Losing identification documents"],
              correctAnswer: 1,
              explanation: "Identity theft occurs when someone uses your personal information without permission to commit fraud or other crimes."
            },
            {
              id: 2,
              question: "What information do identity thieves typically seek?",
              options: ["Only credit card numbers", "Social Security number, credit cards, bank accounts, personal details", "Only addresses", "Only phone numbers"],
              correctAnswer: 1,
              explanation: "Identity thieves seek Social Security numbers, credit card information, bank account details, and other personal information."
            },
            {
              id: 3,
              question: "How can you protect your Social Security number?",
              options: ["Share it freely", "Give it only when absolutely necessary", "Post it online", "Tell everyone you meet"],
              correctAnswer: 1,
              explanation: "Protect your SSN by sharing it only when absolutely necessary and legally required."
            },
            {
              id: 4,
              question: "What should you do with documents containing personal information?",
              options: ["Throw them in regular trash", "Shred them before disposal", "Leave them lying around", "Give them to neighbors"],
              correctAnswer: 1,
              explanation: "Shred documents containing personal information before disposing of them to prevent identity theft."
            },
            {
              id: 5,
              question: "How often should you check your credit reports?",
              options: ["Never", "At least annually", "Only when applying for credit", "Every 10 years"],
              correctAnswer: 1,
              explanation: "Check your credit reports at least annually to spot unauthorized accounts or activity."
            },
            {
              id: 6,
              question: "What should you do if you suspect identity theft?",
              options: ["Wait and see", "Act immediately - contact credit bureaus and file reports", "Handle it yourself quietly", "Ignore it"],
              correctAnswer: 1,
              explanation: "Act immediately by contacting credit bureaus, filing police reports, and notifying financial institutions."
            },
            {
              id: 7,
              question: "What is a credit freeze?",
              options: ["Stopping all spending", "Restricting access to your credit report", "Freezing bank accounts", "Government program"],
              correctAnswer: 1,
              explanation: "A credit freeze restricts access to your credit report, making it harder for identity thieves to open new accounts."
            },
            {
              id: 8,
              question: "Should you carry your Social Security card in your wallet?",
              options: ["Always", "No, keep it in a secure location", "Only when traveling", "Only for work"],
              correctAnswer: 1,
              explanation: "Don't carry your Social Security card in your wallet - keep it in a secure location at home."
            },
            {
              id: 9,
              question: "What is identity monitoring?",
              options: ["Watching other people", "Services that monitor for use of your personal information", "Government surveillance", "Credit card tracking"],
              correctAnswer: 1,
              explanation: "Identity monitoring services watch for unauthorized use of your personal information and alert you to potential problems."
            },
            {
              id: 10,
              question: "Can identity theft affect your taxes?",
              options: ["Never", "Yes, thieves may file false tax returns", "Only for businesses", "Only if you're wealthy"],
              correctAnswer: 1,
              explanation: "Identity thieves may file false tax returns using your information to claim refunds fraudulently."
            }
          ]
        }
      },
      {
        id: 1003,
        title: "Online Shopping & Banking Safety",
        description: "Practice safe digital financial habits",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn best practices for safe online shopping and digital banking to protect your financial information.",
        duration: "20 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What should you look for when shopping online?",
              options: ["Lowest prices only", "Secure sites (https) and reputable retailers", "Flashy websites", "No security needed"],
              correctAnswer: 1,
              explanation: "Look for secure websites (https), reputable retailers, and verified payment methods when shopping online."
            },
            {
              id: 2,
              question: "What does 'https' indicate?",
              options: ["High-speed connection", "Secure, encrypted connection", "High-priced items", "Hypertext only"],
              correctAnswer: 1,
              explanation: "HTTPS indicates a secure, encrypted connection that protects your data during transmission."
            },
            {
              id: 3,
              question: "Should you save payment information on websites?",
              options: ["Always save everything", "Only on trusted, secure sites you use frequently", "Never save anything", "Only for expensive purchases"],
              correctAnswer: 1,
              explanation: "Only save payment information on trusted, secure sites you use frequently and that have good security practices."
            },
            {
              id: 4,
              question: "What's safer for online purchases?",
              options: ["Debit cards", "Credit cards or digital wallets", "Wire transfers", "Cash"],
              correctAnswer: 1,
              explanation: "Credit cards and digital wallets typically offer better fraud protection than debit cards for online purchases."
            },
            {
              id: 5,
              question: "Should you shop on public WiFi?",
              options: ["Always safe", "Avoid shopping on public WiFi", "Only for small purchases", "Only at coffee shops"],
              correctAnswer: 1,
              explanation: "Avoid shopping and banking on public WiFi as it's not secure and can expose your information."
            },
            {
              id: 6,
              question: "What should you do after online banking sessions?",
              options: ["Leave session open", "Properly log out and close browser", "Just close the window", "Let it time out"],
              correctAnswer: 1,
              explanation: "Always properly log out of banking sessions and close your browser to protect your account."
            },
            {
              id: 7,
              question: "How can you verify online retailers?",
              options: ["Trust all websites", "Check reviews, ratings, and business credentials", "Only use big companies", "Price is the only factor"],
              correctAnswer: 1,
              explanation: "Verify online retailers by checking customer reviews, ratings, and business credentials before purchasing."
            },
            {
              id: 8,
              question: "What information should you never provide via email?",
              options: ["Your name", "Passwords, SSN, or account numbers", "Your address", "Your phone number"],
              correctAnswer: 1,
              explanation: "Never provide passwords, Social Security numbers, or account numbers via email as it's not secure."
            },
            {
              id: 9,
              question: "What's a secure payment method for online purchases?",
              options: ["Wire transfers", "PayPal, credit cards, or secure checkout", "Cash mailed to seller", "Personal checks"],
              correctAnswer: 1,
              explanation: "Use secure payment methods like PayPal, credit cards, or verified secure checkout systems."
            },
            {
              id: 10,
              question: "How often should you check your online accounts?",
              options: ["Once a year", "Regularly - at least monthly", "Only when problems occur", "Never check them"],
              correctAnswer: 1,
              explanation: "Check your online accounts regularly (at least monthly) to spot unauthorized activity quickly."
            }
          ]
        }
      },
      {
        id: 1004,
        title: "Understanding Your Consumer Rights",
        description: "Know your rights and protections as a consumer",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn about your consumer rights and the protections available when dealing with financial products and services.",
        duration: "20 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is the Fair Credit Reporting Act (FCRA)?",
              options: ["Tax law", "Law governing credit report accuracy and privacy", "Banking regulation", "Investment rule"],
              correctAnswer: 1,
              explanation: "The FCRA governs the accuracy, fairness, and privacy of information in credit reports."
            },
            {
              id: 2,
              question: "What rights do you have regarding your credit report?",
              options: ["No rights", "Right to view, dispute errors, and control access", "Only banks can see it", "Cannot be changed"],
              correctAnswer: 1,
              explanation: "You have the right to view your credit report, dispute errors, and control who accesses it."
            },
            {
              id: 3,
              question: "What is the Truth in Lending Act?",
              options: ["Prevents all lending", "Requires disclosure of credit terms and costs", "Sets interest rates", "Only applies to mortgages"],
              correctAnswer: 1,
              explanation: "The Truth in Lending Act requires lenders to disclose credit terms and costs clearly."
            },
            {
              id: 4,
              question: "What protection do you have with credit card disputes?",
              options: ["No protection", "Right to dispute charges and withhold payment during investigation", "Must pay immediately", "Only for large amounts"],
              correctAnswer: 1,
              explanation: "You have the right to dispute credit card charges and withhold payment during the investigation."
            },
            {
              id: 5,
              question: "What is the Fair Debt Collection Practices Act?",
              options: ["Allows unlimited debt collection", "Protects consumers from abusive debt collection", "Eliminates all debt", "Only for business debt"],
              correctAnswer: 1,
              explanation: "The FDCPA protects consumers from abusive, deceptive, and unfair debt collection practices."
            },
            {
              id: 6,
              question: "Can debt collectors call you at any time?",
              options: ["Yes, anytime", "No, they have restrictions on when and how they can contact you", "Only at work", "Only on weekends"],
              correctAnswer: 1,
              explanation: "Debt collectors have restrictions on when, where, and how they can contact you under federal law."
            },
            {
              id: 7,
              question: "What should you do if you have a complaint about a financial institution?",
              options: ["Keep quiet", "File complaints with regulatory agencies like CFPB", "Only complain to the company", "Accept whatever happens"],
              correctAnswer: 1,
              explanation: "File complaints with regulatory agencies like the Consumer Financial Protection Bureau (CFPB)."
            },
            {
              id: 8,
              question: "What is the Equal Credit Opportunity Act?",
              options: ["Gives everyone credit", "Prohibits credit discrimination based on protected characteristics", "Sets credit limits", "Eliminates credit checks"],
              correctAnswer: 1,
              explanation: "The ECOA prohibits credit discrimination based on race, gender, age, and other protected characteristics."
            },
            {
              id: 9,
              question: "Do you have the right to cancel certain financial contracts?",
              options: ["Never", "Yes, some contracts have cooling-off periods", "Only expensive ones", "Only if you're elderly"],
              correctAnswer: 1,
              explanation: "Some financial contracts, like home equity loans, have mandatory cooling-off periods allowing cancellation."
            },
            {
              id: 10,
              question: "Where can you get help with consumer financial problems?",
              options: ["Nowhere", "CFPB, state attorneys general, consumer protection agencies", "Only lawyers", "Only banks"],
              correctAnswer: 1,
              explanation: "Get help from the CFPB, state attorneys general, consumer protection agencies, and legal aid organizations."
            }
          ]
        }
      }
    ]
  },
  {
    id: 11,
    title: "Major Life Events",
    description: "Navigate the financial aspects of major life decisions",
    level: "Advanced",
    duration: "3 hours",
    students: 980,
    topics: [
      "College financing and student loans",
      "Car buying decisions",
      "Home ownership vs renting",
      "Financial planning for marriage"
    ],
    lessons: [
      {
        id: 1101,
        title: "Paying for College & Managing Student Loans",
        description: "Navigate college financing options and student loan management",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn about college financing options, student loan types, and strategies for managing educational debt responsibly.",
        duration: "45 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What should you do before taking student loans?",
              options: ["Take maximum amount", "Exhaust grants, scholarships, and work-study first", "Only consider private loans", "Avoid all financial aid"],
              correctAnswer: 1,
              explanation: "Exhaust free money (grants and scholarships) and work-study opportunities before considering loans."
            },
            {
              id: 2,
              question: "What's the difference between federal and private student loans?",
              options: ["No difference", "Federal loans offer better protections and repayment options", "Private loans are always better", "Federal loans are more expensive"],
              correctAnswer: 1,
              explanation: "Federal student loans typically offer better borrower protections, flexible repayment options, and potential forgiveness programs."
            },
            {
              id: 3,
              question: "What is the FAFSA?",
              options: ["A type of loan", "Free Application for Federal Student Aid", "College entrance exam", "Scholarship program"],
              correctAnswer: 1,
              explanation: "FAFSA is the Free Application for Federal Student Aid used to determine eligibility for federal financial aid."
            },
            {
              id: 4,
              question: "When should you complete the FAFSA?",
              options: ["After graduation", "As early as possible each year", "Only when needed", "Once in a lifetime"],
              correctAnswer: 1,
              explanation: "Complete the FAFSA as early as possible each year to maximize financial aid opportunities."
            },
            {
              id: 5,
              question: "What are subsidized federal loans?",
              options: ["More expensive loans", "Government pays interest while in school", "Only for graduate students", "Private bank loans"],
              correctAnswer: 1,
              explanation: "Subsidized federal loans don't accrue interest while you're enrolled at least half-time in school."
            },
            {
              id: 6,
              question: "What is an income-driven repayment plan?",
              options: ["Fixed payment plan", "Payment based on income and family size", "Highest payment option", "Only for private loans"],
              correctAnswer: 1,
              explanation: "Income-driven repayment plans base monthly payments on your income and family size, not loan balance."
            },
            {
              id: 7,
              question: "Should you borrow the maximum amount offered?",
              options: ["Always borrow maximum", "Only borrow what you need", "Borrow for everything", "Never borrow anything"],
              correctAnswer: 1,
              explanation: "Only borrow what you actually need for educational expenses to minimize debt burden after graduation."
            },
            {
              id: 8,
              question: "What is loan forgiveness?",
              options: ["Automatic debt cancellation", "Programs that cancel remaining debt after meeting requirements", "Interest rate reduction", "Payment deferment"],
              correctAnswer: 1,
              explanation: "Loan forgiveness programs cancel remaining federal student loan debt after meeting specific requirements."
            },
            {
              id: 9,
              question: "When do you typically start repaying student loans?",
              options: ["Immediately", "Six months after graduation or dropping below half-time", "Ten years later", "Never"],
              correctAnswer: 1,
              explanation: "Federal student loan repayment typically begins six months after graduation or dropping below half-time enrollment."
            },
            {
              id: 10,
              question: "What happens if you can't make student loan payments?",
              options: ["Nothing", "Contact your servicer about options like deferment or forbearance", "Ignore the payments", "Change your name"],
              correctAnswer: 1,
              explanation: "Contact your loan servicer immediately to discuss options like deferment, forbearance, or income-driven repayment plans."
            }
          ]
        }
      },
      {
        id: 1102,
        title: "Buying a Car: Lease vs Finance",
        description: "Make informed decisions about car purchases and financing",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Compare leasing vs financing options and learn how to navigate car purchases to get the best deal.",
        duration: "45 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is the main difference between leasing and buying a car?",
              options: ["No difference", "Leasing is renting, buying gives you ownership", "Leasing is always cheaper", "Buying is always better"],
              correctAnswer: 1,
              explanation: "Leasing is essentially long-term renting, while buying gives you ownership of the vehicle."
            },
            {
              id: 2,
              question: "What are typical lease terms?",
              options: ["10-15 years", "2-4 years with mileage limits", "1 year only", "Lifetime agreement"],
              correctAnswer: 1,
              explanation: "Car leases typically last 2-4 years and include annual mileage limits (usually 10,000-15,000 miles)."
            },
            {
              id: 3,
              question: "What happens at the end of a lease?",
              options: ["You own the car", "Return car, buy it, or lease another", "Keep driving forever", "Get money back"],
              correctAnswer: 1,
              explanation: "At lease end, you can return the car, purchase it for the residual value, or lease another vehicle."
            },
            {
              id: 4,
              question: "When might leasing make sense?",
              options: ["Never", "Want lower payments and newer cars regularly", "Want to build equity", "Drive many miles"],
              correctAnswer: 1,
              explanation: "Leasing can make sense if you want lower monthly payments, drive within mileage limits, and like having newer cars."
            },
            {
              id: 5,
              question: "What should you research before car shopping?",
              options: ["Nothing", "Market prices, financing options, and reliability ratings", "Only color options", "Only dealer locations"],
              correctAnswer: 1,
              explanation: "Research market prices, financing options, reliability ratings, and insurance costs before shopping."
            },
            {
              id: 6,
              question: "Should you get financing pre-approved?",
              options: ["Never", "Yes, it gives you negotiating power", "Only for expensive cars", "Only from dealers"],
              correctAnswer: 1,
              explanation: "Pre-approval from banks or credit unions gives you negotiating power and helps you understand your budget."
            },
            {
              id: 7,
              question: "What's the total cost of car ownership?",
              options: ["Only purchase price", "Purchase price plus insurance, maintenance, fuel, and depreciation", "Only monthly payments", "Only insurance"],
              correctAnswer: 1,
              explanation: "Total ownership cost includes purchase price, insurance, maintenance, fuel, registration, and depreciation."
            },
            {
              id: 8,
              question: "Should you focus on monthly payment only?",
              options: ["Yes, only payment matters", "No, consider total cost and loan terms", "Only for leases", "Only for purchases"],
              correctAnswer: 1,
              explanation: "Focus on total cost, not just monthly payments - longer loans may have lower payments but higher total cost."
            },
            {
              id: 9,
              question: "What is gap insurance?",
              options: ["Regular auto insurance", "Coverage for difference between car value and loan balance", "Warranty extension", "Maintenance coverage"],
              correctAnswer: 1,
              explanation: "Gap insurance covers the difference between what you owe and the car's value if it's totaled or stolen."
            },
            {
              id: 10,
              question: "When is it better to buy used vs new?",
              options: ["Always buy new", "Used cars offer better value for many buyers", "Never buy used", "Only based on color preference"],
              correctAnswer: 1,
              explanation: "Used cars often offer better value due to avoiding the steepest depreciation that occurs in the first few years."
            }
          ]
        }
      },
      {
        id: 1103,
        title: "Renting vs Buying a Home",
        description: "Evaluate the financial implications of renting versus homeownership",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understand the financial pros and cons of renting versus buying a home and how to make the right decision for your situation.",
        duration: "45 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What are the main financial benefits of renting?",
              options: ["Building equity", "Lower upfront costs and flexibility", "Tax deductions", "Property appreciation"],
              correctAnswer: 1,
              explanation: "Renting typically requires lower upfront costs (security deposit vs down payment) and offers more flexibility."
            },
            {
              id: 2,
              question: "What are the main financial benefits of buying?",
              options: ["No maintenance costs", "Building equity and potential appreciation", "Lower monthly costs", "No insurance needed"],
              correctAnswer: 1,
              explanation: "Homeownership allows you to build equity and potentially benefit from property appreciation over time."
            },
            {
              id: 3,
              question: "What is typically required for a home down payment?",
              options: ["100% of home value", "3-20% of home value", "1% of home value", "No down payment needed"],
              correctAnswer: 1,
              explanation: "Down payments typically range from 3-20% of the home's value, depending on the loan type."
            },
            {
              id: 4,
              question: "What are closing costs?",
              options: ["Monthly mortgage payments", "One-time fees for completing home purchase", "Property taxes", "Insurance premiums"],
              correctAnswer: 1,
              explanation: "Closing costs are one-time fees paid when completing a home purchase, typically 2-5% of the loan amount."
            },
            {
              id: 5,
              question: "What is PMI?",
              options: ["Property Management Insurance", "Private Mortgage Insurance", "Public Mortgage Investment", "Personal Mortgage Interest"],
              correctAnswer: 1,
              explanation: "PMI (Private Mortgage Insurance) protects lenders when buyers put down less than 20%."
            },
            {
              id: 6,
              question: "What ongoing costs do homeowners have that renters don't?",
              options: ["Rent payments", "Property taxes, maintenance, and HOA fees", "Security deposits", "Utility bills"],
              correctAnswer: 1,
              explanation: "Homeowners pay property taxes, maintenance costs, and potentially HOA fees that renters don't."
            },
            {
              id: 7,
              question: "How long should you plan to stay to make buying worthwhile?",
              options: ["1 year", "Generally 5-7 years or more", "3 months", "Forever"],
              correctAnswer: 1,
              explanation: "You should typically plan to stay 5-7 years or more to offset the transaction costs of buying and selling."
            },
            {
              id: 8,
              question: "What is the debt-to-income ratio for mortgages?",
              options: ["No limit", "Generally 28-36% for housing, 43% total debt", "50% minimum", "10% maximum"],
              correctAnswer: 1,
              explanation: "Lenders generally prefer housing costs under 28-36% of income and total debt under 43%."
            },
            {
              id: 9,
              question: "Should you buy if you can barely afford the mortgage payment?",
              options: ["Yes, always buy", "No, ensure you can afford all homeownership costs", "Only if interest rates are low", "Only in certain markets"],
              correctAnswer: 1,
              explanation: "Don't buy if you can barely afford the payment - factor in maintenance, taxes, and emergency repairs."
            },
            {
              id: 10,
              question: "What factors should influence the rent vs buy decision?",
              options: ["Only monthly costs", "Financial situation, life plans, local market conditions", "Only home prices", "Only rental costs"],
              correctAnswer: 1,
              explanation: "Consider your financial situation, life plans, local market conditions, and both short and long-term costs."
            }
          ]
        }
      },
      {
        id: 1104,
        title: "Combining Finances in Marriage",
        description: "Navigate financial planning and decisions as a couple",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn strategies for managing money as a couple, including budgeting, goal setting, and financial communication.",
        duration: "45 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What's the most important aspect of managing money as a couple?",
              options: ["Having separate accounts", "Open communication about finances", "One person handling everything", "Keeping finances secret"],
              correctAnswer: 1,
              explanation: "Open, honest communication about money is the foundation of successful financial partnership in marriage."
            },
            {
              id: 2,
              question: "Should couples combine all their accounts?",
              options: ["Always combine everything", "Choose what works for your situation", "Never combine anything", "Only combine checking accounts"],
              correctAnswer: 1,
              explanation: "There's no one-size-fits-all approach - couples should choose the system that works best for their situation."
            },
            {
              id: 3,
              question: "How should couples handle different spending styles?",
              options: ["One person should change completely", "Communicate, compromise, and set agreed-upon limits", "Avoid the issue", "Keep finances completely separate"],
              correctAnswer: 1,
              explanation: "Acknowledge differences, communicate openly, and create compromises that work for both partners."
            },
            {
              id: 4,
              question: "What are common financial topics couples should discuss?",
              options: ["Only current income", "Goals, debts, spending habits, and future plans", "Only major purchases", "Only problems"],
              correctAnswer: 1,
              explanation: "Discuss financial goals, existing debts, spending habits, and plans for the future comprehensively."
            },
            {
              id: 5,
              question: "How should couples handle debt from before marriage?",
              options: ["Ignore it", "Discuss openly and create a plan together", "Each person handles their own", "Blame each other"],
              correctAnswer: 1,
              explanation: "Discuss all existing debts openly and create a joint strategy for handling them, even if legally separate."
            },
            {
              id: 6,
              question: "What is a good approach for setting financial goals as a couple?",
              options: ["One person decides everything", "Set individual and joint goals together", "Avoid setting goals", "Only focus on short-term goals"],
              correctAnswer: 1,
              explanation: "Work together to set both individual and joint financial goals that reflect both partners' priorities."
            },
            {
              id: 7,
              question: "How should couples handle differences in income?",
              options: ["Higher earner controls everything", "Create a fair system based on your values", "Split everything 50/50 always", "Lower earner has no say"],
              correctAnswer: 1,
              explanation: "Create a system that feels fair to both partners, whether based on income percentage, equal amounts, or other agreed criteria."
            },
            {
              id: 8,
              question: "What's a good practice for major financial decisions?",
              options: ["Make decisions independently", "Discuss and agree before spending above a set threshold", "One person decides everything", "Never spend on anything major"],
              correctAnswer: 1,
              explanation: "Agree on a threshold amount above which both partners must discuss and agree before spending."
            },
            {
              id: 9,
              question: "How can couples maintain financial harmony?",
              options: ["Avoid talking about money", "Regular financial check-ins and ongoing communication", "One person handles everything", "Keep all finances separate"],
              correctAnswer: 1,
              explanation: "Schedule regular financial check-ins to discuss progress, challenges, and adjust plans as needed."
            },
            {
              id: 10,
              question: "Should couples have any individual financial autonomy?",
              options: ["No individual autonomy", "Yes, some individual spending freedom within agreed limits", "Complete individual autonomy", "Only for small purchases"],
              correctAnswer: 1,
              explanation: "Most couples benefit from having some individual spending freedom within mutually agreed-upon limits."
            }
          ]
        }
      }
    ]
  },
  {
    id: 12,
    title: "Future Planning",
    description: "Plan for long-term financial security and life's uncertainties",
    level: "Advanced",
    duration: "3.5 hours",
    students: 890,
    topics: [
      "Family financial planning",
      "Early retirement planning strategies",
      "Estate planning fundamentals",
      "Contingency planning for emergencies"
    ],
    lessons: [
      {
        id: 1201,
        title: "Budgeting for a Family & Kids",
        description: "Plan financially for growing family expenses and children",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn how to budget for family expenses, plan for children's costs, and maintain financial stability while raising a family.",
        duration: "50 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "How much does raising a child typically cost?",
              options: ["$10,000 total", "$200,000+ from birth to 18", "$50,000 total", "$1 million"],
              correctAnswer: 1,
              explanation: "The USDA estimates it costs $200,000+ to raise a child from birth to age 18, not including college."
            },
            {
              id: 2,
              question: "What are the major categories of child-related expenses?",
              options: ["Only food and clothes", "Housing, food, childcare, healthcare, education", "Only medical costs", "Only education"],
              correctAnswer: 1,
              explanation: "Major categories include housing, food, childcare, healthcare, education, and miscellaneous expenses."
            },
            {
              id: 3,
              question: "When should you start saving for children's education?",
              options: ["When they start school", "As early as possible", "In high school", "Never - they should pay"],
              correctAnswer: 1,
              explanation: "Starting early allows compound growth to work in your favor for education savings."
            },
            {
              id: 4,
              question: "What is a 529 plan?",
              options: ["Retirement account", "Tax-advantaged education savings plan", "Insurance policy", "Investment strategy"],
              correctAnswer: 1,
              explanation: "529 plans are tax-advantaged accounts specifically designed for education expenses."
            },
            {
              id: 5,
              question: "Should you prioritize children's education over retirement savings?",
              options: ["Always prioritize education", "Generally prioritize retirement - kids can borrow for college", "Split equally always", "Never save for either"],
              correctAnswer: 1,
              explanation: "Generally prioritize retirement since you can't borrow for retirement, but children can get financial aid for education."
            },
            {
              id: 6,
              question: "How should having children affect your emergency fund?",
              options: ["No change needed", "Increase it to cover family expenses", "Decrease it", "Eliminate it"],
              correctAnswer: 1,
              explanation: "Family expenses increase emergency fund needs - consider 6-12 months of expenses instead of 3-6."
            },
            {
              id: 7,
              question: "What insurance becomes more important with children?",
              options: ["Only auto insurance", "Life and disability insurance", "Only health insurance", "No additional insurance needed"],
              correctAnswer: 1,
              explanation: "Life and disability insurance become crucial to protect your family's financial security."
            },
            {
              id: 8,
              question: "How can families save money on childcare?",
              options: ["There's no way to save", "Family care, co-ops, employer programs, tax benefits", "Only expensive options available", "Avoid childcare entirely"],
              correctAnswer: 1,
              explanation: "Consider family care, childcare co-ops, employer programs, and tax benefits like dependent care FSAs."
            },
            {
              id: 9,
              question: "What is lifestyle inflation with children?",
              options: ["Normal cost increases", "Unnecessarily upgrading lifestyle when having kids", "Required spending only", "Inflation affecting families"],
              correctAnswer: 1,
              explanation: "Lifestyle inflation with kids means spending more than necessary by upgrading everything when children arrive."
            },
            {
              id: 10,
              question: "How should families approach teaching kids about money?",
              options: ["Keep money private", "Age-appropriate education and involvement", "Wait until they're adults", "Let schools handle it"],
              correctAnswer: 1,
              explanation: "Provide age-appropriate financial education and involve children in appropriate money decisions to build their skills."
            }
          ]
        }
      },
      {
        id: 1202,
        title: "Retirement Planning: When and How to Start",
        description: "Build a comprehensive retirement planning strategy",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn retirement planning fundamentals, including when to start, how much to save, and investment strategies for long-term success.",
        duration: "55 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "When should you start retirement planning?",
              options: ["Age 50", "As early as possible in your career", "10 years before retirement", "Only when wealthy"],
              correctAnswer: 1,
              explanation: "Start retirement planning as early as possible to maximize the power of compound growth."
            },
            {
              id: 2,
              question: "What percentage of income should you aim to save for retirement?",
              options: ["5%", "10-15% or more", "1%", "50%"],
              correctAnswer: 1,
              explanation: "Financial experts generally recommend saving 10-15% or more of income for retirement."
            },
            {
              id: 3,
              question: "What is the rule of thumb for retirement income needs?",
              options: ["10% of working income", "70-90% of pre-retirement income", "50% of working income", "Same as working income"],
              correctAnswer: 1,
              explanation: "Most people need 70-90% of their pre-retirement income to maintain their lifestyle in retirement."
            },
            {
              id: 4,
              question: "What are the three pillars of retirement planning?",
              options: ["Stocks, bonds, cash", "Social Security, employer plans, personal savings", "Real estate, stocks, bonds", "401k, IRA, Roth IRA"],
              correctAnswer: 1,
              explanation: "The three pillars are Social Security, employer-sponsored plans, and personal savings/investments."
            },
            {
              id: 5,
              question: "At what age can you access 401(k) funds without penalty?",
              options: ["55", "59½", "62", "65"],
              correctAnswer: 1,
              explanation: "You can generally access 401(k) funds without early withdrawal penalty starting at age 59½."
            },
            {
              id: 6,
              question: "What is Social Security's role in retirement?",
              options: ["Complete retirement funding", "Foundation that should be supplemented", "Not important", "Only for poor people"],
              correctAnswer: 1,
              explanation: "Social Security provides a foundation that should be supplemented with other retirement savings."
            },
            {
              id: 7,
              question: "What is the 4% withdrawal rule?",
              options: ["Withdraw 4% per month", "Withdraw 4% annually from retirement savings", "Save 4% for retirement", "Invest in 4% bonds"],
              correctAnswer: 1,
              explanation: "The 4% rule suggests withdrawing 4% of retirement savings annually to make money last about 30 years."
            },
            {
              id: 8,
              question: "How should investment allocation change as you age?",
              options: ["Stay the same", "Generally become more conservative over time", "Become more aggressive", "Switch to cash only"],
              correctAnswer: 1,
              explanation: "Investment allocation typically becomes more conservative as you approach and enter retirement."
            },
            {
              id: 9,
              question: "What is catch-up contribution?",
              options: ["Making up missed payments", "Extra contributions allowed for people 50+", "Employer matching", "Penalty for late contributions"],
              correctAnswer: 1,
              explanation: "Catch-up contributions allow people age 50+ to contribute extra amounts to retirement accounts."
            },
            {
              id: 10,
              question: "Should healthcare costs be factored into retirement planning?",
              options: ["No, Medicare covers everything", "Yes, healthcare is a major retirement expense", "Only for unhealthy people", "Healthcare is free in retirement"],
              correctAnswer: 1,
              explanation: "Healthcare is a major expense in retirement and should be factored into planning, as Medicare doesn't cover everything."
            }
          ]
        }
      },
      {
        id: 1203,
        title: "Estate Planning (Wills, Trusts, Beneficiaries)",
        description: "Protect your assets and provide for your loved ones",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Understand estate planning basics including wills, trusts, and beneficiary designations to ensure your wishes are carried out.",
        duration: "50 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What is estate planning?",
              options: ["Only for wealthy people", "Planning for asset transfer and end-of-life decisions", "Real estate investing", "Tax avoidance only"],
              correctAnswer: 1,
              explanation: "Estate planning involves preparing for the transfer of assets and making end-of-life decisions for people of all wealth levels."
            },
            {
              id: 2,
              question: "Who needs a will?",
              options: ["Only wealthy people", "Everyone with assets or dependents", "Only elderly people", "Only business owners"],
              correctAnswer: 1,
              explanation: "Anyone with assets or dependents should have a will to control how their assets are distributed."
            },
            {
              id: 3,
              question: "What happens if you die without a will?",
              options: ["Nothing", "State laws determine asset distribution", "Everything goes to charity", "Government keeps everything"],
              correctAnswer: 1,
              explanation: "Without a will, state intestacy laws determine how your assets are distributed, which may not match your wishes."
            },
            {
              id: 4,
              question: "What is a beneficiary designation?",
              options: ["Type of investment", "Person designated to receive account benefits", "Legal document", "Insurance policy"],
              correctAnswer: 1,
              explanation: "Beneficiary designations specify who receives benefits from retirement accounts, life insurance, and other accounts."
            },
            {
              id: 5,
              question: "Do beneficiary designations override wills?",
              options: ["No, wills always control", "Yes, beneficiary designations take precedence", "They're the same thing", "It depends on the state"],
              correctAnswer: 1,
              explanation: "Beneficiary designations on accounts take precedence over wills for those specific assets."
            },
            {
              id: 6,
              question: "What is a trust?",
              options: ["Type of investment", "Legal entity that holds assets for beneficiaries", "Insurance policy", "Government program"],
              correctAnswer: 1,
              explanation: "A trust is a legal entity that holds and manages assets for the benefit of designated beneficiaries."
            },
            {
              id: 7,
              question: "What is a power of attorney?",
              options: ["Legal degree", "Document authorizing someone to act on your behalf", "Court order", "Insurance policy"],
              correctAnswer: 1,
              explanation: "Power of attorney authorizes someone to make financial or healthcare decisions on your behalf if you're unable to."
            },
            {
              id: 8,
              question: "When should you review and update your estate plan?",
              options: ["Never", "After major life events and periodically", "Only when you get older", "Once is enough"],
              correctAnswer: 1,
              explanation: "Review estate plans after major life events (marriage, divorce, children, deaths) and periodically to ensure they're current."
            },
            {
              id: 9,
              question: "What is probate?",
              options: ["Type of investment", "Legal process for distributing assets after death", "Tax on inheritance", "Insurance claim"],
              correctAnswer: 1,
              explanation: "Probate is the legal process of validating a will and distributing assets according to the deceased's wishes or state law."
            },
            {
              id: 10,
              question: "Should you use online estate planning tools?",
              options: ["Always use online tools", "Consider for simple situations, but complex estates need professional help", "Never use online tools", "Only if you're tech-savvy"],
              correctAnswer: 1,
              explanation: "Online tools can work for simple situations, but complex estates or family situations typically require professional legal assistance."
            }
          ]
        }
      },
      {
        id: 1204,
        title: "Planning for the Unexpected (Disability, Job Loss)",
        description: "Prepare financially for life's unexpected challenges",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Learn to create comprehensive plans for handling unexpected life events like disability, job loss, and other financial emergencies.",
        duration: "50 min",
        completed: false,
        quiz: {
          passingScore: 90,
          questions: [
            {
              id: 1,
              question: "What percentage of workers will experience a disability during their career?",
              options: ["5%", "About 25%", "50%", "75%"],
              correctAnswer: 1,
              explanation: "Statistics show that about 25% of workers will experience a disability that prevents them from working during their career."
            },
            {
              id: 2,
              question: "What is disability insurance?",
              options: ["Health insurance", "Income replacement if you can't work due to disability", "Life insurance", "Property insurance"],
              correctAnswer: 1,
              explanation: "Disability insurance provides income replacement if you become unable to work due to illness or injury."
            },
            {
              id: 3,
              question: "What's the difference between short-term and long-term disability insurance?",
              options: ["No difference", "Duration of coverage period", "Amount of benefits only", "Who provides it"],
              correctAnswer: 1,
              explanation: "Short-term disability covers weeks to months, while long-term disability can cover years or until retirement."
            },
            {
              id: 4,
              question: "How much emergency fund should you have for job loss?",
              options: ["1 month expenses", "6-12 months of expenses", "1 week expenses", "Emergency funds don't help"],
              correctAnswer: 1,
              explanation: "For job loss protection, aim for 6-12 months of expenses in your emergency fund, depending on your industry and job security."
            },
            {
              id: 5,
              question: "What should you do immediately after job loss?",
              options: ["Take a vacation", "File for unemployment, review finances, begin job search", "Make major purchases", "Ignore the situation"],
              correctAnswer: 1,
              explanation: "Immediately file for unemployment benefits, review your financial situation, and begin an organized job search."
            },
            {
              id: 6,
              question: "What is COBRA coverage?",
              options: ["Government insurance", "Continued employer health insurance after job loss", "Snake insurance", "Disability coverage"],
              correctAnswer: 1,
              explanation: "COBRA allows you to continue employer health insurance coverage after job loss, though you pay the full premium."
            },
            {
              id: 7,
              question: "How can you prepare for potential job loss?",
              options: ["Nothing you can do", "Build emergency fund, update skills, network, keep resume current", "Change jobs frequently", "Avoid all career risks"],
              correctAnswer: 1,
              explanation: "Prepare by building emergency funds, continuously updating skills, networking, and keeping your resume current."
            },
            {
              id: 8,
              question: "What expenses should you cut first during financial hardship?",
              options: ["Housing and food", "Non-essential expenses like entertainment and dining out", "Insurance and debt payments", "All expenses equally"],
              correctAnswer: 1,
              explanation: "Cut non-essential expenses first while maintaining housing, food, insurance, and minimum debt payments."
            },
            {
              id: 9,
              question: "Should you tap retirement accounts during emergencies?",
              options: ["Always first choice", "Generally avoid due to penalties and lost growth", "Always the best option", "Only for small amounts"],
              correctAnswer: 1,
              explanation: "Generally avoid tapping retirement accounts due to penalties, taxes, and lost compound growth - use other options first."
            },
            {
              id: 10,
              question: "What is business interruption insurance?",
              options: ["Personal disability insurance", "Coverage for business income loss during disruptions", "Life insurance", "Health insurance"],
              correctAnswer: 1,
              explanation: "Business interruption insurance covers lost income when business operations are disrupted by covered events."
            }
          ]
        }
      }
    ]
  }
];