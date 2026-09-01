import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import { enNavigation, zhNavigation } from "../docs/.vitepress/navigation.mjs";

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const headingFromSource = (source) => {
  const file = resolve(process.cwd(), "docs", source);
  const heading = readFileSync(file, "utf8").match(/^# (.+)$/m)?.[1];
  if (!heading) throw new Error(`导航 source 缺少一级标题: ${source}`);
  return heading;
};

const routesFromNavigation = (groups) =>
  groups.flatMap(({ items }) =>
    items.map(({ link, source }) => [link === "/" ? "./" : `.${link}`, headingFromSource(source)]),
  );

const routes = [...routesFromNavigation(zhNavigation), ...routesFromNavigation(enNavigation)];
const expectedBuildRevision = process.env.GITHUB_SHA || process.env.BUILD_REVISION || "local";

test("book structure leads with the reader guide", () => {
  const zhBook = zhNavigation.find(({ text }) => text === "书稿结构");
  const enBook = enNavigation.find(({ text }) => text === "Book Structure");
  expect(zhBook?.items.slice(0, 2).map(({ source }) => source)).toEqual([
    "threads/part-0/reader-guide.md",
    "threads/part-0/prologue.md",
  ]);
  expect(enBook?.items.slice(0, 2).map(({ source }) => source)).toEqual([
    "en/threads/part-0/reader-guide.md",
    "en/threads/part-0/prologue.md",
  ]);
});

test("life-review chapters move from story through echoes into recovery", () => {
  const zhPractice = zhNavigation.find(({ text }) => text === "实践、复盘与恢复");
  const enPractice = enNavigation.find(({ text }) => text === "Practice, Review, and Recovery");
  expect(zhPractice?.items.slice(0, 4).map(({ source }) => source)).toEqual([
    "threads/part-2/my-story.md",
    "threads/part-2/narrative-and-evidence.md",
    "threads/part-2/x-misc.md",
    "threads/part-2/recovery.md",
  ]);
  expect(enPractice?.items.slice(0, 4).map(({ source }) => source)).toEqual([
    "en/threads/part-4/my-story.md",
    "en/threads/part-2/narrative-and-evidence.md",
    "en/threads/part-2/x-misc.md",
    "en/threads/part-2/recovery.md",
  ]);
});

test("practice chapters move from the first week into systems and rhythm", () => {
  const zhPractice = zhNavigation.find(({ text }) => text === "实践、复盘与恢复");
  const enPractice = enNavigation.find(({ text }) => text === "Practice, Review, and Recovery");
  expect(zhPractice?.items.slice(-3).map(({ source }) => source)).toEqual([
    "threads/part-4/week-1.md",
    "threads/part-4/daily-system.md",
    "threads/part-4/rhythm-and-compounding.md",
  ]);
  expect(enPractice?.items.slice(-3).map(({ source }) => source)).toEqual([
    "en/threads/part-4/week-1.md",
    "en/threads/part-4/daily-system.md",
    "en/threads/part-4/rhythm-and-compounding.md",
  ]);
});

for (const [route, heading] of routes) {
  test(`${route} renders`, async ({ page }) => {
    await page.goto(route);
    await expect(
      page.getByRole("heading", { level: 1, name: new RegExp(escapeRegExp(heading)) }),
    ).toBeVisible();
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
  await expect(page).toHaveTitle(/人生进阶指南/);
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
    "人生进阶指南｜AI 时代终身学习",
  );
  await expect(page.locator('meta[name="build-revision"]')).toHaveAttribute(
    "content",
    expectedBuildRevision,
  );

  await page.goto("./en/");
  await expect(page).toHaveTitle(/Life Level-up Guide/);
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
  await expect(page.getByRole("heading", { level: 1, name: "Life Level-up Guide" })).toBeVisible();
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

test("home pages link to the reader guide", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("link", { name: "阅读指南", exact: true }).first()).toBeVisible();

  await page.goto("./en/");
  await expect(page.getByRole("link", { name: "Reader's Guide", exact: true }).first()).toBeVisible();
});

test("home pages expose biezou as a bounded external AI reference", async ({ page }) => {
  await page.goto("./");
  const zhBiezou = page.locator('a[href="https://biezou.com/"]').first();
  await expect(zhBiezou).toBeVisible();
  await expect(zhBiezou).toHaveAttribute("target", "_blank");
  await expect(zhBiezou).toHaveAttribute("rel", /noopener/);

  await page.goto("./en/");
  const enBiezou = page.locator('a[href="https://biezou.com/"]').first();
  await expect(enBiezou).toBeVisible();
  await expect(enBiezou).toHaveAttribute("target", "_blank");
  await expect(enBiezou).toHaveAttribute("rel", /noopener/);
});

test("home pages explain per-entry product verification dates", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByText(/产品与服务条目的核验日期以各自页面/)).toBeVisible();

  await page.goto("./en/");
  await expect(page.getByText(/Check dates for product and service entries are recorded per page/)).toBeVisible();
});

test("evidence chapter hands off to practice and action", async ({ page }) => {
  await page.goto("./threads/part-3/5-evidence-and-transfer");
  const zhMain = page.locator("main");
  await expect(
    zhMain.getByRole("link", { name: "AI 开发与资源层创业", exact: true }),
  ).toBeVisible();
  await expect(
    zhMain.getByRole("link", { name: "行动篇：九十天，把生活交还给自己", exact: true }),
  ).toBeVisible();

  await page.goto("./en/threads/part-3/5-evidence-and-transfer");
  const enMain = page.locator("main");
  await expect(
    enMain.getByRole("link", { name: "AI Development and Resource-layer Business", exact: true }),
  ).toBeVisible();
  await expect(
    enMain.getByRole("link", { name: "90-Day Action Plan", exact: true }),
  ).toBeVisible();
});

test("rhythm chapter bridges the daily system and 90-day plan", async ({ page }) => {
  await page.goto("./threads/part-4/rhythm-and-compounding");
  const zhMain = page.locator("main");
  await expect(zhMain.getByRole("heading", { level: 2, name: "四种会复利的东西" })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "术语与方法索引", exact: true })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "节律账本模板", exact: true })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "九十天行动篇", exact: true }).first()).toBeVisible();

  await page.goto("./en/threads/part-4/rhythm-and-compounding");
  const enMain = page.locator("main");
  await expect(enMain.getByRole("heading", { level: 2, name: "Four Things That Compound" })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Glossary of Terms and Methods", exact: true })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Rhythm Ledger Template", exact: true })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "90-Day Action Plan", exact: true }).first()).toBeVisible();
});

test("toolkit overview routes readers by problem", async ({ page }) => {
  await page.goto("./templates/toolkit");
  const zhMain = page.locator("main");
  await expect(zhMain.getByRole("heading", { level: 2, name: "先回答：我现在卡在哪里？" })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "学习状态", exact: true }).first()).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "节律账本", exact: true }).first()).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "生活进阶工作表", exact: true })).toBeVisible();

  await page.goto("./en/templates/toolkit");
  const enMain = page.locator("main");
  await expect(enMain.getByRole("heading", { level: 2, name: "First Ask: Where Am I Stuck?" })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Learning State", exact: true }).first()).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Rhythm Ledger", exact: true }).first()).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Life Practice Toolkit", exact: true })).toBeVisible();
});

test("evidence chain template preserves comparable stages", async ({ page }) => {
  await page.goto("./templates/evidence-chain");
  const zhMain = page.locator("main");
  await expect(zhMain.getByRole("heading", { level: 2, name: "保存未经修饰的基线" })).toBeVisible();
  await expect(zhMain.getByRole("heading", { level: 2, name: "做一次延迟保持" })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "证据篇：变化要如何被看见", exact: true })).toBeVisible();

  await page.goto("./en/templates/evidence-chain");
  const enMain = page.locator("main");
  await expect(enMain.getByRole("heading", { level: 2, name: "Save an Unaided Baseline" })).toBeVisible();
  await expect(enMain.getByRole("heading", { level: 2, name: "Test Delayed Retention" })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Evidence: How Change Becomes Visible", exact: true })).toBeVisible();
});

test("reader guide routes return visits to the right tools", async ({ page }) => {
  await page.goto("./threads/part-0/reader-guide");
  const zhMain = page.locator("main");
  await expect(zhMain.getByRole("link", { name: "证据链模板", exact: true }).first()).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "工具箱总览", exact: true }).first()).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "节律账本", exact: true }).first()).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "证据篇", exact: true }).first()).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "节律", exact: true }).first()).toBeVisible();

  await page.goto("./en/threads/part-0/reader-guide");
  const enMain = page.locator("main");
  await expect(enMain.getByRole("link", { name: "Evidence Chain Template", exact: true }).first()).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Toolkit Overview", exact: true }).first()).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Rhythm Ledger", exact: true }).first()).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Evidence", exact: true }).first()).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Rhythm", exact: true }).first()).toBeVisible();
});

test("echoes chapter separates harm, responsibility, and the next choice", async ({ page }) => {
  await page.goto("./threads/part-2/x-misc");
  const zhMain = page.locator("main");
  await expect(
    zhMain.getByRole("heading", { level: 1, name: "回声篇：不要把逃避写成浪漫" }),
  ).toBeVisible();
  await expect(zhMain.getByText(/暴力不是教育，我不该被伤害/)).toBeVisible();
  await expect(zhMain.getByRole("heading", { level: 2, name: "给旧故事一张新的读法" })).toBeVisible();
  await expect(
    zhMain.getByRole("link", { name: "恢复篇：先把自己接住", exact: true }).first(),
  ).toBeVisible();

  await page.goto("./en/threads/part-2/x-misc");
  const enMain = page.locator("main");
  await expect(
    enMain.getByRole("heading", { level: 1, name: "Echoes: Do Not Romanticise Avoidance" }),
  ).toBeVisible();
  await expect(enMain.getByText(/violence is not education, and I should not have been hurt/i)).toBeVisible();
  await expect(enMain.getByRole("heading", { level: 2, name: "Give an Old Story a New Reading" })).toBeVisible();
  await expect(
    enMain
      .getByRole("link", { name: "Recovery: Catch Yourself Before You Push Forward", exact: true })
      .first(),
  ).toBeVisible();
});

test("first-week practice turns a baseline into a reviewable next step", async ({ page }) => {
  await page.goto("./threads/part-4/week-1");
  const zhMain = page.locator("main");
  await expect(
    zhMain.getByRole("heading", { level: 1, name: "实践篇：先把第一周过完" }),
  ).toBeVisible();
  await expect(
    zhMain.getByRole("heading", { level: 2, name: "七天不求满格，只求能够回来" }),
  ).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "证据链模板", exact: true })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "每周复盘模板", exact: true })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "生活系统篇", exact: true })).toBeVisible();

  await page.goto("./en/threads/part-4/week-1");
  const enMain = page.locator("main");
  await expect(
    enMain.getByRole("heading", { level: 1, name: "Practice: Finish the First Week" }),
  ).toBeVisible();
  await expect(
    enMain.getByRole("heading", {
      level: 2,
      name: "Across Seven Days, Practise Returning Rather Than Being Perfect",
    }),
  ).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Evidence Chain Template", exact: true })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Weekly Review Template", exact: true })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Daily System", exact: true })).toBeVisible();
});

test("afterword closes the book with a return path", async ({ page }) => {
  await page.goto("./threads/part-6/afterword");
  const zhMain = page.locator("main");
  await expect(zhMain.getByRole("heading", { level: 2, name: "给未来的读者" })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "工具箱总览", exact: true })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "证据链模板", exact: true })).toBeVisible();

  await page.goto("./en/threads/part-6/afterword");
  const enMain = page.locator("main");
  await expect(enMain.getByRole("heading", { level: 2, name: "To the Reader Ahead" })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Toolkit Overview", exact: true })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Evidence Chain Template", exact: true })).toBeVisible();
});

test("prologue contract points to the current toolkit", async ({ page }) => {
  await page.goto("./threads/part-0/prologue");
  const zhMain = page.locator("main");
  await expect(zhMain.getByRole("link", { name: "证据链模板", exact: true }).first()).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "工具箱总览", exact: true }).first()).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "节律账本", exact: true }).first()).toBeVisible();

  await page.goto("./en/threads/part-0/prologue");
  const enMain = page.locator("main");
  await expect(enMain.getByRole("link", { name: "Evidence Chain Template", exact: true }).first()).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Toolkit Overview", exact: true }).first()).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Rhythm Ledger", exact: true }).first()).toBeVisible();
});

test("foundation chapters hand off to the shared evidence chain", async ({ page }) => {
  await page.goto("./threads/part-1/0-cefr");
  await expect(page.locator("main").getByRole("link", { name: "证据链模板", exact: true }).first()).toBeVisible();
  await page.goto("./threads/part-1/7-ai");
  await expect(page.locator("main").getByRole("link", { name: "证据链模板", exact: true }).first()).toBeVisible();

  await page.goto("./en/threads/part-1/0-cefr");
  await expect(page.locator("main").getByRole("link", { name: "Evidence Chain Template", exact: true }).first()).toBeVisible();
  await page.goto("./en/threads/part-1/7-ai");
  await expect(page.locator("main").getByRole("link", { name: "Evidence Chain Template", exact: true }).first()).toBeVisible();
});

test("weekly review explains the handover between core records", async ({ page }) => {
  await page.goto("./templates/weekly-review");
  const zhMain = page.locator("main");
  await expect(zhMain.getByRole("heading", { level: 2, name: "写回后的交接入口" })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "证据链模板", exact: true })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "节律账本", exact: true })).toBeVisible();

  await page.goto("./en/templates/weekly-review");
  const enMain = page.locator("main");
  await expect(enMain.getByRole("heading", { level: 2, name: "Handover Links" })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Evidence Chain Template", exact: true })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Rhythm Ledger", exact: true })).toBeVisible();
});

test("90-day planning connects gates, evidence, and rhythm", async ({ page }) => {
  await page.goto("./templates/90-day-cycle");
  const zhMain = page.locator("main");
  await expect(zhMain.getByRole("link", { name: "证据链模板", exact: true }).first()).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "节律账本", exact: true }).first()).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "学习状态", exact: true }).first()).toBeVisible();

  await page.goto("./en/templates/90-day-cycle");
  const enMain = page.locator("main");
  await expect(enMain.getByRole("link", { name: "Evidence Chain Template", exact: true }).first()).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Rhythm Ledger", exact: true }).first()).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Learning State", exact: true }).first()).toBeVisible();
});

test("English chrome uses English labels and author metadata", async ({ page }, testInfo) => {
  await page.goto("./en/threads/part-1/0-cefr");
  await expect(page.locator('meta[name="author"]')).toHaveAttribute(
    "content",
    /Han Xiankai.*Li Pu/,
  );
  await expect(page.locator("#doc-outline-aria-label")).toHaveText("On this page");
  await expect(page.locator(".VPLastUpdated")).toContainText("Last updated");
  if (testInfo.project.name === "mobile-chromium") {
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
    await expect(page.getByRole("button", { name: "On this page" })).toBeVisible();
  } else {
    await expect(page.getByRole("button", { name: "Change language" })).toBeVisible();
  }
});

test("private session asset is never publicly served", async ({ request }) => {
  const response = await request.get("assets/session.json");
  expect(response.status()).toBe(404);
});

test("representative pages load every local image with descriptive alt text", async ({ page }) => {
  const routes = [
    "./",
    "./en/",
    "./projects",
    "./en/projects",
    "./threads/part-1/5-speaking",
    "./en/threads/part-1/5-speaking",
    "./threads/part-1/6-writing",
    "./en/threads/part-1/6-writing",
    "./threads/part-2/entrepreneurship",
    "./en/threads/part-2/entrepreneurship",
    "./threads/part-2/my-story",
    "./en/threads/part-4/my-story",
  ];

  for (const route of routes) {
    await page.goto(route);
    const images = page.locator("main img");
    const count = await images.count();
    expect(count, `${route} should contain at least one image`).toBeGreaterThan(0);
    for (let index = 0; index < count; index += 1) {
      const image = images.nth(index);
      await expect(image).toHaveJSProperty("complete", true);
      await expect(image).toHaveAttribute("alt", /\S+/);
      await expect.poll(() => image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
    }
  }
});

test("keyboard focus reaches navigation", async ({ page }) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toBeVisible();
  await expect(focused).toHaveAttribute("href", /#VPContent|\/up\//);
});
