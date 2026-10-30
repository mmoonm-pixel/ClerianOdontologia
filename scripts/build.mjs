import './check.mjs';
import { rm, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { siteFiles } from './files.mjs';
const root = new URL('../', import.meta.url), output = new URL('dist/', root);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of siteFiles) await cp(new URL(entry, root), new URL(entry, output), { recursive: true });
console.log(`Build concluído: ${fileURLToPath(output)}`);
