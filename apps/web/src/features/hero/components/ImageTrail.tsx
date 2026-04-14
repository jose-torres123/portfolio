import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const TRAIL_IMAGES = [
  "/jose-1.jpeg",
  "/jose-2.jpeg",
  "/jose-3.jpeg",
] as const;

interface TrailImage {
  id: number;
  x: number;
  y: number;
  src: string;
  rotation: number;
  zIndex: number;
}

/** Minimum distance (px) the cursor must travel before spawning a new image */
const DISTANCE_THRESHOLD = 200;
/** Maximum trail images alive at once */
const MAX_TRAIL = 12;
/** Image width in px */
const IMG_W = 200;
/** Image height in px */
const IMG_H = 260;

/**
 * Image Trail on Hover — Jorge-template style.
 * Images spawn at the cursor position based on distance traveled,
 * animate in with scale + opacity, then drift down and fade out.
 * Listens globally and only spawns when cursor is inside #hero.
 * Disabled on touch devices and reduced-motion.
 */
export function ImageTrail(): React.JSX.Element | null {
  const [images, setImages] = useState<TrailImage[]>([]);
  const idRef = useRef(0);
  const indexRef = useRef(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const [enabled, setEnabled] = useState(false);

  const handleRemove = useCallback((id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);

    function onMouseMove(e: MouseEvent): void {
      const hero = document.getElementById("hero");
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const inHero =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inHero) {
        lastPosRef.current = null;
        return;
      }

      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      // Distance-based spawning — feels more natural than time-based throttle
      if (lastPosRef.current) {
        const dx = cx - lastPosRef.current.x;
        const dy = cy - lastPosRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < DISTANCE_THRESHOLD) return;
      }

      lastPosRef.current = { x: cx, y: cy };

      const rotation = (Math.random() - 0.5) * 16;
      const src = TRAIL_IMAGES[indexRef.current % TRAIL_IMAGES.length] ?? TRAIL_IMAGES[0];
      indexRef.current += 1;

      const newImage: TrailImage = {
        id: idRef.current++,
        x: cx,
        y: cy,
        src,
        rotation,
        zIndex: idRef.current,
      };

      setImages((prev) => [...prev.slice(-(MAX_TRAIL - 1)), newImage]);
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => { window.removeEventListener("mousemove", onMouseMove); };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {images.map((img) => (
          <motion.img
            key={img.id}
            src={img.src}
            alt=""
            draggable={false}
            style={{ zIndex: img.zIndex, width: IMG_W, height: IMG_H }}
            initial={{
              opacity: 0,
              scale: 0.4,
              rotate: img.rotation,
              x: img.x - IMG_W / 2,
              y: img.y - IMG_H / 2,
            }}
            animate={{
              opacity: [0, 0.9, 0.9, 0],
              scale: [0.4, 1, 1, 0.85],
              y: [img.y - IMG_H / 2, img.y - IMG_H / 2, img.y - IMG_H / 2 + 30],
            }}
            transition={{
              duration: 1.6,
              times: [0, 0.15, 0.7, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => { handleRemove(img.id); }}
            className="pointer-events-none absolute rounded-md object-cover shadow-lg grayscale"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
