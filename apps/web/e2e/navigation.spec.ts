import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders navbar with logo", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.getByRole("link", { name: "José Torres" }).first()).toBeVisible();
  });

  test("mobile menu toggle works", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const menuBtn = page.locator('[aria-label="Open menu"]');
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();
    await expect(page.locator('[aria-label="Close menu"]')).toBeVisible();
  });

  test("desktop nav links visible", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const nav = page.locator("nav ul").first();
    await expect(nav).toBeVisible();
  });

  test("clicking nav link scrolls to section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const aboutLink = page.locator('nav a:has-text("About")').first();
    await aboutLink.click();
    // Wait for smooth scroll
    await page.waitForTimeout(500);
    await expect(page.locator("#about")).toBeInViewport();
  });
});
