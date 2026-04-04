import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/index.js";

const CATEGORY_KEYS = ["frontend", "backend", "tools"] as const;

const CATEGORY_STYLES: { color: string; chipColor: string }[] = [
  { color: "text-primary", chipColor: "bg-primary/10 text-primary border-primary/20" },
  { color: "text-secondary", chipColor: "bg-secondary/10 text-secondary border-secondary/20" },
  { color: "text-accent", chipColor: "bg-accent/10 text-accent border-accent/20" },
];

const CATEGORY_SKILLS: string[][] = [
  ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion", "HTML/CSS"],
  ["Node.js", "Express", "PostgreSQL", "Redis", "Docker", "REST APIs"],
  ["Git", "VS Code", "Figma", "Vercel", "Supabase", "GitHub Actions"],
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SkillsSection(): React.JSX.Element {
  const { t } = useI18n();

  return (
    <section id="skills" className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            {t.skills.title}{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              {t.skills.titleAccent}
            </span>
          </h2>
          <p className="text-muted-foreground">{t.skills.subtitle}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-10"
        >
          {CATEGORY_KEYS.map((key, i) => {
            const style = CATEGORY_STYLES[i];
            const skills = CATEGORY_SKILLS[i];
            if (!style || !skills) return null;

            return (
              <motion.div key={key} variants={categoryVariants}>
                <h3 className={`mb-4 text-lg font-semibold ${style.color}`}>
                  {t.skills.categories[key]}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-shadow hover:shadow-md ${style.chipColor}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
