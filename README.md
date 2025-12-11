# 🚀 Next.js Dashboard Pro

A modern, full-featured admin dashboard built with Next.js 14, Bun runtime, and TypeScript. Features a complete authentication system, role-based access control, and a beautiful UI with shadcn/ui components.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Bun](https://img.shields.io/badge/Bun-1.3.4-FF6B6B)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-38B2AC)
![Prisma](https://img.shields.io/badge/Prisma-6.2.0-2D3748)
![NextAuth](https://img.shields.io/badge/NextAuth-4.24.13-3A3A3A)

## ✨ Features

### 🔐 **Authentication & Security**
- **Multi-provider Auth**: Email/Password, Google OAuth, GitHub OAuth
- **JWT Sessions**: Secure token-based authentication with NextAuth.js
- **Role-Based Access Control**: ADMIN, EDITOR, USER roles with granular permissions
- **Password Management**: Forgot password flow with email reset links
- **Session Management**: Secure session handling with automatic refresh

### 📊 **Dashboard & Analytics**
- **Real-time Stats**: Revenue, users, sessions, conversion metrics
- **Interactive Charts**: Visual analytics with custom chart components
- **Performance Metrics**: Page load times, bounce rates, engagement analytics
- **Traffic Analysis**: Source breakdown and user demographics

### 👥 **User Management**
- **CRUD Operations**: Create, read, update, delete users
- **Role Assignment**: Dynamic role management with permissions
- **Bulk Actions**: Export, filter, and batch operations
- **User Profiles**: Detailed user profiles with activity tracking

### 📝 **Content Management**
- **Post Management**: Create, edit, publish, and archive posts
- **Media Library**: File uploads with preview and organization
- **Page Builder**: Static pages with SEO optimization
- **Content Scheduling**: Future publishing and automated workflows

### 💰 **Billing & Finance**
- **Invoice Management**: Generate, send, and track invoices
- **Subscription System**: Recurring billing with multiple plans
- **Payment Tracking**: Status monitoring and revenue analytics
- **Tax Calculation**: Automated tax computation

### 📅 **Calendar & Events**
- **Event Management**: Create, edit, and delete calendar events
- **Team Scheduling**: Multiple attendees and resource booking
- **Reminders**: Email and in-app notifications
- **Color Coding**: Visual event categorization

## 🏗️ **System Architecture**

### **High-Level Architecture**
```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Browser)                         │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                 Next.js Frontend (App Router)               │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│  │   Pages     │  │ Components  │  │     Hooks        │   │
│  └─────────────┘  └─────────────┘  └──────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    API Layer (Route Handlers)               │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│  │   Users     │  │   Auth      │  │   Content        │   │
│  └─────────────┘  └─────────────┘  └──────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    Business Logic Layer                     │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│  │   Services  │  │   Utils     │  │   Validators     │   │
│  └─────────────┘  └─────────────┘  └──────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    Data Access Layer                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 Prisma ORM + SQLite                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### **Authentication Flow**
```
1. User Request → 2. Next.js Middleware → 3. Session Validation → 
4. Route Handler → 5. Database Query → 6. Response with JWT
```

### **Database Schema Design**
```sql
Users (1) → (N) Posts
Users (1) → (N) Invoices  
Users (1) → (N) CalendarEvents
Roles (1) → (N) Users
```

## 📁 **Project Structure**

```
nextjs-bun-dashboard/
├── app/                              # Next.js 14 App Router
│   ├── (auth)/                       # Authentication routes
│   │   ├── login/
│   │   │   └── page.tsx              # Login page
│   │   ├── register/
│   │   │   └── page.tsx              # Registration page
│   │   ├── forgot-password/
│   │   │   └── page.tsx              # Password reset
│   │   └── reset-password/
│   │       └── page.tsx              # Password reset confirmation
│   ├── (dashboard)/                  # Protected dashboard routes
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Main dashboard
│   │   ├── analytics/
│   │   │   └── page.tsx              # Analytics dashboard
│   │   ├── users/
│   │   │   ├── page.tsx              # Users list
│   │   │   └── new/
│   │   │       └── page.tsx          # Create user
│   │   ├── content/
│   │   │   ├── posts/
│   │   │   ├── pages/
│   │   │   └── media/
│   │   ├── billing/
│   │   │   └── page.tsx              # Billing & invoices
│   │   ├── calendar/
│   │   │   └── page.tsx              # Calendar events
│   │   └── settings/
│   │       └── page.tsx              # System settings
│   ├── api/                          # API routes
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   │   └── route.ts          # NextAuth.js endpoints
│   │   │   ├── forgot-password/
│   │   │   │   └── route.ts          # Password reset API
│   │   │   └── reset-password/
│   │   │       └── route.ts          # Password reset confirmation
│   │   └── users/
│   │       ├── route.ts              # Users CRUD API
│   │       └── [id]/
│   │           └── route.ts          # Single user operations
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Landing page
│   └── providers.tsx                 # Context providers
├── components/                       # React components
│   ├── ui/                           # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   └── ... (20+ components)
│   ├── auth/                         # Auth components
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   ├── dashboard/                    # Dashboard components
│   │   ├── sidebar.tsx               # Collapsible sidebar
│   │   ├── header.tsx                # Dashboard header
│   │   ├── stats-cards.tsx           # Metric cards
│   │   └── recent-activity.tsx       # Activity feed
│   └── landing/                      # Landing page components
│       ├── hero.tsx
│       ├── features.tsx
│       └── pricing.tsx
├── lib/                              # Utility libraries
│   ├── db.ts                         # Prisma client
│   ├── auth.ts                       # Auth utilities
│   ├── auth-options.ts               # NextAuth configuration
│   └── utils.ts                      # Helper functions
├── prisma/                           # Database schema
│   ├── schema.prisma                 # Prisma schema
│   └── seed.ts                       # Database seeding
├── hooks/                            # Custom React hooks
│   └── use-toast.ts                  # Toast notifications
├── styles/                           # Global styles
│   └── globals.css                   # Tailwind CSS
├── middleware.ts                     # Next.js middleware
├── .env.local                        # Environment variables
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS config
├── postcss.config.js                 # PostCSS configuration
├── tsconfig.json                     # TypeScript config
└── package.json                      # Dependencies
```

## 🛠️ **Tech Stack**

### **Core Framework**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Bun Runtime** - Fast JavaScript runtime

### **Frontend UI**
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library
- **Radix UI** - Primitives for accessible components
- **Lucide React** - Icon library

### **Backend & Database**
- **Prisma ORM** - Type-safe database client
- **SQLite** - Embedded database (development)
- **NextAuth.js** - Authentication library
- **bcryptjs** - Password hashing

### **Authentication & Security**
- **JWT Tokens** - Stateless authentication
- **OAuth 2.0** - Google & GitHub integration
- **Session Management** - Secure cookie-based sessions
- **Middleware Protection** - Route guarding

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Hot Reload** - Fast development cycles

## 🚀 **Getting Started**

### **Prerequisites**
- **Bun** ≥ 1.3.4 ([Installation Guide](https://bun.com/docs/installation))
- **Node.js** ≥ 18.17
- **Git** for version control

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nextjs-bun-dashboard.git
   cd nextjs-bun-dashboard
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here-minimum-32-characters"
   
   # Optional OAuth providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   ```

4. **Set up the database**
   ```bash
   bunx prisma generate
   bunx prisma db push
   bunx tsx prisma/seed.ts
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Default Credentials**
After seeding:
- **Admin**: `admin@example.com` / `admin123`
- **Editor**: `editor@example.com` / `editor123`
- **User**: `user@example.com` / `user123`

## 📦 **Available Scripts**

```bash
# Development
bun run dev          # Start development server

# Production
bun run build        # Build for production
bun run start        # Start production server

# Database
bunx prisma generate # Generate Prisma client
bunx prisma db push  # Push schema to database
bunx prisma studio   # Open Prisma Studio GUI

# Linting & Formatting
bun run lint         # Run ESLint
bun run format       # Format with Prettier

# Type Checking
bun run type-check   # TypeScript type checking
```

## 🔧 **Configuration**

### **Database Configuration**
The project uses SQLite by default for development. For production, update the database provider in `prisma/schema.prisma`:

```prisma
// For PostgreSQL
datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}

// For MySQL
datasource db {
  provider = "mysql"
  url = env("DATABASE_URL")
}
```

### **OAuth Configuration**

#### **Google OAuth**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services** → **Credentials**
4. Create **OAuth 2.0 Client ID** for Web Application
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

#### **GitHub OAuth**
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Set Homepage URL: `http://localhost:3000`
4. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and Secret to `.env.local`

## 🧪 **Testing**

### **Manual Testing Routes**
```bash
# Authentication
GET  /login                    # Login page
POST /api/auth/signin          # Login API
GET  /register                 # Registration page
POST /api/users                # Registration API

# Dashboard
GET  /dashboard                # Main dashboard
GET  /dashboard/users          # Users management
GET  /dashboard/analytics      # Analytics dashboard

# API Endpoints
GET  /api/users                # List users (Admin only)
GET  /api/users/[id]           # Get specific user
PUT  /api/users/[id]           # Update user
DELETE /api/users/[id]         # Delete user (Admin only)
```

## 📈 **Performance Optimization**

### **Built-in Optimizations**
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Automatic font subsetting
- **CSS Optimization**: Tailwind CSS purging
- **Bundle Analysis**: Automatic tree-shaking

### **Caching Strategy**
- **Static Generation**: Pre-rendered pages at build time
- **ISR**: Incremental Static Regeneration
- **Client-side Cache**: React Query for API data
- **CDN Ready**: Edge-compatible architecture

## 🔒 **Security Features**

### **Authentication Security**
- **Password Hashing**: bcrypt with 12 rounds
- **JWT Encryption**: HS256 algorithm
- **Session Management**: HTTP-only cookies
- **CSRF Protection**: Built-in NextAuth.js protection
- **Rate Limiting**: API endpoint protection

### **Data Protection**
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **XSS Protection**: React DOM escaping
- **CORS Configuration**: Restricted API access
- **Environment Variables**: Secure credential storage

## 🚢 **Deployment**

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### **Docker Deployment**
```dockerfile
# Dockerfile
FROM node:18-alpine AS base
RUN npm install -g bun

FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
RUN bunx prisma generate
EXPOSE 3000
CMD ["bun", "run", "start"]
```

### **Environment Variables for Production**
```env
# Production .env
DATABASE_URL="postgresql://user:password@localhost:5432/dashboard"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="complex-secret-key-generated-with-openssl"
NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

## 🤝 **Contributing**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript strict mode
- Use ESLint and Prettier
- Write meaningful commit messages
- Add tests for new features
- Update documentation accordingly

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- [Next.js](https://nextjs.org/) for the amazing framework
- [Bun](https://bun.com/) for the fast JavaScript runtime
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Prisma](https://prisma.io/) for the excellent ORM
- [NextAuth.js](https://next-auth.js.org/) for authentication

## 📞 **Support**

For support, email your-email@example.com or open an issue in the GitHub repository.

---

**Made with ❤️ by [Your Name]**

If you find this project helpful, please give it a ⭐ on GitHub!