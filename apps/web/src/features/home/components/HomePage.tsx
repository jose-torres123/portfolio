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
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </Layout>
  );
}
