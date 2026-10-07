// Guards the files that build tools execute (PostCSS, Next.js, ESLint configs).
// Everything here is read as TEXT - a config file is never imported, so a
// tampered file cannot run from inside this test.
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(join(ROOT, file), "utf8");

const CONFIG_FILE =
  /^(postcss|tailwind|next|eslint|vite|vitest|jest|babel|webpack)\.config\.(js|cjs|mjs|ts|mts)$|^\.eslintrc\.c?js$/;
const SOURCE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".css", ".json"]);
const SKIP_DIR = new Set(["node_modules", ".next", "out", "build", "coverage", ".git"]);
const SKIP_FILE = new Set(["package-lock.json"]);

const MAX_CONFIG_LINE = 300;
const MAX_SOURCE_LINE = 1000;
const PADDING = /[ \t]{80,}\S/; // code pushed out of view behind whitespace
const FORBIDDEN_IN_CONFIG = [
  ["eval()", /\beval\s*\(/],
  ["Function constructor", /\bnew\s+Function\b|\bFunction\s*\(/],
  ["child_process", /child_process/],
  ["createRequire shim", /createRequire/],
  ["write to global", /\bglobal(This)?\s*(\.|\[)/],
  ["obfuscated identifier", /_0x[0-9a-f]{4,}/i],
  ["atob()", /\batob\s*\(/],
];

/** Returns human-readable problems found in one config file's text. */
function inspectConfig(text) {
  const problems = [];
  text.split("\n").forEach((line, index) => {
    if (line.length > MAX_CONFIG_LINE) problems.push(`line ${index + 1} is ${line.length} chars long`);
    if (PADDING.test(line)) problems.push(`line ${index + 1} hides text behind whitespace padding`);
  });
  for (const [label, pattern] of FORBIDDEN_IN_CONFIG) {
    if (pattern.test(text)) problems.push(`contains ${label}`);
  }
  return problems;
}

function walk(dir, files = []) {
  for (const name of readdirSync(join(ROOT, dir))) {
    const rel = dir ? `${dir}/${name}` : name;
    if (statSync(join(ROOT, rel)).isDirectory()) {
      if (!SKIP_DIR.has(name)) walk(rel, files);
    } else if (SOURCE_EXT.has(extname(name)) && !SKIP_FILE.has(name)) {
      files.push(rel);
    }
  }
  return files;
}

const configFiles = readdirSync(ROOT).filter((name) => CONFIG_FILE.test(name));

describe("tool-executed config files", () => {
  it("finds the configs this project is known to have", () => {
    for (const expected of ["postcss.config.mjs", "next.config.ts", "eslint.config.mjs"]) {
      assert.ok(configFiles.includes(expected), `${expected} should be checked`);
    }
  });

  it("flags an injected loader hidden behind whitespace (detector self-check)", () => {
    const tampered =
      'import { createRequire } from "module";\nexport default config;' +
      " ".repeat(500) +
      'global.i="x";const _0x1a2b3c=require("child_process");';
    const problems = inspectConfig(tampered).join("; ");
    for (const expected of ["whitespace padding", "chars long", "createRequire", "global", "obfuscated", "child_process"]) {
      assert.match(problems, new RegExp(expected));
    }
  });

  it("contain no hidden, padded or dynamically executed code", () => {
    for (const file of configFiles) {
      assert.deepEqual(inspectConfig(read(file)), [], `${file} looks tampered with`);
    }
  });

  it("keeps postcss.config.mjs a small declarative plugin list", () => {
    const text = read("postcss.config.mjs");
    assert.ok(text.length < 1024, `postcss.config.mjs is ${text.length} bytes`);
    assert.match(text, /plugins:\s*\[\s*["']@tailwindcss\/postcss["']\s*,?\s*\]/);
    assert.doesNotMatch(text, /\brequire\s*\(/);
  });
});

describe("repository hygiene", () => {
  it("has no source line long enough to hide a payload", () => {
    const offenders = [];
    for (const file of walk("")) {
      read(file)
        .split("\n")
        .forEach((line, index) => {
          if (line.length > MAX_SOURCE_LINE) offenders.push(`${file}:${index + 1} (${line.length} chars)`);
        });
    }
    assert.deepEqual(offenders, []);
  });

  it("keeps env files out of git and does not ignore dropper scripts", () => {
    const rules = read(".gitignore")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"));
    assert.ok(rules.includes(".env*"), ".gitignore must ignore .env*");
    assert.deepEqual(
      rules.filter((rule) => /\.(bat|cmd|ps1)$/i.test(rule)),
      [],
      "no script files should be hidden through .gitignore"
    );
  });

  it("runs nothing at install time", () => {
    const scripts = JSON.parse(read("package.json")).scripts ?? {};
    for (const hook of ["preinstall", "install", "postinstall", "prepare"]) {
      assert.equal(scripts[hook], undefined, `unexpected "${hook}" script`);
    }
  });
});
