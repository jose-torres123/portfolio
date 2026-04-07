export type Locale = "en" | "es";

export interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    experience: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    tagline: string;
    viewProjects: string;
    contactMe: string;
    downloadCV: string;
  };
  about: {
    title: string;
    titleAccent: string;
    subtitle: string;
    bio1: string;
    bio2: string;
    stats: {
      experience: string;
      projects: string;
      coffee: string;
      countries: string;
    };
  };
  projects: {
    title: string;
    titleAccent: string;
    subtitle: string;
    items: {
      id: string;
      title: string;
      description: string;
    }[];
  };
  skills: {
    title: string;
    titleAccent: string;
    subtitle: string;
    categories: {
      frontend: string;
      backend: string;
      tools: string;
    };
  };
  experience: {
    title: string;
    titleAccent: string;
    subtitle: string;
    items: {
      id: string;
      role: string;
      company: string;
      period: string;
      description: string;
    }[];
  };
  contact: {
    title: string;
    titleAccent: string;
    subtitle: string;
    cta: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successMessage: string;
      errorTitle: string;
      errorMessage: string;
    };
  };
  footer: {
    rights: string;
    builtWith: string;
  };
}
