#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");
const publicDir = join(ROOT, "docs/public/assets");
mkdirSync(publicDir, { recursive: true });

let changed = false;
function syncBuffer(name, source) {
  const target = join(publicDir, name);
  let actual;
  try {
    actual = readFileSync(target);
  } catch {
    actual = Buffer.alloc(0);
  }
  if (source.equals(actual)) return;
  changed = true;
  if (checkOnly) {
    console.error(`docs/public/assets/${name}: 品牌资源未同步`);
  } else {
    writeFileSync(target, source);
    console.log(`updated docs/public/assets/${name}`);
  }
}

for (const name of ["logo.svg", "feature.svg", "feature-en.svg"]) {
  syncBuffer(name, readFileSync(join(ROOT, "docs/assets", name)));
}

for (const [sourceName, targetName] of [
  ["feature.svg", "feature.png"],
  ["feature-en.svg", "feature-en.png"],
]) {
  const rendered = await sharp(join(ROOT, "docs/assets", sourceName))
    .resize(1200, 630, { fit: "fill" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  syncBuffer(targetName, rendered);
}

if (checkOnly && changed) process.exit(1);
if (!changed) console.log("public brand assets are in sync");
