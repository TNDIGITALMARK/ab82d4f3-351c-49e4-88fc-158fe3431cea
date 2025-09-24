'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Star, Play, BookOpen } from 'lucide-react'
import Image from 'next/image'

interface CourseCardProps {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  students: number
  rating: number
  price: number
  originalPrice?: number
  thumbnail: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  isPopular?: boolean
  skills: string[]
}

export default function CourseCard({
  id,
  title,
  description,
  instructor,
  duration,
  students,
  rating,
  price,
  originalPrice,
  thumbnail,
  category,
  level,
  isPopular = false,
  skills
}: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const levelColors = {
    Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Advanced: 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  return (
    <Card
      className={`group relative overflow-hidden bg-card/50 backdrop-blur-sm border-white/10 hover-lift transition-all duration-500 ${
        isHovered ? 'glow-teal' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold px-3 py-1 pulse-glow">
            Most Popular
          </Badge>
        </div>
      )}

      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              size="sm"
              className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
            >
              <Play className="w-4 h-4 mr-2" />
              Preview Course
            </Button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
            {category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title & Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg leading-tight group-hover:text-teal-400 transition-colors duration-300">
              {title}
            </h3>
            <Badge className={`text-xs px-2 py-1 ${levelColors[level]}`}>
              {level}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        {/* Instructor */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {instructor.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">by {instructor}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{students.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white font-medium">{rating}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs border-white/20 text-muted-foreground">
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="outline" className="text-xs border-white/20 text-muted-foreground">
              +{skills.length - 3} more
            </Badge>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-teal-400">
              ${price}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="btn-futuristic"
            onClick={() => {
              // Handle course enrollment
              console.log('Enrolling in course:', id)
            }}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Enroll Now
          </Button>
        </div>
      </div>
    </Card>
  )
}