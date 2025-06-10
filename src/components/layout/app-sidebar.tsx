'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import type { NavItem } from '@/config/navigation';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  navItems: NavItem[];
  bottomNavItems?: NavItem[];
  userRole: 'employee' | 'admin';
}

export const AppSidebar: FC<AppSidebarProps> = ({ navItems, bottomNavItems, userRole }) => {
  const pathname = usePathname();

  const renderNavItems = (items: NavItem[]) => (
    items.map((item) => {
      const isActive = item.matchExact ? pathname === item.href : pathname.startsWith(item.href);
      return (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={isActive}
            className={cn(
              "justify-start w-full",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"
            )}
            tooltip={item.tooltip || item.label}
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5 mr-3" />
              <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    })
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Logo size="md" className="group-data-[collapsible=icon]:hidden" />
        <Logo size="sm" className="hidden group-data-[collapsible=icon]:block" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {renderNavItems(navItems)}
        </SidebarMenu>
      </SidebarContent>
      {bottomNavItems && bottomNavItems.length > 0 && (
        <SidebarFooter>
          <SidebarSeparator />
          <SidebarMenu className="pt-2">
            {renderNavItems(bottomNavItems)}
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};
