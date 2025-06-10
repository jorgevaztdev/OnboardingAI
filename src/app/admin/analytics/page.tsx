'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, CheckSquare, TrendingUp, BookOpen, Clock } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Line, LineChart, Pie, PieChart, Cell } from 'recharts';

// Mock data
const monthlyActiveUsers = [
  { month: 'Jan', users: 1200 }, { month: 'Feb', users: 1500 }, { month: 'Mar', users: 1300 },
  { month: 'Apr', users: 1800 }, { month: 'May', users: 1600 }, { month: 'Jun', users: 2100 },
];

const courseCompletionRates = [
  { name: 'Onboarding', completed: 85, inProgress: 10, notStarted: 5 },
  { name: 'Product Training', completed: 70, inProgress: 20, notStarted: 10 },
  { name: 'Sales Skills', completed: 60, inProgress: 25, notStarted: 15 },
  { name: 'Compliance 101', completed: 92, inProgress: 5, notStarted: 3 },
];

const contentPopularity = [
  { name: 'Intro Video', views: 1500 }, { name: 'Product Guide', views: 1200 },
  { name: 'Sales Webinar', views: 900 }, { name: 'Culture Doc', views: 850 },
  { name: 'Security Module', views: 700 },
];

const averageTimeSpent = [
  { category: 'Onboarding', time: 2.5 }, { category: 'Product', time: 4.2 },
  { category: 'Sales', time: 3.8 }, { category: 'Compliance', time: 1.5 },
];

const chartConfig = {
  users: { label: 'Active Users', color: 'hsl(var(--primary))' },
  completed: { label: 'Completed', color: 'hsl(var(--accent))' },
  inProgress: { label: 'In Progress', color: 'hsl(var(--chart-4))' },
  notStarted: { label: 'Not Started', color: 'hsl(var(--muted))' },
  views: { label: 'Views', color: 'hsl(var(--primary))' },
  time: { label: 'Avg. Time (hours)', color: 'hsl(var(--chart-2))' },
};

const PIE_COLORS = ['hsl(var(--accent))', 'hsl(var(--chart-4))', 'hsl(var(--muted))'];


export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-semibold text-foreground flex items-center gap-2">
          <BarChart3 className="h-10 w-10 text-primary" /> Platform Analytics
        </h1>
        <p className="text-lg text-muted-foreground">Insights into user engagement and content performance.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Key Metrics Cards */}
        {[
          { title: "Total Active Users", value: "2,150", change: "+12% MoM", icon: <Users className="h-5 w-5 text-primary" /> },
          { title: "Avg. Completion Rate", value: "78%", change: "+3% this week", icon: <CheckSquare className="h-5 w-5 text-primary" /> },
          { title: "Content Items Viewed", value: "15,670", change: "Last 30 days", icon: <BookOpen className="h-5 w-5 text-primary" /> },
          { title: "Avg. Time on Platform", value: "45 min/session", change: "+5 min vs last month", icon: <Clock className="h-5 w-5 text-primary" /> },
        ].map(metric => (
          <Card key={metric.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-headline">{metric.title}</CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline">Monthly Active Users</CardTitle>
            <CardDescription>Trend of active users over the past 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyActiveUsers} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8}/>
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} dot={{ r: 4, fill: "var(--color-users)"}} activeDot={{r:6}} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline">Course Completion Overview</CardTitle>
            <CardDescription>Completion status for key courses.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <ChartTooltip content={<ChartTooltipContent nameKey="status" hideLabel />} />
                  <Pie 
                    data={[
                      { status: 'Completed', value: courseCompletionRates.reduce((sum, c) => sum + c.completed, 0)/courseCompletionRates.length, fill: 'var(--color-completed)' },
                      { status: 'In Progress', value: courseCompletionRates.reduce((sum, c) => sum + c.inProgress, 0)/courseCompletionRates.length, fill: 'var(--color-inProgress)'},
                      { status: 'Not Started', value: courseCompletionRates.reduce((sum, c) => sum + c.notStarted, 0)/courseCompletionRates.length, fill: 'var(--color-notStarted)'}
                    ]} 
                    dataKey="value" 
                    nameKey="status" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100} 
                    innerRadius={60}
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }) => {
                       const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                       const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                       const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                       return (
                         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-medium">
                           {`${payload.status} ${(percent * 100).toFixed(0)}%`}
                         </text>
                       );
                    }}
                  >
                    {/* PIE_COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))*/}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline">Most Popular Content</CardTitle>
            <CardDescription>Top 5 content items by views.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={contentPopularity} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false}/>
                  <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={8} width={120} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" fill="var(--color-views)" radius={4} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline">Average Time Spent per Category</CardTitle>
            <CardDescription>Engagement time across content categories.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={averageTimeSpent} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} unit="h"/>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="time" fill="var(--color-time)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
