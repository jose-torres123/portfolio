import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/index.js";
import { TimelineItem } from "./TimelineItem.js";

const EXPERIENCE_TECH: string[][] = [
  ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind"],
  ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
  ["React", "Vue.js", "SASS", "Webpack", "REST APIs"],
  ["JavaScript", "HTML/CSS", "jQuery", "Bootstrap", "PHP"],
];

export function ExperienceSection(): React.JSX.Element {
  const { t } = useI18n();

  const experiences = t.experience.items.map((item, i) => ({
    id: item.id,
    role: item.role,
    company: item.company,
    period: item.period,
    description: item.description,
    technologies: EXPERIENCE_TECH[i] ?? [],
  }));

  return (
    <section id="experience" className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            {t.experience.title}{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              {t.experience.titleAccent}
            </span>
          </h2>
          <p className="text-muted-foreground">{t.experience.subtitle}</p>
        </motion.div>

        <div>
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
