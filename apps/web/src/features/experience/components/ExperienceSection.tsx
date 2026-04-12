import { useI18n } from "@/lib/i18n/index.js";
import { TimelineItem } from "./TimelineItem.js";
import { Section, EditorialHeading } from "@/shared/templates/index.js";

const EXPERIENCE_TECH: string[][] = [
  ["React.js", "Next.js", "TypeScript", "GraphQL", "Tailwind", "Playwright", "SonarQube"],
  ["Laravel", "PHP", "WordPress", "PostgreSQL", "REST APIs"],
  ["React Native", "Node.js", "Express.js", "React.js", "TypeScript"],
  ["Laravel", "CodeIgniter", "PHP", "Ionic", "MySQL"],
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
    <Section id="experience" bordered>
      <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <EditorialHeading eyebrow={`04 — ${t.experience.title}`} as="h2">
            {t.experience.titleAccent}
          </EditorialHeading>
        </div>
        <p className="text-base text-muted-foreground md:col-span-5 md:pt-4 md:text-lg">
          {t.experience.subtitle}
        </p>
      </div>

      <ul className="flex flex-col">
        {experiences.map((exp, i) => (
          <TimelineItem key={exp.id} experience={exp} index={i} />
        ))}
      </ul>
    </Section>
  );
}
