import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

// Extend the session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
    }
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        // Find user in database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user?.password) {
          throw new Error("Invalid credentials")
        }

        // Check password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle OAuth sign in
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          if (!existingUser) {
            // Create new user for OAuth
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                role: "USER",
                emailVerified: new Date(),
              }
            })
          }
          return true
        } catch (error) {
          console.error("Error in OAuth sign in:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      
      // Update token with OAuth provider info
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }