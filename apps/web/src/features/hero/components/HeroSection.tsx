import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Download, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/index.js";
import { RevealText, HoverLink, fadeUp, stagger } from "@/shared/templates/index.js";
import { ImageTrail } from "./ImageTrail.js";

export function HeroSection(): React.JSX.Element {
  const { t, locale } = useI18n();

  // Track global scroll — hero is fixed so we use window scroll directly
  const { scrollY } = useScroll();

  // Dynamic blur + fade as the About section slides over the hero (0 → 100vh)
  const opacity = useTransform(scrollY, [0, 2000], [1, 0]);
  const blurValue = useTransform(scrollY, [0, 2000], [0, 12]);
  const heroFilter = useTransform(blurValue, (v) => `blur(${String(v)}px)`);
  const heroScale = useTransform(scrollY, [0, 2000], [1, 0.97]);

  return (
    <section
      id="hero"
      className="fixed inset-0 flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Image trail — photos follow cursor on hover */}
      <ImageTrail />

      <motion.div
        style={{ opacity, filter: heroFilter, scale: heroScale }}
        className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
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

          {/* Oversized name — blurs and fades as user scrolls */}
          <h1 className="font-display text-[clamp(3rem,14vw,11rem)] leading-[0.85] tracking-[-0.04em] text-foreground">
            <RevealText as="span" delay={0.1}>
              José
            </RevealText>
            <br />
            <span className="inline-block pr-[0.15em]">
              <RevealText as="span" delay={0.25}>
                Torres
              </RevealText>
            </span>
          </h1>

          {/* Tagline */}
          <motion.div
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
      </motion.div>

      {/* Scroll indicator — anchored to section bottom */}
      <motion.div
        className="absolute bottom-8 left-6 flex items-center gap-3 text-muted-foreground md:left-10 lg:left-16"
        style={{ opacity }}
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
    </section>
  );
}
