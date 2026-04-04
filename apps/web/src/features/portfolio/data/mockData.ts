import type { Portfolio, PortfolioDetailData } from '../types'

export const mockPortfolios: Portfolio[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce platform with real-time inventory management',
    image_url: 'https://images.unsplash.com/photo-1460925895917-adf4198e308a?w=500&h=300&fit=crop',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    github_url: 'https://github.com/example/ecommerce',
    live_url: 'https://ecommerce-demo.example.com',
    created_at: '2024-01-15',
    updated_at: '2024-03-20',
  },
  {
    id: '2',
    title: 'AI Chat Application',
    description: 'Real-time chat app with AI-powered responses and sentiment analysis',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    technologies: ['React', 'Python', 'FastAPI', 'WebSocket'],
    github_url: 'https://github.com/example/ai-chat',
    live_url: 'https://ai-chat-demo.example.com',
    created_at: '2024-02-10',
    updated_at: '2024-03-15',
  },
  {
    id: '3',
    title: 'Analytics Dashboard',
    description: 'Interactive dashboard for real-time data visualization and reporting',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    technologies: ['React', 'D3.js', 'Express', 'MongoDB'],
    github_url: 'https://github.com/example/analytics',
    live_url: 'https://analytics-demo.example.com',
    created_at: '2024-03-01',
    updated_at: '2024-03-25',
  },
  {
    id: '4',
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracking app with workout plans and progress tracking',
    image_url: 'https://images.unsplash.com/photo-1517836357463-d25ddfcb53ef?w=500&h=300&fit=crop',
    technologies: ['React Native', 'Firebase', 'Google Fit API'],
    github_url: 'https://github.com/example/fitness',
    live_url: 'https://fitness-demo.example.com',
    created_at: '2023-11-20',
    updated_at: '2024-03-18',
  },
  {
    id: '5',
    title: 'SaaS Productivity Tool',
    description: 'Collaborative project management tool with real-time updates',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
    technologies: ['Vue.js', 'Supabase', 'Tailwind CSS'],
    github_url: 'https://github.com/example/productivity',
    live_url: 'https://productivity-demo.example.com',
    created_at: '2023-12-05',
    updated_at: '2024-03-22',
  },
  {
    id: '6',
    title: 'Content Management System',
    description: 'Headless CMS with flexible content modeling and API-first architecture',
    image_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop',
    technologies: ['Next.js', 'GraphQL', 'Postgres', 'Redis'],
    github_url: 'https://github.com/example/cms',
    live_url: 'https://cms-demo.example.com',
    created_at: '2024-01-08',
    updated_at: '2024-03-24',
  },
]

export const mockPortfolioDetails: Record<string, PortfolioDetailData> = {
  '1': {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce platform with real-time inventory management',
    content: `
# E-Commerce Platform

This project showcases a complete e-commerce solution built with modern web technologies.

## Features
- Real-time inventory management
- Secure payment processing with Stripe
- User authentication and authorization
- Shopping cart and checkout flow
- Order tracking and history
- Admin dashboard for inventory management

## Technologies Used
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Stripe API
- **Hosting**: Vercel (frontend), Heroku (backend)

## Performance Metrics
- Load time: < 2 seconds
- Lighthouse score: 95+
- 99.9% uptime SLA

## Result
Generated $150k in first year of launch with 5,000+ active users.
    `,
    image_url: 'https://images.unsplash.com/photo-1460925895917-adf4198e308a?w=800&h=600&fit=crop',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    github_url: 'https://github.com/example/ecommerce',
    live_url: 'https://ecommerce-demo.example.com',
    featured: true,
    created_at: '2024-01-15',
    updated_at: '2024-03-20',
  },
  '2': {
    id: '2',
    title: 'AI Chat Application',
    description: 'Real-time chat app with AI-powered responses and sentiment analysis',
    content: `
# AI Chat Application

An intelligent chat application that combines real-time messaging with AI-powered responses and sentiment analysis.

## Features
- Real-time messaging with WebSocket
- AI-powered response generation
- Sentiment analysis of conversations
- User authentication and chat history
- Multiple chat rooms and private messaging
- Message encryption and security

## Technologies Used
- **Frontend**: React, TypeScript, Socket.io client
- **Backend**: Python, FastAPI, WebSocket
- **AI**: OpenAI GPT API, Hugging Face Transformers
- **Database**: Redis for caching, PostgreSQL for persistence
- **Deployment**: Docker, Kubernetes

## Technical Challenges
- Implementing real-time bidirectional communication
- Optimizing AI response times
- Handling concurrent users and message queuing
- Ensuring data privacy and security

## Impact
- 10,000+ active users
- Average response time: 1.2 seconds
- 95% user satisfaction rate
    `,
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    technologies: ['React', 'Python', 'FastAPI', 'WebSocket'],
    github_url: 'https://github.com/example/ai-chat',
    live_url: 'https://ai-chat-demo.example.com',
    featured: false,
    created_at: '2024-02-10',
    updated_at: '2024-03-15',
  },
  '3': {
    id: '3',
    title: 'Analytics Dashboard',
    description: 'Interactive dashboard for real-time data visualization and reporting',
    content: `
# Analytics Dashboard

A comprehensive analytics platform providing real-time data visualization and business intelligence.

## Features
- Real-time data streaming and visualization
- Custom dashboard creation
- Advanced filtering and drill-down capabilities
- Automated report generation
- Data export in multiple formats
- Role-based access control

## Technologies Used
- **Frontend**: React, D3.js, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with aggregation pipelines
- **Real-time**: Socket.io for live updates
- **Deployment**: AWS ECS, CloudFront

## Key Metrics
- Processes 1M+ data points daily
- Supports 500+ concurrent users
- 99.5% uptime
- Reduced reporting time by 80%

## Business Impact
- Improved decision-making speed by 60%
- Identified $2M in cost savings
- Increased operational efficiency across 5 departments
    `,
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: ['React', 'D3.js', 'Express', 'MongoDB'],
    github_url: 'https://github.com/example/analytics',
    live_url: 'https://analytics-demo.example.com',
    featured: true,
    created_at: '2024-03-01',
    updated_at: '2024-03-25',
  },
  '4': {
    id: '4',
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracking app with workout plans and progress tracking',
    content: `
# Mobile Fitness App

A comprehensive fitness tracking application available on iOS and Android with personalized workout plans.

## Features
- Personalized workout plans based on goals
- Real-time workout tracking
- Progress visualization and analytics
- Social features and challenges
- Integration with wearable devices
- Nutrition tracking and meal planning

## Technologies Used
- **Mobile**: React Native, Expo
- **Backend**: Firebase (Auth, Firestore, Cloud Functions)
- **APIs**: Google Fit API, Apple HealthKit
- **State Management**: Redux Toolkit
- **Deployment**: App Store, Google Play

## Technical Implementation
- Cross-platform development with React Native
- Offline-first architecture
- Real-time synchronization
- Advanced animation and gesture handling
- Performance optimization for mobile devices

## User Engagement
- 50,000+ downloads
- 4.8 star rating
- 70% monthly active users
- Featured in App Store "Health & Fitness"
    `,
    image_url: 'https://images.unsplash.com/photo-1517836357463-d25ddfcb53ef?w=800&h=600&fit=crop',
    technologies: ['React Native', 'Firebase', 'Google Fit API'],
    github_url: 'https://github.com/example/fitness',
    live_url: 'https://fitness-demo.example.com',
    featured: false,
    created_at: '2023-11-20',
    updated_at: '2024-03-18',
  },
  '5': {
    id: '5',
    title: 'SaaS Productivity Tool',
    description: 'Collaborative project management tool with real-time updates',
    content: `
# SaaS Productivity Tool

A modern project management platform designed for remote teams with real-time collaboration features.

## Features
- Real-time collaborative editing
- Task management with Kanban boards
- Time tracking and reporting
- File sharing and version control
- Team communication and notifications
- Integration with popular tools (Slack, GitHub, etc.)

## Technologies Used
- **Frontend**: Vue.js 3, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Real-time**: Supabase real-time subscriptions
- **File Storage**: Supabase Storage
- **Deployment**: Vercel, Supabase

## Architecture Decisions
- Serverless backend with Supabase
- Real-time subscriptions for live updates
- Component-based architecture with Vue 3
- Type-safe development with TypeScript
- Responsive design for all devices

## Growth Metrics
- 2,000+ active teams
- 95% monthly retention rate
- Processing 10M+ real-time events monthly
- 99.9% uptime SLA
    `,
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    technologies: ['Vue.js', 'Supabase', 'Tailwind CSS'],
    github_url: 'https://github.com/example/productivity',
    live_url: 'https://productivity-demo.example.com',
    featured: false,
    created_at: '2023-12-05',
    updated_at: '2024-03-22',
  },
  '6': {
    id: '6',
    title: 'Content Management System',
    description: 'Headless CMS with flexible content modeling and API-first architecture',
    content: `
# Content Management System

A modern headless CMS built with a focus on developer experience and content creator flexibility.

## Features
- Flexible content modeling
- REST and GraphQL APIs
- Rich text editor with media support
- Multi-language support
- Role-based permissions
- Webhook integrations
- Static site generation

## Technologies Used
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, GraphQL Yoga
- **Database**: PostgreSQL with custom migrations
- **Media**: Cloudinary for image optimization
- **Deployment**: Vercel, Railway

## Technical Highlights
- API-first architecture
- Custom content types and fields
- Advanced permission system
- Real-time preview
- Automated deployment pipelines
- CDN integration for global performance

## Performance & Scale
- Handles 100k+ content requests daily
- Global CDN with 50ms average response time
- 99.95% uptime
- Supports 10+ languages
- Powers 500+ websites
    `,
    image_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'GraphQL', 'Postgres', 'Redis'],
    github_url: 'https://github.com/example/cms',
    live_url: 'https://cms-demo.example.com',
    featured: true,
    created_at: '2024-01-08',
    updated_at: '2024-03-24',
  },
}

export const mockPortfolioDetailData: PortfolioDetailData = mockPortfolioDetails['1']
