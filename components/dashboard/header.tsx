"use client"

import React, { useState } from 'react'
import { Bell, Search, Menu, User, Settings, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function DashboardHeader() {
  const [notifications] = useState([
    { id: 1, text: 'New user registered', time: '5 min ago' },
    { id: 2, text: 'Server deployment complete', time: '1 hour ago' },
    { id: 3, text: 'Payment received', time: '2 hours ago' },
  ])

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
      {/* Mobile Menu Button */}
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search Bar */}
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search dashboard..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              3
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
              <span className="font-medium">{notification.text}</span>
              <span className="text-xs text-muted-foreground">{notification.time}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-center text-primary">
            View all notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Administrator</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}