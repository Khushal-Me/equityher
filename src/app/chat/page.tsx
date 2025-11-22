"use client";

import { Navbar } from '@/components/layout/navbar';
import { ChatInterface } from '@/components/chat/chat-interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Sparkles } from 'lucide-react';
import { useChatStore } from '@/store/chat-store';
import { geminiService } from '@/lib/gemini';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';

export default function ChatPage() {
  const { addMessage, setLoading, isLoading } = useChatStore();
  
  const conversationStarters = [
    "What is the difference between stocks and bonds?",
    "How do I start investing with $100?",
    "Explain diversification like I'm 5.",
    "What are ETFs and why are they popular?",
    "How does compound interest work?",
    "What is a bear market vs bull market?"
  ];

  const handleStarterClick = async (starter: string) => {
    if (isLoading) return;
    
    const userMessage = {
      id: uuidv4(),
      role: 'user' as const,
      content: starter,
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setLoading(true);

    try {
      const response = await geminiService.sendMessage(starter);
      
      addMessage({
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      });
    } catch {
      toast.error("Failed to get response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-4 h-[calc(100vh-140px)]">
          <div className="lg:col-span-1 space-y-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Conversation Starters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Not sure what to ask? Try one of these:
                </p>
                {conversationStarters.map((starter, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    className="w-full justify-start text-left h-auto py-3 whitespace-normal text-sm hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                    onClick={() => handleStarterClick(starter)}
                    disabled={isLoading}
                  >
                    <MessageSquare className="h-4 w-4 mr-2 shrink-0 text-primary" />
                    {starter}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3 h-full">
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
}
