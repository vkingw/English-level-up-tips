#!/usr/bin/env node

import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { basename, dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(ROOT, "docs");
const errors = [];
const IGNORE_DIRS = new Set([".git", "node_modules", "dist", ".cache"]);
const PUBLIC_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const PUBLIC_ASSET_EXTENSIONS = new Set([...PUBLIC_IMAGE_EXTENSIONS, ".svg"]);
const TEXT_SOURCE_EXTENSIONS = new Set([".md", ".mjs", ".mts", ".ts", ".css"]);

function addError(file, line, message) {
  errors.push({ file: relative(ROOT, file), line, message });
}

function walk(dir, extensions, output = []) {
  for (const name of readdirSync(dir)) {
    if (IGNORE_DIRS.has(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, extensions, output);
    else if (extensions.has(extname(name).toLowerCase())) output.push(path);
  }
  return output;
}

const isExternal = (target) =>
  /^(https?:|mailto:|tel:|data:|\/\/)/i.test(target);

function stripOptionalTitle(target) {
  return target.replace(/\s+["'].*$/, "").trim();
}

function routeToFile(route) {
  const clean = route
    .replace(/^\/+/, "")
    .replace(/\/$/, "")
    .replace(/\/index$/, "")
    .replace(/\/README$/, "");
  if (!clean) return join(DOCS, "README.md");
  return join(DOCS, `${clean}.md`);
}

function resolveTarget(file, rawTarget) {
  let target = stripOptionalTitle(rawTarget);
  if (!target || isExternal(target) || target.startsWith("#")) return null;
  const pathPart = target.split("#")[0].split("?")[0];
  if (!pathPart) return null;
  if (pathPart.startsWith("/")) return routeToFile(pathPart);
  try {
    return resolve(dirname(file), decodeURIComponent(pathPart));
  } catch {
    return resolve(dirname(file), pathPart);
  }
}

function localTargetExists(path) {
  if (existsSync(path)) return true;
  if (!extname(path) && existsSync(`${path}.md`)) return true;
  if (!extname(path) && existsSync(join(path, "README.md"))) return true;
  return false;
}

const MARKDOWN_LINK = /(!?)\[([^\]]*)\]\(([^)]+)\)/g;
const HTML_HREF = /href\s*=\s*["']([^"']+)["']/gi;
const HTML_IMAGE = /<img\b([^>]*)>/gi;
const GENERIC_ALT = new Set(["image", "img", "photo", "picture", "hotel", "图片", "照片", "图"]);

function checkAltText(file, line, alt) {
  if (!alt?.trim()) {
    addError(file, line, "图片缺少有意义的 alt 文本");
    return;
  }
  if (GENERIC_ALT.has(alt.trim().toLowerCase())) {
    addError(file, line, `图片 alt 过于泛化: "${alt.trim()}"`);
  }
  if (file.startsWith(`${join(DOCS, "en")}${sep}`) && /[\u3400-\u9fff]/.test(alt)) {
    addError(file, line, "英文页面图片 alt 不应包含中文字符");
  }
}

function checkLinksAndAlt(file) {
  const lines = readFileSync(file, "utf8").split("\n");
  let inFence = false;
  lines.forEach((line, index) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;

    const targets = [];
    MARKDOWN_LINK.lastIndex = 0;
    let match;
    while ((match = MARKDOWN_LINK.exec(line))) {
      if (match[1] === "!") checkAltText(file, index + 1, match[2]);
      targets.push(match[3]);
    }
    HTML_HREF.lastIndex = 0;
    while ((match = HTML_HREF.exec(line))) targets.push(match[1]);
    HTML_IMAGE.lastIndex = 0;
    while ((match = HTML_IMAGE.exec(line))) {
      const alt = match[1].match(/\balt\s*=\s*["']([^"']*)["']/i)?.[1];
      checkAltText(file, index + 1, alt);
    }

    for (const target of targets) {
      const resolved = resolveTarget(file, target);
      if (resolved && !localTargetExists(resolved)) {
        addError(
          file,
          index + 1,
          `链接目标不存在: ${target} -> ${relative(ROOT, resolved)}`,
        );
      }
    }
  });
}

function parseFrontmatter(file) {
  const text = readFileSync(file, "utf8");
  const block = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!block) return null;
  const values = {};
  for (const line of block[1].split("\n")) {
    const match = line.match(/^([a-zA-Z][\w-]*):\s*(.+)$/);
    if (match) values[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
  return values;
}

function checkFrontmatter(file) {
  if (file.endsWith("SUMMARY.md")) return;
  const frontmatter = parseFrontmatter(file);
  if (!frontmatter) {
    addError(file, 1, "公开页面缺少 frontmatter");
    return;
  }
  for (const key of ["title", "description", "updated"]) {
    if (!frontmatter[key]) addError(file, 1, `frontmatter 缺少 ${key}`);
  }
  if (/\/(7-ai|1-ai-learning|2-ai-development-and-resource-layer)\.md$/.test(file)) {
    if (!frontmatter.sources_checked) {
      addError(file, 1, "AI 页面缺少 sources_checked");
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.sources_checked)) {
      addError(file, 1, "sources_checked 必须使用 YYYY-MM-DD");
    }
  }
  if (frontmatter.updated && !/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.updated)) {
    addError(file, 1, "updated 必须使用 YYYY-MM-DD");
  }
  if (frontmatter.description && frontmatter.description.length < 24) {
    addError(file, 1, "description 过短，无法区分页面内容");
  }

  if (/\/(7-ai|1-ai-learning|2-ai-development-and-resource-layer)\.md$/.test(file) && frontmatter.sources_checked) {
    const age = Date.now() - Date.parse(`${frontmatter.sources_checked}T00:00:00Z`);
    const maxAge = 120 * 24 * 60 * 60 * 1000;
    if (age > maxAge) addError(file, 1, "AI 产品资料超过 120 天未核验");
  }
}

const SPECIAL_ZH_TO_EN = new Map([
  ["threads/part-2/my-story.md", "threads/part-4/my-story.md"],
]);
const SPECIAL_EN_TO_ZH = new Map(
  [...SPECIAL_ZH_TO_EN].map(([zh, en]) => [en, zh]),
);

function checkBilingualParity(markdownFiles) {
  const publicFiles = markdownFiles.filter(
    (file) => file.startsWith(`${DOCS}/`) && !file.endsWith("SUMMARY.md"),
  );
  const chineseFiles = publicFiles.filter(
    (file) => !file.startsWith(`${join(DOCS, "en")}/`) && file !== join(DOCS, "README.md"),
  );
  const englishFiles = publicFiles.filter(
    (file) => file.startsWith(`${join(DOCS, "en")}/`) && file !== join(DOCS, "en/README.md"),
  );

  for (const file of chineseFiles) {
    const path = relative(DOCS, file);
    const expected = join(DOCS, "en", SPECIAL_ZH_TO_EN.get(path) || path);
    if (!existsSync(expected)) addError(file, 1, `缺少英文对应页: ${relative(ROOT, expected)}`);
  }
  for (const file of englishFiles) {
    const path = relative(join(DOCS, "en"), file);
    const expected = join(DOCS, SPECIAL_EN_TO_ZH.get(path) || path);
    if (!existsSync(expected)) addError(file, 1, `缺少中文对应页: ${relative(ROOT, expected)}`);
  }
}

function headingShape(file) {
  const shape = [];
  let inFence = false;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = line.match(/^(#{1,6})\s+/);
    if (match) shape.push(match[1].length);
  }
  return shape;
}

function checkHeadingParity(markdownFiles) {
  const publicFiles = markdownFiles.filter(
    (file) => file.startsWith(`${DOCS}/`) && !file.endsWith("SUMMARY.md"),
  );
  const chineseFiles = publicFiles.filter(
    (file) => !file.startsWith(`${join(DOCS, "en")}/`) && file !== join(DOCS, "README.md"),
  );

  for (const file of chineseFiles) {
    const path = relative(DOCS, file);
    const expected = join(DOCS, "en", SPECIAL_ZH_TO_EN.get(path) || path);
    if (!existsSync(expected)) continue;
    const chineseShape = headingShape(file);
    const englishShape = headingShape(expected);
    if (chineseShape.join(",") !== englishShape.join(",")) {
      addError(
        file,
        1,
        `中英文标题层级不一致: ${chineseShape.join(",")} vs ${englishShape.join(",")}`,
      );
    }
  }
}

const STALE_PATTERNS = [
  ["#/", "残留 Docsify hash 路由"],
  ["byoungd.github.io/up/#/", "残留旧 hash 站点地址"],
  ["byoungd.github.io/English-level-up-tips", "残留旧站点域名"],
  ["397865076", "公开个人 QQ 号码"],
  ["user.qzone.qq.com", "公开个人空间链接"],
  ["douyin-qr", "公开二维码资源"],
  ["2026-06 版", "过期的版本标签"],
  ["youtube.com/user/", "旧 YouTube 用户路由"],
  ["pan.baidu.com/s/1i5OLIIT", "失效网盘链接"],
  ["v.youku.com", "过期优酷链接"],
  ["dopamine detox method", "把多巴胺排毒写成已验证方法"],
];

function checkStaleStrings(markdownFiles) {
  for (const file of markdownFiles) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      for (const [pattern, reason] of STALE_PATTERNS) {
        if (line.includes(pattern)) addError(file, index + 1, `${reason}: "${pattern}"`);
      }
    });
  }
}

function repositoryReadmeFromDocs(source) {
  return source
    .replace("中文 | [English](en/)", "中文 | [English](docs/en/README.md)")
    .replace(/\]\((assets|threads|templates|reference)\//g, "](docs/$1/")
    .replace(/src="\.\/assets\//g, 'src="./docs/assets/')
    .replace(/\]\(projects\.md\)/g, "](docs/projects.md)")
    .replace(/href="\.\/(threads\/[^\"]+|templates\/[^\"]+|projects)"/g, (_match, path) =>
      `href="./docs/${path}.md"`,
    );
}

function checkReadmeMirror() {
  const source = readFileSync(join(DOCS, "README.md"), "utf8");
  const expected = repositoryReadmeFromDocs(source);
  const actual = readFileSync(join(ROOT, "README.md"), "utf8");
  if (expected !== actual) {
    addError(join(ROOT, "README.md"), 1, "未与 docs/README.md 同步；运行 npm run sync");
  }
}

async function checkImageMetadata() {
  const files = walk(join(DOCS, "assets"), PUBLIC_IMAGE_EXTENSIONS);
  for (const file of files) {
    let metadata;
    try {
      metadata = await sharp(file).metadata();
    } catch (error) {
      addError(file, 1, `无法检查图片元数据: ${error.message}`);
      continue;
    }
    const found = ["exif", "iptc", "xmp"].filter((key) => metadata?.[key] != null);
    if (found.length) {
      addError(file, 1, `包含 EXIF/GPS 或描述元数据块: ${found.join(", ")}`);
    }
  }
}

function checkAttributionPaths() {
  const file = join(ROOT, "ATTRIBUTIONS.md");
  const lines = readFileSync(file, "utf8").split("\n");
  const codeSpan = /`([^`]+)`/g;
  lines.forEach((line, index) => {
    codeSpan.lastIndex = 0;
    let match;
    while ((match = codeSpan.exec(line))) {
      const candidate = match[1].trim();
      if (!candidate.startsWith("docs/") || candidate.includes("*")) continue;
      const path = resolve(ROOT, candidate.replace(/\/$/, ""));
      if (!path.startsWith(`${ROOT}${sep}`) || !existsSync(path)) {
        addError(file, index + 1, `归属表本地路径不存在: ${candidate}`);
      }
    }
  });
}

function checkOrphanAssets() {
  const assets = walk(join(DOCS, "assets"), PUBLIC_ASSET_EXTENSIONS);
  const sourceFiles = walk(ROOT, TEXT_SOURCE_EXTENSIONS).filter((file) => {
    if (file.startsWith(`${join(DOCS, "assets")}${sep}`)) return false;
    const name = basename(file);
    return name !== "ATTRIBUTIONS.md" && name !== "CHANGELOG.md";
  });
  const sourceText = sourceFiles.map((file) => readFileSync(file, "utf8"));

  for (const asset of assets) {
    const name = basename(asset);
    if (!sourceText.some((text) => text.includes(name))) {
      addError(asset, 1, `公共资产未在正文、配置或构建脚本中引用: ${name}`);
    }
  }
}

const markdownFiles = walk(ROOT, new Set([".md"]));
for (const file of markdownFiles) checkLinksAndAlt(file);
for (const file of markdownFiles.filter((path) => path.startsWith(`${DOCS}/`))) {
  checkFrontmatter(file);
}
checkBilingualParity(markdownFiles);
checkHeadingParity(markdownFiles);
checkStaleStrings(
  markdownFiles.filter(
    (file) =>
      file.startsWith(`${DOCS}/`) ||
      file === join(ROOT, "README.md") ||
      file === join(ROOT, "SUMMARY.md"),
  ),
);
checkReadmeMirror();
checkAttributionPaths();
checkOrphanAssets();
await checkImageMetadata();

if (!errors.length) {
  console.log(`✓ 内容校验通过：${markdownFiles.length} 个 Markdown 文件，双语、链接、元数据与隐私检查正常。`);
  process.exit(0);
}

console.error(`✗ 发现 ${errors.length} 个问题：\n`);
for (const error of errors) {
  const location = error.line ? `${error.file}:${error.line}` : error.file;
  console.error(`  ${location}  ${error.message}`);
}
process.exit(1);
