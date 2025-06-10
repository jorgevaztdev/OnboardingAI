import type { LucideIcon } from 'lucide-react';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Library, 
  FileCog, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  matchExact?: boolean;
  tooltip?: string;
};

export const employeeNavItems: NavItem[] = [
  { href: '/employee/dashboard', label: 'Dashboard', icon: LayoutDashboard, matchExact: true, tooltip: "Dashboard" },
  { href: '/employee/summarize', label: 'Summarize', icon: FileText, tooltip: "Summarize Content" },
  { href: '/employee/chat', label: 'AI Chat', icon: MessageSquare, tooltip: "AI Chat Assistant" },
  { href: '/employee/library', label: 'Library', icon: Library, tooltip: "Content Library" },
];

export const adminNavItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, matchExact: true, tooltip: "Admin Dashboard" },
  { href: '/admin/content-management', label: 'Content', icon: FileCog, tooltip: "Content Management" },
  { href: '/admin/user-management', label: 'Users', icon: Users, tooltip: "User Management" },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, tooltip: "Analytics" },
  { href: '/admin/library', label: 'Library', icon: Library, tooltip: "Content Library Admin View" },
];

export const commonBottomNavItems: NavItem[] = [
  // { href: '/settings', label: 'Settings', icon: Settings, tooltip: "Settings" },
  { href: '/login', label: 'Logout', icon: LogOut, tooltip: "Logout" }, // For now, logout redirects to login
];
