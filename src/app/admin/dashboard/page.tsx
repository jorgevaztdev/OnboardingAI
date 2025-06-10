
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-semibold text-foreground">Admin Dashboard (Simplified)</h1>
        <p className="text-lg text-muted-foreground">This is a test page.</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>If you see this, the basic page rendering is working.</p>
        </CardContent>
      </Card>
    </div>
  );
}
