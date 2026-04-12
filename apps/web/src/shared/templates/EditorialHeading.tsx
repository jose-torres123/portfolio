import { cn } from "@repo/ui";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUp } from "./motion-variants";

interface EditorialHeadingProps {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
}

/**
 * Oversized editorial heading with optional numbered eyebrow.
 * Use as the title block of any section.
 */
export function EditorialHeading({
  eyebrow,
  children,
  className,
  as: Tag = "h2",
  align = "left",
}: EditorialHeadingProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
      )}
    >
      {eyebrow !== undefined && (
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        <Tag
          className={cn(
            "font-display text-5xl text-foreground sm:text-6xl md:text-7xl lg:text-8xl",
            className,
          )}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}
