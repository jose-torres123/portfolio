import { motion } from "framer-motion";
import { Code, Coffee, Rocket, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n/index.js";

const STAT_ICONS: React.JSX.Element[] = [
  <Code className="size-5" key="code" />,
  <Rocket className="size-5" key="rocket" />,
  <Coffee className="size-5" key="coffee" />,
  <Globe className="size-5" key="globe" />,
];

const STAT_VALUES = ["7+", "4", "∞", "3+"];

const HIGHLIGHT_COLORS = [
  "text-primary bg-primary/10",
  "text-secondary bg-secondary/10",
  "text-accent bg-accent/10",
  "text-amber bg-amber/10",
];

export function AboutSection(): React.JSX.Element {
  const { t } = useI18n();
  const statLabels = [t.about.stats.experience, t.about.stats.projects, t.about.stats.coffee, t.about.stats.countries];

  return (
    <section id="about" className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            {t.about.title}{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.about.titleAccent}
            </span>
          </h2>
          <p className="text-muted-foreground">{t.about.subtitle}</p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="flex size-64 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20 ring-2 ring-primary/20 md:size-80">
              <span className="text-7xl md:text-8xl">👨‍💻</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">{t.about.bio1}</p>
            <p className="text-muted-foreground leading-relaxed">{t.about.bio2}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {statLabels.map((label, i) => (
            <div
              key={label}
              className="group rounded-xl border border-border/50 bg-card/80 p-6 text-center backdrop-blur-sm transition-colors hover:border-primary/30"
            >
              <div className={`mx-auto mb-3 flex size-10 items-center justify-center rounded-lg ${HIGHLIGHT_COLORS[i]}`}>
                {STAT_ICONS[i]}
              </div>
              <p className="text-2xl font-bold text-foreground">{STAT_VALUES[i]}</p>
              <p className="mt-1 text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
