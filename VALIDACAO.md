# Validação do refinamento visual Clerian

Inspeção real em Chromium, viewports 320, 390, 768, 1024 e 1440 px, com capturas completas de desktop/mobile e de cada seção. Revisão final das capturas após corrigir o recorte interno da seção de especialidades.

- Menu de sorriso testado nas cinco larguras, com navegação para as seções.
- Hero com título e dois botões; sem parágrafo, legenda, etiqueta, indicação geográfica ou controle visível de vídeo.
- Vídeo carregado, autoplay sem som, loop e reprodução inline preservados; pausa sob movimento reduzido.
- Carrossel: seis áreas documentadas, setas, indicadores, snap, Home/End e setas de teclado; todos os seis botões abriram a área correta no formulário em mobile e desktop.
- Gesto de toque real via protocolo do Chromium avançou ao segundo card, com snap em 334 px no viewport 390. Não há rolagem horizontal da página.
- Fundos orgânicos com transformação contínua, verificada em dois instantes; sob prefers-reduced-motion, animação igual a none.
- Fotografia original cobre toda a seção da doutora; rosto preservado e texto abaixo no mobile, à esquerda no desktop.
- Mapa com tiles reais, marcador com logo original carregada, popup, endereço e rota. Endereço novamente corroborado no diretório público.
- Ícone WhatsApp substituído pelo glifo de marca do Simple Icons, mantendo o contato oficial escolhido.
- Sem erros JavaScript ou imagens ausentes nas larguras testadas.

Os campos, validação e geração de mensagem WhatsApp preservam o fluxo existente. Não houve envio de mensagens. Testes anteriores de nome vazio e data passada continuam aplicáveis, pois essas regras não foram alteradas.

A infraestrutura Chromium local não confia na CA do proxy. Exclusivamente nos testes, os tiles são encaminhados por curl com validação TLS, identificação e Referer, retornando os bytes reais do OpenStreetMap. A aplicação publicada acessa os tiles diretamente por HTTPS. Não há mocks ou desativação de verificação TLS.

Testes de toque foram realizados em emulação do Chromium, sem aparelho físico Safari/iOS ou Android.

## Refinamento final de componentes

Testado em 375, 390, 430, 768 e 1440 px: cards compactos; controles ocultos apenas abaixo de 640 px; seis serviços ativados clicando título, ícone, descrição, superfície e botão; seleção correta no modal único; gesto de toque e arraste por mouse sem abrir modal; snap preservado. Uma ativação estacionária durante o snap aguarda sua conclusão, enquanto gestos com deslocamento suprimem o clique.

Revelações verificadas na entrada, na saída completa e no retorno, com limiar de 15% para entrada, sem reset nas pequenas oscilações. Fundo contínuo independente da revelação. Card de agendamento medido em cerca de 254 px de altura no mobile, 225 px em desktop e 190 px em tablet. Copy da doutora ampliada com fotografia de fundo preservada. Hero, localização e rodapé conservam o HTML aprovado; map.js não foi modificado.

Capturas completas estabilizam apenas o estado de revelação no contexto de screenshot para mostrar todas as seções. A aplicação mantém as animações repetidas.

## Polimento avançado

Chromium nas larguras 375, 390, 430, 768, 1024, 1280 e 1440: navegação horizontal a partir de 960 px, menu mobile com painel e foco contido, nova tipografia Cormorant Garamond local em WOFF2 com Manrope, carrossel com controles ocultos no mobile e toque nativo. Retorno do modal mantém o card escolhido e não apresenta outline de ponteiro nem scroll interno do card. Data/período medidos sem sobreposição em todos os viewports, empilhados no mobile e em duas colunas no desktop. Roteador oferece URLs Google Maps e Waze para o mesmo endereço/ponto confirmado. Modal de rotas fecha e restaura foco/rolagem. Não houve abertura de aplicativos ou envio de mensagens.

A data e o horário são preferências; a equipe confirma o atendimento. A nova copy institucional não adiciona credenciais, especialidades ou dados biográficos. A fotografia e o vídeo originais foram preservados. A geometria do marcador e suas coordenadas também foram mantidas.

## Atualização pontual de navegação e especialidades

Larguras verificadas: 375, 390, 430, 768, 1024 e 1440. Mesmos seis links, na mesma ordem, nos menus e no rodapé: início, especialidades, propósito, doutora, localização e agendamento. IDs únicos, nenhum link interno quebrado, conteúdo das seções preservado e agendamento posicionado após localização para coincidir com a ordem solicitada. Todos os links mobile fecham o painel, restauram a rolagem e deixam o título abaixo do cabeçalho.

A origem da moldura era o outline global de :focus-visible sobre o botão sem cantos definidos. Correção restrita ao menu: sem outline/border/sombra para ponteiro; outline visível e arredondado para teclado. Área de toque 44 × 44 px. SVG fornecido adaptado com transição para X. Capturas abertas/fechadas, carrossel e navegação desktop inspecionadas.

Subtítulo completo em aproximadamente três linhas no mobile. Descrições dos seis serviços já documentados ampliadas, sem incluir outras especialidades nem atribuir técnicas/credenciais. Cards mantêm altura uniforme, snap, arraste, seleção e ativação do agendamento. Não houve inclusão de informações clínicas novas nem envio de mensagens.

## Expansão de conteúdo e depoimentos

Nova navegação com nove destinos reais, na mesma ordem em menus e rodapé. Adicionadas seções leves de conteúdos (perfis oficiais) e dúvidas práticas para receber as âncoras planejadas. Relatos inseridos entre conteúdos e dúvidas. Textos das seis seções anteriormente aprovadas foram comparados com a versão anterior e permaneceram iguais.

24 relatos fornecidos pelo responsável, com cinco estrelas expressamente confirmadas na conversa. Conteúdo integral comparado automaticamente entre JSON e HTML para todos os 24 registros. Sem fotos, avatares ou datas. Expansão/recolhimento dos textos longos preserva cada palavra. Não foram publicadas médias agregadas ou notas coletadas por API.

Chromium em 375, 390, 430, 768, 1024 e 1440 px: menus e âncoras; ausência de duplicação de IDs; ausência de overflow horizontal; carrossel de relatos por toque, mouse, setas e teclado até o último relato; revelações ao entrar/sair/retornar; modo de movimento reduzido; expansão de texto e FAQ. Tiles do mapa preservam a ponte TLS usada nas validações anteriores. Capturas mobile/desktop dos relatos e dos menus foram inspecionadas.


## Área editorial — 30/10/2026

- Chromium real nas larguras 375, 390, 430, 768, 1024 e 1440 px. Quatro páginas lidas em todas as larguras; sem overflow horizontal e sem erros JavaScript.
- Catálogo com um destaque e três artigos secundários, antes dos 24 depoimentos; removidos os dois cards de Instagram dessa seção. Links oficiais no rodapé preservados.
- Clique em todos os cards, URLs próprias, sumários, fontes, retorno ao catálogo e fluxo de agendamento existente verificados. 95 destinos locais verificados, sem links vazios, âncoras ausentes ou IDs duplicados.
- Conteúdo completo utilizável sem JavaScript; preferência por movimento reduzido verificada. Revelação do catálogo testada na entrada e no retorno à viewport. Progresso de leitura e tópico atual funcionais.
- Ilustrações carregadas; capturas do catálogo e da leitura, incluindo artigo completo, inspecionadas em mobile e desktop.
- Comparação do HTML anterior confirmou preservação integral de todo o conteúdo fora da seção de Conteúdos, incluindo hero/vídeo, cabeçalho, especialidades, propósito, Dra. Clariane, 24 depoimentos, FAQ, mapa, agendamento, rodapé e diálogos. JavaScript desses componentes não foi alterado.
- Artigos originais com introdução, cinco seções, conclusão, referências e CTA. Base principal: as duas páginas do Ministério da Saúde solicitadas; NHS como apoio no texto sobre gengiva. Não atribuídos à Dra. Clariane.
- Nenhuma dependência nova. Novos recursos são HTML/CSS/JS e quatro SVGs locais.


### Correção do CTA de agendamento nos artigos

Nos quatro artigos, um clique em Agendar avaliação abre o mesmo formulário diretamente sobre a leitura, sem redirecionar nem exigir um segundo clique. Testado em Chromium a 375 e 1440 px: URL preservada, formulário único por página, campos/validação, período Tarde, preparação da mensagem para o WhatsApp oficial sem envio real, fechamento por botão e Escape, restauração de posição e foco. Sem erros de JavaScript. Capturas mobile e desktop conferidas. Página inicial e seus estilos/funcionalidades sem alterações.


### SEO, identidade da aba e compartilhamento

- Metadados no HTML das cinco páginas, lidos com JavaScript desativado: title, description, canonical, Open Graph e Twitter Card. Título/descrição da página inicial correspondem exatamente aos solicitados. Artigos mantêm título e canonical próprios.
- Imagem JPEG local validada com 1200 × 630 pixels, inspecionada visualmente; frase e logo dentro da região central segura. Ícones oficiais PNG/ICO, Apple Touch Icon, manifesto, robots e sitemap com referências locais válidas e MIME apropriado na prévia do build.
- Corpos HTML das cinco páginas comparados ao commit anterior e preservados byte a byte; nenhum componente visual ou funcional alterado. Sem referências a BYO Clinic no HTML servido.
- A URL publicada era privada e retornava HTTP 401 / Sign in required a visitantes anônimos. Isso impede validadores e robôs externos de ler os metadados; acesso público precisa ser autorizado. Não foi declarada validação externa bem-sucedida enquanto esse bloqueio persistir.
