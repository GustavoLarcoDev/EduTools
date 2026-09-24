// Copies the static demo export (frontend/out) into the repo-root docs/ folder,
// which GitHub Pages serves from the main branch.
import { cpSync, existsSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, "../out");
const docs = resolve(here, "../../docs");

if (!existsSync(out)) {
  console.error("frontend/out not found. Run `next build` with NEXT_PUBLIC_DEMO=true first.");
  process.exit(1);
}

rmSync(docs, { recursive: true, force: true });
mkdirSync(docs, { recursive: true });
cpSync(out, docs, { recursive: true });
// Next.js emits a _next/ folder; .nojekyll stops GitHub Pages from ignoring it.
writeFileSync(resolve(docs, ".nojekyll"), "");
console.log(`Demo exported to ${docs}`);
