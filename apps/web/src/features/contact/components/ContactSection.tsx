import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n/index.js";

const CONTACT_LINKS: { label: string; value: string; href: string; icon: React.JSX.Element; color: string }[] = [
  { label: "Email", value: "joseprox16@gmail.com", href: "mailto:joseprox16@gmail.com", icon: <Mail className="size-6" />, color: "hover:border-primary/50 hover:text-primary" },
  { label: "GitHub", value: "github.com/jose-torres123", href: "https://github.com/jose-torres123", icon: <Github className="size-6" />, color: "hover:border-secondary/50 hover:text-secondary" },
  { label: "LinkedIn", value: "jose-torres-ad13", href: "https://www.linkedin.com/in/jose-torres-ad13", icon: <Linkedin className="size-6" />, color: "hover:border-accent/50 hover:text-accent" },
  { label: "Location", value: "Lara, Venezuela", href: "#contact", icon: <MapPin className="size-6" />, color: "hover:border-amber/50 hover:text-amber" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ContactSection(): React.JSX.Element {
  const { t } = useI18n();

  return (
    <section id="contact" className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            {t.contact.title}{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t.contact.titleAccent}
            </span>
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">{t.contact.subtitle}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CONTACT_LINKS.map((link) => (
            <motion.a
              key={link.label}
              variants={cardVariants}
              href={link.href}
              target={link.href.startsWith("mailto:") || link.href.startsWith("#") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") || link.href.startsWith("#") ? undefined : "noopener noreferrer"}
              className={`group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all ${link.color}`}
            >
              <div className="text-muted-foreground transition-colors">
                {link.icon}
              </div>
              <span className="text-sm font-medium text-foreground">{link.label}</span>
              <span className="text-xs text-muted-foreground">{link.value}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="mailto:joseprox16@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-8 py-3 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl hover:shadow-primary/25"
          >
            <Mail className="size-4" />
            {t.contact.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
