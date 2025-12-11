import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: {
        name: 'Olivia Martin',
        email: 'olivia.martin@email.com',
        avatar: 'https://github.com/shadcn.png',
      },
      amount: '$1,999.00',
      status: 'success',
      date: '2024-01-15',
    },
    {
      id: 2,
      user: {
        name: 'Jackson Lee',
        email: 'jackson.lee@email.com',
        avatar: 'https://github.com/shadcn.png',
      },
      amount: '$39.00',
      status: 'pending',
      date: '2024-01-14',
    },
    {
      id: 3,
      user: {
        name: 'Isabella Nguyen',
        email: 'isabella.nguyen@email.com',
        avatar: 'https://github.com/shadcn.png',
      },
      amount: '$299.00',
      status: 'success',
      date: '2024-01-13',
    },
    {
      id: 4,
      user: {
        name: 'William Kim',
        email: 'will@email.com',
        avatar: 'https://github.com/shadcn.png',
      },
      amount: '$99.00',
      status: 'failed',
      date: '2024-01-12',
    },
    {
      id: 5,
      user: {
        name: 'Sofia Davis',
        email: 'sofia.davis@email.com',
        avatar: 'https://github.com/shadcn.png',
      },
      amount: '$39.00',
      status: 'success',
      date: '2024-01-11',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
              <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {activity.user.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {activity.user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-medium">{activity.amount}</div>
            <Badge className={getStatusColor(activity.status)}>
              {activity.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}