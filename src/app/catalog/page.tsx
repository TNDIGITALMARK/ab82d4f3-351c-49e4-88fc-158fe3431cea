'use client'

import { useState, useMemo } from 'react'
import Navigation from '@/components/Navigation'
import CourseCard from '@/components/CourseCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { courses, learningPaths, instructors, pricingTiers } from '@/lib/mockData'
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Users,
  Star,
  TrendingUp,
  Target,
  ChevronRight,
  Award
} from 'lucide-react'

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedSort, setSelectedSort] = useState('popular')

  const categories = ['all', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Ethics', 'Business']
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced']

  const filteredCourses = useMemo(() => {
    let filtered = courses

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    // Level filter
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    // Sort
    switch (selectedSort) {
      case 'popular':
        filtered = [...filtered].sort((a, b) => b.students - a.students)
        break
      case 'newest':
        filtered = [...filtered].sort((a, b) => a.id.localeCompare(b.id))
        break
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedLevel, selectedSort])

  return (
    <div className="min-h-screen bg-background neural-bg">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-heading text-5xl mb-4">
              <span className="gradient-text">Course Catalog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive collection of AI courses designed by industry experts.
              Build real-world skills with hands-on projects and personalized mentorship.
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="glass p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses, skills, or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder-muted-foreground"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-[140px] bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level === 'all' ? 'All Levels' : level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="w-[140px] bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
              <div className="text-sm text-muted-foreground">
                Showing {filteredCourses.length} of {courses.length} courses
              </div>
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-teal-400" />
                  <span className="text-muted-foreground">45K+ students</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span className="text-muted-foreground">Expert instructors</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-heading text-3xl mb-4">
              <span className="text-white">Featured Learning Paths</span>
            </h2>
            <p className="text-muted-foreground">
              Structured learning journeys to master specific AI domains
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {learningPaths.map((path) => (
              <Card key={path.id} className="glass p-6 hover-lift group">
                <div className="mb-4">
                  <Badge className="bg-gradient-to-r from-teal-500 to-purple-600 text-white mb-3">
                    {path.difficulty}
                  </Badge>
                  <h3 className="font-heading text-xl mb-2 group-hover:text-teal-400 transition-colors duration-300">
                    {path.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {path.description}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="text-white">{path.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Students</span>
                    <span className="text-white">{path.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <span className="text-teal-400">{path.completion}%</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full glass text-white border-white/20 hover:bg-white/10"
                >
                  View Path Details
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-xl mb-2 text-white">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or browse all courses
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedLevel('all')
                }}
                className="btn-futuristic"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-gradient-to-r from-card/30 to-card/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl mb-4">
              <span className="text-white">Choose Your Learning Plan</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing options to match your learning goals and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`glass p-8 relative ${
                  tier.popular ? 'ring-2 ring-teal-500 glow-teal' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-teal-500 to-purple-600 text-white px-4 py-1 font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-heading text-2xl mb-2 text-white">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-teal-400">${tier.price}</span>
                    <span className="text-muted-foreground">/{tier.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {tier.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Award className="w-4 h-4 text-teal-400 mr-3 flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                  {tier.features.length > 4 && (
                    <div className="text-sm text-muted-foreground">
                      +{tier.features.length - 4} more features
                    </div>
                  )}
                </div>

                <Button
                  className={`w-full ${
                    tier.popular
                      ? 'btn-futuristic'
                      : 'glass text-white border-white/20 hover:bg-white/10'
                  }`}
                >
                  {tier.cta}
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground mb-4">
              All plans include 30-day money-back guarantee • Cancel anytime
            </p>
            <Button variant="ghost" className="text-teal-400 hover:text-teal-300">
              Compare all features
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}