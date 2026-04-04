import type { Translations } from "./types.js";

export const es: Translations = {
  nav: {
    home: "Inicio",
    about: "Sobre mí",
    projects: "Proyectos",
    skills: "Habilidades",
    experience: "Experiencia",
    contact: "Contacto",
  },
  hero: {
    greeting: "Bienvenido a mi portafolio",
    role: "Desarrollador Full Stack",
    tagline: "Creando experiencias digitales con tecnologías web modernas",
    viewProjects: "Ver Proyectos",
    contactMe: "Contáctame",
  },
  about: {
    title: "Sobre",
    titleAccent: "Mí",
    subtitle: "Conoce a la persona detrás del código",
    bio1: "Soy un Desarrollador Full Stack apasionado que disfruta convirtiendo ideas en productos digitales funcionales y atractivos. Con enfoque en tecnologías web modernas, construyo aplicaciones escalables que resuelven problemas reales.",
    bio2: "Cuando no estoy programando, me encuentro explorando nuevas tecnologías, contribuyendo al código abierto o compartiendo conocimiento con la comunidad de desarrolladores.",
    stats: {
      experience: "Años de Experiencia",
      projects: "Proyectos Entregados",
      coffee: "Tazas de Café",
      countries: "Países Colaborados",
    },
  },
  projects: {
    title: "Mis",
    titleAccent: "Proyectos",
    subtitle: "Una selección de proyectos en los que he trabajado",
    items: [
      {
        id: "1",
        title: "Plataforma E-Commerce",
        description: "Tienda en línea completa con carrito, pagos y panel de administración. Diseñada para escalar con gestión de inventario en tiempo real.",
      },
      {
        id: "2",
        title: "App de Gestión de Tareas",
        description: "Herramienta colaborativa de gestión de proyectos con actualizaciones en tiempo real, tableros kanban y espacios de equipo.",
      },
      {
        id: "3",
        title: "Dashboard del Clima",
        description: "App del clima con gráficos interactivos, pronósticos de 7 días y alertas basadas en ubicación.",
      },
      {
        id: "4",
        title: "Aplicación de Chat",
        description: "Plataforma de mensajería en tiempo real con chats grupales, compartir archivos y cifrado de extremo a extremo.",
      },
      {
        id: "5",
        title: "Sitio Web Portfolio",
        description: "Portfolio moderno con animaciones fluidas, modo oscuro y diseño responsivo. ¡Lo estás viendo!",
      },
      {
        id: "6",
        title: "API Gateway",
        description: "Gateway de microservicios con limitación de tasa, caché, autenticación y monitoreo.",
      },
    ],
  },
  skills: {
    title: "Stack",
    titleAccent: "Tecnológico",
    subtitle: "Tecnologías con las que trabajo a diario",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      tools: "Herramientas y Plataformas",
    },
  },
  experience: {
    title: "Mi",
    titleAccent: "Experiencia",
    subtitle: "Mi trayectoria profesional",
    items: [
      {
        id: "1",
        role: "Desarrollador Frontend Senior",
        company: "TechCorp",
        period: "2022 — Presente",
        description: "Liderando el equipo frontend, diseñando aplicaciones React escalables y mentoreando desarrolladores junior. Mejoré el rendimiento en un 40% mediante code splitting y lazy loading.",
      },
      {
        id: "2",
        role: "Desarrollador Full Stack",
        company: "StartupXYZ",
        period: "2020 — 2022",
        description: "Construí el producto principal desde cero, implementando frontend y backend. Escalé la plataforma para manejar más de 10K usuarios concurrentes.",
      },
      {
        id: "3",
        role: "Desarrollador Frontend",
        company: "WebAgency",
        period: "2018 — 2020",
        description: "Desarrollé aplicaciones web responsivas para diversos clientes en diferentes industrias. Especializado en animaciones e interfaces interactivas.",
      },
      {
        id: "4",
        role: "Desarrollador Junior",
        company: "CodeLab",
        period: "2017 — 2018",
        description: "Comencé mi trayectoria profesional construyendo herramientas internas y aprendiendo buenas prácticas. Contribuí al sistema de diseño de la empresa.",
      },
    ],
  },
  contact: {
    title: "Hablemos",
    titleAccent: "Juntos",
    subtitle: "Siempre estoy abierto a nuevas oportunidades y proyectos interesantes. ¡Trabajemos juntos!",
    cta: "Envíame un email",
  },
  footer: {
    rights: "Todos los derechos reservados.",
    builtWith: "Hecho con React + Tailwind",
  },
};
