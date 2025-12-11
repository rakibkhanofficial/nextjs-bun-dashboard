import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { token, password, confirmPassword } = await request.json()

    // Validation
    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date() // Token not expired
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      }
    })

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully. You can now log in with your new password."
    })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    )
  }
}