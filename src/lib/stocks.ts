import { Stock } from '@/types/portfolio';

export const MOCK_STOCKS: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 178.50, changePercent: 1.2, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', currentPrice: 380.25, changePercent: 0.8, sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', currentPrice: 141.80, changePercent: -0.5, sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', currentPrice: 178.35, changePercent: 2.1, sector: 'Consumer Cyclical' },
  { symbol: 'TSLA', name: 'Tesla Inc.', currentPrice: 242.80, changePercent: -1.5, sector: 'Consumer Cyclical' },
  { symbol: 'JPM', name: 'JPMorgan Chase', currentPrice: 195.40, changePercent: 0.5, sector: 'Financial' },
  { symbol: 'V', name: 'Visa Inc.', currentPrice: 275.90, changePercent: 0.3, sector: 'Financial' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', currentPrice: 156.30, changePercent: -0.2, sector: 'Healthcare' },
  { symbol: 'PG', name: 'Procter & Gamble', currentPrice: 168.20, changePercent: 0.1, sector: 'Consumer Defensive' },
  { symbol: 'XOM', name: 'Exxon Mobil', currentPrice: 112.50, changePercent: 1.5, sector: 'Energy' },
  { symbol: 'VTI', name: 'Vanguard Total Stock Market', currentPrice: 258.40, changePercent: 0.4, sector: 'ETF' },
  { symbol: 'VOO', name: 'Vanguard S&P 500', currentPrice: 475.80, changePercent: 0.4, sector: 'ETF' },
];

export const getStock = (symbol: string): Stock | undefined => {
  return MOCK_STOCKS.find(s => s.symbol === symbol);
};

export const searchStocks = (query: string): Stock[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_STOCKS.filter(s => 
    s.symbol.toLowerCase().includes(lowerQuery) || 
    s.name.toLowerCase().includes(lowerQuery)
  );
};
