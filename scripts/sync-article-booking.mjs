// The homepage is the single source for the scheduling form used by reading pages.
import { readFile, readdir, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const homepage = await readFile(new URL('index.html', root), 'utf8');
const dialog = homepage.match(/<dialog id="booking-modal"[\s\S]*?<\/dialog>/)?.[0];
if (!dialog) throw Error('Formulário de agendamento não encontrado na página inicial.');
const start = '<!-- shared-booking:start -->';
const end = '<!-- shared-booking:end -->';
for (const entry of await readdir(new URL('conteudos/', root), { withFileTypes:true })) {
  if (!entry.isDirectory()) continue;
  const file = new URL(`conteudos/${entry.name}/index.html`, root);
  const previous = await readFile(file, 'utf8');
  const shared = `${start}${dialog}${end}`;
  let source = previous.replace(/<a class="button" href="\.\.\/\.\.\/#agendamento">([\s\S]*?)<\/a>/g,
    '<button class="button" type="button" data-article-book aria-haspopup="dialog" aria-controls="booking-modal">$1</button>');
  source = source.includes(start)
    ? source.replace(/<!-- shared-booking:start -->[\s\S]*?<!-- shared-booking:end -->/, () => shared)
    : source.replace('</body>', `${shared}</body>`);
  if (source !== previous) await writeFile(file, source);
}
