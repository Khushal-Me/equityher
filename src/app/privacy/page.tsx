import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Footer } from '@/components/layout/footer';

export default function PrivacyPolicy() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm text-muted-foreground">Last updated: November 23, 2025</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Overview</h2>
            <p>
              EquityHer (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This policy explains how we collect, 
              use, and safeguard your information when you use our platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Information We Collect</h2>
            <p>
              EquityHer stores all data locally in your browser using localStorage. We do not collect, store, or transmit 
              personal information to our servers. Your portfolio data, transactions, and progress remain on your device.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Portfolio holdings and transaction history (stored locally)</li>
              <li>Learning progress and completed lessons (stored locally)</li>
              <li>Chat history with AI mentor (stored locally)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Third-Party Services</h2>
            <p>
              We use Google Gemini AI for our AI mentor feature. When you interact with the AI mentor, your questions 
              are sent to Google&apos;s servers for processing. Please review Google&apos;s privacy policy for information about 
              how they handle data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Data Security</h2>
            <p>
              Since all data is stored locally on your device, you have full control over your information. Clearing your 
              browser data will remove all EquityHer information from your device.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through our GitHub repository.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
