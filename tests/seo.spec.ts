import { test, expect } from "@playwright/test";

test.describe("SEO Infrastructure", () => {
  test("robots.txt returns 200 and contains rules", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("User-Agent");
    expect(body).toContain("Sitemap");
  });

  test("robots.txt allows AI bots", async ({ request }) => {
    const res = await request.get("/robots.txt");
    const body = await res.text();
    expect(body).toContain("GPTBot");
    expect(body).toContain("PerplexityBot");
    expect(body).toContain("ClaudeBot");
  });

  test("robots.txt disallows admin and api", async ({ request }) => {
    const res = await request.get("/robots.txt");
    const body = await res.text();
    expect(body).toContain("/admin");
    expect(body).toContain("/api/");
  });

  test("llms.txt is accessible and contains MIKATA info", async ({
    request,
  }) => {
    const res = await request.get("/llms.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("MIKATA");
    expect(body).toContain("multi-perspective");
  });

  test("about page has JSON-LD structured data", async ({ page }) => {
    await page.goto("/about");
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd.first()).toBeAttached();
    const content = await jsonLd.first().textContent();
    expect(content).toContain("NewsMediaOrganization");
  });

  test("about page has OG meta tags", async ({ page }) => {
    await page.goto("/about");
    const ogSiteName = page.locator('meta[property="og:site_name"]');
    await expect(ogSiteName).toHaveAttribute("content", "MIKATA");
  });
});
