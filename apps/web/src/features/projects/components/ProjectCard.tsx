import { motion } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import { GitHubIcon } from "@/shared/components/brand-icons.js";
import { Card, CardContent, CardFooter, Badge, Button } from "@repo/ui";
import type { Project } from "../types/project.types.js";

const BADGE_VARIANTS = [
  "primary",
  "secondary",
  "accent",
  "amber",
  "emerald",
] as const;

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
      <Card className="group flex h-full flex-col hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        {/* Image placeholder */}
        <div className="flex h-44 items-center justify-center rounded-t-xl bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10">
          <Folder className="size-10 text-muted-foreground/40 transition-colors group-hover:text-primary/60" />
        </div>

        <CardContent className="flex flex-1 flex-col pt-5">
          <h3 className="mb-2 text-lg font-semibold text-foreground">{project.title}</h3>
          <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <Badge key={tag} variant={BADGE_VARIANTS[i % BADGE_VARIANTS.length]}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          {project.github ? (
            <Button variant="ghost" size="icon" asChild>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repo for ${project.title}`}
              >
                <GitHubIcon className="size-4" />
              </a>
            </Button>
          ) : null}
          {project.live ? (
            <Button variant="ghost" size="icon" asChild>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.title}`}
              >
                <ExternalLink className="size-4" />
              </a>
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
