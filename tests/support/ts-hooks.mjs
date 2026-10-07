// Module hooks for the node:test suite: load the project's .ts/.tsx sources
// (transpiled in memory with the TypeScript compiler the project already has)
// and resolve the "@/..." alias from tsconfig.json. No extra dependency.
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const ROOT = resolvePath(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SRC = resolvePath(ROOT, "src");
const TS_FILE = /\.tsx?(\?.*)?$/;
const CANDIDATES = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];

function findFile(base) {
  for (const suffix of CANDIDATES) {
    const candidate = base + suffix;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  const parent = context.parentURL ?? "";
  let base = null;
  if (specifier.startsWith("@/")) {
    base = resolvePath(SRC, specifier.slice(2));
  } else if (/^\.\.?\//.test(specifier) && TS_FILE.test(parent)) {
    base = resolvePath(dirname(fileURLToPath(parent)), specifier);
  }
  if (base) {
    const file = findFile(base);
    if (file) return { url: pathToFileURL(file).href, shortCircuit: true };
  }
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    // Bundler-style deep imports without an extension, e.g. "next/link".
    const bare = !/^[./]|^file:|^node:/.test(specifier);
    if (error?.code === "ERR_MODULE_NOT_FOUND" && bare && !/\.[cm]?js$/.test(specifier)) {
      return nextResolve(`${specifier}.js`, context);
    }
    throw error;
  }
}

export async function load(url, context, nextLoad) {
  if (url.startsWith("file:") && TS_FILE.test(url) && !url.includes("/node_modules/")) {
    const fileName = fileURLToPath(url);
    const { outputText } = ts.transpileModule(readFileSync(fileName, "utf8"), {
      fileName,
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
        isolatedModules: true,
      },
    });
    return { format: "module", source: outputText, shortCircuit: true };
  }
  return nextLoad(url, context);
}
