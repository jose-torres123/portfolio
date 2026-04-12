import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../components/ContactForm.js";

// --- Mocks ---

const mockMutate = vi.fn();
const mockReset = vi.fn();
let mockMutationState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  error: null as Error | null,
  reset: mockReset,
  mutate: mockMutate,
};

vi.mock("../hooks/useSubmitContact.js", () => ({
  useSubmitContact: () => mockMutationState,
}));

vi.mock("@/lib/i18n/index.js", () => ({
  useI18n: () => ({
    locale: "en" as const,
    setLocale: vi.fn(),
    t: {
      contact: {
        form: {
          name: "Name",
          namePlaceholder: "Your full name",
          email: "Email",
          emailPlaceholder: "your@email.com",
          subject: "Subject",
          subjectPlaceholder: "How can I help you?",
          message: "Message",
          messagePlaceholder: "Tell me about your project...",
          submit: "Send message",
          submitting: "Sending...",
          successTitle: "Message sent!",
          successMessage: "Thanks for reaching out.",
          errorTitle: "Something went wrong",
          errorMessage: "Failed to send your message.",
        },
      },
    },
  }),
}));

vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: React.HTMLAttributes<HTMLFormElement>) => (
      <form {...props}>{children}</form>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@repo/ui", () => ({
  Button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
  Textarea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} />,
  Label: ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props}>{children}</label>
  ),
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// --- Tests ---

describe("ContactForm", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    mockMutationState = {
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
      reset: mockReset,
      mutate: mockMutate,
    };
  });

  it("should render all form fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("should show validation errors on empty submit", async () => {
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    expect(screen.getByText(/subject must be at least 3 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
  });

  it("should call mutate with valid data on submit", async () => {
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "José Torres");
    await user.type(screen.getByLabelText("Email"), "jose@example.com");
    await user.type(screen.getByLabelText("Subject"), "Hello there");
    await user.type(screen.getByLabelText("Message"), "This is a valid test message.");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          name: "José Torres",
          email: "jose@example.com",
          subject: "Hello there",
          message: "This is a valid test message.",
        },
        expect.objectContaining({ onSuccess: expect.any(Function) as unknown }),
      );
    });
  });

  it("should show success state when mutation succeeds", () => {
    mockMutationState = { ...mockMutationState, isSuccess: true };
    render(<ContactForm />);

    expect(screen.getByText("Message sent!")).toBeInTheDocument();
    expect(screen.getByText("Thanks for reaching out.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send another/i })).toBeInTheDocument();
  });

  it("should show error banner when mutation fails", () => {
    mockMutationState = {
      ...mockMutationState,
      isError: true,
      error: new Error("Network error"),
    };
    render(<ContactForm />);

    expect(screen.getByText("Failed to send your message.")).toBeInTheDocument();
  });

  it("should disable submit button when isPending", () => {
    mockMutationState = { ...mockMutationState, isPending: true };
    render(<ContactForm />);

    const submitBtn = screen.getByRole("button", { name: /sending/i });
    expect(submitBtn).toBeDisabled();
  });

  it("should call mutation.reset when 'Send another' is clicked", async () => {
    mockMutationState = { ...mockMutationState, isSuccess: true };
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send another/i }));
    expect(mockReset).toHaveBeenCalled();
  });
});
