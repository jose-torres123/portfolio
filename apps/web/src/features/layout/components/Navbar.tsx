import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/index.js";
import { LanguageSwitcher } from "./LanguageSwitcher.js";
import { ThemeToggle } from "./ThemeToggle.js";

const NAV_KEYS = ["home", "about", "projects", "skills", "experience", "contact"] as const;
const TOTAL = String(NAV_KEYS.length).padStart(2, "0");

const menuVariants = {
  closed: { opacity: 0, height: 0 },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const [sectionIndex, setSectionIndex] = useState(0);

  // Locks scroll-based detection briefly after a nav click so
  // intermediate sections don't override the target during Lenis animation
  const clickLockRef = useRef(false);

  const navLinks = NAV_KEYS.map((key) => ({
    label: t.nav[key],
    href: `#${key === "home" ? "hero" : key}`,
  }));

  useEffect(() => {
    const sectionIds = NAV_KEYS.map((key) => (key === "home" ? "hero" : key));

    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);

      if (clickLockRef.current) return;

      // Near bottom of page → activate last section (contact)
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
      if (atBottom) {
        const lastId = sectionIds[sectionIds.length - 1];
        if (lastId) {
          setActiveSection(`#${lastId}`);
          setSectionIndex(sectionIds.length - 1);
        }
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        if (sectionId === undefined) continue;
        const el = document.getElementById(sectionId);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(`#${sectionId}`);
          setSectionIndex(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); };
  }, []);

  const handleLinkClick = useCallback((href: string): void => {
    setMenuOpen(false);
    setActiveSection(href);

    const idx = NAV_KEYS.findIndex((k) => `#${k === "home" ? "hero" : k}` === href);
    if (idx !== -1) setSectionIndex(idx);

    // Lock scroll detection for the duration of the Lenis animation
    clickLockRef.current = true;
    setTimeout(() => { clickLockRef.current = false; }, 1400);
  }, []);

  const pastHero = scrolled && activeSection !== "#hero";

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        pastHero
          ? "border-b border-border bg-background/90 backdrop-blur-2xl"
          : "bg-background/50 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        {/* Logo + section counter */}
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            onClick={() => { handleLinkClick("#hero"); }}
            className="font-display text-base uppercase tracking-[0.15em] text-foreground"
          >
            José Torres
          </a>
          <AnimatePresence mode="wait">
            {pastHero && (
              <motion.span
                key={sectionIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:inline"
              >
                {String(sectionIndex + 1).padStart(2, "0")} / {TOTAL}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => { handleLinkClick(link.href); }}
                className={`relative font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                  activeSection === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 h-px w-full bg-foreground"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </a>
            </li>
          ))}
          <li className="ml-2 flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => { setMenuOpen((prev) => !prev); }}
            className="p-2 text-foreground transition-opacity hover:opacity-70"
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
            className="overflow-hidden border-t border-border bg-background px-6 pb-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                variants={linkVariants}
                custom={i}
                initial="closed"
                animate="open"
                className="border-b border-border last:border-b-0"
              >
                <a
                  href={link.href}
                  onClick={() => { handleLinkClick(link.href); }}
                  className={`flex items-center gap-3 py-4 font-display text-2xl tracking-tight ${
                    activeSection === link.href ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span className="font-mono text-xs text-muted-foreground/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
