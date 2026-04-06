import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useSubmitContact } from "../hooks/useSubmitContact.js";

vi.mock("../services/contactService.js", () => ({
  submitContactMessage: vi.fn(),
}));

async function getServiceMock(): Promise<ReturnType<typeof vi.fn>> {
  const mod = await import("../services/contactService.js");
  return mod.submitContactMessage as ReturnType<typeof vi.fn>;
}

function createWrapper(): ({ children }: { children: ReactNode }) => React.JSX.Element {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }): React.JSX.Element {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

const validData = {
  name: "José Torres",
  email: "jose@example.com",
  subject: "Test subject",
  message: "This is a valid test message.",
};

describe("useSubmitContact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have correct initial state", () => {
    const { result } = renderHook(() => useSubmitContact(), { wrapper: createWrapper() });

    expect(result.current.mutate).toBeDefined();
    expect(result.current.isPending).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should call submitContactMessage on mutate", async () => {
    const mockService = await getServiceMock();
    mockService.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useSubmitContact(), { wrapper: createWrapper() });
    result.current.mutate(validData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockService).toHaveBeenCalledWith(validData, expect.anything());
  });

  it("should set isError on service failure", async () => {
    const mockService = await getServiceMock();
    mockService.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useSubmitContact(), { wrapper: createWrapper() });
    result.current.mutate(validData);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("Network error");
  });
});
