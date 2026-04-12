import { motion } from "motion/react";
import { cn } from "@repo/ui";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}

/**
 * Infinite horizontal marquee. Pass child once; it duplicates internally.
 */
export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
}: MarqueeProps): React.JSX.Element {
  return (
    <div className={cn("relative flex w-full overflow-hidden", className)}>
      <motion.div
        className="flex shrink-0 items-center gap-12 pr-12"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
