import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
    await page.locator("#contact").scrollIntoViewIfNeeded();
  });

  test("form fields are present", async ({ page }) => {
    await expect(page.locator('input[id="contact-name"]')).toBeVisible();
    await expect(page.locator('input[id="contact-email"]')).toBeVisible();
    await expect(page.locator('input[id="contact-subject"]')).toBeVisible();
    await expect(page.locator('textarea[id="contact-message"]')).toBeVisible();
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    // Expect at least one validation error message to appear
    await expect(
      page.locator("text=/at least|required|Invalid/i").first(),
    ).toBeVisible({ timeout: 3000 });
  });

  test("submit button is present", async ({ page }) => {
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});
