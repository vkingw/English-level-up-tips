import { expect, test } from "@playwright/test";

const routes = [
  ["./", "AI 时代终身学习指南"],
  ["./en/", "Lifelong Learning Guide for the AI Era"],
  ["./threads/part-1/0-cefr", "CEFR"],
  ["./threads/part-1/7-ai", "用 AI 学英语"],
  ["./threads/part-3/1-ai-learning", "使用 AI 学习一切"],
  ["./threads/part-3/2-ai-development-and-resource-layer", "AI 学习、项目开发与资源层创业"],
  ["./templates/ai-task-brief", "AI 任务简报模板"],
  ["./templates/ai-learning-log", "AI 学习记录模板"],
  ["./templates/ai-case-review", "AI 经历案例复盘模板"],
  ["./templates/ai-project-scorecard", "AI 项目评分卡模板"],
  ["./en/threads/part-3/2-ai-development-and-resource-layer", "AI Learning, Project Development"],
  ["./en/threads/part-3/1-ai-learning", "Learning Anything with AI"],
  ["./en/templates/ai-task-brief", "AI Task Brief Template"],
  ["./en/templates/ai-learning-log", "AI Learning Log Template"],
  ["./en/templates/ai-case-review", "AI Case Review Template"],
  ["./en/templates/ai-project-scorecard", "AI Project Scorecard Template"],
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

test("home metadata follows the lifelong-learning positioning", async ({ page }) => {
  await page.goto("./");
  await expect(page).toHaveTitle(/AI 时代终身学习指南/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /AI 时代.*真实项目.*低谷/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://byoungd.github.io/up/",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "AI 时代终身学习指南",
  );

  await page.goto("./en/");
  await expect(page).toHaveTitle(/Lifelong Learning Guide for the AI Era/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /learning continuously.*AI era/i,
  );
});

test("AI resource-layer chapter has metadata and navigation", async ({ page }) => {
  await page.goto("./threads/part-3/2-ai-development-and-resource-layer");
  await expect(page).toHaveTitle(/AI 学习、项目开发与资源层创业/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /韩先凯.*AI 资源层创业/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://byoungd.github.io/up/threads/part-3/2-ai-development-and-resource-layer/",
  );
  await expect(
    page.getByRole("link", { name: "AI 开发与资源层创业", exact: true }).first(),
  ).toBeVisible();

  await page.goto("./en/threads/part-3/2-ai-development-and-resource-layer");
  await expect(page).toHaveTitle(/AI Learning, Project Development/);
  await expect(
    page.getByRole("link", {
      name: "AI Development and Resource-layer Business",
      exact: true,
    }).first(),
  ).toBeVisible();
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
  await input.fill("学习状态");
  await expect(page.getByText(/学习状态/).first()).toBeVisible();
});

test("language navigation and representative image work", async ({ page }) => {
  await page.goto("./projects");
  const image = page.getByRole("img", { name: /token\.love 产品页面存档/ });
  await expect(image).toBeVisible();
  await expect(image).toHaveJSProperty("complete", true);

  await page.goto("./en/");
  await expect(page.getByRole("heading", { level: 1, name: "Lifelong Learning Guide for the AI Era" })).toBeVisible();
  let lifelongLearning = page.getByRole("link", {
    name: "Lifelong Learning",
    exact: true,
  });
  if ((await lifelongLearning.count()) === 0) {
    await page.getByRole("button", { name: "mobile navigation" }).click();
    lifelongLearning = page.getByRole("link", {
      name: "Lifelong Learning",
      exact: true,
    });
  }
  await expect(lifelongLearning).toBeVisible();
});

test("home page shows the latest updates", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 2, name: "现实仍在继续" })).toBeVisible();
  await expect(page.getByRole("img", { name: "韩先凯与伴侣的合影" })).toBeVisible();
  await expect(page.getByRole("img", { name: "韩先凯在 Agentic DB 大会与读者合影" })).toBeVisible();
});

test("keyboard focus reaches navigation", async ({ page }) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toBeVisible();
  await expect(focused).toHaveAttribute("href", /#VPContent|\/up\//);
});
