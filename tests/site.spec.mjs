import { expect, test } from "@playwright/test";

const routes = [
  ["./", "人生进阶指南"],
  ["./en/", "Life Level-up Guide"],
  ["./threads/part-1/0-cefr", "CEFR"],
  ["./threads/part-1/7-ai", "用 AI 学英语"],
  ["./threads/archive/", "十年前的博客归档"],
];

for (const [route, heading] of routes) {
  test(`${route} renders`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1, name: new RegExp(heading) })).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });
}

test("page metadata follows the route", async ({ page }) => {
  await page.goto("./threads/part-1/2-vocabulary");
  await expect(page).toHaveTitle(/词汇篇/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /词汇/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://byoungd.github.io/up/threads/part-1/2-vocabulary/",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://byoungd.github.io/up/threads/part-1/2-vocabulary/",
  );
});

test("legacy Docsify hash route redirects once", async ({ page }) => {
  await page.goto("./#/threads/part-1/1-understanding");
  await expect(page).toHaveURL(/\/up\/threads\/part-1\/1-understanding$/);
  await expect(page.getByRole("heading", { level: 1, name: /认知篇/ })).toBeVisible();
});

test("local search opens and returns a result", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  const input = page.locator(".VPLocalSearchBox input");
  await expect(input).toBeVisible();
  await input.fill("主动回忆");
  await expect(page.getByText(/认知篇|词汇篇/).first()).toBeVisible();
});

test("language navigation and representative image work", async ({ page }) => {
  await page.goto("./projects");
  const image = page.getByRole("img", { name: /token\.love 产品页面存档/ });
  await expect(image).toBeVisible();
  await expect(image).toHaveJSProperty("complete", true);

  await page.goto("./en/");
  await expect(page.getByRole("heading", { level: 1, name: "Life Level-up Guide" })).toBeVisible();
  let englishLearning = page.getByRole("link", {
    name: "English Learning",
    exact: true,
  });
  if ((await englishLearning.count()) === 0) {
    await page.getByRole("button", { name: "mobile navigation" }).click();
    englishLearning = page.getByRole("link", {
      name: "English Learning",
      exact: true,
    });
  }
  await expect(englishLearning).toBeVisible();
});

test("keyboard focus reaches navigation", async ({ page }) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toBeVisible();
  await expect(focused).toHaveAttribute("href", /#VPContent|\/up\//);
});
