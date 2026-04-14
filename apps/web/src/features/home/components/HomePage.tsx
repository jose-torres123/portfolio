import { Layout } from "@/features/layout/index.js";
import { HeroSection } from "@/features/hero/index.js";
import { AboutSection } from "@/features/about/index.js";
import { ProjectsSection } from "@/features/projects/index.js";
import { SkillsSection } from "@/features/skills/index.js";
import { ExperienceSection } from "@/features/experience/index.js";
import { ContactSection } from "@/features/contact/index.js";

export function HomePage(): React.JSX.Element {
  return (
    <Layout>
      <HeroSection />
      {/* Spacer — reserves the height the fixed hero occupies in document flow */}
      <div className="h-screen" aria-hidden="true" />
      {/* Content slides over the fixed hero */}
      <div className="relative z-10 bg-background">
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </Layout>
  );
}
