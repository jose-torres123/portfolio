import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "../components/HeroSection.js";

vi.mock("@/lib/i18n/index.js", () => ({
  useI18n: () => ({
    locale: "en" as const,
    setLocale: vi.fn(),
    t: {
      hero: {
        greeting: "Welcome to my portfolio",
        role: "Systems Engineer & Full Stack Developer",
        tagline: "I specialize in developing scalable web and mobile applications",
        viewProjects: "View Projects",
        contactMe: "Contact Me",
        downloadCV: "Download CV",
      },
    },
  }),
}));

vi.mock("motion/react", () => {
  const isMotionValue = (v: unknown): boolean =>
    typeof v === "object" && v !== null && "get" in v && typeof (v as { get: unknown }).get === "function";
  const sanitizeStyle = (style: unknown): Record<string, unknown> | undefined => {
    if (typeof style !== "object" || style === null) return style as undefined;
    return Object.fromEntries(
      Object.entries(style as Record<string, unknown>).filter(([, v]) => !isMotionValue(v)),
    );
  };
  const passthrough = (Tag: string) => {
    const Comp = ({
      children,
      ...props
    }: { children?: React.ReactNode } & Record<string, unknown>) => {
      const cleanProps = Object.fromEntries(
        Object.entries(props)
          .filter(
            ([k]) =>
              ![
                "variants",
                "initial",
                "animate",
                "whileInView",
                "whileHover",
                "viewport",
                "transition",
                "exit",
                "layoutId",
                "custom",
              ].includes(k),
          )
          .map(([k, v]) => (k === "style" ? [k, sanitizeStyle(v)] : [k, v])),
      );
      return React.createElement(Tag, cleanProps, children);
    };
    Comp.displayName = `motion.${Tag}`;
    return Comp;
  };
  const motionValue = (initial: number = 0) => {
    let value = initial;
    return {
      get: () => value,
      set: (v: number) => {
        value = v;
      },
      on: () => () => {},
    };
  };
  return {
    motion: new Proxy({} as Record<string, ReturnType<typeof passthrough>>, {
      get: (_t, prop: string) => passthrough(prop),
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useScroll: () => ({ scrollYProgress: motionValue(0), scrollY: motionValue(0) }),
    useTransform: () => motionValue(0),
    useSpring: () => motionValue(0),
    useMotionValue: (v: number = 0) => motionValue(v),
    useMotionValueEvent: () => {},
    useInView: () => true,
    useReducedMotion: () => false,
  };
});

vi.mock("@repo/ui", () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(" "),
}));

describe("HeroSection", () => {
  it("should render the heading with name", () => {
    render(<HeroSection />);
    expect(screen.getByText("José")).toBeInTheDocument();
    expect(screen.getByText("Torres")).toBeInTheDocument();
  });

  it("should render the greeting", () => {
    render(<HeroSection />);
    expect(screen.getAllByText("Welcome to my portfolio").length).toBeGreaterThan(0);
  });

  it("should render the role", () => {
    render(<HeroSection />);
    expect(screen.getByText("Systems Engineer & Full Stack Developer")).toBeInTheDocument();
  });

  it("should render the tagline", () => {
    render(<HeroSection />);
    expect(screen.getByText(/I specialize in developing/)).toBeInTheDocument();
  });

  it("should render CTA links", () => {
    render(<HeroSection />);
    const viewProjects = screen.getByText("View Projects");
    expect(viewProjects.closest("a")).toHaveAttribute("href", "#projects");

    const contactMe = screen.getByText("Contact Me");
    expect(contactMe.closest("a")).toHaveAttribute("href", "#contact");

    const cv = screen.getByText("Download CV");
    expect(cv.closest("a")).toHaveAttribute("href", "/cv-en.pdf");
  });

  it("should have the correct section id", () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector("#hero")).toBeInTheDocument();
  });
});
