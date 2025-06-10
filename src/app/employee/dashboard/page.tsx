'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Bot, FileText, CheckCircle, TrendingUp } from 'lucide-react';
import Image from 'next/image';

// Mock data for demonstration
const learningPath = [
  { id: 1, title: 'Company Onboarding', completed: true, progress: 100 },
  { id: 2, title: 'Product Knowledge Fundamentals', completed: false, progress: 60 },
  { id: 3, title: 'Sales Training Module 1', completed: false, progress: 25 },
];

const recentActivity = [
  { id: 1, action: 'Completed "Company Values" quiz', time: '2 hours ago' },
  { id: 2, action: 'Asked AI: "What is our return policy?"', time: '1 day ago' },
  { id: 3, action: 'Viewed "Advanced Negotiation Tactics"', time: '3 days ago' },
];

export default function EmployeeDashboardPage() {
  const currentTask = learningPath.find(task => !task.completed) || learningPath[learningPath.length -1];

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-semibold text-foreground">Welcome to Your Dashboard</h1>
        <p className="text-lg text-muted-foreground">Here's an overview of your learning journey and available tools.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <TrendingUp className="text-primary" /> Current Learning Focus
            </CardTitle>
            <CardDescription>Your next step in the learning path.</CardDescription>
          </CardHeader>
          <CardContent>
            {currentTask && (
              <>
                <h3 className="text-xl font-semibold text-primary mb-2">{currentTask.title}</h3>
                <Progress value={currentTask.progress} className="w-full mb-2" />
                <p className="text-sm text-muted-foreground mb-4">{currentTask.progress}% complete</p>
                <Button asChild>
                  <Link href="/employee/library">Continue Learning</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot className="text-primary" /> AI Assistant
            </CardTitle>
            <CardDescription>Get instant answers to your questions.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Image src="https://placehold.co/150x100.png" alt="AI Bot" width={150} height={100} className="rounded-md mb-4" data-ai-hint="robot illustration"/>
            <p className="text-sm text-muted-foreground mb-4">Stuck on something? Our AI chatbot can help you find information quickly.</p>
            <Button asChild variant="secondary">
              <Link href="/employee/chat">Chat with AI</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <FileText className="text-primary" /> Quick Tools
            </CardTitle>
            <CardDescription>Access helpful resources.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/employee/summarize"><FileText size={18}/> Summarize Content</Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/employee/library"><BookOpen size={18}/> Browse Content Library</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <CheckCircle className="text-primary" /> Recent Activity
            </CardTitle>
            <CardDescription>Your latest interactions and achievements.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentActivity.map(activity => (
                <li key={activity.id} className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{activity.action}</span> - {activity.time}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
