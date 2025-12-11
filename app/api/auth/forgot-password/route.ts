import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import crypto from 'crypto'
import { Resend } from 'resend'

// Mock email service for development (install: bun add resend for real emails)
// For now, we'll log to console. Uncomment Resend code when ready.

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Return success even if user doesn't exist (security best practice)
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email, you will receive a reset link shortly."
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    // Save token to database
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      }
    })

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`

    // DEVELOPMENT: Log the reset link instead of sending email
    console.log('=== PASSWORD RESET LINK (DEV MODE) ===')
    console.log(`Reset URL: ${resetUrl}`)
    console.log('=====================================')

    /*
    // PRODUCTION: Uncomment when ready to send real emails
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: email,
      subject: 'Reset Your Password',
      html: `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    })
    */

    return NextResponse.json({
      success: true,
      message: "Password reset link has been sent to your email.",
      devNote: "Check console for reset link in development mode"
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}