import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, BookOpen, TrendingUp, Users, Globe } from 'lucide-react';
import { Footer } from '@/components/layout/footer';

export default function WhyEquityHer() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold text-primary">EquityHer</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-foreground" href="/learn">
            Learn
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-foreground" href="/portfolio">
            Portfolio
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-foreground" href="/chat">
            AI Mentor
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-secondary/20 to-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
                  Why EquityHer?
                </h1>
                <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
                  Breaking barriers to financial literacy, one woman at a time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-bold text-primary">The Problem</h2>
                </div>
                <div className="prose prose-gray max-w-none text-muted-foreground space-y-4">
                  <p className="text-base md:text-lg leading-relaxed">
                    In many parts of the world, especially in rural areas of countries like India, women face significant barriers to education. 
                    Girls are often denied access to basic schooling, let alone financial education. This systemic inequality perpetuates cycles 
                    of economic dependence and limits opportunities for millions of women.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Even where basic education is accessible, financial literacy remains a luxury. Women are discouraged from learning about money, 
                    investments, and wealth-building. The result? A massive gender wealth gap that persists across generations.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-bold text-primary">Our Mission</h2>
                </div>
                <div className="prose prose-gray max-w-none text-muted-foreground space-y-4">
                  <p className="text-base md:text-lg leading-relaxed">
                    EquityHer was created to democratize financial education for women everywhere. We believe that every woman, 
                    regardless of her background or location, deserves access to the tools and knowledge needed to build wealth and 
                    achieve financial independence.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Our platform removes traditional barriers by providing:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
                    <li><strong>Free, accessible education</strong> that anyone with internet can access</li>
                    <li><strong>Risk-free learning environment</strong> with $10,000 virtual cash to practice</li>
                    <li><strong>24/7 AI mentorship</strong> that answers questions without judgment</li>
                    <li><strong>Culturally sensitive guidance</strong> that respects diverse backgrounds</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 border rounded-lg bg-card">
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2 text-foreground">Build Confidence</h3>
                  <p className="text-sm text-muted-foreground">
                    Practice investing without the fear of losing real money. Make mistakes, learn, and grow at your own pace.
                  </p>
                </div>
                <div className="p-6 border rounded-lg bg-card">
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2 text-foreground">Break Barriers</h3>
                  <p className="text-sm text-muted-foreground">
                    Access education that was traditionally gatekept. No prerequisites, no judgment, just learning.
                  </p>
                </div>
                <div className="p-6 border rounded-lg bg-card">
                  <Globe className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2 text-foreground">Empower Change</h3>
                  <p className="text-sm text-muted-foreground">
                    Join a movement of women taking control of their financial futures and inspiring others to do the same.
                  </p>
                </div>
              </div>

              <div className="space-y-4 bg-muted/30 p-6 md:p-8 rounded-lg border">
                <h2 className="text-2xl md:text-3xl font-bold text-primary">A Personal Note</h2>
                <div className="prose prose-gray max-w-none text-muted-foreground space-y-4">
                  <p className="text-base md:text-lg leading-relaxed">
                    Growing up in India, I witnessed firsthand how girls in rural areas are denied education simply because of their gender. 
                    Financial literacy isn&apos;t even on the radar when basic education itself is a privilege many are denied.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    EquityHer is my contribution to changing this narrative. While we can&apos;t immediately solve systemic issues around 
                    women&apos;s education globally, we can provide a free, accessible platform that helps women who do have internet access 
                    to learn about money, investing, and wealth-building—skills that can transform not just their lives, but the lives of 
                    their families and communities.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed font-semibold text-foreground">
                    Every woman who learns to invest is a step toward closing the gender wealth gap.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Your Journey Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
