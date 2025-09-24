// Mock data for AI Learning Hub

export const courses = [
  {
    id: '1',
    title: 'AI Ethics & Society',
    description: 'Master the ethical implications of artificial intelligence and its impact on society.',
    instructor: 'Dr. Sarah Chen',
    duration: '8 weeks',
    students: 12453,
    rating: 4.9,
    price: 199,
    originalPrice: 299,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    category: 'Ethics',
    level: 'Advanced' as const,
    isPopular: true,
    skills: ['Ethics', 'AI Policy', 'Bias Detection', 'Responsible AI']
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    description: 'Learn the core concepts of machine learning from data preprocessing to model deployment.',
    instructor: 'Alex Rodriguez',
    duration: '12 weeks',
    students: 18920,
    rating: 4.8,
    price: 149,
    originalPrice: 249,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop',
    category: 'Machine Learning',
    level: 'Beginner' as const,
    isPopular: false,
    skills: ['Python', 'Scikit-learn', 'Data Analysis', 'Model Training']
  },
  {
    id: '3',
    title: 'Deep Learning with Neural Networks',
    description: 'Dive deep into neural networks, CNNs, RNNs, and modern architectures like Transformers.',
    instructor: 'Prof. Michael Zhang',
    duration: '16 weeks',
    students: 9876,
    rating: 4.9,
    price: 299,
    originalPrice: 399,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop',
    category: 'Deep Learning',
    level: 'Advanced' as const,
    isPopular: false,
    skills: ['TensorFlow', 'PyTorch', 'CNNs', 'Transformers', 'GPU Computing']
  },
  {
    id: '4',
    title: 'Natural Language Processing',
    description: 'Master text processing, sentiment analysis, and language models including GPT and BERT.',
    instructor: 'Dr. Emily Watson',
    duration: '10 weeks',
    students: 7543,
    rating: 4.7,
    price: 229,
    originalPrice: 329,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
    category: 'NLP',
    level: 'Intermediate' as const,
    isPopular: false,
    skills: ['NLTK', 'spaCy', 'Transformers', 'Text Mining', 'Language Models']
  },
  {
    id: '5',
    title: 'Computer Vision & Image Recognition',
    description: 'Learn to build systems that can see and understand images using deep learning.',
    instructor: 'James Liu',
    duration: '14 weeks',
    students: 6890,
    rating: 4.8,
    price: 259,
    originalPrice: 359,
    thumbnail: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=450&fit=crop',
    category: 'Computer Vision',
    level: 'Intermediate' as const,
    isPopular: false,
    skills: ['OpenCV', 'CNNs', 'Object Detection', 'Image Segmentation', 'YOLO']
  },
  {
    id: '6',
    title: 'AI for Business Strategy',
    description: 'Strategic implementation of AI in business operations and decision-making processes.',
    instructor: 'Maria Gonzalez',
    duration: '6 weeks',
    students: 5432,
    rating: 4.6,
    price: 179,
    originalPrice: 279,
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop',
    category: 'Business',
    level: 'Beginner' as const,
    isPopular: false,
    skills: ['AI Strategy', 'ROI Analysis', 'Change Management', 'Data-Driven Decisions']
  }
]

export const testimonials = [
  {
    id: '1',
    name: 'Jennifer Chen',
    role: 'AI Engineer at Google',
    content: "The AI Ethics course completely changed how I approach AI development. The real-world case studies and practical frameworks are invaluable.",
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    course: 'AI Ethics & Society'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'Data Scientist at Microsoft',
    content: "From zero to building production ML models in 12 weeks. The hands-on projects and mentorship made all the difference.",
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    course: 'Machine Learning Fundamentals'
  },
  {
    id: '3',
    name: 'Sarah Kim',
    role: 'Startup Founder',
    content: "The business strategy course helped me understand how to implement AI in my company effectively. ROI increased by 300%.",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    course: 'AI for Business Strategy'
  }
]

export const liveStats = {
  activeStudents: 45892,
  coursesCompleted: 128934,
  hoursTaught: 892456,
  certificatesAwarded: 67423
}

export const aiNewsItems = [
  {
    id: '1',
    title: 'OpenAI Releases GPT-5 with Unprecedented Reasoning Capabilities',
    summary: 'The new model shows significant improvements in mathematical reasoning and code generation.',
    category: 'AI Research',
    publishedAt: '2024-01-15',
    readTime: '3 min',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop',
    isBreaking: true
  },
  {
    id: '2',
    title: 'Google DeepMind Achieves Breakthrough in Protein Folding',
    summary: 'AlphaFold 3 can now predict protein interactions with 95% accuracy.',
    category: 'Healthcare AI',
    publishedAt: '2024-01-14',
    readTime: '5 min',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
    isBreaking: false
  },
  {
    id: '3',
    title: 'EU Passes Comprehensive AI Regulation Act',
    summary: 'New legislation sets global standards for AI safety and transparency.',
    category: 'AI Policy',
    publishedAt: '2024-01-13',
    readTime: '4 min',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop',
    isBreaking: false
  },
  {
    id: '4',
    title: 'Autonomous Vehicles Achieve Level 5 Automation',
    summary: 'First fully autonomous vehicles approved for public roads in California.',
    category: 'Transportation',
    publishedAt: '2024-01-12',
    readTime: '6 min',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    isBreaking: false
  },
  {
    id: '5',
    title: 'AI-Powered Drug Discovery Reduces Development Time by 70%',
    summary: 'Machine learning algorithms identify promising compounds in record time.',
    category: 'Healthcare AI',
    publishedAt: '2024-01-11',
    readTime: '4 min',
    thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
    isBreaking: false
  }
]

export const pricingTiers = [
  {
    id: 'free',
    name: 'Free Explorer',
    price: 0,
    period: 'month',
    description: 'Perfect for getting started with AI learning',
    features: [
      '3 free courses access',
      'Basic AI news updates',
      'Community forum access',
      'Mobile app access',
      'Certificate of completion'
    ],
    limitations: [
      'Limited course selection',
      'No 1-on-1 mentorship',
      'No advanced projects'
    ],
    popular: false,
    cta: 'Get Started Free'
  },
  {
    id: 'pro',
    name: 'Pro Learner',
    price: 49,
    period: 'month',
    description: 'Ideal for serious AI practitioners',
    features: [
      'All courses unlimited access',
      'Priority AI news & insights',
      'Advanced project assignments',
      'Code review & feedback',
      'Industry expert mentorship',
      'Career guidance sessions',
      'Networking opportunities',
      'Advanced certificates'
    ],
    limitations: [],
    popular: true,
    cta: 'Start Pro Trial'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: 'month',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Team dashboard & analytics',
      'Custom learning paths',
      'White-label certificates',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
      'Priority support',
      '24/7 technical assistance'
    ],
    limitations: [],
    popular: false,
    cta: 'Contact Sales'
  }
]

export const instructors = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'AI Ethics Researcher',
    company: 'Stanford AI Lab',
    bio: 'Leading researcher in AI ethics with 15+ years in responsible AI development.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=128&h=128&fit=crop&crop=face',
    expertise: ['AI Ethics', 'Policy', 'Bias Detection'],
    students: 25000,
    courses: 3,
    rating: 4.9
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    title: 'Senior ML Engineer',
    company: 'Meta AI',
    bio: 'Former Google Brain researcher with expertise in scalable machine learning systems.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
    expertise: ['Machine Learning', 'MLOps', 'Python'],
    students: 32000,
    courses: 5,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Prof. Michael Zhang',
    title: 'Professor of Computer Science',
    company: 'MIT',
    bio: 'Pioneer in deep learning research and author of "Neural Networks: A Comprehensive Guide".',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face',
    expertise: ['Deep Learning', 'Neural Networks', 'Research'],
    students: 18000,
    courses: 4,
    rating: 4.9
  }
]

export const learningPaths = [
  {
    id: '1',
    title: 'AI Fundamentals Track',
    description: 'Complete foundation in artificial intelligence concepts and applications',
    duration: '6 months',
    courses: ['2', '1', '6'],
    difficulty: 'Beginner',
    students: 15420,
    completion: 87
  },
  {
    id: '2',
    title: 'Machine Learning Engineer Path',
    description: 'Become a professional ML engineer with hands-on experience',
    duration: '8 months',
    courses: ['2', '3', '4', '5'],
    difficulty: 'Intermediate',
    students: 9876,
    completion: 72
  },
  {
    id: '3',
    title: 'AI Research Specialist',
    description: 'Advanced track for aspiring AI researchers and PhD candidates',
    duration: '12 months',
    courses: ['1', '3', '4', '5'],
    difficulty: 'Advanced',
    students: 4321,
    completion: 68
  }
]

export const userProgress = {
  currentCourses: [
    {
      courseId: '1',
      progress: 75,
      lastAccessed: '2024-01-15',
      nextLesson: 'Module 4: Bias Detection in Hiring Systems'
    },
    {
      courseId: '3',
      progress: 45,
      lastAccessed: '2024-01-14',
      nextLesson: 'Module 7: Convolutional Neural Networks'
    }
  ],
  completedCourses: ['2', '6'],
  certificates: [
    {
      courseId: '2',
      courseName: 'Machine Learning Fundamentals',
      completedAt: '2024-01-10',
      score: 94
    }
  ],
  totalHours: 127,
  currentStreak: 15,
  rank: 'Advanced Learner',
  nextRank: 'AI Expert'
}