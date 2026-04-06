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

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}));

describe("AboutSection", () => {
  it("should render the section title", () => {
    render(<AboutSection />);
    expect(screen.getByText("About")).toBeInTheDocument();
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
    expect(screen.getByText("7+")).toBeInTheDocument();
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
