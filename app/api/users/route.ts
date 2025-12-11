import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// GET /api/users - Get all users (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      )
    }

    // Get query parameters for pagination
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Get users with pagination
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            sessions: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const totalUsers = await prisma.user.count()

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total: totalUsers,
        pages: Math.ceil(totalUsers / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/users - Create new user (registration)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER" // Default role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json(
      { 
        message: "User created successfully",
        user 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}