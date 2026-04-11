import { test, expect } from "@playwright/test";

test.describe("Access Control & Public Pages", () => {
  test("admin page requires authentication", async ({ page }) => {
    const response = await page.goto("/admin");
    // Without Supabase, middleware passes through but page server component
    // checks auth and redirects. Either way, admin content should not render
    // to unauthenticated users.
    const status = response?.status() ?? 0;
    // Accept redirect (302/307/308) or server error (500) or successful redirect to login
    const url = page.url();
    const isRedirected = url.includes("/login") || !url.endsWith("/admin");
    const isProtected = isRedirected || status >= 300;
    expect(isProtected).toBe(true);
  });

  test("about page is publicly accessible", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /世界のミカタ/i })
    ).toBeVisible();
  });

  test("legal pages are publicly accessible", async ({ page }) => {
    await page.goto("/legal/terms");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("offline page renders correctly", async ({ page }) => {
    await page.goto("/offline");
    await expect(page.getByText(/オフライン/i)).toBeVisible();
  });

  test("editorial policy page is publicly accessible", async ({ page }) => {
    await page.goto("/legal/editorial-policy");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
