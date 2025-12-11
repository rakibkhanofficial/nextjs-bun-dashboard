import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Star, Zap, Shield, Globe, Users } from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with Bun for exceptional performance',
    },
    {
      icon: Shield,
      title: 'Secure by Design',
      description: 'Enterprise-grade security features',
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Deploy anywhere with ease',
    },
    {
      icon: Users,
      title: 'Team Ready',
      description: 'Collaborate with your entire team',
    },
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      description: 'Perfect for small teams',
      features: ['Up to 5 users', '10GB storage', 'Basic analytics', 'Email support'],
    },
    {
      name: 'Professional',
      price: '$99',
      description: 'Best for growing companies',
      features: ['Up to 50 users', '100GB storage', 'Advanced analytics', 'Priority support', 'Custom integrations'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: ['Unlimited users', 'Unlimited storage', 'Advanced security', '24/7 phone support', 'Custom solutions'],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Build <span className="text-primary">Amazing</span> Dashboards
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A modern dashboard template built with Next.js 14, Bun, and Radix UI.
              Everything you need to create beautiful applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">
                  Get Started Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">
                  Live Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Dashboard</h2>
            <p className="text-xl text-muted-foreground">
              Packed with features that make development easier and faster
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that&apos;s right for your business
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={plan.popular ? 'border-primary shadow-xl relative' : ''}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.popular ? 'default' : 'outline'}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers building amazing applications with our template.
            </p>
            <Button size="lg" asChild>
              <Link href="/register">
                Start Free Trial
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}