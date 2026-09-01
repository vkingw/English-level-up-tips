import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vitepress";
import { enNavigation, toSidebar, zhNavigation } from "./navigation.mjs";

const origin = "https://byoungd.github.io";
const base = "/up/";
const siteUrl = `${origin}${base}`;
const buildRevision = process.env.GITHUB_SHA || process.env.BUILD_REVISION || "local";
const defaultDescription =
  "《人生进阶指南》帮助普通人在 AI 时代持续学习、完成真实项目、穿越人生低谷并留下成长证据。";
const defaultDescriptionEn =
  "Life Level-up Guide helps ordinary people learn continuously, complete real projects, move through difficult seasons, and preserve evidence of growth in the AI era.";
const editLinkPattern = "https://github.com/byoungd/up/edit/master/docs/:path";

function routeFromRelativePath(relativePath: string) {
  const clean = relativePath
    .replace(/(^|\/)(README|index)\.md$/, "$1")
    .replace(/\.md$/, "")
    .replace(/^index$/, "");
  return clean ? `${clean.replace(/^\//, "")}` : "";
}

function privateAssetGuard() {
  let outDir = "";
  const isPrivateSession = (url = "") => {
    const pathname = decodeURIComponent(url.split("?")[0]);
    return pathname === "/assets/session.json" || pathname.endsWith("/assets/session.json");
  };

  return {
    name: "private-asset-guard",
    enforce: "post" as const,
    configResolved(config: { build: { outDir: string } }) {
      outDir = config.build.outDir;
    },
    configureServer(server: { middlewares: { use: (handler: (req: { url?: string }, res: { statusCode: number; end: (body: string) => void }, next: () => void) => void) => void } }) {
      server.middlewares.use((req, res, next) => {
        if (!isPrivateSession(req.url)) {
          next();
          return;
        }
        res.statusCode = 404;
        res.end("Not found");
      });
    },
    closeBundle() {
      if (!outDir) return;
      const generatedPath = resolve(outDir, "assets/session.json");
      if (existsSync(generatedPath)) rmSync(generatedPath);
    },
  };
}

const legacyHashRedirect = `
(function () {
  var hash = window.location.hash || '';
  if (!hash.startsWith('#/')) return;
  var raw = hash.slice(2).split('?id=')[0].split('#')[0];
  var clean = raw.replace(/^\\/+|\\/+$/g, '').replace(/\\/README(?:\\.md)?$/i, '');
  var target = '${base}' + (clean ? clean + '/' : '');
  if (window.location.pathname + window.location.search !== target) window.location.replace(target);
})();`;

export default defineConfig({
  lang: "zh-CN",
  title: "人生进阶指南｜AI 时代终身学习",
  description: defaultDescription,
  base,
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ["SUMMARY.md", "en/SUMMARY.md"],
  sitemap: { hostname: siteUrl },
  vite: { plugins: [privateAssetGuard()] },
  rewrites: {
    "README.md": "index.md",
    "en/README.md": "en/index.md",
    "threads/archive/README.md": "threads/archive/index.md",
    "en/threads/archive/README.md": "en/threads/archive/index.md",
  },
  head: [
    ["meta", { name: "theme-color", content: "#1f6f5c" }],
    ["meta", { name: "author", content: "Han Xiankai / 韩先凯 (Li Pu / 离谱) and contributors" }],
    ["meta", { name: "build-revision", content: buildRevision }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["script", {}, legacyHashRedirect],
  ],
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      title: "人生进阶指南｜AI 时代终身学习",
      description: defaultDescription,
      themeConfig: {
        siteTitle: "人生进阶指南",
        nav: [
          { text: "终身学习", link: "/templates/learning-state" },
          { text: "AI 学习", link: "/threads/part-3/1-ai-learning" },
          { text: "项目实践", link: "/threads/part-3/2-ai-development-and-resource-layer" },
          { text: "英语专题", link: "/threads/part-1/0-cefr" },
        ],
        sidebar: toSidebar(zhNavigation),
        outline: { label: "本页目录", level: [2, 3] },
        docFooter: { prev: "上一篇", next: "下一篇" },
        editLink: { pattern: editLinkPattern, text: "编辑本页" },
        lastUpdated: { text: "最后更新" },
        returnToTopLabel: "返回顶部",
        sidebarMenuLabel: "目录",
        darkModeSwitchLabel: "外观",
        lightModeSwitchTitle: "切换到浅色模式",
        darkModeSwitchTitle: "切换到深色模式",
        langMenuLabel: "切换语言",
        skipToContentLabel: "跳转到正文",
        notFound: {
          title: "页面没有找到",
          quote: "有时不是路消失了，只是这一页已经搬走。回到主线，继续向前。",
          linkLabel: "返回《人生进阶指南》首页",
          linkText: "返回首页",
        },
      },
    },
    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      title: "Life Level-up Guide | Lifelong Learning in the AI Era",
      description: defaultDescriptionEn,
      themeConfig: {
        siteTitle: "Life Level-up Guide",
        nav: [
          { text: "Lifelong Learning", link: "/en/templates/learning-state" },
          { text: "AI Learning", link: "/en/threads/part-3/1-ai-learning" },
          { text: "Project Practice", link: "/en/threads/part-3/2-ai-development-and-resource-layer" },
          { text: "English", link: "/en/threads/part-1/0-cefr" },
        ],
        sidebar: toSidebar(enNavigation),
        outline: { label: "On this page", level: [2, 3] },
        docFooter: { prev: "Previous", next: "Next" },
        editLink: { pattern: editLinkPattern, text: "Edit this page" },
        lastUpdated: { text: "Last updated" },
        returnToTopLabel: "Back to top",
        sidebarMenuLabel: "Menu",
        darkModeSwitchLabel: "Appearance",
        lightModeSwitchTitle: "Switch to light theme",
        darkModeSwitchTitle: "Switch to dark theme",
        langMenuLabel: "Change language",
        skipToContentLabel: "Skip to content",
        notFound: {
          title: "PAGE NOT FOUND",
          quote: "Sometimes the road remains after a page has moved. Return to the guide and continue from there.",
          linkLabel: "Return to the Life Level-up Guide home page",
          linkText: "Return home",
        },
        footer: {
          message: "Content CC BY-NC 4.0; site and tooling code MIT.",
          copyright: "Copyright © 2017-present byoungd and contributors",
        },
      },
    },
  },
  themeConfig: {
    logo: "/assets/feature.svg",
    siteTitle: "人生进阶指南",
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: "搜索", buttonAriaLabel: "搜索" },
              modal: {
                displayDetails: "显示详细结果",
                resetButtonTitle: "清除搜索",
                backButtonTitle: "关闭搜索",
                noResultsText: "没有找到相关内容",
                footer: {
                  selectText: "选择",
                  selectKeyAriaLabel: "按回车键选择",
                  navigateText: "切换",
                  navigateUpKeyAriaLabel: "按上箭头选择上一项",
                  navigateDownKeyAriaLabel: "按下箭头选择下一项",
                  closeText: "关闭",
                  closeKeyAriaLabel: "按 Esc 键关闭",
                },
              },
            },
          },
        },
      },
    },
    socialLinks: [{ icon: "github", link: "https://github.com/byoungd/up" }],
    footer: {
      message: "正文 CC BY-NC 4.0；站点与工具代码 MIT。",
      copyright: "Copyright © 2017-present byoungd and contributors",
    },
  },
  transformPageData(pageData) {
    const updated = pageData.frontmatter.updated;
    const timestamp =
      updated instanceof Date
        ? updated.getTime()
        : typeof updated === "string"
          ? Date.parse(`${updated}T00:00:00Z`)
          : Number.NaN;
    if (Number.isFinite(timestamp)) {
      pageData.lastUpdated = timestamp;
    }
  },
  transformHead({ pageData }) {
    const route = routeFromRelativePath(pageData.relativePath);
    const canonical = `${siteUrl}${route}${route ? "/" : ""}`;
    const isEnglish = route === "en" || route.startsWith("en/");
    const title = pageData.title ||
      (isEnglish ? "Life Level-up Guide | Lifelong Learning in the AI Era" : "人生进阶指南｜AI 时代终身学习");
    const description =
      pageData.frontmatter.description ||
      `${title}. ${isEnglish ? defaultDescriptionEn : defaultDescription}`;
    const image = `${siteUrl}assets/${isEnglish ? "feature-en.svg" : "feature.svg"}`;
    return [
      ["link", { rel: "canonical", href: canonical }],
      ["meta", { property: "og:type", content: "article" }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:url", content: canonical }],
      ["meta", { property: "og:image", content: image }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: description }],
      ["meta", { name: "twitter:image", content: image }],
    ];
  },
});
