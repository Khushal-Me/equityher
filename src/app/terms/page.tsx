import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Footer } from '@/components/layout/footer';

export default function TermsOfService() {
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

      <main className="flex-1 container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Terms of Service</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm text-muted-foreground">Last updated: November 23, 2025</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Acceptance of Terms</h2>
            <p>
              By accessing and using EquityHer, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Educational Purpose Only</h2>
            <p>
              EquityHer is an educational platform designed to teach investment concepts in a risk-free environment. 
              All trading on this platform uses virtual currency and does not involve real money.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>All portfolio values and transactions are simulated</li>
              <li>Stock prices may not reflect real-time market data</li>
              <li>No real financial transactions occur on this platform</li>
              <li>This platform is for learning purposes only</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Not Financial Advice</h2>
            <p className="font-semibold text-foreground">
              EquityHer does not provide financial, investment, or trading advice. The information and AI guidance 
              provided are for educational purposes only and should not be considered as recommendations to buy or sell 
              any securities.
            </p>
            <p>
              Always consult with a qualified financial advisor before making real investment decisions. Past performance 
              does not guarantee future results.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Use the platform for educational purposes only</li>
              <li>Not rely solely on our AI mentor for real financial decisions</li>
              <li>Understand that all data is stored locally on your device</li>
              <li>Not attempt to exploit or abuse the platform</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Limitation of Liability</h2>
            <p>
              EquityHer and its creators are not liable for any decisions you make based on information provided on 
              this platform. We provide the platform &quot;as is&quot; without warranties of any kind.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the platform after changes 
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Contact</h2>
            <p>
              Questions about these Terms of Service? Contact us through our GitHub repository.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
