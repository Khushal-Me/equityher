import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-secondary/20 to-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
                  Your AI-Powered Investment Mentor
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Build confidence, learn risk-free, and grow your wealth with personalized guidance designed for women.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 h-11 px-8">
                    Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/learn">
                  <Button variant="outline" className="h-11 px-8 border-primary text-primary hover:bg-primary/10">
                    Explore Lessons
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/20 border border-primary/20 rounded-full">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-primary">AI Mentorship</h2>
                <p className="text-muted-foreground">
                  Get 24/7 answers to your investing questions from an empathetic, knowledgeable AI guide.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-secondary/50 border border-secondary rounded-full">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-primary">Risk-Free Practice</h2>
                <p className="text-muted-foreground">
                  Trade with $10,000 in virtual cash. Make mistakes here so you don&apos;t make them with real money.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-accent/50 border border-accent rounded-full">
                  <GraduationCap className="h-8 w-8 text-accent-foreground" />
                </div>
                <h2 className="text-xl font-bold text-primary">Personalized Learning</h2>
                <p className="text-muted-foreground">
                  Bite-sized lessons tailored to your knowledge level, from basics to advanced strategies.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                  How It Works
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Three simple steps to financial confidence.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-3 pt-8">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 border border-primary/20 text-primary font-bold text-xl mb-4">1</div>
                  <h3 className="text-lg font-bold text-primary">Learn the Basics</h3>
                  <p className="text-sm text-muted-foreground">Master fundamental concepts through interactive lessons.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 border border-primary/20 text-primary font-bold text-xl mb-4">2</div>
                  <h3 className="text-lg font-bold text-primary">Practice Trading</h3>
                  <p className="text-sm text-muted-foreground">Build a virtual portfolio and track your performance.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 border border-primary/20 text-primary font-bold text-xl mb-4">3</div>
                  <h3 className="text-lg font-bold text-primary">Get AI Feedback</h3>
                  <p className="text-sm text-muted-foreground">Receive personalized analysis to improve your strategy.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-muted-foreground">© 2025 EquityHer. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
              Privacy
            </Link>
          </nav>
        </footer>
    </div>
  );
}
