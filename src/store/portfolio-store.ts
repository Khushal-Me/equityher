import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Portfolio, Transaction } from '@/types/portfolio';
import { v4 as uuidv4 } from 'uuid';

interface PortfolioState extends Portfolio {
  buyStock: (symbol: string, name: string, price: number, shares: number) => boolean;
  sellStock: (symbol: string, price: number, shares: number) => boolean;
  resetPortfolio: () => void;
}

const INITIAL_CASH = 10000;

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      cash: INITIAL_CASH,
      holdings: [],
      transactions: [],
      totalValue: INITIAL_CASH,
      totalGainLoss: 0,
      totalGainLossPercent: 0,

      buyStock: (symbol, name, price, shares) => {
        const { cash, holdings, transactions } = get();
        const totalCost = price * shares;

        if (totalCost > cash) return false;

        const existingHolding = holdings.find(h => h.symbol === symbol);
        let newHoldings = [...holdings];

        if (existingHolding) {
          const totalShares = existingHolding.shares + shares;
          const newAvgPrice = ((existingHolding.shares * existingHolding.avgBuyPrice) + totalCost) / totalShares;
          
          newHoldings = newHoldings.map(h => 
            h.symbol === symbol 
              ? { ...h, shares: totalShares, avgBuyPrice: newAvgPrice, currentPrice: price, totalValue: totalShares * price }
              : h
          );
        } else {
          newHoldings.push({
            id: uuidv4(),
            symbol,
            name,
            shares,
            avgBuyPrice: price,
            currentPrice: price,
            totalValue: totalCost,
            gainLoss: 0,
            gainLossPercent: 0
          });
        }

        const newTransaction: Transaction = {
          id: uuidv4(),
          type: 'buy',
          symbol,
          shares,
          price,
          total: totalCost,
          date: new Date().toISOString()
        };

        const newCash = cash - totalCost;
        const newTotalValue = newHoldings.reduce((acc, h) => acc + h.totalValue, 0) + newCash;

        set({
          cash: newCash,
          holdings: newHoldings,
          transactions: [newTransaction, ...transactions],
          totalValue: newTotalValue,
          totalGainLoss: newTotalValue - INITIAL_CASH,
          totalGainLossPercent: ((newTotalValue - INITIAL_CASH) / INITIAL_CASH) * 100
        });

        return true;
      },

      sellStock: (symbol, price, shares) => {
        const { cash, holdings, transactions } = get();
        const holding = holdings.find(h => h.symbol === symbol);

        if (!holding || holding.shares < shares) return false;

        const totalProceeds = price * shares;
        let newHoldings = [...holdings];

        if (holding.shares === shares) {
          newHoldings = newHoldings.filter(h => h.symbol !== symbol);
        } else {
          newHoldings = newHoldings.map(h => 
            h.symbol === symbol 
              ? { ...h, shares: h.shares - shares, currentPrice: price, totalValue: (h.shares - shares) * price }
              : h
          );
        }

        const newTransaction: Transaction = {
          id: uuidv4(),
          type: 'sell',
          symbol,
          shares,
          price,
          total: totalProceeds,
          date: new Date().toISOString()
        };

        const newCash = cash + totalProceeds;
        const newTotalValue = newHoldings.reduce((acc, h) => acc + h.totalValue, 0) + newCash;

        set({
          cash: newCash,
          holdings: newHoldings,
          transactions: [newTransaction, ...transactions],
          totalValue: newTotalValue,
          totalGainLoss: newTotalValue - INITIAL_CASH,
          totalGainLossPercent: ((newTotalValue - INITIAL_CASH) / INITIAL_CASH) * 100
        });

        return true;
      },

      resetPortfolio: () => set({
        cash: INITIAL_CASH,
        holdings: [],
        transactions: [],
        totalValue: INITIAL_CASH,
        totalGainLoss: 0,
        totalGainLossPercent: 0
      })
    }),
    {
      name: 'portfolio-storage',
    }
  )
);
