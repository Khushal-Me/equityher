"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePortfolioStore } from '@/store/portfolio-store';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export function TransactionHistory() {
  const { transactions } = usePortfolioStore();

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No transactions yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 10).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                <Badge variant={tx.type === 'buy' ? 'default' : 'secondary'} className={tx.type === 'buy' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}>
                  {tx.type.toUpperCase()}
                </Badge>
                <div>
                  <div className="font-medium">{tx.symbol}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(tx.date), 'MMM d, yyyy h:mm a')}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${tx.total.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">
                  {tx.shares} shares @ ${tx.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
