"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePortfolioStore } from '@/store/portfolio-store';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PortfolioDashboard() {
  const { totalValue, cash, totalGainLoss, totalGainLossPercent } = usePortfolioStore();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const isPositive = totalGainLoss >= 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
          <p className="text-xs text-muted-foreground">
            Current portfolio value
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cash Available</CardTitle>
          <DollarSign className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(cash)}</div>
          <p className="text-xs text-muted-foreground">
            Ready to invest
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-primary" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
        </CardHeader>
        <CardContent>
          <div className={cn("text-2xl font-bold", isPositive ? "text-primary" : "text-destructive")}>
            {isPositive ? "+" : ""}{formatCurrency(totalGainLoss)}
          </div>
          <p className="text-xs text-muted-foreground">
            All-time performance
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Return %</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={cn("text-2xl font-bold", isPositive ? "text-primary" : "text-destructive")}>
            {isPositive ? "+" : ""}{totalGainLossPercent.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Percentage return
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
