import { MainDashboardLayout } from '@/components/layout/main-dashboard-layout';
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <MainDashboardLayout userRole="admin">
      {children}
    </MainDashboardLayout>
  );
}
