"use client";

import { Navbar } from '@/components/layout/navbar';
import { ProgressDashboard } from '@/components/learning/progress-dashboard';

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Learning Center</h1>
          <p className="text-muted-foreground mt-2">Master investing concepts with bite-sized lessons tailored for you.</p>
        </div>
        
        <ProgressDashboard />
      </main>
    </div>
  );
}
