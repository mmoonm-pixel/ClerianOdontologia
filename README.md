# BYO Clinic

Projeto completo do site institucional da BYO Clinic, em Maringá–PR. HTML, CSS e JavaScript estáticos, com todos os assets locais, sem framework e sem dependências de instalação. A estrutura é independente do ambiente em que a prévia foi desenvolvida.

## Requisitos

Node.js 22 ou superior e npm. A versão usada na entrega foi Node.js 24.19.0 / npm 11.9.0. O arquivo `.nvmrc` seleciona Node.js 24.

## Instalar e executar

```bash
git clone https://github.com/mmoonm-pixel/byoclinic.git
cd byoclinic
npm ci
npm run dev
```

Abra `http://127.0.0.1:5173`. Para outra porta: `npm run dev -- --port 8000`. `npm start` também executa o site localmente. O servidor local é apenas para desenvolvimento e revisão.

## Validar e gerar o build

```bash
npm run check
npm run build
npm run preview
```

O build verifica a sintaxe do JavaScript, os JSONs e as referências locais de assets antes de gerar `dist/`. Publique **o conteúdo de `dist/`** em qualquer hospedagem estática. Não há etapa de transpilar ou alterar o design; o build copia os arquivos estáticos validados. `dist/` é gerada e fica fora do Git. O site também funciona em um subdiretório: seus assets usam caminhos relativos.

`npm run preview` serve o build em `http://127.0.0.1:5173`. Se o servidor de desenvolvimento ainda estiver aberto, pare-o com Ctrl+C ou use `npm run preview -- --port 5174`.

## Estrutura

- `index.html`: página principal e conteúdo, incluindo os 16 depoimentos fornecidos.
- `style.css` e `refinements.css`: identidade, responsividade e refinamentos aprovados.
- `app.js`: menu acessível, seção ativa, formulário, vínculos entre serviço e profissional, WhatsApp e animações.
- `gallery.js`: galeria côncava contínua, com perspectiva recalculada durante o movimento e alternativa manual para movimento reduzido.
- `reviews.js`, `reviews-data.json`: carrossel e dados dos depoimentos.
- `map.js`: localização real, mapa Leaflet/OpenStreetMap e marcador personalizado.
- `assets/`: imagens, vídeo, poster, fontes, biblioteca do mapa e respectivas licenças. SVGs da interface e do fundo estão incorporados no HTML e no JavaScript.
- `assets/dr-nykolas-20261029-v3.jpg`: retrato definitivo exibido. O retrato antigo é mantido apenas como material original, sem referências ativas.
- `assets/clinic/`: seis fotografias das instalações; `gallery-manifest.json` registra a sequência e a recepção alternativa.
- `assets/hero.mp4`: vídeo em uso, sem áudio. `hero-byo.mp4` preserva o original recebido.
- `assets/fonts/`: Bodoni Moda e Manrope locais, com suas licenças OFL.
- `hero-opcoes.html`, `hero-options.json`: opções A–D para revisão, sem alternância automática. A página principal usa a opção A.
- `profissionais-previa.html`: proposta separada de layout dos profissionais; não substitui o layout aprovado da página principal.
- `scripts/`: validação, build e servidor local, usando somente módulos nativos do Node.js.
- `referencia/`: referência de composição original, sem uso como conteúdo da página.
- `docs/`: histórico das revisões e inventário original dos materiais. Os arquivos históricos registram o contexto de cada etapa; este README descreve a entrega atual.

## Configuração e serviços externos

Não há variáveis de ambiente obrigatórias, chaves de API ou segredos. Por isso, não é necessário `.env` nem `.env.example`.

As fontes, imagens, vídeos, scripts e estilos são servidos pelo próprio projeto. As únicas dependências de rede durante o uso são os tiles do OpenStreetMap e os destinos externos acionados pelo visitante: WhatsApp, Instagram, Linktree e Google Maps. O mapa preserva a atribuição do provedor e não exige chave. Uma hospedagem com grande volume deve revisar a política de uso dos tiles do OpenStreetMap ou configurar outro provedor compatível.

O formulário **abre uma mensagem no WhatsApp** com os dados preenchidos. Não envia dados automaticamente, não salva informações em banco e não confirma consultas. O profissional é definido pela área selecionada.

Para mudar contatos ou serviços, edite os conteúdos em `index.html` e os vínculos em `app.js`. Os dados geográficos e o marcador estão em `map.js`. As páginas alternativas mantêm suas próprias cópias do conteúdo para revisão.

## Preservação da entrega

Esta exportação corresponde à última revisão aprovada: galeria com centro recuado e laterais próximas, fundo suave com movimento contínuo independente da rolagem, menu com foco separado da seção ativa, novo retrato do Dr. Nykolas, vídeo, formulário, depoimentos, mapa e WhatsApp fixo. As fotografias e vídeos foram copiados sem alterar seu conteúdo. Somente a origem das fontes mudou de Google Fonts para arquivos locais, mantendo famílias, pesos e estilos.

Não são incluídos credenciais, configurações privadas da hospedagem anterior, `node_modules`, screenshots de QA ou arquivos temporários. A configuração de hospedagem Sites permanece no projeto original, sem vincular este repositório a ele.

## Prévia de compartilhamento

O HTML inicial de `index.html` inclui título, descrição, URL canônica, Open Graph e Twitter Card (`summary_large_image`). O domínio configurado é `https://byoclinic.vercel.app/`. A imagem pública é `assets/social/byo-clinic-og-v1.png` (1200 × 630 px); o SVG editável ao lado incorpora a logo original, sem depender de arquivos externos. Caso o domínio principal mude, atualize as URLs absolutas de `canonical`, `og:url`, `og:image`, `og:image:secure_url` e `twitter:image` no HTML.
