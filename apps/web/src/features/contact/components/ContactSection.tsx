import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/shared/components/brand-icons.js";
import { Card } from "@repo/ui";
import { useI18n } from "@/lib/i18n/index.js";
import { ContactForm } from "./ContactForm.js";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "joseprox16@gmail.com",
    href: "mailto:joseprox16@gmail.com",
    icon: <Mail className="size-6" />,
    hoverClass: "hover:border-primary/50 hover:text-primary",
  },
  {
    label: "GitHub",
    value: "github.com/jose-torres123",
    href: "https://github.com/jose-torres123",
    icon: <GitHubIcon className="size-6" />,
    hoverClass: "hover:border-secondary/50 hover:text-secondary",
  },
  {
    label: "LinkedIn",
    value: "jose-torres-ad13",
    href: "https://www.linkedin.com/in/jose-torres-ad13",
    icon: <LinkedInIcon className="size-6" />,
    hoverClass: "hover:border-accent/50 hover:text-accent",
  },
  {
    label: "Location",
    value: "Lara, Venezuela",
    href: "#contact",
    icon: <MapPin className="size-6" />,
    hoverClass: "hover:border-amber/50 hover:text-amber",
  },
] as const;

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
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t.contact.titleAccent}
            </span>
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">{t.contact.subtitle}</p>
        </motion.div>

        {/* Contact links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CONTACT_LINKS.map((link) => {
            const isExternal = !link.href.startsWith("mailto:") && !link.href.startsWith("#");
            return (
              <motion.a
                key={link.label}
                variants={cardVariants}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={`group ${link.hoverClass}`}
              >
                <Card className={`flex flex-col items-center gap-3 p-6 transition-all ${link.hoverClass}`}>
                  <div className="text-muted-foreground transition-colors group-hover:text-inherit">
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium text-foreground">{link.label}</span>
                  <span className="text-center text-xs text-muted-foreground">{link.value}</span>
                </Card>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
