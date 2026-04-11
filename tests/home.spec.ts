import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("about page displays hero and content", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /世界のミカタ/i })
    ).toBeVisible();
  });

  test("subscribe page displays pricing", async ({ page }) => {
    await page.goto("/subscribe");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("about page has navigation links", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("navigation").getByRole("link", { name: /スポーツ/i })
    ).toBeVisible();
    await expect(
      page.getByRole("navigation").getByRole("link", { name: /経済/i })
    ).toBeVisible();
  });

  test("about page has signup CTA", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("link", { name: /始める/i })
    ).toBeVisible();
  });

  test("about page has footer", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
});
