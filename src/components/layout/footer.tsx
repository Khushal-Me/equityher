import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            <Link className="flex items-center gap-2" href="/">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-bold text-primary">EquityHer</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering women to take control of their financial futures through AI and education.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/why-equityher">
              Why EquityHer?
            </Link>
            <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/terms">
              Terms of Service
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <p className="text-xs text-center text-muted-foreground">
            © 2025 EquityHer. Built with ❤️ for women&apos;s financial empowerment.
          </p>
        </div>
      </div>
    </footer>
  );
}
