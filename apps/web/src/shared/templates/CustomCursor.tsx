import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Editorial cursor: a small dot that smoothly follows the pointer and
 * scales up into an outlined ring when hovering interactive elements.
 * Hidden on touch devices and when prefers-reduced-motion is on.
 */
export function CustomCursor(): React.JSX.Element | null {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 380, mass: 0.5 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent): void => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const leave = (): void => { setHidden(true); };
    const onOver = (e: MouseEvent): void => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button'], input, textarea, label, [data-cursor='hover']");
      setIsHovering(interactive !== null);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100]"
        style={{ x: cursorX, y: cursorY }}
        aria-hidden="true"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-neutral-500"
          animate={{
            width: isHovering ? 56 : 32,
            height: isHovering ? 56 : 32,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100]"
        style={{ x, y }}
        aria-hidden="true"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-500"
          animate={{
            width: isHovering ? 0 : 6,
            height: isHovering ? 0 : 6,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
