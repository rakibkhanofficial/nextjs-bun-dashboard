"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setEmailSent(true)
        toast({
          title: "Reset link sent!",
          description: data.message,
        })
        
        // In development, show the reset link in console
        if (data.devNote) {
          console.log(data.devNote)
        }
      } else {
        throw new Error(data.error || "Failed to send reset email")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                {emailSent ? 'Check your email' : 'Reset your password'}
              </CardTitle>
              <CardDescription>
                {emailSent 
                  ? `We sent a reset link to ${email}`
                  : 'Enter your email address and we\'ll send you a reset link'
                }
              </CardDescription>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              {emailSent ? (
                <CheckCircle className="h-5 w-5 text-primary" />
              ) : (
                <Mail className="h-5 w-5 text-primary" />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {emailSent ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-green-800">Reset link sent</h3>
                    <p className="text-sm text-green-700 mt-1">
                      Check your email for a password reset link. The link will expire in 1 hour.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Development Mode Note</h4>
                <p className="text-sm text-blue-700">
                  In development mode, the reset link is logged to console instead of being emailed.
                  Check your browser console (F12) for the reset link.
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <Button 
                  onClick={() => setEmailSent(false)}
                  variant="outline"
                >
                  <Icons.mail className="mr-2 h-4 w-4" />
                  Send another reset link
                </Button>
                
                <Button asChild>
                  <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter the email address associated with your account.
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  'Send reset link'
                )}
              </Button>
            </form>
          )}

          {!emailSent && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Remember your password?
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                  </Link>
                </Button>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-xs text-muted-foreground text-center w-full">
            <p>For security reasons, reset links expire after 1 hour.</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Icons.shield className="h-3 w-3" />
            <span>Your data is protected with 256-bit SSL encryption</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}