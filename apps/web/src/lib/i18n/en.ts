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
    role: "Systems Engineer & Full Stack Developer",
    tagline: "I specialize in developing scalable web and mobile applications with a strong focus on the JavaScript ecosystem",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
  },
  about: {
    title: "About",
    titleAccent: "Me",
    subtitle: "Get to know the person behind the code",
    bio1: "I specialize in developing scalable web and mobile applications, with a strong focus on the JavaScript ecosystem. Throughout my career, I have worked on both the front end and the back end, always prioritizing the creation of intuitive interfaces and efficient code.",
    bio2: "I possess a strong foundation in data structures and algorithms, which underpins my approach to software development. I prioritize writing efficient and optimized code, ensuring scalability and performance in my applications.",
    stats: {
      experience: "Years of Experience",
      projects: "Companies Worked At",
      coffee: "Cups of Coffee",
      countries: "Tech Stacks Mastered",
    },
  },
  projects: {
    title: "My",
    titleAccent: "Projects",
    subtitle: "A selection of projects and platforms I've built",
    items: [
      {
        id: "1",
        title: "iGaming Platform (Pretty Technical)",
        description: "Developed and optimized high-traffic products for the iGaming and online casino industry, working on internal PAAS solutions and bespoke platforms for international clients.",
      },
      {
        id: "2",
        title: "E-Commerce Platform",
        description: "Led the design and development of robust and secure e-commerce platforms using Laravel, with real-time inventory management and payment integration.",
      },
      {
        id: "3",
        title: "Custom WordPress Plugins",
        description: "Developed custom WordPress plugins that expanded the CMS's functional capabilities, integrating tailored technical solutions with strategic marketing needs.",
      },
      {
        id: "4",
        title: "Cross-Platform Mobile Apps",
        description: "Built and deployed cross-platform mobile applications (iOS/Android) using React Native, optimizing performance and UI to maximize user engagement.",
      },
      {
        id: "5",
        title: "Portfolio Website",
        description: "Modern developer portfolio with smooth animations, i18n support, dark mode, and responsive design built with React, Tailwind CSS, and Framer Motion.",
      },
      {
        id: "6",
        title: "Hybrid Mobile Systems",
        description: "Designed and deployed web and mobile systems using Ionic and the PHP ecosystem (Laravel, CodeIgniter) for back-end development and APIs.",
      },
    ],
  },
  skills: {
    title: "Tech",
    titleAccent: "Stack",
    subtitle: "Technologies I work with daily",
    categories: {
      frontend: "Frontend",
      backend: "Backend & APIs",
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
        role: "Software Developer",
        company: "Pretty Technical",
        period: "2022 — 2026",
        description: "Developing and optimizing high-traffic products for the iGaming and online casino industry. Building secure, performant, and well-tested features within a high-scale web environment. Collaborating closely with Product Managers, UX designers, and Backend Engineers.",
      },
      {
        id: "2",
        role: "Full Stack Developer",
        company: "Autana's Innovation",
        period: "2021 — 2022",
        description: "Led the design and development of robust e-commerce platforms using Laravel. Implemented advanced WordPress websites with custom plugins, integrating tailored technical solutions with strategic marketing needs.",
      },
      {
        id: "3",
        role: "Full Stack Developer",
        company: "Marketing Fino, C.A",
        period: "2020 — 2021",
        description: "Full-stack development of comprehensive web platforms. Mobile engineering with React Native for cross-platform applications. Implementation of scalable web solutions supporting the company's digital strategy.",
      },
      {
        id: "4",
        role: "Web & Mobile Developer",
        company: "JAK Ideas & Solutions",
        period: "2019 — 2020",
        description: "Responsible for the design and deployment of web and mobile systems. Expert in the PHP ecosystem (Laravel, CodeIgniter) for back-end development and APIs. Developed hybrid mobile applications using Ionic.",
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
    builtWith: "",
  },
};
