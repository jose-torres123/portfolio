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

export const mockPortfolioDetailData: PortfolioDetailData = {
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
}
