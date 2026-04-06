import { render, screen } from "@testing-library/react";
import { ProjectCard } from "../components/ProjectCard.js";
import type { Project } from "../types/project.types.js";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}));

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
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("should render project description", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("A great test project description")).toBeInTheDocument();
  });

  it("should render tags as badges", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });

  it("should render GitHub link when github url is provided", () => {
    const project = { ...baseProject, github: "https://github.com/test/repo" };
    render(<ProjectCard project={project} />);

    const githubLink = screen.getByLabelText("GitHub repo for Test Project");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/test/repo");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("should render live demo link when live url is provided", () => {
    const project = { ...baseProject, live: "https://example.com" };
    render(<ProjectCard project={project} />);

    const liveLink = screen.getByLabelText("Live demo for Test Project");
    expect(liveLink).toBeInTheDocument();
    expect(liveLink).toHaveAttribute("href", "https://example.com");
    expect(liveLink).toHaveAttribute("target", "_blank");
  });

  it("should not render GitHub link when github is undefined", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.queryByLabelText("GitHub repo for Test Project")).not.toBeInTheDocument();
  });

  it("should not render live link when live is undefined", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.queryByLabelText("Live demo for Test Project")).not.toBeInTheDocument();
  });
});
