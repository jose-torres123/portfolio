import React from "react";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "../components/ProjectCard.js";
import type { Project } from "../types/project.types.js";

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

vi.mock("@/shared/components/brand-icons.js", () => ({
  GitHubIcon: ({ className }: { className?: string }) => <svg data-testid="github-icon" className={className} />,
}));

vi.mock("@repo/ui", () => ({
  Card: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  CardFooter: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  Button: ({ children, asChild, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) => {
    if (asChild) return <>{children}</>;
    return <button {...props}>{children}</button>;
  },
}));

const baseProject: Project = {
  id: "1",
  title: "Test Project",
  description: "A great test project description",
  tags: ["React", "TypeScript", "Tailwind"],
  featured: true,
};

describe("ProjectCard", () => {
  it("should render project title", () => {
    render(<ProjectCard project={baseProject} index={0} />);
    expect(screen.getByRole("heading", { level: 3, name: "Test Project" })).toBeInTheDocument();
  });

  it("should render project description", () => {
    render(<ProjectCard project={baseProject} index={0} />);
    expect(screen.getByText("A great test project description")).toBeInTheDocument();
  });

  it("should render tags as badges", () => {
    render(<ProjectCard project={baseProject} index={0} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });

  it("should render GitHub link when github url is provided", () => {
    const project = { ...baseProject, github: "https://github.com/test/repo" };
    render(<ProjectCard project={project} index={0} />);

    const githubLink = screen.getByLabelText("GitHub repo for Test Project");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/test/repo");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("should render live demo link when live url is provided", () => {
    const project = { ...baseProject, live: "https://example.com" };
    render(<ProjectCard project={project} index={0} />);

    const liveLink = screen.getByLabelText("Live demo for Test Project");
    expect(liveLink).toBeInTheDocument();
    expect(liveLink).toHaveAttribute("href", "https://example.com");
    expect(liveLink).toHaveAttribute("target", "_blank");
  });

  it("should not render GitHub link when github is undefined", () => {
    render(<ProjectCard project={baseProject} index={0} />);
    expect(screen.queryByLabelText("GitHub repo for Test Project")).not.toBeInTheDocument();
  });

  it("should not render live link when live is undefined", () => {
    render(<ProjectCard project={baseProject} index={0} />);
    expect(screen.queryByLabelText("Live demo for Test Project")).not.toBeInTheDocument();
  });
});
