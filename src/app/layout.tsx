import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "@/components/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EquityHer - AI Investment Mentor",
  description: "Empowering women to take control of their financial futures through AI and education.",
  keywords: ["investment", "AI mentor", "financial education", "women in finance", "portfolio management"],
  authors: [{ name: "EquityHer Team" }],
  creator: "EquityHer",
  publisher: "EquityHer",
  metadataBase: new URL("https://www.equityher.tech"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.equityher.tech",
    title: "EquityHer - AI Investment Mentor",
    description: "Empowering women to take control of their financial futures through AI and education.",
    siteName: "EquityHer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EquityHer - AI Investment Mentor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EquityHer - AI Investment Mentor",
    description: "Empowering women to take control of their financial futures through AI and education.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
