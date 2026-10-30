# Refinamento de movimento e leitura — Clerian

## Publicação existente

Repositório: `mmoonm-pixel/ClerianOdontologia`. Branch de trabalho e origem da atualização: `main`, sem proteção obrigatória de PR na inspeção inicial. Fluxo preservado: commit e push → integração GitHub/Vercel. Nenhum projeto, domínio, variável de ambiente ou publicação independente foi criado.

Origem de produção identificada: https://clerianodontologia.vercel.app/. Antes da alteração, o conteúdo de `app.js` dessa URL foi comparado por hash ao commit existente do repositório e era idêntico. O último commit já tinha status Vercel de sucesso.

## Implementação

- `motion.css` centraliza duração, easing, deslocamento, escala e blur. Microinterações em 180 ms, entrada de modal em 300 ms, saída em 260 ms, revelação em 650 ms. Movimento reduzido respeitado.
- `motion.js` compartilha animação de entrada/saída, backdrop, foco, Escape, clique externo e bloqueio/restauração do scroll entre os diálogos. O bloqueio usa o corpo fixo com posição salva, compatível com o padrão usado no iOS. Mantém a página bloqueada enquanto houver qualquer modal aberto. Compensa espaço somente quando uma barra real ocupa largura.
- O viewport visual é acompanhado para limitar a altura do pop-up quando o teclado reduz a área útil. Scroll interno e áreas seguras preservados. O modal nativo conserva a semântica de diálogo e a inércia do fundo durante a saída animada.
- `article-modal.js` apresenta a leitura dentro da página, com seta de retorno, X e histórico Back/Forward. O parâmetro `artigo` pode abrir uma leitura compartilhada. As URLs originais em `/conteudos/<slug>/` continuam existindo e os links dos cards continuam utilizáveis sem JavaScript, por nova aba ou clique modificado.
- `articles-data.js` é gerado por `scripts/sync-articles.mjs` a partir dos quatro textos completos já aprovados. Não há fetch de HTML ou mudança de documento no clique; o conjunto pré-carregado tem aproximadamente 23 KB antes de compressão. Os textos não são mantidos em uma segunda fonte editorial.
- O agendamento permanece acessível dentro do artigo. Fecha de volta para a mesma posição de leitura; fechar o artigo devolve a mesma posição da página principal.
- Removido o comportamento suave global. Rolagem suave apenas para navegação deliberada por âncora. Nenhum scrollIntoView é usado no fechamento dos modais.
- Especialidades, propósito, conteúdos, depoimentos, FAQ e agendamento recebem composições atmosféricas distintas, em vinho/ameixa/rosé/lavanda. Ciclos de 17–25 s, com transform e opacity. Gradientes suaves já pintados, sem animação de blur/filter e sem bibliotecas adicionais. Camadas fora da viewport e atrás de modais ficam pausadas; retomam sem reiniciar o ciclo.
- A revelação mantém estado durante os modais e só se rearma depois de a seção sair da viewport. Os componentes e o DOM da página principal não são recriados.

## Verificação

Chromium real nas larguras 375, 390, 430, 768, 1024 e 1440 px:

- Abertura do agendamento pelo hero, especialidade e seção de agendamento; área selecionada correta; X, Escape, backdrop e reabertura.
- Arraste real por toque no carrossel mobile sem abertura acidental de agendamento.
- Quatro artigos completos em modal, rolagem interna, retorno por seta/X/Escape/Back, Forward e restauração do foco.
- Página principal no mesmo scroll; somente um documento carregado durante as navegações modais; classes de revelação e posições dos carrosséis preservadas.
- Agendamento sobre a leitura, mantendo ambos os níveis de bloqueio e o foco correto.
- Movimento efetivo das seis composições, medido pelos transforms computados e conferido em capturas separadas por 2,5 s. Nenhum filter animado nessas camadas.
- Sem overflow horizontal ou erros de JavaScript. 24 depoimentos preservados.
- URLs diretas de artigos e agendamento nessas páginas preservados. Preferência por movimento reduzido verificada.

Testes adicionais: saídas durante a entrada do modal, Back/Forward rápidos, URL compartilhada, Back com agendamento sobre artigo e redução da área útil do viewport. A disponibilidade do WebKit/Safari foi verificada; o executável não está instalado neste ambiente. A simulação de viewport visual reduzido não equivale a um teste em iPhone físico.

Os corpos HTML das seções existentes, campos do formulário, textos completos dos artigos e assets foram comparados ao estado anterior. Permanecem intactos; a única adição ao corpo principal é o diálogo editorial vazio, preenchido quando aberto. Capturas mobile e desktop foram inspecionadas.
