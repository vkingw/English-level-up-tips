#!/usr/bin/env node

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = join(ROOT, "docs/.vitepress/dist/assets");
const chunksDir = join(assetsDir, "chunks");

const budgets = [
  {
    label: "local search index",
    directory: chunksDir,
    pattern: /^@localSearchIndex.*\.js$/,
    expected: 2,
    raw: 610_000,
    gzip: 185_000,
  },
  {
    label: "framework",
    directory: chunksDir,
    pattern: /^framework.*\.js$/,
    expected: 1,
    raw: 125_000,
    gzip: 50_000,
  },
  {
    label: "search UI",
    directory: chunksDir,
    pattern: /^VPLocalSearchBox.*\.js$/,
    expected: 1,
    raw: 75_000,
    gzip: 28_000,
  },
  {
    label: "theme",
    directory: chunksDir,
    pattern: /^theme.*\.js$/,
    expected: 1,
    raw: 70_000,
    gzip: 22_000,
  },
];

const format = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;
let failed = false;

for (const budget of budgets) {
  const files = readdirSync(budget.directory).filter((name) => budget.pattern.test(name));
  if (files.length !== budget.expected) {
    console.error(`${budget.label}: expected ${budget.expected} chunk(s), found ${files.length}`);
    failed = true;
    continue;
  }

  for (const name of files) {
    const content = readFileSync(join(budget.directory, name));
    const raw = content.byteLength;
    const gzip = gzipSync(content, { level: 9 }).byteLength;
    console.log(`${budget.label}: ${name} ${format(raw)} raw / ${format(gzip)} gzip`);
    if (raw > budget.raw || gzip > budget.gzip) {
      console.error(
        `${budget.label}: budget exceeded (max ${format(budget.raw)} raw / ${format(budget.gzip)} gzip)`,
      );
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log("build size budgets passed");
