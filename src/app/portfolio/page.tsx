"use client";

import { Navbar } from '@/components/layout/navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PortfolioDashboard } from '@/components/portfolio/portfolio-dashboard';
import { StockTrading } from '@/components/portfolio/stock-trading';
import { HoldingsList } from '@/components/portfolio/holdings-list';
import { TransactionHistory } from '@/components/portfolio/transaction-history';
import { AiFeedback } from '@/components/portfolio/ai-feedback';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Portfolio</h1>
          <p className="text-muted-foreground mt-2">Manage your investments and track your performance risk-free.</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="trade">Trade</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <PortfolioDashboard />
            <div className="grid gap-6 md:grid-cols-2">
              <AiFeedback />
              <StockTrading />
            </div>
          </TabsContent>

          <TabsContent value="holdings">
            <HoldingsList />
          </TabsContent>

          <TabsContent value="trade">
            <div className="grid gap-6 md:grid-cols-2">
              <StockTrading />
              <HoldingsList />
            </div>
          </TabsContent>

          <TabsContent value="history">
            <TransactionHistory />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
