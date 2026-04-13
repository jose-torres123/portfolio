import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n/index.js";
import { Section, EditorialHeading, fadeUp, stagger } from "@/shared/templates/index.js";

const CATEGORY_KEYS = ["frontend", "backend", "tools"] as const;

const CATEGORY_SKILLS: readonly string[][] = [
  ["React.js", "Next.js", "TypeScript", "Svelte", "shadcn/ui", "Redux.js", "Tailwind CSS", "Zod"],
  ["Node.js", "Express.js", "GraphQL", "RESTful APIs", "React Query", "Apollo", "Docker", "PostgreSQL", "MySQL"],
  ["Git", "CI/CD", "SonarQube", "Playwright", "Agile", "React Native", "Ionic", "MCP", "AI-Assisted Dev"],
];

export function SkillsSection(): React.JSX.Element {
  const { t } = useI18n();

  return (
    <Section id="skills" bordered>
      <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <EditorialHeading eyebrow={`03 — ${t.skills.title}`} as="h2">
            {t.skills.titleAccent}
          </EditorialHeading>
        </div>
        <p className="text-base text-muted-foreground md:col-span-5 md:pt-4 md:text-lg">
          {t.skills.subtitle}
        </p>
      </div>

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="flex flex-col"
      >
        {CATEGORY_KEYS.map((key, i) => {
          const skills = CATEGORY_SKILLS[i];
          if (!skills) return null;

          return (
            <motion.li
              key={key}
              variants={fadeUp}
              whileHover={{ backgroundColor: "var(--color-muted)", x: 6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-12 gap-6 border-t border-border py-8 last:border-b md:gap-10 md:py-10"
            >
              <span className="col-span-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-span-10 font-display text-3xl text-foreground md:col-span-4 md:text-4xl lg:text-5xl">
                {t.skills.categories[key]}
              </h3>
              <div className="col-span-12 flex flex-wrap gap-x-4 gap-y-2 md:col-span-7">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
}
