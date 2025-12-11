"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import { useToast } from '@/hooks/use-toast'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // NextAuth.js sign in
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: '/dashboard',
      })

      if (result?.error) {
        // Handle specific error messages
        let errorMessage = "Invalid email or password"
        if (result.error.includes("credentials")) {
          errorMessage = "Invalid email or password"
        } else if (result.error.includes("user")) {
          errorMessage = "Account not found"
        }
        throw new Error(errorMessage)
      }

      if (result?.ok && result.url) {
        // Success toast
        toast({
          title: "Login successful!",
          description: "Redirecting to dashboard...",
        })
        
        // Small delay for toast to show
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Redirect to dashboard
        router.push('/dashboard')
        router.refresh() // Refresh to update session state
      }
      
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Handle social login
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true)
    try {
      await signIn(provider, {
        callbackUrl: '/dashboard',
        redirect: true,
      })
    } catch (error) {
      toast({
        title: "Login failed",
        description: `Unable to sign in with ${provider}. Please try again.`,
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Forgot password handler
  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to reset password.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Call forgot password API
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Reset email sent",
          description: "Check your email for password reset instructions.",
        })
      } else {
        throw new Error(data.error || "Failed to send reset email")
      }
    } catch (error: any) {
      toast({
        title: "Failed to send reset email",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-primary hover:underline disabled:opacity-50"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading}
            >
              <Icons.github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground text-center w-full">
            Don&apos;t have an account?{' '}
            <Link 
              href="/register" 
              className="text-primary hover:underline"
              onClick={(e) => isLoading && e.preventDefault()}
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}