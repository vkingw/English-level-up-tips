import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import {
  bilingualRoutePairs,
  enNavigation,
  toSidebar,
  zhNavigation,
} from "../docs/.vitepress/navigation.mjs";

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const headingFromSource = (source) => {
  const file = resolve(process.cwd(), "docs", source);
  const heading = readFileSync(file, "utf8").match(/^# (.+)$/m)?.[1];
  if (!heading) throw new Error(`导航 source 缺少一级标题: ${source}`);
  return heading;
};

const structuredDataFromPage = async (page) =>
  JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());

const routesFromNavigation = (groups) =>
  groups.flatMap(({ items }) =>
    items.map(({ link, source }) => [link === "/" ? "./" : `.${link}`, headingFromSource(source)]),
  );

const routes = [...routesFromNavigation(zhNavigation), ...routesFromNavigation(enNavigation)];
const expectedBuildRevision = process.env.GITHUB_SHA || process.env.BUILD_REVISION || "local";

test("start here leads from the home page into the reader guide and prologue", () => {
  const zhStart = zhNavigation.find(({ text }) => text === "开始");
  const enStart = enNavigation.find(({ text }) => text === "Start Here");
  expect(zhStart?.items.slice(0, 3).map(({ source }) => source)).toEqual([
    "README.md",
    "threads/part-0/reader-guide.md",
    "threads/part-0/prologue.md",
  ]);
  expect(enStart?.items.slice(0, 3).map(({ source }) => source)).toEqual([
    "en/README.md",
    "en/threads/part-0/reader-guide.md",
    "en/threads/part-0/prologue.md",
  ]);
});

test("navigation follows the five-part book arc", () => {
  expect(zhNavigation.slice(1, 7).map(({ text }) => text)).toEqual([
    "第一部：打开输入",
    "第二部：把自己放回生活",
    "第三部：借工具放大能力",
    "第四部：实践与恢复",
    "第五部：行动与长期改变",
    "后记",
  ]);
  expect(enNavigation.slice(1, 7).map(({ text }) => text)).toEqual([
    "Part I: Open Input",
    "Part II: Return to Life",
    "Part III: Amplify Ability",
    "Part IV: Practice and Recovery",
    "Part V: Long-Term Action",
    "Afterword",
  ]);
});

test("every part opens with a bilingual introduction", () => {
  expect(zhNavigation.slice(1, 6).map(({ items }) => items[0].source)).toEqual([
    "threads/part-1/open-input.md",
    "threads/part-2/return-to-life.md",
    "threads/part-3/amplify-ability.md",
    "threads/part-4/practice-and-recovery.md",
    "threads/part-5/long-term-action.md",
  ]);
  expect(enNavigation.slice(1, 6).map(({ items }) => items[0].source)).toEqual([
    "en/threads/part-1/open-input.md",
    "en/threads/part-2/return-to-life.md",
    "en/threads/part-3/amplify-ability.md",
    "en/threads/part-4/practice-and-recovery.md",
    "en/threads/part-5/long-term-action.md",
  ]);
});

test("every public navigation route has one bilingual counterpart", () => {
  const zhRoutes = zhNavigation.flatMap(({ items }) => items.map(({ link }) => link.replace(/^\/+|\/+$/g, "")));
  const enRoutes = enNavigation.flatMap(({ items }) => items.map(({ link }) => link.replace(/^\/+|\/+$/g, "")));
  expect(bilingualRoutePairs).toHaveLength(zhRoutes.length);
  expect(bilingualRoutePairs.map(({ zh }) => zh)).toEqual(zhRoutes);
  expect(bilingualRoutePairs.map(({ en }) => en).sort()).toEqual(enRoutes.sort());
});

test("reference collections follow the book and stay collapsed by default", () => {
  expect(zhNavigation.slice(7).map(({ text }) => text)).toEqual(["工具箱", "旧文归档", "词表"]);
  expect(enNavigation.slice(7).map(({ text }) => text)).toEqual(["Toolkit", "Archive", "Word Lists"]);
  expect(toSidebar(zhNavigation).slice(0, 7).every(({ collapsed }) => collapsed === false)).toBe(true);
  expect(toSidebar(zhNavigation).slice(7).every(({ collapsed }) => collapsed === true)).toBe(true);
  expect(toSidebar(enNavigation).slice(0, 7).every(({ collapsed }) => collapsed === false)).toBe(true);
  expect(toSidebar(enNavigation).slice(7).every(({ collapsed }) => collapsed === true)).toBe(true);
});

test("life-review chapters move from story through echoes into recovery", () => {
  const zhPractice = zhNavigation.find(({ text }) => text === "第二部：把自己放回生活");
  const enPractice = enNavigation.find(({ text }) => text === "Part II: Return to Life");
  expect(zhPractice?.items.slice(1, 5).map(({ source }) => source)).toEqual([
    "threads/part-2/my-story.md",
    "threads/part-2/narrative-and-evidence.md",
    "threads/part-2/x-misc.md",
    "threads/part-2/recovery.md",
  ]);
  expect(enPractice?.items.slice(1, 5).map(({ source }) => source)).toEqual([
    "en/threads/part-2/my-story.md",
    "en/threads/part-2/narrative-and-evidence.md",
    "en/threads/part-2/x-misc.md",
    "en/threads/part-2/recovery.md",
  ]);
});

test("practice chapters move from the first week into systems and rhythm", () => {
  const zhPractice = zhNavigation.find(({ text }) => text === "第四部：实践与恢复");
  const enPractice = enNavigation.find(({ text }) => text === "Part IV: Practice and Recovery");
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

test("long-term action moves from a 90-day cycle into handover before the afterword", () => {
  const zhAction = zhNavigation.find(({ text }) => text === "第五部：行动与长期改变");
  const enAction = enNavigation.find(({ text }) => text === "Part V: Long-Term Action");
  expect(zhAction?.items.map(({ source }) => source)).toEqual([
    "threads/part-5/long-term-action.md",
    "threads/part-5/90-day-plan.md",
    "threads/part-5/after-90-days.md",
  ]);
  expect(enAction?.items.map(({ source }) => source)).toEqual([
    "en/threads/part-5/long-term-action.md",
    "en/threads/part-5/90-day-plan.md",
    "en/threads/part-5/after-90-days.md",
  ]);
});

test("main book chapters leave continuous reading to the authoritative pager", () => {
  const manualPager = /^(?:(?:上一篇|下一篇|下一部|返回首页)[：:]|(?:Prev|Previous|Next|Next Part|Back to the home page):)/m;
  const sources = [...zhNavigation.slice(1, 7), ...enNavigation.slice(1, 7)]
    .flatMap(({ items }) => items.map(({ source }) => source))
    .filter((source) => /(?:^|\/)threads\/part-[0-6]\//.test(source) || /^(?:en\/)?projects\.md$/.test(source));

  for (const source of sources) {
    const text = readFileSync(resolve(process.cwd(), "docs", source), "utf8");
    expect(text, source).not.toMatch(manualPager);
  }
});

test("Part I core chapters end with a bilingual literary closing", () => {
  const zhPart = zhNavigation.find(({ text }) => text === "第一部：打开输入");
  const enPart = enNavigation.find(({ text }) => text === "Part I: Open Input");
  const cases = [
    ...(zhPart?.items.slice(1).map(({ source }) => ({ source, ending: /^结语[：:]/ })) || []),
    ...(enPart?.items.slice(1).map(({ source }) => ({ source, ending: /^Closing(?:[:：]|$)/ })) || []),
  ];

  expect(cases).toHaveLength(16);
  for (const { source, ending } of cases) {
    const text = readFileSync(resolve(process.cwd(), "docs", source), "utf8");
    const headings = [...text.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
    expect(headings.at(-1), source).toMatch(ending);
  }
});

test("key story, narrative, entrepreneurship, and AI chapters end on their literary movement", () => {
  const cases = [
    ["threads/part-2/my-story.md", "结语：重来不是凯旋"],
    ["en/threads/part-2/my-story.md", "Closing: Starting Again Is Not a Triumph"],
    ["threads/part-2/narrative-and-evidence.md", "结语：让故事回到生活"],
    ["en/threads/part-2/narrative-and-evidence.md", "Closing: Let the Story Return to Life"],
    ["threads/part-2/entrepreneurship.md", "结语：让野心经过现实"],
    ["en/threads/part-2/entrepreneurship.md", "Closing: Let Ambition Pass Through Reality"],
    ["threads/part-3/1-ai-learning.md", "结语：把能力留在人身上"],
    ["en/threads/part-3/1-ai-learning.md", "Closing: Keep the Ability with the Person"],
  ];

  for (const [source, ending] of cases) {
    const text = readFileSync(resolve(process.cwd(), "docs", source), "utf8");
    const headings = [...text.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
    expect(headings.at(-1), source).toBe(ending);
  }
});

test("the entrepreneurship chapter advances through scenes instead of stacked binary contrasts", () => {
  const text = readFileSync(
    resolve(process.cwd(), "docs/threads/part-2/entrepreneurship.md"),
    "utf8",
  );
  const contrastMarkers = ["不是", "而是", "真正"].reduce(
    (total, marker) => total + (text.match(new RegExp(marker, "g")) || []).length,
    0,
  );
  expect(contrastMarkers).toBeLessThanOrEqual(8);
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
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/assets\/feature\.png$/);
  await expect(page.locator('meta[property="og:image:type"]')).toHaveAttribute("content", "image/png");
  await expect(page.locator('link[rel="alternate"][hreflang="zh-CN"]')).toHaveAttribute(
    "href",
    "https://byoungd.github.io/up/threads/part-1/2-vocabulary/",
  );
  await expect(page.locator('link[rel="alternate"][hreflang="en-US"]')).toHaveAttribute(
    "href",
    "https://byoungd.github.io/up/en/threads/part-1/2-vocabulary/",
  );
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
    "href",
    "https://byoungd.github.io/up/threads/part-1/2-vocabulary/",
  );
  const chapterData = await structuredDataFromPage(page);
  expect(chapterData).toMatchObject({
    "@context": "https://schema.org",
    "@type": "Chapter",
    inLanguage: "zh-CN",
    author: { "@type": "Person", name: "韩先凯" },
    isPartOf: { "@type": "Book", name: "人生进阶指南", url: "https://byoungd.github.io/up/" },
  });
  expect(chapterData.dateModified).toBe("2026-09-01");
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
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "book");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/assets\/feature\.png$/);
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", /书籍分享封面/);
  await expect(page.locator('meta[name="build-revision"]')).toHaveAttribute(
    "content",
    expectedBuildRevision,
  );
  const zhBookData = await structuredDataFromPage(page);
  expect(zhBookData).toMatchObject({
    "@context": "https://schema.org",
    "@type": "Book",
    name: "人生进阶指南",
    alternateName: "Life Level-up Guide",
    bookFormat: "https://schema.org/EBook",
    inLanguage: "zh-CN",
    author: { "@type": "Person", name: "韩先凯" },
  });

  await page.goto("./en/");
  await expect(page).toHaveTitle(/Life Level-up Guide/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://byoungd.github.io/up/en/",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /learning continuously.*AI era/i,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/assets\/feature-en\.png$/);
  const enBookData = await structuredDataFromPage(page);
  expect(enBookData).toMatchObject({
    "@type": "Book",
    name: "Life Level-up Guide",
    alternateName: "人生进阶指南",
    inLanguage: "en-US",
    author: { "@type": "Person", name: "Han Xiankai" },
  });
});

test("brand and social assets load at their declared dimensions", async ({ page, request }) => {
  await page.goto("./");
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", "/up/assets/logo.svg");
  for (const path of ["assets/feature.png", "assets/feature-en.png"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    const dimensions = await page.evaluate(
      (source) =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
          image.onerror = reject;
          image.src = source;
        }),
      `./${path}`,
    );
    expect(dimensions).toEqual({ width: 1200, height: 630 });
  }

  const logo = await page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
        image.onerror = reject;
        image.src = "./assets/logo.svg";
      }),
  );
  expect(logo).toEqual({ width: 48, height: 48 });

  const sitemapResponse = await request.get("sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain('hreflang="zh-CN" href="https://byoungd.github.io/up/threads/part-1/2-vocabulary"');
  expect(sitemap).toContain('hreflang="en-US" href="https://byoungd.github.io/up/en/threads/part-1/2-vocabulary"');
  expect(sitemap).toContain('hreflang="x-default" href="https://byoungd.github.io/up/threads/part-1/2-vocabulary"');
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

test("resource-layer work returns from verification to disclosure and daily practice", async ({ page }) => {
  await page.goto("./threads/part-3/2-ai-development-and-resource-layer");
  const zhMain = page.locator("main");
  await expect(zhMain.getByRole("heading", { name: "让方法回到日常" })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "作者项目与现实实践", exact: true }).last()).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "第四部：实践与恢复", exact: true }).last()).toBeVisible();

  await page.goto("./en/threads/part-3/2-ai-development-and-resource-layer");
  const enMain = page.locator("main");
  await expect(enMain.getByRole("heading", { name: "Return the Method to Daily Life" })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Author Projects and Real-world Practice", exact: true }).last()).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Part IV: Practice and Recovery", exact: true }).last()).toBeVisible();
});

test("legacy Docsify hash route redirects once", async ({ page }) => {
  await page.goto("./#/threads/part-1/1-understanding");
  await expect(page).toHaveURL(/\/up\/threads\/part-1\/1-understanding$/);
  await expect(page.getByRole("heading", { level: 1, name: /认知篇/ })).toBeVisible();
});

test("legacy English story route redirects to the aligned Part II path", async ({ page }) => {
  await page.goto("./en/threads/part-4/my-story?from=legacy#narrative-boundary");
  await expect(page).toHaveURL(
    /\/up\/en\/threads\/part-2\/my-story\?from=legacy#narrative-boundary$/,
  );
  await expect(
    page.getByRole("heading", { level: 1, name: "My Story: Failure, Recovery, and Starting Again" }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://byoungd.github.io/up/en/threads/part-2/my-story/",
  );
});

test("local search uses the current language and returns a result", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  const zhSearchBox = page.locator(".VPLocalSearchBox");
  const zhInput = zhSearchBox.locator("input");
  await expect(zhInput).toBeVisible();
  await expect(zhSearchBox.locator('button[title="关闭搜索"]')).toHaveCount(1);
  await expect(zhSearchBox.locator('button[title="显示详细结果"]')).toHaveCount(1);
  await expect(zhSearchBox.locator('button[title="清除搜索"]')).toHaveCount(1);
  await zhInput.fill("学习状态");
  await expect(zhSearchBox.getByRole("link", { name: /学习状态/ }).first()).toBeVisible();
  await expect(zhSearchBox).toContainText("选择");
  await expect(zhSearchBox).toContainText("切换");
  await expect(zhSearchBox).toContainText("关闭");

  await page.keyboard.press("Escape");
  await expect(zhSearchBox).toBeHidden();
  await page.goto("./en/");
  const enSearchButton = page.getByRole("button", { name: "Search", exact: true });
  const [enTitleBox, enSearchButtonBox] = await Promise.all([
    page.locator(".VPNavBarTitle").boundingBox(),
    enSearchButton.boundingBox(),
  ]);
  expect(enTitleBox?.x + (enTitleBox?.width || 0)).toBeLessThanOrEqual(enSearchButtonBox?.x || 0);
  await enSearchButton.click();
  const enSearchBox = page.locator(".VPLocalSearchBox");
  const enInput = enSearchBox.locator("input");
  await expect(enInput).toBeVisible();
  await expect(enSearchBox.locator('button[title="Close search"]')).toHaveCount(1);
  await enInput.fill("Learning State");
  await expect(enSearchBox.getByRole("link", { name: /Learning State/ }).first()).toBeVisible();
});

test("page-level search keeps nested chapter text discoverable", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  const zhSearchBox = page.locator(".VPLocalSearchBox");
  await zhSearchBox.locator("input").fill("辅音与最小对立");
  await expect(zhSearchBox.getByRole("link", { name: /口语篇/ }).first()).toBeVisible();

  await page.keyboard.press("Escape");
  await page.goto("./en/");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  const enSearchBox = page.locator(".VPLocalSearchBox");
  await enSearchBox.locator("input").fill("Consonants");
  await expect(enSearchBox.getByRole("link", { name: /Speaking/ }).first()).toBeVisible();
});

test("heading-only search keeps the post-cycle chapter discoverable without indexing its full prose", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  const zhSearchBox = page.locator(".VPLocalSearchBox");
  await zhSearchBox.locator("input").fill("目标必须有到期日与退出门");
  await expect(zhSearchBox.getByRole("link", { name: /目标必须有到期日与退出门/ }).first()).toBeVisible();

  await page.keyboard.press("Escape");
  await page.goto("./en/");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  const enSearchBox = page.locator(".VPLocalSearchBox");
  await enSearchBox.locator("input").fill("Every Goal Needs an Expiry Date");
  await expect(enSearchBox.getByRole("link", { name: /Every Goal Needs an Expiry Date/ }).first()).toBeVisible();
});

test("Part I literary closings remain discoverable after bibliography pruning", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  const zhSearchBox = page.locator(".VPLocalSearchBox");
  await zhSearchBox.locator("input").fill("听见声音背后的人");
  await expect(zhSearchBox.getByRole("link", { name: /听力篇/ }).first()).toBeVisible();

  await page.keyboard.press("Escape");
  await page.goto("./en/");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  const enSearchBox = page.locator(".VPLocalSearchBox");
  await enSearchBox.locator("input").fill("Hear the Person Behind the Sound");
  await expect(enSearchBox.getByRole("link", { name: /Listening/ }).first()).toBeVisible();
});

test("story and AI literary closings remain discoverable", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  const zhSearchBox = page.locator(".VPLocalSearchBox");
  await zhSearchBox.locator("input").fill("重来不是凯旋");
  await expect(zhSearchBox.getByRole("link", { name: /我的故事/ }).first()).toBeVisible();

  await page.keyboard.press("Escape");
  await page.goto("./en/");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  const enSearchBox = page.locator(".VPLocalSearchBox");
  await enSearchBox.locator("input").fill("Keep the Ability with the Person");
  await expect(enSearchBox.getByRole("link", { name: /Learning Anything with AI/ }).first()).toBeVisible();
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
  const partnerPhoto = page.getByRole("img", { name: "韩先凯与伴侣的合影" });
  const readersPhoto = page.getByRole("img", { name: "韩先凯在 Agentic DB 大会与读者合影" });
  await expect(partnerPhoto).toBeVisible();
  await expect(readersPhoto).toBeVisible();
  for (const image of [partnerPhoto, readersPhoto]) {
    await expect(image).toHaveAttribute("src", /\.webp$/);
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(image).toHaveAttribute("decoding", "async");
    await expect(image).toHaveAttribute("fetchpriority", "low");
    await expect(image).toHaveAttribute("width", /^\d+$/);
    await expect(image).toHaveAttribute("height", /^\d+$/);
  }
});

test("home pages use book metadata without third-party image requests", async ({ page }) => {
  const externalImages = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (request.resourceType() === "image" && url.hostname !== "127.0.0.1") externalImages.push(url.href);
  });

  await page.goto("./");
  const zhMeta = page.locator(".book-meta");
  await expect(zhMeta).toContainText("持续更新书稿");
  await expect(zhMeta.getByRole("link", { name: "源码与勘误" })).toHaveAttribute(
    "href",
    "https://github.com/byoungd/up",
  );
  await expect(zhMeta.getByRole("link", { name: "正文 CC BY-NC 4.0" })).toHaveAttribute(
    "href",
    "https://creativecommons.org/licenses/by-nc/4.0/",
  );
  await expect(page.locator(".VPSocialLink")).toHaveCount(0);
  expect(externalImages).toEqual([]);

  await page.goto("./en/");
  const enMeta = page.locator(".book-meta");
  await expect(enMeta).toContainText("Living manuscript");
  await expect(enMeta.getByRole("link", { name: "Source and corrections" })).toBeVisible();
  await expect(enMeta.getByRole("link", { name: "Text CC BY-NC 4.0" })).toBeVisible();
  expect(externalImages).toEqual([]);
});

test("latest home photos stay within the deferred media budget", async ({ page, request }) => {
  await page.goto("./");
  const images = [
    page.getByRole("img", { name: "韩先凯与伴侣的合影" }),
    page.getByRole("img", { name: "韩先凯在 Agentic DB 大会与读者合影" }),
  ];
  let total = 0;
  for (const image of images) {
    const source = await image.getAttribute("src");
    expect(source).toMatch(/\.webp$/);
    const response = await request.get(source);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/webp");
    const size = (await response.body()).byteLength;
    expect(size).toBeLessThan(220_000);
    total += size;
  }
  expect(total).toBeLessThan(280_000);
});

test("deferred story media reserves its intrinsic layout space", async ({ page }) => {
  await page.goto("./threads/part-2/my-story");
  const image = page.getByRole("img", { name: "软件产品页面" });
  await expect(image).toHaveAttribute("loading", "lazy");
  await expect(image).toHaveAttribute("decoding", "async");
  await expect(image).toHaveAttribute("width", "1440");
  await expect(image).toHaveAttribute("height", "1266");
  const box = await image.boundingBox();
  expect(box?.width).toBeGreaterThan(0);
  expect(box?.height).toBeGreaterThan(0);
  expect((box?.width || 0) / (box?.height || 1)).toBeCloseTo(1440 / 1266, 2);
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

test("part introductions state a reading contract and hand off to the first chapter", async ({ page }) => {
  await page.goto("./threads/part-1/open-input");
  const zhMain = page.locator("main");
  await expect(zhMain.getByRole("heading", { level: 1, name: "第一部：打开输入" })).toBeVisible();
  await expect(zhMain.getByRole("heading", { level: 2, name: "本部要回答的问题" })).toBeVisible();
  const zhFooter = page.locator(".VPDocFooter .prev-next");
  await expect(zhFooter.locator(".pager-link.prev")).toHaveAttribute(
    "href",
    "/up/threads/part-0/prologue",
  );
  await expect(zhFooter.locator(".pager-link.next")).toHaveAttribute(
    "href",
    "/up/threads/part-1/0-cefr",
  );

  await page.goto("./en/threads/part-5/long-term-action");
  const enMain = page.locator("main");
  await expect(enMain.getByRole("heading", { level: 1, name: "Part V: Long-Term Action" })).toBeVisible();
  await expect(enMain.getByRole("heading", { level: 2, name: "Questions for This Part" })).toBeVisible();
  await expect(
    enMain.getByRole("link", { name: "90-Day Action Plan: Return Your Life to Yourself", exact: true }),
  ).toBeVisible();
  await expect(
    enMain.getByRole("link", { name: "After Ninety Days: Let Change Remain in Life", exact: true }),
  ).toBeVisible();
  const enFooter = page.locator(".VPDocFooter .prev-next");
  await expect(enFooter.locator(".pager-link.prev")).toHaveAttribute(
    "href",
    "/up/en/threads/part-4/rhythm-and-compounding",
  );
  await expect(enFooter.locator(".pager-link.next")).toHaveAttribute(
    "href",
    "/up/en/threads/part-5/90-day-plan",
  );
});

test("post-cycle chapter turns short-term effort into a long-term handover", async ({ page }) => {
  await page.goto("./threads/part-5/after-90-days");
  const zhMain = page.locator("main");
  await expect(zhMain.getByRole("heading", { level: 1, name: "九十天以后：把改变留在生活里" })).toBeVisible();
  await expect(zhMain.getByRole("heading", { level: 2, name: "先关账，再许愿" })).toBeVisible();
  await expect(zhMain.getByRole("heading", { level: 2, name: "目标必须有到期日与退出门" })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "证据链模板", exact: true })).toBeVisible();
  await expect(zhMain.getByRole("link", { name: "每周复盘", exact: true })).toBeVisible();

  await page.goto("./en/threads/part-5/after-90-days");
  const enMain = page.locator("main");
  await expect(
    enMain.getByRole("heading", { level: 1, name: "After Ninety Days: Let Change Remain in Life" }),
  ).toBeVisible();
  await expect(
    enMain.getByRole("heading", { level: 2, name: "Close the Books Before Making Another Wish" }),
  ).toBeVisible();
  await expect(
    enMain.getByRole("heading", { level: 2, name: "Every Goal Needs an Expiry Date and an Exit Gate" }),
  ).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Evidence Chain Template", exact: true })).toBeVisible();
  await expect(enMain.getByRole("link", { name: "Weekly Review", exact: true })).toBeVisible();
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

test("book boundary pagers follow the reading arc without duplicate manual navigation", async ({ page }) => {
  const cases = [
    {
      route: "./threads/part-0/reader-guide",
      previous: "/up/",
      next: "/up/threads/part-0/prologue",
      manual: /^(?:上一篇|下一篇)[：:]/,
    },
    {
      route: "./threads/part-0/prologue",
      previous: "/up/threads/part-0/reader-guide",
      next: "/up/threads/part-1/open-input",
      manual: /^(?:上一篇|下一篇)[：:]/,
    },
    {
      route: "./threads/part-1/open-input",
      previous: "/up/threads/part-0/prologue",
      next: "/up/threads/part-1/0-cefr",
      manual: /^(?:上一篇|下一篇)[：:]/,
    },
    {
      route: "./threads/part-1/2-vocabulary",
      previous: "/up/threads/part-1/1-understanding",
      next: "/up/threads/part-1/3-listening",
      manual: /^(?:上一篇|下一篇)[：:]/,
    },
    {
      route: "./threads/part-1/7-ai",
      previous: "/up/threads/part-1/6-writing",
      next: "/up/threads/part-2/return-to-life",
      manual: /^(?:上一篇|下一篇|下一部)[：:]/,
    },
    {
      route: "./threads/part-2/entrepreneurship",
      previous: "/up/threads/part-2/relationships",
      next: "/up/threads/part-3/amplify-ability",
      manual: /^(?:上一篇|下一篇|下一部)[：:]/,
    },
    {
      route: "./projects",
      previous: "/up/threads/part-3/2-ai-development-and-resource-layer",
      next: "/up/threads/part-4/practice-and-recovery",
      manual: /^(?:上一篇|下一篇|下一部)[：:]/,
    },
    {
      route: "./threads/part-4/rhythm-and-compounding",
      previous: "/up/threads/part-4/daily-system",
      next: "/up/threads/part-5/long-term-action",
      manual: /^(?:上一篇|下一篇|下一部)[：:]/,
    },
    {
      route: "./threads/part-5/long-term-action",
      previous: "/up/threads/part-4/rhythm-and-compounding",
      next: "/up/threads/part-5/90-day-plan",
      manual: /^(?:上一篇|下一篇)[：:]/,
    },
    {
      route: "./threads/part-5/90-day-plan",
      previous: "/up/threads/part-5/long-term-action",
      next: "/up/threads/part-5/after-90-days",
      manual: /^(?:上一篇|下一篇)[：:]/,
    },
    {
      route: "./threads/part-5/after-90-days",
      previous: "/up/threads/part-5/90-day-plan",
      next: "/up/threads/part-6/afterword",
      manual: /^(?:上一篇|下一篇)[：:]/,
    },
    {
      route: "./threads/part-6/afterword",
      previous: "/up/threads/part-5/after-90-days",
      next: "/up/",
      manual: /^(?:上一篇|下一篇|返回首页)[：:]/,
    },
    {
      route: "./en/threads/part-0/reader-guide",
      previous: "/up/en/",
      next: "/up/en/threads/part-0/prologue",
      manual: /^(?:Previous|Next|Back to the home page):/,
    },
    {
      route: "./en/threads/part-0/prologue",
      previous: "/up/en/threads/part-0/reader-guide",
      next: "/up/en/threads/part-1/open-input",
      manual: /^(?:Previous|Next|Back to the home page):/,
    },
    {
      route: "./en/threads/part-1/open-input",
      previous: "/up/en/threads/part-0/prologue",
      next: "/up/en/threads/part-1/0-cefr",
      manual: /^(?:Previous|Next|Back to the home page):/,
    },
    {
      route: "./en/threads/part-1/2-vocabulary",
      previous: "/up/en/threads/part-1/1-understanding",
      next: "/up/en/threads/part-1/3-listening",
      manual: /^(?:Previous|Next|Next Part|Back to the home page):/,
    },
    {
      route: "./en/threads/part-1/7-ai",
      previous: "/up/en/threads/part-1/6-writing",
      next: "/up/en/threads/part-2/return-to-life",
      manual: /^(?:Previous|Next|Next Part|Back to the home page):/,
    },
    {
      route: "./en/threads/part-2/entrepreneurship",
      previous: "/up/en/threads/part-2/relationships",
      next: "/up/en/threads/part-3/amplify-ability",
      manual: /^(?:Previous|Next|Next Part|Back to the home page):/,
    },
    {
      route: "./en/projects",
      previous: "/up/en/threads/part-3/2-ai-development-and-resource-layer",
      next: "/up/en/threads/part-4/practice-and-recovery",
      manual: /^(?:Previous|Next|Next Part|Back to the home page):/,
    },
    {
      route: "./en/threads/part-4/rhythm-and-compounding",
      previous: "/up/en/threads/part-4/daily-system",
      next: "/up/en/threads/part-5/long-term-action",
      manual: /^(?:Previous|Next|Next Part|Back to the home page):/,
    },
    {
      route: "./en/threads/part-5/long-term-action",
      previous: "/up/en/threads/part-4/rhythm-and-compounding",
      next: "/up/en/threads/part-5/90-day-plan",
      manual: /^(?:Previous|Next|Back to the home page):/,
    },
    {
      route: "./en/threads/part-5/90-day-plan",
      previous: "/up/en/threads/part-5/long-term-action",
      next: "/up/en/threads/part-5/after-90-days",
      manual: /^(?:Previous|Next|Back to the home page):/,
    },
    {
      route: "./en/threads/part-5/after-90-days",
      previous: "/up/en/threads/part-5/90-day-plan",
      next: "/up/en/threads/part-6/afterword",
      manual: /^(?:Previous|Next|Back to the home page):/,
    },
    {
      route: "./en/threads/part-6/afterword",
      previous: "/up/en/threads/part-5/after-90-days",
      next: "/up/en/",
      manual: /^(?:Previous|Next|Back to the home page):/,
    },
  ];

  for (const entry of cases) {
    await page.goto(entry.route);
    const footer = page.locator(".VPDocFooter .prev-next");
    await expect(footer.locator(".pager-link.prev")).toHaveAttribute("href", entry.previous);
    await expect(footer.locator(".pager-link.next")).toHaveAttribute("href", entry.next);
    const manualParagraphs = page.locator("main .vp-doc p").filter({ hasText: entry.manual });
    await expect(manualParagraphs).toHaveCount(0);
  }
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

test("site chrome and missing pages follow the current language", async ({ page }) => {
  await page.goto("./threads/part-1/0-cefr");
  await expect(page.locator(".VPSkipLink")).toHaveText("跳转到正文");
  await expect(page.locator(".edit-link-button")).toHaveText("编辑本页");
  await expect(page.locator(".VPSwitchAppearance").first()).toHaveAttribute("title", /切换到.+模式/);
  await expect(page.locator("#main-nav-aria-label")).toHaveText("主导航");
  await expect(page.locator("#sidebar-aria-label")).toHaveText("侧栏导航");
  await expect(page.locator("#doc-footer-aria-label")).toHaveText("章节导航");
  await expect(page.locator(".VPNavBarHamburger")).toHaveAttribute("aria-label", "移动端导航");
  await expect(page.locator(".VPSidebarItem .caret").first()).toHaveAttribute("aria-label", "展开或收起分组");
  await expect(page.locator(".header-anchor").first()).toHaveAttribute("aria-label", /固定链接$/);

  await page.goto("./definitely-missing-reader-route");
  const zhNotFound = page.locator(".NotFound");
  await expect(zhNotFound.getByRole("heading", { name: "页面没有找到" })).toBeVisible();
  await expect(zhNotFound).toContainText("有时不是路消失了，只是这一页已经搬走");
  await expect(zhNotFound.getByRole("link", { name: "返回《人生进阶指南》首页" })).toHaveText("返回首页");

  await page.goto("./en/threads/part-1/0-cefr");
  await expect(page.locator(".VPSkipLink")).toHaveText("Skip to content");
  await expect(page.locator(".edit-link-button")).toHaveText("Edit this page");
  await expect(page.locator(".VPSwitchAppearance").first()).toHaveAttribute("title", /Switch to .+ theme/);
  await expect(page.locator("#main-nav-aria-label")).toHaveText("Main Navigation");
  await expect(page.locator("#sidebar-aria-label")).toHaveText("Sidebar Navigation");
  await expect(page.locator("#doc-footer-aria-label")).toHaveText("Pager");
  await expect(page.locator(".VPNavBarHamburger")).toHaveAttribute("aria-label", "Mobile navigation");
  await expect(page.locator(".VPSidebarItem .caret").first()).toHaveAttribute("aria-label", "Toggle section");
  await expect(page.locator(".header-anchor").first()).toHaveAttribute("aria-label", /^Permalink to/);

  await page.goto("./en/definitely-missing-reader-route");
  const enNotFound = page.locator(".NotFound");
  await expect(enNotFound.getByRole("heading", { name: "PAGE NOT FOUND" })).toBeVisible();
  await expect(enNotFound).toContainText("Sometimes the road remains after a page has moved");
  await expect(enNotFound.getByRole("link", { name: "Return to the Life Level-up Guide home page" })).toHaveText("Return home");
});

test("long-form reading progress and typography remain stable", async ({ page }, testInfo) => {
  await page.goto("./threads/part-3/2-ai-development-and-resource-layer");
  const progress = page.locator("[data-reading-progress]");
  await expect(progress).toBeVisible();
  await expect.poll(async () => Number(await progress.getAttribute("data-progress"))).toBeLessThan(5);
  const progressBox = await progress.boundingBox();
  expect(progressBox?.y).toBe(0);
  expect(progressBox?.height).toBe(2);

  const typography = await page.evaluate(() => {
    const heading = document.querySelector(".vp-doc h1");
    const paragraph = document.querySelector(".vp-doc p");
    const headingStyles = heading ? getComputedStyle(heading) : null;
    const paragraphStyles = paragraph ? getComputedStyle(paragraph) : null;
    return {
      headingSize: Number.parseFloat(headingStyles?.fontSize || "0"),
      lineHeight: Number.parseFloat(paragraphStyles?.lineHeight || "0"),
      paragraphSize: Number.parseFloat(paragraphStyles?.fontSize || "0"),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  expect(typography.lineHeight / typography.paragraphSize).toBeGreaterThanOrEqual(1.75);
  expect(typography.overflow).toBeLessThanOrEqual(1);
  expect(typography.headingSize).toBe(testInfo.project.name === "mobile-chromium" ? 32 : 42);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(async () => Number(await progress.getAttribute("data-progress"))).toBeGreaterThan(95);
});

test("print view keeps the manuscript and removes site chrome", async ({ page }) => {
  await page.goto("./en/threads/part-4/daily-system");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator(".VPNav")).toBeHidden();
  await expect(page.locator(".VPSidebar")).toBeHidden();
  await expect(page.locator("[data-reading-progress]")).toBeHidden();
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
    "./en/threads/part-2/my-story",
  ];

  for (const route of routes) {
    await page.goto(route);
    const images = page.locator("main img");
    const count = await images.count();
    expect(count, `${route} should contain at least one image`).toBeGreaterThan(0);
    for (let index = 0; index < count; index += 1) {
      const image = images.nth(index);
      await expect(image).toHaveAttribute("loading", "lazy");
      await expect(image).toHaveAttribute("decoding", "async");
      const source = await image.getAttribute("src");
      if (source?.startsWith("/up/assets/") && !source.endsWith(".svg")) {
        await expect(image).toHaveAttribute("width", /^\d+$/);
        await expect(image).toHaveAttribute("height", /^\d+$/);
      }
      if ((await image.getAttribute("loading")) === "lazy") await image.scrollIntoViewIfNeeded();
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
