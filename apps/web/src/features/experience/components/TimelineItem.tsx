import { motion } from "framer-motion";
import type { Experience } from "../types/experience.types.js";

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export function TimelineItem({ experience, index }: TimelineItemProps): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Vertical line */}
      <div className="absolute left-1.75 top-3 bottom-0 w-px bg-border" />

      {/* Dot */}
      <div className="absolute left-0 top-2 size-3.5 rounded-full bg-linear-to-br from-primary to-secondary ring-4 ring-background" />

      {/* Content */}
      <div className="rounded-xl border border-border/50 bg-card/80 p-5 backdrop-blur-sm transition-colors hover:border-primary/30">
        <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-foreground">{experience.role}</h3>
          <span className="text-xs font-medium text-muted-foreground">{experience.period}</span>
        </div>
        <p className="mb-3 text-sm font-medium text-primary">{experience.company}</p>
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{experience.description}</p>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
