# BYO Clinic — revisão do fundo, serviço/profissional, navegação e avaliações

Alterações exclusivas do projeto appgprj_6ae36cb9b9f08191895c216912f07767. As fotografias, logo, arquivo de vídeo, contatos, mapa, rodapé e disposição atual dos profissionais foram preservados. A proposta separada dos profissionais continua em sua página de prévia.

## Fundo
Creme predominante, camada dourada com opacidade 18%, camadas decorativas com blur estático de 42/46/52px. Transform anima em ciclos alternados de 24/29/33s, em fases independentes, deslocamentos de 28 a 40px e escalas de 1 a 1.04. Um contêiner sticky limita as superfícies desfocadas à altura visível, em vez de rasterizar SVGs de toda a altura da página. Os elementos de conteúdo não recebem filter. Em movimento reduzido, a decoração para e o vídeo fica no poster.

Verificado no Chromium em 390 e 1440px por captura de frames reais separados por seis segundos. Comparação do trecho decorativo abaixo de y=300, excluindo o vídeo: mudanças em pixels nas duas larguras, até 7 níveis de cor, com os filtros permanecendo idênticos. A camada dourada deslocou-se aproximadamente 17–18px no intervalo observado. As animações calculadas estavam ativas e não bloqueadas por outra regra.

## Formulário
Campo Profissional somente leitura. Área selecionada determina o nome curto:
- Próteses dentárias / Lentes de contato dental / Implantes: Dr. Nykolas.
- Harmonização orofacial / Nutrição clínica: Dra. Brenda.

Botões gerais abrem área e profissional vazios. Cards preenchem ambos. Botões individuais limitam as áreas compatíveis com aquele profissional, mas aguardam a escolha da área antes de preencher o campo. Trocar a área atualiza imediatamente o profissional. A mensagem WhatsApp contém Área de interesse e Profissional; não contém preferência nem confirmação de consulta.

## Menu
A seção visível sob o cabeçalho define aria-current="location" em todas as cópias dos links. Cliques atualizam o estado e a rolagem manual o recalcula. Enquanto os overlays estão abertos, a leitura de posições fica suspensa para não interpretar o travamento da página como mudança de seção. Fundo terracota suave e ponto visual indicam o ativo.

## 16 avaliações
Fonte: transcrições completas fornecidas explicitamente pelo usuário nesta revisão, a partir dos prints. Não são apresentadas como importação automática do Google. Os nomes, textos, acentos, quebras de linha e notas de cinco estrelas foram preservados exatamente. Bruno Roxo aparece uma única vez; Mateus Galvão não foi incluído. Matheus Campaner é um registro distinto e foi incluído conforme a lista fornecida.

Conteúdo real no HTML, inclusive sem JavaScript. Sem datas relativas fixas, sem fotos fictícias e sem média calculada a partir desta seleção. A interface informa que é uma seleção de 16. Iniciais, fonte Google, rolagem nativa, teclado, controles de 44px, indicador de posição e Ler mais quando houver transbordamento visual. Sem avanço automático. O JSON local mantém as transcrições e sua procedência; não há dependência de API para mostrar os registros.

## Verificações
360, 390, 430, 768 e 1440px: sem overflow horizontal; 16 nomes/comentários comparados com os dados de origem; cinco estrelas por registro; cinco vínculos área/profissional; reset correto em botões gerais; opções compatíveis nos botões individuais; mensagem WhatsApp; seção ativa por rolagem e ao reabrir menu; campo profissional somente leitura. Controles e Home/End conferidos até o último depoimento. Expansão/recolhimento de texto e movimento reduzido também conferidos. Sem erros JavaScript nos testes concluídos. Nenhuma mensagem foi enviada pelo WhatsApp durante a validação.
