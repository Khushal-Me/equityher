export interface LearningTopic {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
}

export const LEARNING_TOPICS: LearningTopic[] = [
  { id: 'stocks-basics', title: 'Stocks & Bonds Basics', description: 'Learn the fundamental differences between stocks and bonds and how they fit into a portfolio.', difficulty: 'beginner', duration: '10 min' },
  { id: 'diversification', title: 'Understanding Diversification', description: 'Why putting all your eggs in one basket is risky, and how to spread your investments.', difficulty: 'beginner', duration: '15 min' },
  { id: 'risk-tolerance', title: 'Risk Tolerance & Asset Allocation', description: 'Determine your investment personality and how to balance risk and reward.', difficulty: 'beginner', duration: '12 min' },
  { id: 'dollar-cost-avg', title: 'Dollar-Cost Averaging', description: 'A simple strategy to reduce the impact of volatility on your investments.', difficulty: 'beginner', duration: '8 min' },
  { id: 'etfs', title: 'Index Funds vs ETFs', description: 'Understanding these popular investment vehicles and their benefits.', difficulty: 'intermediate', duration: '15 min' },
  { id: 'retirement', title: 'Retirement Accounts', description: 'Overview of 401(k)s, IRAs, and other tax-advantaged accounts.', difficulty: 'intermediate', duration: '20 min' },
  { id: 'taxes', title: 'Tax-Efficient Investing', description: 'Strategies to minimize taxes on your investment gains.', difficulty: 'intermediate', duration: '18 min' },
  { id: 'emergency-fund', title: 'Emergency Funds', description: 'Why you need a financial safety net before investing heavily.', difficulty: 'beginner', duration: '10 min' },
  { id: 'compound-interest', title: 'Compound Interest', description: 'The magic of compounding and why starting early matters.', difficulty: 'beginner', duration: '10 min' },
  { id: 'volatility', title: 'Market Volatility', description: 'How to handle market ups and downs without panicking.', difficulty: 'intermediate', duration: '15 min' },
  { id: 'long-term', title: 'Long-Term Thinking', description: 'Developing a mindset for long-term wealth creation.', difficulty: 'advanced', duration: '12 min' },
  { id: 'emotional', title: 'Avoiding Emotional Decisions', description: 'Psychological traps in investing and how to avoid them.', difficulty: 'advanced', duration: '15 min' }
];
