# Identidade de compartilhamento da Clerian

Origem real utilizada: https://clerian-odontologia-previa.lunarotter30.chatgpt.site/

## Página inicial

- Nome: Clerian Odontologia
- Título: Clerian Odontologia | Cuidado que vai além do sorriso
- Descrição: Mais que sorrisos, experiências de transformação. Conheça a Clerian Odontologia, uma clínica de odontologia integrada em Guarulhos, dedicada ao cuidado, ao acolhimento e ao bem-estar.
- Imagem: `/assets/og-clerian.jpg`, JPEG, 1200 × 630 pixels. Fundo abstrato institucional; logo oficial do projeto aplicada na versão branca já usada no cabeçalho, sem redesenho do símbolo; tipografia local e texto compostos de forma determinística. Conteúdo principal afastado das bordas.

Os metadados ficam diretamente no HTML estático: title, description, canonical, Open Graph (incluindo tipo, idioma, dimensões e texto alternativo) e Twitter Card. Não dependem de JavaScript. Os quatro artigos preservam seus próprios títulos, descrições e URLs canônicas; usam `og:type=article` e a mesma identidade de compartilhamento.

## Ícones

`favicon.ico` contém 16, 32 e 48 pixels. PNGs em `assets/icons/`: 16 e 32 pixels para navegador, Apple Touch Icon 180, ícones web 192/512 e versão maskable 512 com margem segura. Derivados do símbolo oficial, preservando desenho, cores e proporção. Os arquivos originais da logo não foram alterados.

`site.webmanifest` define nome, cores e ícones. Não adiciona service worker ou promessa de funcionamento offline. `robots.txt` e `sitemap.xml` incluem as cinco páginas reais do site.

## Acesso e verificação externa

A prévia era privada e respondia HTTP 401, com “Sign in required”, para visitantes anônimos. Isso também impede a leitura pelos robôs das redes sociais. Metadados corretos não contornam a autenticação da hospedagem. A liberação pública deve ser autorizada pelo proprietário.

Depois da liberação, conferir com acesso anônimo:

1. A página retorna HTTP 200 e apresenta os metadados da Clerian no código-fonte.
2. A URL absoluta de `og-clerian.jpg` retorna HTTP 200, Content-Type image/jpeg e a imagem de 1200 × 630.
3. Ícones, manifesto, robots e sitemap respondem sem login.
4. Reprocessar o endereço no Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/) e no LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/). Essas ferramentas podem exigir login da plataforma.
5. Compartilhar novamente no WhatsApp; não existe garantia de atualização imediata de cartões já armazenados em cache. Não é possível forçar uma atualização universal desse cache a partir do site.

Se a clínica adotar outro domínio real, atualizar canonical, og:url, URLs absolutas da imagem, sitemap e robots para a origem publicada. Não usar o endereço do repositório GitHub como se fosse um site hospedado.
