import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n/index.js";
import { Section, EditorialHeading, fadeUp, stagger } from "@/shared/templates/index.js";
import { PhotoGallery } from "./PhotoGallery.js";

const STAT_VALUES = ["6+", "4", "∞", "3+"];

export function AboutSection(): React.JSX.Element {
  const { t } = useI18n();
  const statLabels = [
    t.about.stats.experience,
    t.about.stats.projects,
    t.about.stats.coffee,
    t.about.stats.countries,
  ];

  return (
    <Section id="about" bordered>
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        {/* Eyebrow + heading */}
        <div className="md:col-span-5">
          <EditorialHeading eyebrow={`01 — ${t.about.title}`} as="h2">
            <span>{t.about.titleAccent}</span>
          </EditorialHeading>
        </div>

        {/* Body */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          className="flex flex-col gap-6 md:col-span-7 md:pt-4"
        >
          <motion.p
            variants={fadeUp}
            className="text-xl leading-relaxed text-foreground md:text-2xl"
          >
            {t.about.subtitle}
          </motion.p>
          <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.about.bio1}
          </motion.p>
          <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.about.bio2}
          </motion.p>
        </motion.div>
      </div>

      {/* Photo gallery */}
      <PhotoGallery />

      {/* Stats — horizontal editorial row */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="mt-20 grid grid-cols-2 gap-px overflow-hidden border-t border-border md:mt-28 md:grid-cols-4"
      >
        {statLabels.map((label, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="flex flex-col gap-2 bg-background p-6 md:p-8"
          >
            <span className="font-display text-5xl text-foreground md:text-6xl">
              {STAT_VALUES[i]}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
