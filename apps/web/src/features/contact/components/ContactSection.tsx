import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/shared/components/brand-icons.js";
import { useI18n } from "@/lib/i18n/index.js";
import { ContactForm } from "./ContactForm.js";
import { Section, RevealText, HoverLink, fadeUp, stagger } from "@/shared/templates/index.js";

const SOCIAL_LINKS = [
  {
    label: "Email",
    value: "joseprox16@gmail.com",
    href: "mailto:joseprox16@gmail.com",
    Icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/jose-torres123",
    href: "https://github.com/jose-torres123",
    Icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    value: "jose-torres-ad13",
    href: "https://www.linkedin.com/in/jose-torres-ad13",
    Icon: LinkedInIcon,
  },
  {
    label: "Location",
    value: "Lara, Venezuela",
    href: "#contact",
    Icon: MapPin,
  },
] as const;

export function ContactSection(): React.JSX.Element {
  const { t } = useI18n();

  return (
    <Section id="contact" bordered>
      {/* Big editorial CTA */}
      <div className="mb-20 flex flex-col gap-10 md:mb-28">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          05 — {t.contact.title}
        </span>
        <h2 className="font-display text-[clamp(3rem,11vw,9rem)] leading-[0.9] tracking-[-0.04em] text-foreground">
          <RevealText as="span">{t.contact.titleAccent}</RevealText>
        </h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          {t.contact.subtitle}
        </motion.p>
      </div>

      <div className="grid gap-16 md:grid-cols-12 md:gap-20">
        {/* Left: socials list */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="flex flex-col md:col-span-5"
        >
          {SOCIAL_LINKS.map((link) => {
            const isExternal = !link.href.startsWith("mailto:") && !link.href.startsWith("#");
            return (
              <motion.li
                key={link.label}
                variants={fadeUp}
                className="border-t border-border last:border-b"
              >
                <a
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span className="flex items-center gap-4">
                    <link.Icon className="size-5 text-muted-foreground" />
                    <span className="flex flex-col">
                      <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        {link.label}
                      </span>
                      <span className="font-display text-xl text-foreground md:text-2xl">
                        {link.value}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Right: form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="md:col-span-7"
        >
          <ContactForm />
        </motion.div>
      </div>

      {/* Bonus: editorial inline CTA */}
      <div className="mt-24 border-t border-border pt-10">
        <HoverLink href="mailto:joseprox16@gmail.com" className="font-display text-2xl md:text-3xl">
          joseprox16@gmail.com
          <ArrowUpRight className="size-6" />
        </HoverLink>
      </div>
    </Section>
  );
}
