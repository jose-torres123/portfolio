import { useEffect, useRef } from "react";
import Lenis from "lenis";
import type { ReactNode } from "react";

/**
 * Lenis smooth-scroll wrapper.
 * Adds buttery inertia scrolling while preserving native anchor-link behaviour.
 * Automatically disabled when prefers-reduced-motion is on.
 */
export function SmoothScroll({ children }: { children: ReactNode }): React.JSX.Element {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Support native anchor links (#about, #projects, etc.)
    function handleAnchorClick(e: MouseEvent): void {
      const target = (e.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;
      const id = (target as HTMLAnchorElement).getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -64 });
    }
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
