#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { enNavigation, zhNavigation } from "../docs/.vitepress/navigation.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(ROOT, "docs");
const checkOnly = process.argv.includes("--check");

function validateNavigation(groups, locale) {
  const seenLinks = new Set();
  for (const group of groups) {
    if (!group.text || !Array.isArray(group.items)) {
      throw new Error(`${locale} 导航分组缺少 text 或 items`);
    }
    for (const item of group.items) {
      if (!item.text || !item.link || !item.source) {
        throw new Error(`${locale} 导航条目字段不完整: ${JSON.stringify(item)}`);
      }
      if (seenLinks.has(item.link)) {
        throw new Error(`${locale} 导航存在重复链接: ${item.link}`);
      }
      seenLinks.add(item.link);

      const source = resolve(DOCS, item.source);
      if (!source.startsWith(`${DOCS}/`) || !existsSync(source)) {
        throw new Error(`${locale} 导航 source 不存在: ${item.source}`);
      }
    }
  }
}

validateNavigation(zhNavigation, "中文");
validateNavigation(enNavigation, "英文");

function summary(groups, prefix = "") {
  const lines = ["# Summary", ""];
  for (const group of groups) {
    lines.push(`## ${group.text}`, "");
    for (const item of group.items) {
      lines.push(`- [${item.text}](${prefix}${item.source})`);
    }
    lines.push("");
  }
  return `${lines.join("\n").trim()}\n`;
}

const outputs = new Map([
  [join(ROOT, "SUMMARY.md"), summary(zhNavigation, "docs/")],
  [join(ROOT, "docs/SUMMARY.md"), summary(zhNavigation)],
  [join(ROOT, "docs/en/SUMMARY.md"), summary(enNavigation).replaceAll("(en/", "(")],
]);

let changed = false;
for (const [file, expected] of outputs) {
  const actual = readFileSync(file, "utf8");
  if (actual === expected) continue;
  changed = true;
  if (checkOnly) {
    console.error(`${file.replace(`${ROOT}/`, "")}: 导航文件未同步`);
  } else {
    writeFileSync(file, expected);
    console.log(`updated ${file.replace(`${ROOT}/`, "")}`);
  }
}

if (checkOnly && changed) process.exit(1);
if (!changed) console.log("navigation summaries are in sync");
