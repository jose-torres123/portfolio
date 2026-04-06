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
      },
    },
  }),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props}>{children}</p>,
  },
}));

vi.mock("@repo/ui", () => ({
  Button: ({ children, asChild, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) => {
    if (asChild) {
      // When asChild, render children directly (the <a> tag)
      return <>{children}</>;
    }
    return <button {...props}>{children}</button>;
  },
}));

describe("HeroSection", () => {
  it("should render the heading with name", () => {
    render(<HeroSection />);
    expect(screen.getByText("José Torres")).toBeInTheDocument();
  });

  it("should render the greeting", () => {
    render(<HeroSection />);
    expect(screen.getByText("Welcome to my portfolio")).toBeInTheDocument();
  });

  it("should render the role", () => {
    render(<HeroSection />);
    expect(screen.getByText("Systems Engineer & Full Stack Developer")).toBeInTheDocument();
  });

  it("should render the tagline", () => {
    render(<HeroSection />);
    expect(screen.getByText(/I specialize in developing/)).toBeInTheDocument();
  });

  it("should render CTA buttons as links", () => {
    render(<HeroSection />);
    const viewProjects = screen.getByText("View Projects");
    expect(viewProjects).toBeInTheDocument();
    expect(viewProjects.closest("a")).toHaveAttribute("href", "#projects");

    const contactMe = screen.getByText("Contact Me");
    expect(contactMe).toBeInTheDocument();
    expect(contactMe.closest("a")).toHaveAttribute("href", "#contact");
  });

  it("should have the correct section id", () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector("#hero")).toBeInTheDocument();
  });
});
