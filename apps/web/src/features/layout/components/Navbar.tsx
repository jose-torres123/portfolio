import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/index.js";
import { LanguageSwitcher } from "./LanguageSwitcher.js";

const NAV_KEYS = ["home", "about", "projects", "skills", "experience", "contact"] as const;

const menuVariants = {
  closed: { opacity: 0, height: 0 },
  open: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } },
};

const linkVariants = {
  closed: { opacity: 0, x: -16 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.2 },
  }),
};

export function Navbar(): React.JSX.Element {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("#home");

  const navLinks = NAV_KEYS.map((key) => ({
    label: t.nav[key],
    href: `#${key === "home" ? "hero" : key}`,
  }));

  useEffect(() => {
    const sectionIds = NAV_KEYS.map((key) => (key === "home" ? "hero" : key));

    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        if (!sectionId) continue;
        const el = document.getElementById(sectionId);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(`#${sectionId}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = useCallback((href: string): void => {
    setMenuOpen(false);
    setActiveSection(href);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-shadow duration-300 backdrop-blur-lg ${
        scrolled
          ? "bg-background/80 shadow-lg shadow-primary/5"
          : "bg-background/50"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:py-4">
        <a
          href="#hero"
          className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent lg:text-2xl"
        >
          Jose
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setActiveSection(link.href)}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary"
                  />
                )}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <LanguageSwitcher />
          </li>
        </ul>

        {/* Mobile: switcher + toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-lg px-4 pb-4 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                variants={linkVariants}
                custom={i}
                initial="closed"
                animate="open"
              >
                <a
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeSection === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
