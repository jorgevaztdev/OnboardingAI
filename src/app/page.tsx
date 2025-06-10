'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4 md:p-8 text-center">
      <div className="mb-12 animate-fadeIn">
        <Logo size="lg" />
      </div>
      
      <header className="mb-12 animate-slideUp">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary mb-6">
          Elevate Your Team's Potential
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
          LearnScale AI provides intelligent tools to streamline employee onboarding and foster continuous learning within your organization.
        </p>
      </header>
      
      <main className="flex flex-col items-center gap-6 animate-slideUp animation-delay-200">
        <p className="text-md sm:text-lg text-foreground">
          Ready to transform your training?
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link href="/login">Login to Your Account</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary text-primary hover:bg-primary/10">
            <Link href="/signup">Create New Account</Link>
          </Button>
        </div>
      </main>

      <footer className="mt-24 text-center text-muted-foreground animate-fadeIn animation-delay-400">
        <p>&copy; {new Date().getFullYear()} LearnScale AI. All rights reserved.</p>
      </footer>

      <style jsx global>{`
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}
