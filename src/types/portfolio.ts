export interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  changePercent: number;
  sector: string;
}

export interface PortfolioHolding {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  shares: number;
  price: number;
  total: number;
  date: string;
}

export interface Portfolio {
  cash: number;
  holdings: PortfolioHolding[];
  transactions: Transaction[];
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}
