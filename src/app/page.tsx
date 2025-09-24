'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import CourseCard from '@/components/CourseCard'
import SubscriptionModal from '@/components/SubscriptionModal'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { courses, testimonials, liveStats, instructors } from '@/lib/mockData'
import {
  Brain,
  Users,
  Award,
  Clock,
  BookOpen,
  TrendingUp,
  Star,
  ChevronRight,
  Play,
  CheckCircle,
  Zap
} from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [currentStat, setCurrentStat] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const stats = [
    { label: 'Active Students', value: liveStats.activeStudents.toLocaleString(), icon: Users },
    { label: 'Courses Completed', value: liveStats.coursesCompleted.toLocaleString(), icon: BookOpen },
    { label: 'Hours Taught', value: liveStats.hoursTaught.toLocaleString(), icon: Clock },
    { label: 'Certificates Awarded', value: liveStats.certificatesAwarded.toLocaleString(), icon: Award }
  ]

  return (
    <div className="min-h-screen bg-background neural-bg">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="neural-lines absolute inset-0 opacity-30"></div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-teal-500 to-purple-600 text-white px-4 py-2 font-semibold">
                  <Zap className="w-4 h-4 mr-2" />
                  New: AI Ethics Course Available
                </Badge>

                <h1 className="font-heading text-5xl lg:text-7xl leading-tight">
                  <span className="gradient-text">UNLOCK THE</span><br />
                  <span className="text-white">FUTURE OF AI</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-lg">
                  Join 45,000+ students mastering artificial intelligence through hands-on projects,
                  real-world applications, and expert mentorship.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <SubscriptionModal selectedTier="pro">
                  <Button size="lg" className="btn-futuristic text-lg px-8 py-4">
                    Start Learning
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </SubscriptionModal>
                <Button size="lg" variant="outline" className="glass text-white border-white/20 hover:bg-white/10">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className={`text-center transition-all duration-500 ${
                        index === currentStat ? 'glow-teal' : ''
                      }`}
                    >
                      <div className="flex justify-center mb-2">
                        <Icon className="w-6 h-6 text-teal-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Neural Network Visual */}
            <div className="relative flex justify-center">
              <div className="relative w-96 h-96">
                {/* Central Node */}
                <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-purple-600 glow-teal pulse-glow flex items-center justify-center">
                  <Brain className="w-10 h-10 text-white" />
                </div>

                {/* Orbiting Nodes */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 360) / 8
                  const radius = 120
                  const x = Math.cos((angle * Math.PI) / 180) * radius
                  const y = Math.sin((angle * Math.PI) / 180) * radius

                  return (
                    <div
                      key={i}
                      className="absolute w-12 h-12 rounded-full bg-card backdrop-blur-sm border border-white/20 flex items-center justify-center float-animation glow-purple"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(${x - 24}px, ${y - 24}px)`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    >
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-teal-400 to-purple-500"></div>
                    </div>
                  )
                })}

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 384 384">
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 360) / 8
                    const radius = 120
                    const x = 192 + Math.cos((angle * Math.PI) / 180) * radius
                    const y = 192 + Math.sin((angle * Math.PI) / 180) * radius

                    return (
                      <line
                        key={i}
                        x1="192"
                        y1="192"
                        x2={x}
                        y2={y}
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        opacity="0.6"
                        className="animate-pulse"
                        style={{
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    )
                  })}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--ai-teal-primary))" />
                      <stop offset="100%" stopColor="hsl(var(--ai-purple-primary))" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl mb-4">
              <span className="gradient-text">AI Learning Paths</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master artificial intelligence through our comprehensive courses designed by industry experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="glass text-white border-white/20 hover:bg-white/10">
              View All Courses
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-card/30 to-card/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl mb-4">
              <span className="text-white">Transform Your Ideas</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professionals who have accelerated their careers with our AI programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="glass p-6 hover-lift">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-white mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 neural-lines">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="font-heading text-5xl leading-tight">
              <span className="text-white">Stay Ahead of the</span><br />
              <span className="gradient-text">Curve</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our community of AI practitioners and get exclusive access to cutting-edge research,
              industry insights, and career opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SubscriptionModal selectedTier="free">
                <Button size="lg" className="btn-futuristic text-lg px-8 py-4">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
              </SubscriptionModal>
              <Button size="lg" variant="outline" className="glass text-white border-white/20 hover:bg-white/10">
                View Pricing Plans
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Google</div>
                <div className="text-sm text-muted-foreground">AI Partner</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Microsoft</div>
                <div className="text-sm text-muted-foreground">Azure Certified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Stanford</div>
                <div className="text-sm text-muted-foreground">Research Partner</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">MIT</div>
                <div className="text-sm text-muted-foreground">Faculty Exchange</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}