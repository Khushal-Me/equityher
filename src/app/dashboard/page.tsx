"use client";

import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/user-store';
import { usePortfolioStore } from '@/store/portfolio-store';
import { LEARNING_TOPICS } from '@/lib/learning-topics';
import { DollarSign, BookOpen, Trophy, Flame, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { name, completedTopics, confidenceScore, streak } = useUserStore();
  const { totalValue, transactions } = usePortfolioStore();

  const progress = Math.round((completedTopics.length / LEARNING_TOPICS.length) * 100);
  
  // Find next recommended topic
  const nextTopic = LEARNING_TOPICS.find(t => !completedTopics.includes(t.id)) || LEARNING_TOPICS[0];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {name}!</h1>
          <p className="text-muted-foreground mt-2">Here&apos;s an overview of your financial journey.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Virtual portfolio
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress}%</div>
              <p className="text-xs text-muted-foreground">
                {completedTopics.length} topics completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confidence Score</CardTitle>
              <Trophy className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{confidenceScore}/100</div>
              <p className="text-xs text-muted-foreground">
                Keep learning to improve!
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Day Streak</CardTitle>
              <Flame className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{streak} Days</div>
              <p className="text-xs text-muted-foreground">
                Consistency is key
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Today&apos;s Lesson</CardTitle>
                <CardDescription>Recommended for your knowledge level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-card-foreground">{nextTopic.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{nextTopic.description}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="bg-background px-2 py-1 rounded border shadow-sm capitalize">{nextTopic.difficulty}</span>
                    <span>{nextTopic.duration}</span>
                  </div>
                  <Link href="/learn">
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                      Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Link href="/portfolio" className="block">
                <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                  <CardContent className="flex flex-col items-center justify-center py-8 text-center space-y-2">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Trade Stocks</h3>
                    <p className="text-xs text-muted-foreground">Manage your portfolio</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/chat" className="block">
                <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                  <CardContent className="flex flex-col items-center justify-center py-8 text-center space-y-2">
                    <div className="p-3 bg-secondary/10 rounded-full">
                      <BookOpen className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="font-semibold">Ask AI Mentor</h3>
                    <p className="text-xs text-muted-foreground">Get instant answers</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <div className="font-medium">
                          {tx.type === 'buy' ? 'Bought' : 'Sold'} {tx.symbol}
                        </div>
                        <div className="text-xs text-gray-500">
                          {format(new Date(tx.date), 'MMM d, h:mm a')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={tx.type === 'buy' ? 'text-red-600' : 'text-green-600'}>
                          {tx.type === 'buy' ? '-' : '+'}${tx.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No recent activity. Start trading or learning!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
