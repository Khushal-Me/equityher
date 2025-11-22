"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/store/portfolio-store';
import { geminiService } from '@/lib/gemini';
import { Sparkles, Loader2, CheckCircle, AlertTriangle, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import ReactMarkdown from 'react-markdown';

interface AnalysisResult {
  assessment: string;
  diversificationScore: number;
  riskLevel: string;
  recommendations: string[];
  strengths: string[];
  improvements: string[];
}

function CollapsibleSection({ title, icon: Icon, iconColor, items }: { title: string, icon: React.ElementType, iconColor: string, items: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/20 transition-colors text-left"
      >
        <div className="flex items-center gap-2 font-medium">
          <Icon className={`h-4 w-4 ${iconColor}`} />
          <span className={iconColor}>{title}</span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      
      {isOpen && (
        <div className="p-3 border-t bg-muted/5 animate-in slide-in-from-top-2 duration-200">
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
            {items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                <ReactMarkdown components={{ p: 'span' }}>{item}</ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function AiFeedback() {
  const { holdings, totalValue } = usePortfolioStore();
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (holdings.length === 0) return;
    
    setIsLoading(true);
    try {
      const result = await geminiService.analyzePortfolio(holdings, totalValue);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (holdings.length === 0) {
    return (
      <Card className="bg-muted/30 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Portfolio Analysis
          </CardTitle>
          <CardDescription>
            Build your portfolio to unlock personalized AI insights and recommendations.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-muted/30 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Portfolio Analysis
        </CardTitle>
        <CardDescription>
          Get personalized feedback on your investment strategy
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!analysis ? (
          <div className="text-center py-6">
            <Button 
              onClick={handleAnalyze} 
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Portfolio...
                </>
              ) : (
                "Analyze My Portfolio"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
              <h3 className="font-semibold mb-2 text-primary">Assessment</h3>
              <div className="text-muted-foreground text-sm">
                <ReactMarkdown>{analysis.assessment}</ReactMarkdown>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
                <div className="text-sm text-muted-foreground mb-1">Diversification Score</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-primary">{analysis.diversificationScore}/100</span>
                </div>
                <Progress value={analysis.diversificationScore} className="h-2" />
              </div>
              <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
                <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
                <div className="text-2xl font-bold text-primary">{analysis.riskLevel}</div>
              </div>
            </div>

            <div className="space-y-2">
              <CollapsibleSection 
                title="Strengths" 
                icon={CheckCircle} 
                iconColor="text-primary" 
                items={analysis.strengths} 
              />
              
              <CollapsibleSection 
                title="Areas for Improvement" 
                icon={AlertTriangle} 
                iconColor="text-destructive" 
                items={analysis.improvements} 
              />
              
              <CollapsibleSection 
                title="Recommendations" 
                icon={TrendingUp} 
                iconColor="text-primary" 
                items={analysis.recommendations} 
              />
            </div>
            
            <div className="text-center pt-2">
              <Button variant="outline" onClick={() => setAnalysis(null)} size="sm">
                Close Analysis
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
