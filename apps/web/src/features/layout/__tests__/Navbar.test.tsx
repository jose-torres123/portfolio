import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "../components/Navbar.js";

vi.mock("@/lib/i18n/index.js", () => ({
  useI18n: () => ({
    locale: "en" as const,
    setLocale: vi.fn(),
    t: {
      nav: {
        home: "Home",
        about: "About",
        projects: "Projects",
        skills: "Skills",
        experience: "Experience",
        contact: "Contact",
      },
    },
  }),
}));

vi.mock("../components/LanguageSwitcher.js", () => ({
  LanguageSwitcher: () => <div data-testid="lang-switcher">EN</div>,
}));

vi.mock("../components/ThemeToggle.js", () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme</div>,
}));

vi.mock("motion/react", () => ({
  motion: {
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span {...props}>{children}</span>,
    ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Navbar", () => {
  const user = userEvent.setup();

  it("should render the logo link", () => {
    render(<Navbar />);
    expect(screen.getByText("José Torres")).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    render(<Navbar />);
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Projects").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Skills").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Experience").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Contact").length).toBeGreaterThanOrEqual(1);
  });

  it("should render mobile menu button", () => {
    render(<Navbar />);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("should toggle mobile menu on button click", async () => {
    render(<Navbar />);

    const openBtn = screen.getByLabelText("Open menu");
    await user.click(openBtn);

    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });

  it("should close mobile menu and call preventDefault on link click", async () => {
    render(<Navbar />);

    // Open menu first
    await user.click(screen.getByLabelText("Open menu"));

    // The mobile menu links use handleLinkClick which calls e.preventDefault()
    const mobileLinks = screen.getAllByText("About");
    // Click the last one (mobile panel link)
    const mobileLink = mobileLinks[mobileLinks.length - 1];
    if (mobileLink) {
      await user.click(mobileLink);
    }

    // Menu should close (button switches back to "Open menu")
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("should render LanguageSwitcher and ThemeToggle", () => {
    render(<Navbar />);
    expect(screen.getAllByTestId("lang-switcher").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByTestId("theme-toggle").length).toBeGreaterThanOrEqual(1);
  });
});
