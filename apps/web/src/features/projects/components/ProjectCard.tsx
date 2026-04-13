import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/shared/components/brand-icons.js";
import type { Project } from "../types/project.types.js";

const GRADIENT_PAIRS = [
  ["#1a1a2e", "#16213e"],
  ["#0f0f0f", "#1a1a2e"],
  ["#162447", "#1f4068"],
  ["#1b1b2f", "#1a1a2e"],
  ["#0a0a0a", "#1c1c3c"],
  ["#111827", "#1e293b"],
] as const;

function getGradient(index: number): readonly [string, string] {
  const pair = GRADIENT_PAIRS[index % GRADIENT_PAIRS.length];
  return pair ?? GRADIENT_PAIRS[0];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps): React.JSX.Element {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // Image enters slightly zoomed + offset, settles as it centers
  const imageScale = useTransform(smooth, [0, 0.5, 1], [1.18, 1, 1.08]);
  const imageY = useTransform(smooth, [0, 1], ["-8%", "8%"]);
  const revealScaleY = useTransform(smooth, [0, 0.35], [1, 0]);

  return (
    <motion.article
      ref={ref}
      className="group relative flex h-full flex-col gap-5"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {/* Cover placeholder */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <motion.div
          style={{
            scale: imageScale,
            y: imageY,
            background: `linear-gradient(135deg, ${getGradient(index)[0]}, ${getGradient(index)[1]})`,
          }}
          variants={{ rest: {}, hover: {} }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="select-none px-6 text-center font-display text-4xl tracking-tight text-white/10 md:text-6xl">
            {project.title}
          </span>
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-end justify-end p-5"
        >
          <motion.span
            variants={{ rest: { scale: 0.8 }, hover: { scale: 1 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex size-12 items-center justify-center rounded-full bg-foreground text-background"
          >
            <ArrowUpRight className="size-5" />
          </motion.span>
        </motion.div>

        {/* Reveal mask — wipes up as card enters viewport */}
        <motion.div
          style={{ scaleY: revealScaleY }}
          className="pointer-events-none absolute inset-0 origin-bottom bg-background"
          aria-hidden="true"
        />
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl text-foreground md:text-3xl">
            {project.title}
          </h3>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            / {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {project.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        {(project.github !== undefined || project.live !== undefined) && (
          <div className="mt-3 flex items-center gap-4">
            {project.github !== undefined && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repo for ${project.title}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <GitHubIcon className="size-5" />
              </a>
            )}
            {project.live !== undefined && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.title}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowUpRight className="size-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
