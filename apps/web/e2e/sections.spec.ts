import { test, expect } from "@playwright/test";

test.describe("Page Sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero section is visible", async ({ page }) => {
    await expect(page.locator("#hero")).toBeVisible();
  });

  test("about section is visible on scroll", async ({ page }) => {
    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect(page.locator("#about")).toBeVisible();
  });

  test("projects section is visible on scroll", async ({ page }) => {
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await expect(page.locator("#projects")).toBeVisible();
  });

  test("contact section is visible on scroll", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("page has correct title or heading", async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });

  test("footer is present", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });
});
