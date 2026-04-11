import { test, expect } from "@playwright/test";

test.describe("PWA Configuration", () => {
  test("manifest.json returns 200 and has required fields", async ({
    request,
  }) => {
    const res = await request.get("/manifest.json");
    expect(res.status()).toBe(200);
    const manifest = await res.json();
    expect(manifest.name).toContain("MIKATA");
    expect(manifest.short_name).toBe("MIKATA");
    expect(manifest.start_url).toBe("/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons).toBeDefined();
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
  });

  test("service worker file is accessible and has cache logic", async ({
    request,
  }) => {
    const res = await request.get("/sw.js");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("mikata-articles");
    expect(body).toContain("MAX_CACHED_ARTICLES");
    expect(body).toContain("addEventListener");
  });

  test("PWA icons are accessible", async ({ request }) => {
    const res192 = await request.get("/icons/icon-192x192.png");
    expect(res192.status()).toBe(200);
    const res512 = await request.get("/icons/icon-512x512.png");
    expect(res512.status()).toBe(200);
  });

  test("page includes service worker registration", async ({ page }) => {
    await page.goto("/about");
    const scripts = await page.locator("script").allTextContents();
    const hasSW = scripts.some((s) => s.includes("serviceWorker"));
    expect(hasSW).toBe(true);
  });

  test("manifest link is present in HTML head", async ({ page }) => {
    await page.goto("/about");
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute("href", "/manifest.json");
  });
});
