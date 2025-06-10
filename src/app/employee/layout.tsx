import { MainDashboardLayout } from '@/components/layout/main-dashboard-layout';
import type { ReactNode } from 'react';

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  return (
    <MainDashboardLayout userRole="employee">
      {children}
    </MainDashboardLayout>
  );
}
