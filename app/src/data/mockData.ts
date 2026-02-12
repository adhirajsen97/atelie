import type { Item, Submission, AdminStats } from '@/types';

export const mockApps: Item[] = [
  {
    id: '1',
    type: 'app',
    name: 'FitWoody',
    developer_name: 'Chubby Studio S.L.',
    description: 'Track your fitness journey with beautiful, intuitive design. Monitor sleep patterns, workouts, and metabolic metrics all in one place with gorgeous data visualization. FitWoody makes health tracking a delightful experience with its warm, nature-inspired interface and smart insights that help you understand your body better.',
    categories: ['Health', 'Productivity'],
    platforms: ['iOS'],
    target_audience: 'Health-conscious professionals tracking fitness goals',
    scale_info: '50K+ users',
    hero_image_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=675&fit=crop',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop'
    ],
    app_link: 'https://fitwoody.app',
    is_published: true,
    is_featured: true,
    view_count: 1247,
    like_count: 89,
    interest_count: 0,
    accolades: ['App of the Year 2024'],
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    type: 'app',
    name: 'Lumina Notes',
    developer_name: 'PixelCraft Labs',
    description: 'A minimalist note-taking app designed for creative thinkers. Lumina combines powerful organization with a distraction-free writing environment. Features include smart tagging, seamless sync across devices, and beautiful typography that makes writing a joy.',
    categories: ['Productivity', 'Design'],
    platforms: ['Web App', 'iOS'],
    target_audience: 'Writers, designers, and creative professionals',
    scale_info: '25K+ users',
    hero_image_url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&h=675&fit=crop',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop'
    ],
    app_link: 'https://luminanotes.io',
    is_published: true,
    is_featured: false,
    view_count: 892,
    like_count: 67,
    interest_count: 0,
    created_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    type: 'app',
    name: 'ZenFocus',
    developer_name: 'Mindful Tech Co.',
    description: 'Transform your productivity with ZenFocus, a Pomodoro timer and focus assistant that helps you achieve deep work. Beautiful ambient sounds, intuitive session tracking, and insightful analytics help you build better work habits.',
    categories: ['Productivity', 'Health'],
    platforms: ['iOS', 'Android', 'Desktop'],
    target_audience: 'Remote workers and students seeking better focus',
    scale_info: '100K+ users',
    hero_image_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=675&fit=crop',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&h=400&fit=crop'
    ],
    app_link: 'https://zenfocus.app',
    is_published: true,
    is_featured: true,
    view_count: 2156,
    like_count: 156,
    interest_count: 0,
    accolades: ['Best Productivity App'],
    created_at: '2024-01-05T09:00:00Z',
    updated_at: '2024-01-05T09:00:00Z'
  },
  {
    id: '4',
    type: 'app',
    name: 'Palette Pro',
    developer_name: 'ColorLab Studio',
    description: 'The ultimate color palette generator for designers. Extract colors from images, create harmonious palettes, and export to any design tool. Features AI-powered color suggestions and accessibility checking.',
    categories: ['Design', 'Developer Tools'],
    platforms: ['Web App', 'Desktop'],
    target_audience: 'UI/UX designers and frontend developers',
    scale_info: '15K+ users',
    hero_image_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&h=675&fit=crop',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop'
    ],
    app_link: 'https://palettepro.design',
    is_published: true,
    is_featured: false,
    view_count: 678,
    like_count: 45,
    interest_count: 0,
    created_at: '2024-01-03T16:00:00Z',
    updated_at: '2024-01-03T16:00:00Z'
  },
  {
    id: '5',
    type: 'app',
    name: 'CoinWise',
    developer_name: 'Fintech Innovations',
    description: 'Personal finance made beautiful. Track expenses, set budgets, and visualize your financial health with stunning charts and insights. CoinWise helps you build better money habits with gentle reminders and progress tracking.',
    categories: ['Finance', 'Productivity'],
    platforms: ['iOS'],
    target_audience: 'Young professionals managing personal finances',
    scale_info: '75K+ users',
    hero_image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=400&fit=crop'
    ],
    app_link: 'https://coinwise.finance',
    is_published: true,
    is_featured: true,
    view_count: 1834,
    like_count: 123,
    interest_count: 0,
    created_at: '2023-12-28T11:00:00Z',
    updated_at: '2023-12-28T11:00:00Z'
  },
  {
    id: '6',
    type: 'app',
    name: 'LearnFlow',
    developer_name: 'EduTech Studios',
    description: 'Gamified learning platform that makes education addictive. Create flashcards, track progress with beautiful visualizations, and master new skills with spaced repetition. Perfect for language learning and professional development.',
    categories: ['Education', 'Productivity'],
    platforms: ['Web App', 'iOS', 'Android'],
    target_audience: 'Lifelong learners and students',
    scale_info: '30K+ users',
    hero_image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=675&fit=crop',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop'
    ],
    app_link: 'https://learnflow.education',
    is_published: true,
    is_featured: false,
    view_count: 945,
    like_count: 78,
    interest_count: 0,
    created_at: '2023-12-20T13:00:00Z',
    updated_at: '2023-12-20T13:00:00Z'
  }
];

export const mockIdeas: Item[] = [
  {
    id: '7',
    type: 'idea',
    name: 'TaskFlow AI',
    developer_name: 'Sarah Chen',
    description: 'AI-powered task manager that automatically organizes work from emails, Slack, and meetings into a single, beautiful interface with smart prioritization.',
    categories: ['AI', 'Productivity'],
    platforms: ['Web App', 'Desktop'],
    target_audience: 'Busy professionals juggling multiple projects',
    scale_info: 'Goal: 5K users in 6 months',
    hero_image_url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=675&fit=crop',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=400&fit=crop'
    ],
    is_published: true,
    is_featured: false,
    view_count: 892,
    like_count: 67,
    interest_count: 23,
    problem: 'Context-switching between apps kills productivity. Teams waste 2+ hours daily managing tasks across different tools.',
    solution: 'AI-powered task manager that automatically organizes work from emails, Slack, and meetings into a single, beautiful interface with smart prioritization.',
    created_at: '2024-01-12T10:00:00Z',
    updated_at: '2024-01-12T10:00:00Z'
  },
  {
    id: '8',
    type: 'idea',
    name: 'Mindful Moments',
    developer_name: 'David Park',
    description: 'A micro-meditation app that sends beautifully designed notifications throughout the day, prompting 30-second mindfulness exercises. Perfect for busy people who want to reduce stress.',
    categories: ['Health', 'Productivity'],
    platforms: ['iOS'],
    target_audience: 'Stressed professionals seeking quick mindfulness breaks',
    scale_info: 'Goal: 10K users in first year',
    hero_image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=675&fit=crop',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1515023115689-589c33041697?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=400&fit=crop'
    ],
    is_published: true,
    is_featured: true,
    view_count: 654,
    like_count: 52,
    interest_count: 18,
    problem: 'Traditional meditation apps require 10-20 minute sessions that busy professionals cannot commit to regularly.',
    solution: 'Micro-meditation exercises delivered via beautiful notifications, taking just 30 seconds to complete and reducing stress throughout the day.',
    created_at: '2024-01-08T14:00:00Z',
    updated_at: '2024-01-08T14:00:00Z'
  },
  {
    id: '9',
    type: 'idea',
    name: 'CodeBuddy',
    developer_name: 'Alex Rivera',
    description: 'An AI pair programming assistant with a beautiful, minimal interface that understands context and provides intelligent code suggestions without being intrusive.',
    categories: ['Developer Tools', 'AI'],
    platforms: ['Web App'],
    target_audience: 'Solo developers and small teams',
    scale_info: 'Goal: 2K beta users',
    hero_image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=675&fit=crop',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=400&fit=crop'
    ],
    is_published: true,
    is_featured: false,
    view_count: 432,
    like_count: 38,
    interest_count: 12,
    problem: 'Current AI coding assistants are too aggressive with suggestions and often interrupt developer flow.',
    solution: 'Context-aware AI that only suggests when needed, with a minimal UI that stays out of the way until requested.',
    created_at: '2024-01-05T09:00:00Z',
    updated_at: '2024-01-05T09:00:00Z'
  },
  {
    id: '10',
    type: 'idea',
    name: 'EcoTrack',
    developer_name: 'GreenTech Collective',
    description: 'A beautiful carbon footprint tracker that gamifies sustainable living. Track your daily impact, complete eco-challenges, and compete with friends to build better habits.',
    categories: ['Health', 'Education'],
    platforms: ['iOS'],
    target_audience: 'Environmentally conscious millennials and Gen Z',
    scale_info: 'Goal: 50K users in 12 months',
    hero_image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=675&fit=crop',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=400&fit=crop'
    ],
    is_published: true,
    is_featured: false,
    view_count: 378,
    like_count: 29,
    interest_count: 8,
    problem: 'People want to live more sustainably but lack visibility into their daily environmental impact and actionable steps.',
    solution: 'Beautiful tracking app that visualizes carbon footprint and provides gamified challenges to make sustainability fun and engaging.',
    created_at: '2024-01-02T16:00:00Z',
    updated_at: '2024-01-02T16:00:00Z'
  }
];

export const mockSubmissions: Submission[] = [
  {
    id: 'sub-1',
    email: 'developer@example.com',
    type: 'app',
    name: 'PhotoFrame',
    developer_name: 'Visual Studio Inc.',
    description: 'A digital photo frame app that curates your best memories using AI. Automatically selects and displays your most meaningful photos throughout the day.',
    categories: ['Entertainment', 'Design'],
    platforms: ['iOS'],
    target_audience: 'Families and photography enthusiasts',
    scale_info: 'Beta: 500 users',
    uploaded_image_urls: [],
    why_exceptional: 'The UI feels like a real photo frame with realistic shadows and transitions.',
    status: 'pending',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'sub-2',
    email: 'founder@startuptech.com',
    type: 'idea',
    name: 'VoiceNotes AI',
    developer_name: 'StartupTech Labs',
    description: 'Voice-first note-taking app that transcribes, summarizes, and organizes your spoken thoughts automatically.',
    categories: ['AI', 'Productivity'],
    platforms: ['iOS'],
    target_audience: 'Busy professionals who prefer voice memos',
    scale_info: 'Pre-launch',
    uploaded_image_urls: [],
    status: 'pending',
    created_at: '2024-01-14T14:00:00Z'
  }
];

export const mockAdminStats: AdminStats = {
  totalApps: 6,
  totalIdeas: 4,
  pending: 2,
  weeklyViews: '12.8K'
};

// Combine all items for the feed
export const mockItems: Item[] = [...mockApps, ...mockIdeas];
