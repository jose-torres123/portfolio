import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "../components/ThemeToggle.js";

const mockSetTheme = vi.fn();

vi.mock("@/lib/theme/index.js", () => ({
  useTheme: () => ({
    theme: "system" as const,
    resolved: "light" as const,
    setTheme: mockSetTheme,
  }),
}));

describe("ThemeToggle", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render three theme buttons", () => {
    render(<ThemeToggle />);

    expect(screen.getByLabelText("Light")).toBeInTheDocument();
    expect(screen.getByLabelText("System")).toBeInTheDocument();
    expect(screen.getByLabelText("Dark")).toBeInTheDocument();
  });

  it("should call setTheme with 'dark' when dark button is clicked", async () => {
    render(<ThemeToggle />);

    await user.click(screen.getByLabelText("Dark"));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("should call setTheme with 'light' when light button is clicked", async () => {
    render(<ThemeToggle />);

    await user.click(screen.getByLabelText("Light"));
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("should call setTheme with 'system' when system button is clicked", async () => {
    render(<ThemeToggle />);

    await user.click(screen.getByLabelText("System"));
    expect(mockSetTheme).toHaveBeenCalledWith("system");
  });
});
