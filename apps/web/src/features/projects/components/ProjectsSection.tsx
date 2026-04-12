import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n/index.js";
import { ProjectCard } from "./ProjectCard.js";
import { Section, EditorialHeading, fadeUp, stagger } from "@/shared/templates/index.js";

const PROJECT_META: { tags: string[]; github?: string | undefined; live?: string | undefined; featured: boolean }[] = [
  { tags: ["React.js", "TypeScript", "Node.js", "PostgreSQL"], featured: true },
  { tags: ["Laravel", "PHP", "PostgreSQL", "Stripe"], featured: true },
  { tags: ["WordPress", "PHP", "REST APIs"], featured: false },
  { tags: ["React Native", "TypeScript", "iOS", "Android"], featured: true },
  { tags: ["React", "Tailwind CSS", "Framer Motion", "i18n"], github: "https://github.com/jose-torres123", live: "#", featured: true },
  { tags: ["Ionic", "Laravel", "CodeIgniter", "REST APIs"], featured: false },
];

export function ProjectsSection(): React.JSX.Element {
  const { t } = useI18n();

  const projects = t.projects.items.map((item, i) => {
    const meta = PROJECT_META[i];
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      tags: meta?.tags ?? [],
      github: meta?.github,
      live: meta?.live,
      featured: meta?.featured ?? false,
    };
  });

  return (
    <Section id="projects" bordered>
      <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <EditorialHeading eyebrow={`02 — ${t.projects.title}`} as="h2">
            {t.projects.titleAccent}
          </EditorialHeading>
        </div>
        <p className="text-base text-muted-foreground md:col-span-5 md:pt-4 md:text-lg">
          {t.projects.subtitle}
        </p>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="grid gap-x-10 gap-y-20 md:grid-cols-2 md:gap-y-32"
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            className={i % 2 === 1 ? "md:mt-24" : ""}
          >
            <ProjectCard project={project} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
