"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MOCK_STOCKS, getStock } from '@/lib/stocks';
import { usePortfolioStore } from '@/store/portfolio-store';
import { toast } from 'react-hot-toast';

export function StockTrading() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [shares, setShares] = useState<string>('');
  const { buyStock, sellStock, cash, holdings } = usePortfolioStore();

  const selectedStock = selectedSymbol ? getStock(selectedSymbol) : null;
  const currentHolding = holdings.find(h => h.symbol === selectedSymbol);
  
  const sharesNum = parseInt(shares) || 0;
  const totalCost = selectedStock ? selectedStock.currentPrice * sharesNum : 0;

  const handleBuy = () => {
    if (!selectedStock || sharesNum <= 0) return;
    
    if (totalCost > cash) {
      toast.error("Insufficient funds");
      return;
    }

    const success = buyStock(selectedStock.symbol, selectedStock.name, selectedStock.currentPrice, sharesNum);
    if (success) {
      toast.success(`Bought ${sharesNum} shares of ${selectedStock.symbol}`);
      setShares('');
    } else {
      toast.error("Transaction failed");
    }
  };

  const handleSell = () => {
    if (!selectedStock || sharesNum <= 0) return;

    if (!currentHolding || currentHolding.shares < sharesNum) {
      toast.error("Insufficient shares");
      return;
    }

    const success = sellStock(selectedStock.symbol, selectedStock.currentPrice, sharesNum);
    if (success) {
      toast.success(`Sold ${sharesNum} shares of ${selectedStock.symbol}`);
      setShares('');
    } else {
      toast.error("Transaction failed");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Stocks</CardTitle>
        <CardDescription>Buy and sell stocks with your virtual portfolio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Select Stock</Label>
          <Select onValueChange={setSelectedSymbol} value={selectedSymbol}>
            <SelectTrigger>
              <SelectValue placeholder="Select a stock..." />
            </SelectTrigger>
            <SelectContent>
              {MOCK_STOCKS.map((stock) => (
                <SelectItem key={stock.symbol} value={stock.symbol}>
                  {stock.symbol} - {stock.name} (${stock.currentPrice})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedStock && (
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Current Price:</span>
              <span>${selectedStock.currentPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Sector:</span>
              <span>{selectedStock.sector}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Your Holdings:</span>
              <span>{currentHolding ? currentHolding.shares : 0} shares</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Number of Shares</Label>
          <Input 
            type="number" 
            min="1" 
            value={shares} 
            onChange={(e) => setShares(e.target.value)}
            placeholder="0"
          />
        </div>

        {selectedStock && sharesNum > 0 && (
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${totalCost.toFixed(2)}</span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" 
            onClick={handleBuy}
            disabled={!selectedStock || sharesNum <= 0 || totalCost > cash}
          >
            Buy
          </Button>
          <Button 
            className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground" 
            onClick={handleSell}
            disabled={!selectedStock || sharesNum <= 0 || !currentHolding || currentHolding.shares < sharesNum}
          >
            Sell
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
