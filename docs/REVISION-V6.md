# BYO Clinic — correção definitiva do foco, arco 3D e retrato

Projeto exclusivo appgprj_6ae36cb9b9f08191895c216912f07767. Mantidos vídeo, frase do hero, fundo suave, fotos dos ambientes, formulário, mapa, contatos, rodapé e WhatsApp fixo.

## Menu
Causa encontrada: openMenu enviava foco ao primeiro link em toda abertura, inclusive por toque, e o navegador podia preservar focus-visible ao devolver foco ao hambúrguer. Agora o método de entrada é rastreado somente para o cabeçalho: ponteiro elimina outline e box-shadow em seus controles; teclado mostra apenas um sublinhado discreto em terracota. O restante do site mantém seus estilos de foco.

Na abertura por toque/mouse, o foco permanece no botão. Na abertura por teclado, vai ao item correspondente à seção atual. Só a seção atual recebe fundo bege, fonte terracota em destaque e ponto lateral. Foco em outro link não recebe o fundo ativo.

Segunda causa corrigida: a altura expandida do painel era usada no scroll-padding das âncoras. O cálculo agora usa a linha compacta do cabeçalho, independentemente da expansão. A rolagem suave pendente é cancelada na posição corrente antes do travamento do body, prevenindo deslocamento ao reabrir durante a navegação.

## Galeria
Nova geometria de um segmento cilíndrico: posições laterais calculadas por seno, profundidade por cosseno e orientação rotateY continuamente ligada à posição angular. A faixa visível é limitada ao arco frontal, sem rotação de roda completa. Fotos centrais ficam frontais e mais próximas; laterais inclinam progressivamente e são recortadas somente nas bordas da janela.

Uma sequência acessível mais uma cópia inert/aria-hidden. As larguras preservam os aspectos originais dos arquivos. Desktop: fotos com altura-base de 250px; mobile: 130px para exibir o conjunto com três ou mais fotografias inteiras/parciais. Fundo claro, cantos arredondados e sombra discreta, sem molduras pretas.

Velocidade constante: 63px/s no desktop e 48px/s no mobile, exatamente 1,5 vez a velocidade linear anterior. Não existem pausa por hover, foco, toque ou ponteiro pressionado, nem aceleração/desaceleração por foto. A fase é independente do scroll vertical. O botão Pausar e seu contêiner foram removidos. Movimento reduzido fornece faixa estática com navegação manual; apenas nesse modo a cópia é ocultada. A galeria não renderiza quadros de movimento quando a aba ou a região estão fora de vista.

## Retrato definitivo
Arquivo recebido: 76F575EE-931D-4F52-BA35-C4DCF63537F2/1-Fotografia-1.jpg, 804 × 1020 pixels. Cópia binária sem edição publicada como assets/dr-nykolas-20261029-v3.jpg. SHA-256: 4f279d75c56235571881c2ad03c37cd8d12a8c2e3f2f6baa4b9259dd384e7350.

Todas as referências ativas, incluindo a página de proposta dos profissionais, passaram ao novo nome. Não há srcset, fundo CSS ou componente usando o caminho antigo. Arquivo original anterior fica preservado como material histórico, sem referência ativa. CSS da imagem tem border/padding/box-shadow zero e fundo transparente; dimensão e proporção do novo JPEG foram mantidas. Nome Dr. Nykolas e foto da Dra. Brenda preservados.

## Validação
360/390/430/768/1440px: sem overflow horizontal; retrato decodificado como 804×1020; SHA-256 obtido pelo navegador idêntico ao anexo; border/padding computados em 0px. Menu por toque sem contorno em links ou botão, sem foco automático no Início; Serviços continua ativo ao reabrir; foco de teclado discreto e funcional. Testes de restauração do scroll com tolerância de dois pixels.

Duas voltas completas em tempo real do novo arco verificadas em 390 e 1440px, com análise dos mesmos arquivos fotográficos antes/depois da emenda. Os deslocamentos da passagem ficaram dentro do comportamento de um quadro normal; não houve espaço vazio nem retorno visível. A orientação variou durante o deslocamento. Swipe/toque não interromperam a fase, modo reduzido manual funcionou e WhatsApp permaneceu fixo. Nenhum erro JavaScript nos testes concluídos; nenhuma mensagem enviada ao WhatsApp.

## Limite da referência
Os novos anexos acessíveis são dois JPEGs idênticos do retrato. Não há vídeo nem prints de referência da galeria entre os arquivos disponibilizados ao ambiente. O arco foi implementado e validado conforme a descrição detalhada, sem afirmar comparação direta com um vídeo não acessível. A única pendência externa é essa comparação com o arquivo de referência.
