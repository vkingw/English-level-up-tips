#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { enNavigation, zhNavigation } from "../docs/.vitepress/navigation.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");

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
