import { test, expect } from "@playwright/test";

test.describe("Content Pages", () => {
  test("perspectives page loads with heading", async ({ page }) => {
    await page.goto("/perspectives");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("about page loads with content sections", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /MIKATAとは/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /対象ジャンル/i })
    ).toBeVisible();
  });

  test("subscribe page loads with pricing content", async ({ page }) => {
    await page.goto("/subscribe");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("legal terms page loads", async ({ page }) => {
    await page.goto("/legal/terms");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("legal privacy page loads", async ({ page }) => {
    await page.goto("/legal/privacy");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
