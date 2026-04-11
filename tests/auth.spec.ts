import { test, expect } from "@playwright/test";

test.describe("Authentication Pages", () => {
  test("login page displays form elements", async ({ page }) => {
    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: /MIKATA/i })
    ).toBeVisible();
  });

  test("signup page displays form and free trial mention", async ({
    page,
  }) => {
    await page.goto("/signup");
    await expect(
      page.getByRole("heading", { name: /MIKATA/i })
    ).toBeVisible();
    await expect(page.getByText(/3ヶ月/i)).toBeVisible();
  });

  test("reset password page loads", async ({ page }) => {
    await page.goto("/reset-password");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
