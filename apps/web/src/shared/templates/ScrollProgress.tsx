import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin editorial scroll-progress bar fixed at the top of the viewport.
 */
export function ScrollProgress(): React.JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="pointer-events-none fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-foreground"
      aria-hidden="true"
    />
  );
}
