'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Brain, User } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass backdrop-blur-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-purple-600 glow-teal group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading text-xl gradient-text">
              AI Learning Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-teal-400 transition-colors duration-300 font-medium">
              Courses
            </Link>
            <Link href="/catalog" className="text-white hover:text-teal-400 transition-colors duration-300 font-medium">
              AI Tools
            </Link>
            <Link href="/dashboard" className="text-white hover:text-teal-400 transition-colors duration-300 font-medium">
              Community
            </Link>
            <Link href="/pricing" className="text-white hover:text-teal-400 transition-colors duration-300 font-medium">
              Pricing
            </Link>
            <Link href="/blog" className="text-white hover:text-teal-400 transition-colors duration-300 font-medium">
              Blog
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-teal-400 hover:bg-white/10">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button className="btn-futuristic font-semibold">
              Get Started Free
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-teal-400 transition-colors duration-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}>
          <div className="glass rounded-lg p-4 space-y-4">
            <Link
              href="/"
              className="block text-white hover:text-teal-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/catalog"
              className="block text-white hover:text-teal-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              AI Tools
            </Link>
            <Link
              href="/dashboard"
              className="block text-white hover:text-teal-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/pricing"
              className="block text-white hover:text-teal-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="block text-white hover:text-teal-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <div className="border-t border-white/20 pt-4 space-y-3">
              <Button variant="ghost" className="w-full text-white hover:text-teal-400 hover:bg-white/10">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button className="w-full btn-futuristic font-semibold">
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}