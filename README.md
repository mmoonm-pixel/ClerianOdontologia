# Clerian Odontologia

Site institucional estático da Clerian em Guarulhos. HTML semântico, CSS com tokens globais e JavaScript sem framework. O projeto preserva o vídeo, a logo transparente e o retrato fornecidos. Não há dependências de aplicação para instalar.

## Executar

Requer Node.js 22 ou superior.

```bash
npm install
npm run dev
```

Abra http://localhost:5173. O servidor local atende apenas o computador que o executa.

```bash
npm run check
npm run build
npm run preview
```

`dist/` contém a distribuição estática. A identidade de hospedagem existente está em `.openai/hosting.json`.

## Organização

- `index.html`: conteúdo, metadados e formulário.
- `style.css`: tokens de cor, tipografia, componentes, responsividade e movimento reduzido.
- `app.js`: menu, agendamento via WhatsApp, vídeo e revelações.
- `map.js`: Leaflet local, carregado sob demanda visual, tiles OpenStreetMap com atribuição, marcador próprio e rota Google Maps.
- `assets/`: vídeo, imagens, fontes locais e vendor Leaflet com licença.

## Conteúdo e dados

Consulte `DADOS-E-FONTES.md`. As áreas de cuidado não são uma garantia de disponibilidade atual; o site orienta o visitante a consultar a equipe. O formulário prepara uma mensagem no WhatsApp e não armazena dados nem confirma uma consulta. Nenhuma mensagem é enviada automaticamente.

O mapa tem arraste desativado inicialmente para preservar a rolagem da página; “Explorar mapa” ativa a exploração e o teclado. Se os tiles externos não carregarem, o endereço e a rota continuam acessíveis.

## Acessibilidade

Navegação com teclado, link de salto, foco visível, dialog nativo, controle do vídeo, suporte a movimento reduzido, fontes locais e carrossel com snap, setas, indicadores, teclado, arraste por mouse e toque nativo. Sem JavaScript, o conteúdo continua legível e os links diretos do WhatsApp e de rotas permanecem disponíveis.

O cabeçalho usa o menu de sorriso em todas as larguras. O hero reproduz o vídeo em loop e sem som; com movimento reduzido, usa o frame estático da Clerian. A foto da doutora cobre toda a seção e o mapa usa a logo original dentro do marcador.

Polimento de interface: títulos em Cormorant Garamond (OFL, hospedada localmente em WOFF2); navegação desktop horizontal; painel mobile com fechamento próprio; seletor de rotas compartilhado entre mapa e endereço, com Google Maps e Waze. O formulário empilha data/período em celulares, sem alterar o fluxo WhatsApp.

A seção de depoimentos usa HTML estático para leitura imediata e reviews.js para navegação, snap e expansão dos comentários. testimonials.json registra os 24 relatos enviados pelo responsável e a confirmação das notas. Conteúdos e dúvidas possuem âncoras próprias e informações práticas já documentadas.
