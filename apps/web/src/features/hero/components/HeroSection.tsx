import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@repo/ui";
import { useI18n } from "@/lib/i18n/index.js";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const floatingCircles = [
  { size: "w-72 h-72", position: "top-1/4 -left-20", color: "bg-primary/20", delay: 0 },
  { size: "w-96 h-96", position: "-top-10 right-0", color: "bg-secondary/15", delay: 1.5 },
  { size: "w-64 h-64", position: "bottom-1/4 left-1/3", color: "bg-accent/15", delay: 3 },
  { size: "w-48 h-48", position: "bottom-10 right-1/4", color: "bg-gradient-mid/20", delay: 0.8 },
];

export function HeroSection(): React.JSX.Element {
  const { t } = useI18n();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      {/* Floating background shapes */}
      {floatingCircles.map((circle, index) => (
        <motion.div
          key={index}
          className={`absolute ${circle.size} ${circle.position} ${circle.color} rounded-full blur-3xl`}
          animate={{ y: [0, -30, 0], scale: [1, 1.08, 1] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: circle.delay,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item} className="mb-4 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
            {t.hero.greeting}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
          <span className="bg-linear-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent">
            José Torres
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mb-3 text-lg font-semibold text-foreground/80 sm:text-xl md:text-2xl lg:text-3xl"
        >
          {t.hero.role}
        </motion.p>

        <motion.p
          variants={item}
          className="mx-auto mb-10 max-w-lg px-2 text-sm text-muted-foreground sm:px-0 sm:text-base md:text-lg"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button variant="gradient" asChild>
            <a href="#projects">{t.hero.viewProjects}</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#contact">{t.hero.contactMe}</a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5 text-muted-foreground/50" />
      </motion.div>
    </section>
  );
}
