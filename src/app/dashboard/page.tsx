'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { courses, aiNewsItems, userProgress, pricingTiers } from '@/lib/mockData'
import {
  BookOpen,
  Trophy,
  Clock,
  TrendingUp,
  Brain,
  Zap,
  Calendar,
  PlayCircle,
  Award,
  Bell,
  Settings,
  ChevronRight,
  Flame,
  Target,
  BarChart3,
  Globe,
  User
} from 'lucide-react'
import Image from 'next/image'

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState('overview')

  // Get current courses with progress
  const currentCoursesData = userProgress.currentCourses.map(cp => ({
    course: courses.find(c => c.id === cp.courseId)!,
    progress: cp.progress,
    lastAccessed: cp.lastAccessed,
    nextLesson: cp.nextLesson
  }))

  // Get completed courses
  const completedCoursesData = userProgress.completedCourses.map(courseId =>
    courses.find(c => c.id === courseId)!
  )

  const NewsCard = ({ item }: { item: any }) => (
    <Card className="glass p-4 hover-lift group cursor-pointer">
      <div className="flex gap-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {item.isBreaking && (
            <div className="absolute top-1 right-1">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs border-white/20 text-muted-foreground">
              {item.category}
            </Badge>
            {item.isBreaking && (
              <Badge className="text-xs bg-red-500 text-white">BREAKING</Badge>
            )}
          </div>

          <h4 className="font-medium text-white text-sm leading-tight mb-2 group-hover:text-teal-400 transition-colors duration-300">
            {item.title}
          </h4>

          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {item.summary}
          </p>

          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            {item.readTime}
            <span className="mx-2">•</span>
            <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background neural-bg">
      <Navigation />

      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="font-heading text-4xl mb-2">
                <span className="text-white">Welcome back,</span><br />
                <span className="gradient-text">Sarah</span>
              </h1>
              <p className="text-muted-foreground">Continue your AI learning journey</p>
            </div>

            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="glass text-white border-white/20 hover:bg-white/10">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" className="glass text-white border-white/20 hover:bg-white/10">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="glass p-4">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                  {userProgress.rank}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {userProgress.totalHours}
              </div>
              <div className="text-xs text-muted-foreground">Hours Learned</div>
            </Card>

            <Card className="glass p-4">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <div className="text-xs text-orange-400">days</div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {userProgress.currentStreak}
              </div>
              <div className="text-xs text-muted-foreground">Current Streak</div>
            </Card>

            <Card className="glass p-4">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-5 h-5 text-teal-400" />
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {userProgress.currentCourses.length}
              </div>
              <div className="text-xs text-muted-foreground">Active Courses</div>
            </Card>

            <Card className="glass p-4">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-5 h-5 text-purple-400" />
                <div className="text-xs text-purple-400">earned</div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {userProgress.certificates.length}
              </div>
              <div className="text-xs text-muted-foreground">Certificates</div>
            </Card>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 glass mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
                Overview
              </TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
                My Courses
              </TabsTrigger>
              <TabsTrigger value="news" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
                AI News
              </TabsTrigger>
              <TabsTrigger value="progress" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
                Progress
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Continue Learning */}
              <div>
                <h2 className="font-heading text-2xl mb-4 text-white">Continue Learning</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {currentCoursesData.map(({ course, progress, lastAccessed, nextLesson }) => (
                    <Card key={course.id} className="glass p-6 hover-lift group">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white mb-1 group-hover:text-teal-400 transition-colors duration-300">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            by {course.instructor}
                          </p>
                          <Badge variant="outline" className="text-xs border-white/20 text-muted-foreground">
                            {course.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-medium text-teal-400">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <div className="text-sm">
                          <div className="text-muted-foreground mb-1">Next Lesson:</div>
                          <div className="text-white font-medium">{nextLesson}</div>
                        </div>

                        <Button size="sm" className="w-full btn-futuristic">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Latest AI News */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-2xl text-white">Latest AI News</h2>
                  <Button variant="ghost" size="sm" className="text-teal-400 hover:text-teal-300">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {aiNewsItems.slice(0, 4).map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h2 className="font-heading text-2xl mb-4 text-white">Recent Achievements</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userProgress.certificates.map((cert) => (
                    <Card key={cert.courseId} className="glass p-4 hover-lift">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white text-sm mb-1">Certificate Earned</h4>
                          <p className="text-xs text-muted-foreground">{cert.courseName}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">
                          {new Date(cert.completedAt).toLocaleDateString()}
                        </span>
                        <Badge className="bg-yellow-500/20 text-yellow-400">
                          Score: {cert.score}%
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl mb-4 text-white">My Courses</h2>

                {/* In Progress */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-white">In Progress ({currentCoursesData.length})</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentCoursesData.map(({ course, progress, nextLesson }) => (
                      <Card key={course.id} className="glass p-6">
                        <div className="flex gap-4 mb-4">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                            <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-white mb-2">{course.title}</h4>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs border-white/20 text-muted-foreground">
                                {course.level}
                              </Badge>
                              <Badge variant="outline" className="text-xs border-white/20 text-muted-foreground">
                                {course.category}
                              </Badge>
                            </div>
                            <Progress value={progress} className="h-2" />
                            <div className="text-sm text-teal-400 mt-1">{progress}% complete</div>
                          </div>
                        </div>
                        <Button size="sm" className="w-full btn-futuristic">
                          Continue Learning
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Completed */}
                <div>
                  <h3 className="text-lg font-medium mb-4 text-white">Completed ({completedCoursesData.length})</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {completedCoursesData.map((course) => (
                      <Card key={course.id} className="glass p-4 hover-lift">
                        <div className="relative w-full h-32 rounded-lg overflow-hidden mb-4">
                          <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
                          <div className="absolute top-2 right-2">
                            <div className="p-1 rounded-full bg-green-500">
                              <Award className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                        <h4 className="font-medium text-white text-sm mb-2">{course.title}</h4>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{course.category}</span>
                          <span>Completed</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="news" className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl mb-4 text-white">AI News Feed</h2>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {aiNewsItems.map((item) => (
                      <NewsCard key={item.id} item={item} />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl mb-6 text-white">Learning Progress</h2>

                {/* Progress Overview */}
                <Card className="glass p-6 mb-6">
                  <h3 className="text-lg font-medium mb-4 text-white">Overall Progress</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-teal-400 mb-1">
                          {Math.round((userProgress.completedCourses.length / (userProgress.completedCourses.length + userProgress.currentCourses.length)) * 100)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Completion Rate</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Courses Completed</span>
                          <span className="text-white">{userProgress.completedCourses.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">In Progress</span>
                          <span className="text-white">{userProgress.currentCourses.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Hours</span>
                          <span className="text-white">{userProgress.totalHours}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-center mb-4">
                        <div className="text-lg font-medium text-white mb-2">Current Rank</div>
                        <Badge className="bg-gradient-to-r from-teal-500 to-purple-600 text-white px-4 py-2">
                          {userProgress.rank}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-2">
                          Next: {userProgress.nextRank}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Skills Progress */}
                <Card className="glass p-6">
                  <h3 className="text-lg font-medium mb-4 text-white">Skill Development</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-white">Machine Learning</span>
                        <span className="text-sm text-teal-400">Advanced - 85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-white">Deep Learning</span>
                        <span className="text-sm text-teal-400">Intermediate - 65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-white">AI Ethics</span>
                        <span className="text-sm text-teal-400">Advanced - 90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-white">Computer Vision</span>
                        <span className="text-sm text-teal-400">Beginner - 30%</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}