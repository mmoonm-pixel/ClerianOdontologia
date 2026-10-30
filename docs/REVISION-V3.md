# Revisão da BYO Clinic — 29/10/2026

## Fonte e preservação
Site existente: appgprj_6ae36cb9b9f08191895c216912f07767. Conferido HEAD remoto antes de editar. Nenhum outro site alterado. Vídeo, fotografias originais, contato, mapa e rodapé preservados. O fundo é composto somente por três SVGs abstratos independentes, sem conteúdo fotográfico, com ciclos de 29, 37 e 43 segundos.

## Profissionais
Nova proposta está em `profissionais-previa.html#profissionais`: dois cards editoriais no desktop, retratos grandes acima do texto e um card por linha no mobile. As fotos permanecem inteiras, sem recorte dos rostos. A seção do site principal mantém a disposição anterior até revisão da prévia pelo usuário. Os nomes visíveis e opções do formulário foram reduzidos a Dr. Nykolas e Dra. Brenda, conforme solicitado. A página de proposta usa o mesmo formulário funcional.

## Menu, modal e WhatsApp
O menu mobile é uma extensão do próprio cabeçalho (não um dialog separado), com altura animada de 350ms, itens escalonados, Escape, contenção do foco e restauração da rolagem. O modal usa dialog nativo, cabeçalho persistente e corpo com rolagem independente. Campos têm 48px e fonte de 16px; data e período ficam separados abaixo de 540px. VisualViewport ajusta altura e posição para abertura do teclado. A funcionalidade foi conferida em viewport de altura reduzida; não foi usado um iPhone físico.

Removida a causa do deslocamento do WhatsApp: o código anterior calculava offsets durante a rolagem e aplicava transform ao botão. Agora existe uma única instância diretamente no body, fixed, sem transform e sem animação de entrada ou pulsação, com safe-area. Oculta enquanto menu ou modal estiver aberto.

## Avaliações — pendência concreta
Fonte primária confirmada no Google Maps: 0x94ecd78301f6ee19:0xfffa075888f3407d, coordenadas -23.425089,-51.9580608. Telefone (44) 99145-3406 e Rua Antônio Carniel, 520 conferidos. A consulta pública em 29/10/2026 confirma 38 avaliações e nota geral 5,0. Esta informação agregada aparece no site, identificada como nota geral da ficha.

Avaliações individuais recuperadas e verificadas: 0 de 38. A interface pública deste acesso informa que é uma visualização limitada e exige login para ler e pesquisar avaliações. Não foi contornado esse acesso. Os textos do DentMap não foram tratados como originais verificados.

Para completar, falta acesso autorizado às avaliações ou exportação/capturas com nome público, nota, texto original e data quando disponível. `reviews-data.json` preserva o resumo confirmado e uma lista vazia de registros individuais. `reviews.js` já implementa carrossel com fonte por avaliação, estrelas reais, datas opcionais e Ler mais. Registros só são exibidos com marca de verificação, id único, autoria, nota válida e fonte Google. Não existem comentários, autores ou estrelas individuais inventados.

## Verificação
Chromium em 360, 390, 430, 768 e 1440 px: nenhum overflow horizontal; título do modal visível; campos com alturas uniformes; datas e períodos separados no mobile; Escape, pré-preenchimento por serviço e profissional, mensagem WhatsApp organizada; âncoras sem títulos ocultos; rolagem interna do formulário em viewport de 400px; WhatsApp permanece a 16px/18px das bordas ao subir e descer. Nenhum erro JavaScript observado. Vídeo vira poster em prefers-reduced-motion. As animações de entrada executam uma vez por elemento.
