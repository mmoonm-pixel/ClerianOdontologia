import './sync-article-booking.mjs';
import './sync-articles.mjs';
import { readFile, readdir, stat, access } from 'node:fs/promises';
import { resolve, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { siteFiles } from './files.mjs';
const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
let files = [], references = 0;
async function walk(path) {
  const info = await stat(path);
  if (info.isDirectory()) { for (const name of await readdir(path)) await walk(resolve(path, name)); }
  else files.push(path);
}
for (const entry of siteFiles) await walk(resolve(root, entry));
for (const file of files) {
  const extension = extname(file);
  if (!['.html', '.css', '.js', '.json'].includes(extension)) continue;
  const source = await readFile(file, 'utf8');
  if (extension === '.json') JSON.parse(source);
  if (extension === '.js') {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.status !== 0) throw Error(result.stderr);
  }
  if (/\/(?:workspace|tmp|codex-remote-attachments)\//.test(source)) throw Error(`Caminho deste ambiente em ${relative(root, file)}`);
  const refs = extension === '.html' ? [...source.matchAll(/(?:src|href|poster)=["']([^"']+)["']/g)].map(m => m[1]) : extension === '.css' ? [...source.matchAll(/url\(["']?([^\s)'";]+)["']?\)/g)].map(m => m[1]) : extension === '.js' ? [...source.matchAll(/["'](assets\/[^"']+)["']/g)].map(m => m[1]) : [];
  for (const ref of refs) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(ref)) continue;
    const path = decodeURIComponent(ref.split(/[?#]/)[0]);
    if (!path) continue;
    const target = resolve(dirname(file), path);
    if (target !== root && !target.startsWith(root + "/")) throw Error(`Referência fora do projeto: ${ref}`);
    try { await access(target); } catch { throw Error(`Asset ausente: ${relative(root, file)} → ${ref}`); }
    references++;
  }
}
console.log(`Verificação concluída: ${files.length} arquivos e ${references} referências locais válidas; JavaScript e JSON sem erros.`);
