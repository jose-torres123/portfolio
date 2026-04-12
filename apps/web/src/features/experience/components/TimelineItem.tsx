import { motion } from "motion/react";
import type { Experience } from "../types/experience.types.js";

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export function TimelineItem({ experience, index }: TimelineItemProps): React.JSX.Element {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-12 gap-6 border-t border-border py-10 transition-colors last:border-b hover:bg-muted/40 md:gap-10 md:py-12"
    >
      <span className="col-span-12 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground md:col-span-3">
        {experience.period}
      </span>
      <div className="col-span-12 flex flex-col gap-4 md:col-span-9">
        <div className="flex flex-col">
          <h3 className="font-display text-3xl text-foreground md:text-4xl lg:text-5xl">
            {experience.role}
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {experience.company}
          </p>
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {experience.description}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.li>
  );
}
