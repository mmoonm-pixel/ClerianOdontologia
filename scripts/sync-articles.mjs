// Preload the existing four articles as small, inert HTML strings. No request on tap.
import './sync-article-booking.mjs';
import { readFile, readdir, writeFile } from 'node:fs/promises';
const root = new URL('../',import.meta.url);
const articles = {};
for (const entry of await readdir(new URL('conteudos/',root),{withFileTypes:true})) {
  if (!entry.isDirectory()) continue;
  const source = await readFile(new URL(`conteudos/${entry.name}/index.html`,root),'utf8');
  let html = source.match(/<article class="reading-article">[\s\S]*?<\/article>/)?.[0];
  if (!html) throw Error(`Artigo ausente: ${entry.name}`);
  html = html.replace(/(?:src|href)="([^"#][^"]*)"/g,(attribute,value) => {
    if (/^(?:[a-z]+:|\/\/)/i.test(value)) return attribute;
    const url = new URL(value,`https://local.invalid/conteudos/${entry.name}/`);
    return attribute.replace(value,url.pathname + url.search + url.hash);
  });
  html = html.replace('<h1>','<h1 id="article-modal-title">');
  articles[entry.name] = { html, path:`/conteudos/${entry.name}/` };
}
const file = new URL('articles-data.js',root);
const generated = '// Generated from the complete existing reading pages; edit those pages, not this file.\nwindow.ClerianArticles = '+JSON.stringify(articles)+';\n';
let previous;
try { previous = await readFile(file,'utf8'); } catch {}
if (previous !== generated) await writeFile(file,generated);
