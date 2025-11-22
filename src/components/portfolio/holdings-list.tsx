"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePortfolioStore } from '@/store/portfolio-store';
import { cn } from '@/lib/utils';

export function HoldingsList() {
  const { holdings } = usePortfolioStore();

  if (holdings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No stocks in your portfolio yet. Start trading to build your wealth!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-4 py-3">Symbol</th>
                <th className="px-4 py-3">Shares</th>
                <th className="px-4 py-3">Avg Price</th>
                <th className="px-4 py-3">Current</th>
                <th className="px-4 py-3">Value</th>
                <th className="px-4 py-3">Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => {
                const currentVal = holding.shares * holding.currentPrice;
                const costBasis = holding.shares * holding.avgBuyPrice;
                const gainLoss = currentVal - costBasis;
                const gainLossPercent = (gainLoss / costBasis) * 100;
                const isPositive = gainLoss >= 0;

                return (
                  <tr key={holding.symbol} className="border-b border-border hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">
                      <div>{holding.symbol}</div>
                      <div className="text-xs text-muted-foreground">{holding.name}</div>
                    </td>
                    <td className="px-4 py-3">{holding.shares}</td>
                    <td className="px-4 py-3">${holding.avgBuyPrice.toFixed(2)}</td>
                    <td className="px-4 py-3">${holding.currentPrice.toFixed(2)}</td>
                    <td className="px-4 py-3 font-medium">${currentVal.toFixed(2)}</td>
                    <td className={cn("px-4 py-3", isPositive ? "text-primary" : "text-destructive")}>
                      <div>{isPositive ? "+" : ""}{gainLoss.toFixed(2)}</div>
                      <div className="text-xs">{isPositive ? "+" : ""}{gainLossPercent.toFixed(2)}%</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
