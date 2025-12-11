"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  Calendar,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  Bell,
  Search,
  Menu,
  X,
  LucideIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

type menuItemTypes = {
   title: string;
    icon: LucideIcon;
    href: string;
    badge: string | null;
    subItems?: undefined | { title: string; href: string }[];
}

const menuItems: menuItemTypes[] = [
  {
    title: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    badge: null,
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/dashboard/analytics',
    badge: '3',
  },
  {
    title: 'Users',
    icon: Users,
    href: '/dashboard/users',
    badge: null,
    subItems: [
      { title: 'All Users', href: '/dashboard/users' },
      { title: 'New Users', href: '/dashboard/users/new' },
      { title: 'User Roles', href: '/dashboard/users/roles' },
    ],
  },
  {
    title: 'Content',
    icon: FileText,
    href: '/dashboard/content',
    badge: null,
    subItems: [
      { title: 'Posts', href: '/dashboard/content/posts' },
      { title: 'Pages', href: '/dashboard/content/pages' },
      { title: 'Media', href: '/dashboard/content/media' },
    ],
  },
  {
    title: 'Billing',
    icon: CreditCard,
    href: '/dashboard/billing',
    badge: null,
  },
  {
    title: 'Calendar',
    icon: Calendar,
    href: '/dashboard/calendar',
    badge: '5',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    badge: null,
    subItems: [
      { title: 'General', href: '/dashboard/settings' },
      { title: 'Security', href: '/dashboard/settings/security' },
      { title: 'Notifications', href: '/dashboard/settings/notifications' },
    ],
  },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside className={cn(
      "flex flex-col border-r bg-background h-screen transition-all duration-300 sticky top-0",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <h1 className="text-xl font-bold text-primary">DashboardPro</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
        </Button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <Accordion type="single" collapsible className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.subItems ? (
                <AccordionItem value={item.title} className="border-none">
                  <AccordionTrigger className={cn(
                    "flex items-center justify-between p-2 rounded-md hover:bg-accent",
                    pathname.startsWith(item.href) && "bg-accent"
                  )}>
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      {!collapsed && <span>{item.title}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full px-2">
                        {item.badge}
                      </span>
                    )}
                  </AccordionTrigger>
                  {!collapsed && (
                    <AccordionContent className="pl-8 pt-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className={cn(
                            "flex items-center gap-2 p-2 text-sm rounded-md hover:bg-accent",
                            pathname === subItem.href && "bg-accent font-medium"
                          )}
                        >
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </AccordionContent>
                  )}
                </AccordionItem>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md hover:bg-accent",
                    pathname === item.href && "bg-accent",
                    collapsed && "justify-center"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} />
                    {!collapsed && <span>{item.title}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-2">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </Accordion>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t space-y-2">
        {!collapsed && (
          <>
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle size={20} className="mr-2" />
              Help & Support
            </Button>
            <Button variant="ghost" className="w-full justify-start text-destructive">
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </>
        )}
        {collapsed && (
          <div className="flex flex-col items-center gap-2">
            <Button variant="ghost" size="icon">
              <HelpCircle size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-destructive">
              <LogOut size={20} />
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}