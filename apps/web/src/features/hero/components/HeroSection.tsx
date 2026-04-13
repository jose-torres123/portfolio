import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Download, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/index.js";
import { Section, RevealText, HoverLink, fadeUp, stagger } from "@/shared/templates/index.js";

export function HeroSection(): React.JSX.Element {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLDivElement>(null);

  // Parallax: name moves up slower than page, tagline moves slower still
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const taglineY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Dynamic blur — name loses focus as user scrolls, depth-of-field effect
  const blurValue = useTransform(scrollYProgress, [0, 0.6], [0, 10]);
  const nameBlur = useTransform(blurValue, (v) => `blur(${String(v)}px)`);

  return (
    <Section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-0!"
    >
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate="visible"
        style={{ opacity }}
        className="flex w-full flex-col gap-10 pt-24 md:gap-14"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <motion.span
            className="size-2 rounded-full bg-accent"
            aria-hidden="true"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.hero.greeting}
          </span>
        </motion.div>

        {/* Oversized name with parallax + depth-of-field blur */}
        <motion.h1
          style={{ y: nameY, filter: nameBlur }}
          className="font-display text-[clamp(3rem,14vw,11rem)] leading-[0.85] tracking-[-0.04em] text-foreground"
        >
          <RevealText as="span" delay={0.1}>
            José
          </RevealText>
          <br />
          <span className="inline-block pr-[0.15em]">
            <RevealText as="span" delay={0.25}>
              Torres
            </RevealText>
          </span>
        </motion.h1>

        {/* Tagline with slower parallax */}
        <motion.div
          style={{ y: taglineY }}
          variants={fadeUp}
          className="grid gap-8 md:grid-cols-12 md:gap-12"
        >
          <div className="md:col-span-7 md:col-start-6">
            <p className="font-display text-2xl leading-[1.15] tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              {t.hero.role}
            </p>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              {t.hero.tagline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <HoverLink href="#projects" className="font-display text-lg md:text-xl">
                {t.hero.viewProjects}
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </HoverLink>
              <HoverLink href="#contact" className="font-display text-lg md:text-xl">
                {t.hero.contactMe}
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </HoverLink>
              <HoverLink
                href={`/cv-${locale}.pdf`}
                className="font-display text-lg md:text-xl"
                {...{ download: `Jose-Torres-CV-${locale.toUpperCase()}.pdf` }}
              >
                {t.hero.downloadCV}
                <Download className="size-5" aria-hidden="true" />
              </HoverLink>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — anchored to section bottom */}
      <motion.div
        className="absolute bottom-8 left-6 flex items-center gap-3 text-muted-foreground md:left-10 lg:left-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ArrowDown className="size-4" aria-hidden="true" />
        </motion.span>
        <span className="font-mono text-xs uppercase tracking-[0.2em]">scroll</span>
      </motion.div>
    </Section>
  );
}
