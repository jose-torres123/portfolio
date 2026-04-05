import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/index.js";
import { ProjectCard } from "./ProjectCard.js";

const PROJECT_META: { tags: string[]; github?: string | undefined; live?: string | undefined; featured: boolean }[] = [
  { tags: ["React.js", "TypeScript", "Node.js", "PostgreSQL"], featured: true },
  { tags: ["Laravel", "PHP", "PostgreSQL", "Stripe"], featured: true },
  { tags: ["WordPress", "PHP", "REST APIs"], featured: false },
  { tags: ["React Native", "TypeScript", "iOS", "Android"], featured: true },
  { tags: ["React", "Tailwind CSS", "Framer Motion", "i18n"], github: "https://github.com/jose-torres123", live: "#", featured: true },
  { tags: ["Ionic", "Laravel", "CodeIgniter", "REST APIs"], featured: false },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
    <section id="projects" className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            {t.projects.title}{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.projects.titleAccent}
            </span>
          </h2>
          <p className="text-muted-foreground">{t.projects.subtitle}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants} className="h-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
