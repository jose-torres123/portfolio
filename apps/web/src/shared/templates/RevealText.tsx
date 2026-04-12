import { motion } from "motion/react";
import { cn } from "@repo/ui";
import { maskReveal, stagger } from "./motion-variants";

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Splits text into words and reveals each from below a mask.
 * Reusable across headings, taglines, paragraphs.
 */
export function RevealText({
  children,
  className,
  delay = 0,
  as: Tag = "span",
}: RevealTextProps): React.JSX.Element {
  const words = children.split(" ");

  return (
    <Tag className={cn("inline-block", className)}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${String(i)}`} className="mr-[0.25em] inline-block overflow-hidden pb-[0.1em]">
            <motion.span variants={maskReveal} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
