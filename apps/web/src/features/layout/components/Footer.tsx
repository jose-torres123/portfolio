import { Github, Linkedin, Twitter } from "lucide-react";
import { useI18n } from "@/lib/i18n/index.js";

const SOCIAL_LINKS: { label: string; href: string; icon: React.JSX.Element }[] = [
  { label: "GitHub", href: "https://github.com/jose", icon: <Github className="size-5" /> },
  { label: "LinkedIn", href: "https://linkedin.com/in/jose", icon: <Linkedin className="size-5" /> },
  { label: "Twitter", href: "https://twitter.com/jose", icon: <Twitter className="size-5" /> },
];

export function Footer(): React.JSX.Element {
  const { t } = useI18n();

  return (
    <footer className="relative mt-20 border-t border-border/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Jose. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60">{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
