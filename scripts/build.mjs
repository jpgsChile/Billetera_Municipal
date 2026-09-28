import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const filename of ["index.html", "styles.css", "app.js"]) {
  await copyFile(join(root, filename), join(output, filename));
}

console.log("Demo compilada en dist/");
