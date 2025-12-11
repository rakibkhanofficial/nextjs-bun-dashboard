import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth-options'

// GET /api/users/roles - Get all roles
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      )
    }

    const roles = await prisma.role.findMany({
      include: {
        _count: {
          select: { users: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ roles })

  } catch (error) {
    console.error('Error fetching roles:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/users/roles - Create new role
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, description, permissions } = body

    if (!name) {
      return NextResponse.json(
        { error: "Role name is required" },
        { status: 400 }
      )
    }

    const role = await prisma.role.create({
      data: {
        name,
        description,
        permissions: permissions || []
      }
    })

    return NextResponse.json({
      message: "Role created successfully",
      role
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error creating role:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Role name already exists" },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}