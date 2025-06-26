
// Site content structure - easily manageable through your code editor
export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    stats: {
      studentsEducated: string;
      interactiveCourses: string;
      successRate: string;
    };
  };
  features: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  aiAssistant: {
    title: string;
    description: string;
    features: {
      title: string;
      description: string;
      example: string;
    }[];
  };
}

export const siteContent: SiteContent = {
  hero: {
    title: "Master Your Financial Future",
    subtitle: "NoImpulse empowers students with essential personal finance skills",
    description: "NoImpulse empowers students with essential personal finance skills through interactive courses and AI-powered tools. Learn to budget, save, and build a secure financial foundation for life.",
    stats: {
      studentsEducated: "10,000+",
      interactiveCourses: "15+",
      successRate: "95%"
    }
  },
  features: {
    title: "Why Choose NoImpulse?",
    subtitle: "Our comprehensive platform provides everything students need to build financial literacy and confidence.",
    items: [
      {
        title: "Interactive Courses",
        description: "Engaging, bite-sized lessons that make learning personal finance fun and accessible for students.",
        icon: "BookOpen"
      },
      {
        title: "AI-Powered Assistant",
        description: "Get personalized financial advice and help creating budgets with our intelligent AI assistant.",
        icon: "Bot"
      },
      {
        title: "Budget Tools",
        description: "Easy-to-use calculators and budgeting tools designed specifically for student lifestyles.",
        icon: "Calculator"
      },
      {
        title: "Goal Setting",
        description: "Set and track financial goals with our intuitive goal-setting framework and progress tracking.",
        icon: "Target"
      },
      {
        title: "Peer Community",
        description: "Connect with other students on their financial journey and share experiences and tips.",
        icon: "Users"
      },
      {
        title: "Certifications",
        description: "Earn recognized certificates to showcase your financial literacy skills to future employers.",
        icon: "Award"
      }
    ]
  },
  aiAssistant: {
    title: "AI Financial Assistant",
    description: "Meet your personal finance companion powered by artificial intelligence. Get instant help with budgeting, saving, and financial planning tailored to your unique situation.",
    features: [
      {
        title: "Budget Creator",
        description: "AI-powered budget creation based on your income, expenses, and financial goals.",
        example: "Create a budget for a college student with $800/month income"
      },
      {
        title: "Savings Planner",
        description: "Get personalized savings strategies and track your progress toward financial goals.",
        example: "Help me save $2,000 for spring break in 6 months"
      },
      {
        title: "Expense Analyzer",
        description: "Analyze spending patterns and get insights to optimize your financial habits.",
        example: "Why am I overspending on food this month?"
      },
      {
        title: "24/7 Financial Guidance",
        description: "Ask any personal finance question and get expert advice instantly.",
        example: "Should I get a credit card as a college student?"
      }
    ]
  }
};
