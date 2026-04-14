import React from "react";
import { render, screen } from "@testing-library/react";
import { AboutSection } from "../components/AboutSection.js";

vi.mock("@/lib/i18n/index.js", () => ({
  useI18n: () => ({
    locale: "en" as const,
    setLocale: vi.fn(),
    t: {
      about: {
        title: "About",
        titleAccent: "Me",
        subtitle: "Get to know the person behind the code",
        bio1: "I specialize in developing scalable web and mobile applications.",
        bio2: "I possess a strong foundation in data structures and algorithms.",
        stats: {
          experience: "Years of Experience",
          projects: "Companies Worked At",
          coffee: "Cups of Coffee",
          countries: "Tech Stacks Mastered",
        },
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
      set: (v: number) => { value = v; },
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

describe("AboutSection", () => {
  it("should render the section title", () => {
    render(<AboutSection />);
    expect(screen.getByText(/About/)).toBeInTheDocument();
    expect(screen.getByText("Me")).toBeInTheDocument();
  });

  it("should render the subtitle", () => {
    render(<AboutSection />);
    expect(screen.getByText("Get to know the person behind the code")).toBeInTheDocument();
  });

  it("should render bio paragraphs", () => {
    render(<AboutSection />);
    expect(screen.getByText(/I specialize in developing scalable/)).toBeInTheDocument();
    expect(screen.getByText(/I possess a strong foundation/)).toBeInTheDocument();
  });

  it("should render stat values", () => {
    render(<AboutSection />);
    expect(screen.getByText("6+")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("∞")).toBeInTheDocument();
    expect(screen.getByText("3+")).toBeInTheDocument();
  });

  it("should render stat labels", () => {
    render(<AboutSection />);
    expect(screen.getByText("Years of Experience")).toBeInTheDocument();
    expect(screen.getByText("Companies Worked At")).toBeInTheDocument();
    expect(screen.getByText("Cups of Coffee")).toBeInTheDocument();
    expect(screen.getByText("Tech Stacks Mastered")).toBeInTheDocument();
  });

  it("should have the correct section id", () => {
    const { container } = render(<AboutSection />);
    const section = container.querySelector("#about");
    expect(section).toBeInTheDocument();
  });
});
