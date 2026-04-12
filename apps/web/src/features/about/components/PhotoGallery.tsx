import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const PHOTOS = [
  { src: "/jose-1.jpeg", alt: "José Torres — city night", rotate: -3 },
  { src: "/jose-2.jpeg", alt: "José Torres — outdoors", rotate: 2 },
  { src: "/jose-3.jpeg", alt: "José Torres — portrait", rotate: -1.5 },
] as const;

export function PhotoGallery(): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  const y0 = useTransform(smooth, [0, 1], ["8%", "-8%"]);
  const y1 = useTransform(smooth, [0, 1], ["-4%", "4%"]);
  const y2 = useTransform(smooth, [0, 1], ["12%", "-12%"]);
  const parallaxY = [y0, y1, y2] as const;

  return (
    <div
      ref={ref}
      className="mt-20 grid grid-cols-2 gap-4 md:mt-28 md:grid-cols-3 md:gap-6"
    >
      {PHOTOS.map((photo, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: photo.rotate }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.8,
            delay: i * 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
          className={`group relative overflow-hidden ${
            i === 0
              ? "col-span-2 aspect-[4/3] md:col-span-1 md:aspect-[3/4] md:mt-12"
              : i === 1
                ? "col-span-1 aspect-[3/4]"
                : "col-span-1 aspect-[3/4] md:mt-8"
          }`}
        >
          <motion.img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            style={{ y: parallaxY[i as 0 | 1 | 2] }}
            className="absolute inset-0 h-full w-full object-cover object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.9,
              delay: i * 0.15 + 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none absolute inset-0 origin-bottom bg-background"
            aria-hidden="true"
          />
        </motion.div>
      ))}
    </div>
  );
}
