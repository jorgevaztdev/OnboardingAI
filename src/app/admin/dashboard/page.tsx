'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileCog, BarChart3, Library, Activity, PlusCircle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import Image from 'next/image';


// Mock data for charts
const userActivityData = [
  { date: 'Mon', users: 120 },
  { date: 'Tue', users: 150 },
  { date: 'Wed', users: 130 },
  { date: 'Thu', users: 180 },
  { date: 'Fri', users: 160 },
  { date: 'Sat', users: 90 },
  { date: 'Sun', users: 70 },
];

const contentEngagementData = [
  { name: 'Onboarding', views: 4000, completion: 2400 },
  { name: 'Product', views: 3000, completion: 1398 },
  { name: 'Sales', views: 2000, completion: 3800 },
  { name: 'Compliance', views: 2780, completion: 1908 },
  { name: 'Soft Skills', views: 1890, completion: 2800 },
];

const chartConfig = {
  users: { label: "Active Users", color: "hsl(var(--primary))" },
  views: { label: "Views", color: "hsl(var(--primary))" },
  completion: { label: "Completions", color: "hsl(var(--accent))" },
};


export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-semibold text-foreground">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground">Manage content, users, and view platform analytics.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">Total Users</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,234</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">Content Items</CardTitle>
            <Library className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">258</div>
            <p className="text-xs text-muted-foreground">+10 new this week</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">Overall Completion</CardTitle>
            <Activity className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">76%</div>
            <p className="text-xs text-muted-foreground">Across all active users</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline">User Activity (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8}/>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" fill="var(--color-users)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline">Content Engagement</CardTitle>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contentEngagementData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent />} />
                  <Bar dataKey="views" stackId="a" fill="var(--color-views)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completion" stackId="a" fill="var(--color-completion)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="font-headline">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button asChild size="lg" variant="outline" className="flex flex-col h-auto p-6 items-center justify-center gap-2 shadow-sm hover:shadow-md transition-shadow">
            <Link href="/admin/content-management">
              <FileCog className="h-8 w-8 mb-2 text-primary" />
              Manage Content
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="flex flex-col h-auto p-6 items-center justify-center gap-2 shadow-sm hover:shadow-md transition-shadow">
            <Link href="/admin/user-management">
              <Users className="h-8 w-8 mb-2 text-primary" />
              Manage Users
            </Link>
          </Button>
           <Button asChild size="lg" variant="outline" className="flex flex-col h-auto p-6 items-center justify-center gap-2 shadow-sm hover:shadow-md transition-shadow">
            <Link href="/admin/analytics">
              <BarChart3 className="h-8 w-8 mb-2 text-primary" />
              View Analytics
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
