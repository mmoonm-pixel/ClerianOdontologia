# Validação do redesign Clerian

Implementação no projeto existente, mantendo a arquitetura estática e a identidade de hospedagem.

## Inspeção no navegador

Chromium real, modo headless, fontes carregadas e animações ativas. Larguras 320, 375, 390, 430, 768, 1024 e 1440 px. Capturas completas e de cada seção em mobile/desktop produzidas durante a inspeção visual.

Verificados: documento em modo padrão; dez cards sem cortes; nenhuma rolagem horizontal; todos os assets locais e vídeo carregados; menu e foco; navegação por âncoras com folga abaixo do cabeçalho fixo; formulário nativo; área pré-selecionada; rejeição de nome em branco e data no passado; URL WhatsApp correta com mensagem codificada; fechamento por botão e Escape; controle de pausa/reprodução do vídeo; mapa com tiles reais, marcador, popup e exploração; movimento reduzido sem revelações ocultas e com vídeo pausado.

Os treze botões de agendamento (dez cards e três chamadas) foram acionados em mobile e desktop. A abertura do WhatsApp foi interceptada no teste: não foram enviadas mensagens.

## Rede de teste

O Chromium deste executor não reconhece o certificado do proxy da sessão, embora a conexão HTTPS seja validada por curl com a CA instalada. Para a inspeção do mapa, somente as requisições de tiles foram encaminhadas pelo teste a curl com validação TLS e identificação do aplicativo, devolvendo os bytes reais do OpenStreetMap. Não se usaram mocks, mapas estáticos, coordenadas estimadas ou desativação de verificação de certificado. Esse encaminhamento existe apenas no teste local; o código publicado acessa OpenStreetMap normalmente por HTTPS, com atribuição visível.

A primeira inspeção identificou tiles de outro fornecedor contendo aviso de chave; esse fornecedor foi descartado. As capturas finais usam OpenStreetMap e foram conferidas visualmente.

## Ajustes após inspeção

- Espaços nas quebras responsivas dos títulos.
- Cards em uma coluna no celular e grid em telas maiores.
- Separação entre o controle do vídeo e o WhatsApp fixo.
- Contraste do cabeçalho sobre trechos claros do vídeo.
- Miniatura herdada substituída por frame real do vídeo Clerian.
- Remoção de componentes, estilos, metadados, materiais e referências legados que não são usados.

## Limites

Testes realizados no Chromium em diferentes viewports; não equivalem a testes físicos de Safari/iOS ou Android. Os links de Instagram e Google Maps foram revisados e o endereço foi corroborado, mas contas externas não foram autenticadas e consultas não foram agendadas. Dados e serviços pendentes estão em DADOS-E-FONTES.md.
