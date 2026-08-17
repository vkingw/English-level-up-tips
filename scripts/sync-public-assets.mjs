#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");
const publicDir = join(ROOT, "docs/public/assets");
mkdirSync(publicDir, { recursive: true });

let changed = false;
for (const name of ["feature.svg", "feature-en.svg"]) {
  const source = readFileSync(join(ROOT, "docs/assets", name));
  const target = join(publicDir, name);
  let actual;
  try {
    actual = readFileSync(target);
  } catch {
    actual = Buffer.alloc(0);
  }
  if (source.equals(actual)) continue;
  changed = true;
  if (checkOnly) {
    console.error(`docs/public/assets/${name}: 分享图未同步`);
  } else {
    writeFileSync(target, source);
    console.log(`updated docs/public/assets/${name}`);
  }
}

if (checkOnly && changed) process.exit(1);
if (!changed) console.log("public social images are in sync");
