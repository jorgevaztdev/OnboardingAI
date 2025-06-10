import type { FC, ReactNode } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { employeeNavItems, adminNavItems, commonBottomNavItems, type NavItem } from '@/config/navigation';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainDashboardLayoutProps {
  userRole: 'employee' | 'admin';
  children: ReactNode;
}

export const MainDashboardLayout: FC<MainDashboardLayoutProps> = ({ userRole, children }) => {
  const navItems = userRole === 'employee' ? employeeNavItems : adminNavItems;

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar navItems={navItems} bottomNavItems={commonBottomNavItems} userRole={userRole} />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-8 border-b bg-background/80 backdrop-blur-sm">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, {userRole}!</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle className="h-6 w-6" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
