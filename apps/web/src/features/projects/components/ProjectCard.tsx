import { motion } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import type { Project } from "../types/project.types.js";

const TAG_COLORS = [
  "bg-primary/10 text-primary",
  "bg-secondary/10 text-secondary",
  "bg-accent/10 text-accent",
  "bg-amber/10 text-amber",
  "bg-emerald/10 text-emerald",
];

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm transition-colors hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Image placeholder */}
      <div className="flex h-44 items-center justify-center rounded-t-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <Folder className="size-10 text-muted-foreground/40 transition-colors group-hover:text-primary/60" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TAG_COLORS[i % TAG_COLORS.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 border-t border-border/50 pt-4">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repo for ${project.title}`}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <Github className="size-4" />
            </a>
          ) : null}
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title}`}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent"
            >
              <ExternalLink className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
