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
