import { contactMessageSchema } from "../types/contact.schemas.js";

describe("contactMessageSchema", () => {
  const validData = {
    name: "José Torres",
    email: "jose@example.com",
    subject: "Hello there",
    message: "This is a valid message with at least 10 characters.",
  };

  it("should parse valid data successfully", () => {
    const result = contactMessageSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it("should reject name shorter than 2 characters", () => {
    const result = contactMessageSchema.safeParse({ ...validData, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Name must be at least 2 characters");
    }
  });

  it("should reject name longer than 100 characters", () => {
    const result = contactMessageSchema.safeParse({ ...validData, name: "A".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("should reject invalid email", () => {
    const result = contactMessageSchema.safeParse({ ...validData, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Invalid email address");
    }
  });

  it("should reject empty email", () => {
    const result = contactMessageSchema.safeParse({ ...validData, email: "" });
    expect(result.success).toBe(false);
  });

  it("should reject subject shorter than 3 characters", () => {
    const result = contactMessageSchema.safeParse({ ...validData, subject: "Hi" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Subject must be at least 3 characters");
    }
  });

  it("should reject subject longer than 150 characters", () => {
    const result = contactMessageSchema.safeParse({ ...validData, subject: "S".repeat(151) });
    expect(result.success).toBe(false);
  });

  it("should reject message shorter than 10 characters", () => {
    const result = contactMessageSchema.safeParse({ ...validData, message: "Short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Message must be at least 10 characters");
    }
  });

  it("should reject message longer than 2000 characters", () => {
    const result = contactMessageSchema.safeParse({ ...validData, message: "M".repeat(2001) });
    expect(result.success).toBe(false);
  });

  it("should reject completely empty object", () => {
    const result = contactMessageSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("should reject missing fields", () => {
    const result = contactMessageSchema.safeParse({ name: "José" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("email");
      expect(paths).toContain("subject");
      expect(paths).toContain("message");
    }
  });
});
