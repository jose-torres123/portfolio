import type { Translations } from "./types.js";

export const en: Translations = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    contact: "Contact",
  },
  hero: {
    greeting: "Welcome to my portfolio",
    role: "Full Stack Developer",
    tagline: "Building digital experiences with modern web technologies",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
  },
  about: {
    title: "About",
    titleAccent: "Me",
    subtitle: "Get to know the person behind the code",
    bio1: "I'm a passionate Full Stack Developer who loves turning ideas into functional, beautiful digital products. With a focus on modern web technologies, I build scalable applications that solve real problems.",
    bio2: "When I'm not coding, you can find me exploring new technologies, contributing to open source, or sharing knowledge with the dev community.",
    stats: {
      experience: "Years of Experience",
      projects: "Projects Delivered",
      coffee: "Cups of Coffee",
      countries: "Countries Worked With",
    },
  },
  projects: {
    title: "My",
    titleAccent: "Projects",
    subtitle: "A selection of projects I've worked on",
    items: [
      {
        id: "1",
        title: "E-Commerce Platform",
        description: "A full-featured online store with cart, payments, and admin dashboard. Built for scale with real-time inventory management.",
      },
      {
        id: "2",
        title: "Task Management App",
        description: "Collaborative project management tool with real-time updates, kanban boards, and team workspaces.",
      },
      {
        id: "3",
        title: "Weather Dashboard",
        description: "Beautiful weather app with interactive charts, 7-day forecasts, and location-based alerts.",
      },
      {
        id: "4",
        title: "Chat Application",
        description: "Real-time messaging platform with group chats, file sharing, and end-to-end encryption.",
      },
      {
        id: "5",
        title: "Portfolio Website",
        description: "Modern portfolio with smooth animations, dark mode, and responsive design. You're looking at it!",
      },
      {
        id: "6",
        title: "API Gateway",
        description: "Microservices API gateway with rate limiting, caching, authentication, and monitoring.",
      },
    ],
  },
  skills: {
    title: "Tech",
    titleAccent: "Stack",
    subtitle: "Technologies I work with daily",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools & Platforms",
    },
  },
  experience: {
    title: "My",
    titleAccent: "Experience",
    subtitle: "My professional journey",
    items: [
      {
        id: "1",
        role: "Senior Frontend Developer",
        company: "TechCorp",
        period: "2022 — Present",
        description: "Leading the frontend team, architecting scalable React applications, and mentoring junior developers. Improved performance by 40% through code splitting and lazy loading.",
      },
      {
        id: "2",
        role: "Full Stack Developer",
        company: "StartupXYZ",
        period: "2020 — 2022",
        description: "Built the core product from scratch, implementing both frontend and backend. Scaled the platform to handle 10K+ concurrent users.",
      },
      {
        id: "3",
        role: "Frontend Developer",
        company: "WebAgency",
        period: "2018 — 2020",
        description: "Developed responsive web applications for various clients across different industries. Specialized in animation and interactive UIs.",
      },
      {
        id: "4",
        role: "Junior Developer",
        company: "CodeLab",
        period: "2017 — 2018",
        description: "Started my professional journey building internal tools and learning best practices. Contributed to the company's design system.",
      },
    ],
  },
  contact: {
    title: "Let's",
    titleAccent: "Connect",
    subtitle: "I'm always open to new opportunities and interesting projects. Let's work together!",
    cta: "Send me an email",
  },
  footer: {
    rights: "All rights reserved.",
    builtWith: "Built with React + Tailwind",
  },
};
