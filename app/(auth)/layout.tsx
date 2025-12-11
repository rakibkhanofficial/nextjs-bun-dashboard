import { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">D</span>
            </div>
            <span className="text-xl font-bold">DashboardPro</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </header>
      
      {/* Main Content */}
      <main>
        {children}
      </main>
      
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>© 2024 DashboardPro. All rights reserved.</p>
          <p className="mt-1">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}