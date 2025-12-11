"use client"

import { DashboardHeader } from '@/components/dashboard/header'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      description: '+20.1% from last month',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Subscriptions',
      value: '+2350',
      description: '+180.1% from last month',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Sales',
      value: '+12,234',
      description: '+19% from last month',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Active Now',
      value: '+573',
      description: '+201 since last hour',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your platform.
          </p>
        </div>
        <Button>Generate Report</Button>
      </div>

      <StatsCards stats={stats} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Monthly revenue and growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">Chart Component Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'Alex Johnson', action: 'created new project', time: '2 min ago' },
                { user: 'Sarah Miller', action: 'uploaded documents', time: '15 min ago' },
                { user: 'Michael Chen', action: 'commented on post', time: '1 hour ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks at your fingertips</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Add User</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <DollarSign className="h-6 w-6" />
                <span>Create Invoice</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Activity className="h-6 w-6" />
                <span>View Reports</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                <span>Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}