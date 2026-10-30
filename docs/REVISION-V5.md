# BYO Clinic — hero, galeria do espaço, depoimentos e menu

Projeto exclusivo: appgprj_6ae36cb9b9f08191895c216912f07767. Conferida a versão remota antes de editar. Preservados o vídeo do hero, os dois botões inferiores, o fundo suave, o mapa, o rodapé, o formulário e os vínculos serviço/profissional.

## Frases
Opção A aplicada: Cuidado que une saúde, estética e bem-estar.
Apoio: Odontologia integrada, harmonização orofacial e nutrição em Maringá.
Opções A–D estão em hero-opcoes.html e hero-options.json. A escolha é explícita via links ?hero=A/B/C/D; nunca existe rotação automática de frases.

## Fotos das instalações
Os seis JPEGs foram copiados sem edição de pixels para assets/clinic, mantendo suas cores e proporções. Sequência principal: IMG_8049 (recepção), IMG_8050 (marca), IMG_8051 (espera), IMG_8053 (consultório), IMG_8054 (corredor). IMG_8049 preserva o contexto do balcão e cadeira; a similar IMG_8052 foi mantida como alternativa publicada e identificada no manifesto da galeria.

A foto conjunta da equipe saiu da seção Sobre; os retratos aparecem somente na seção de profissionais. Galeria acima do título e texto em todas as larguras; texto limitado a 820px e alinhado à esquerda.

## Movimento
Galeria horizontal com fotos de larguras naturais e altura de 340px no desktop e 245px no mobile. Perspectiva individual até 9 graus conforme a posição, sombra leve e cantos arredondados. Sem molduras escuras, sem filtro de cor e sem recortes internos. Uma única sequência duplicada por JavaScript tem aria-hidden e inert; as imagens duplicadas têm alt vazio. Com JavaScript indisponível, permanecem as cinco imagens originais em uma faixa de rolagem manual.

Movimento contínuo da direita para esquerda, sem encaixe obrigatório por foto. Posição acumulada em ponto flutuante, baseada no tempo; o wrap conserva o excesso de posição, sem reiniciar a trajetória. Projeções usam métricas em cache para evitar alternar leituras e escritas de layout a cada foto. Objetos fora da tela não recebem projeção ativa.

Pausa manual, hover, foco no desktop e interação por toque. O arraste usa a rolagem nativa no mobile sem interceptar o gesto vertical. Ao terminar, há um breve tempo de espera e uma rampa de retomada a partir da posição atual. Movimento reduzido oculta a cópia e o controle de reprodução, oferecendo faixa manual e navegação por teclado. Eventos de visibilidade reiniciam apenas o relógio de quadros, mantendo a posição.

## Depoimentos e menu
Preservados os 16 autores, textos e estrelas. Removidos o texto de seleção, o contador visual e o link complementar de mais avaliações; no mobile, setas ocultas e swipe mantido. Desktop mantém controles discretos e teclado.
Foco do cabeçalho agora terracota com focus-visible, separado do destaque persistente da seção e do estado de toque. Não há contorno amarelo do menu; teclado mantém foco visível.

## Verificação
360, 390, 430, 768 e 1440px: sem overflow horizontal; galeria acima do texto; alturas esperadas; 16 depoimentos comparados com o JSON original; controles de avaliações somente no desktop; opções A–D verificadas; pausa/reprodução sem voltar ao começo. Conferidos swipe nativo e retomada, modos de toque e teclado no menu e galeria manual com movimento reduzido.

Duas voltas completas observadas em tempo real em 390 e 1440px, sem acelerar o relógio da animação. Mobile: período de 1522.1875px; desktop: 2111.453125px. As emendas conservaram a posição dos mesmos elementos visuais; os deslocamentos medidos na passagem foram compatíveis com um quadro normal. Testes em qa-v5-loops.cjs e qa-v5-interaction.cjs. Nenhuma mensagem WhatsApp foi enviada durante a validação.

## Arquivos ainda não acessíveis
IMG_8018(2).jpeg e o vídeo de referência da galeria não estão nos anexos disponibilizados ao ambiente, apesar de o usuário informar que os adicionou. Foram pesquisados os anexos atuais e as pastas de arquivos compartilhados. O retrato atual do Dr. Nykolas foi mantido; seu componente está sem padding, fundo ou borda na própria imagem, pronto para receber a nova foto. A fotografia da Dra. Brenda foi preservada. O movimento da galeria foi implementado conforme a descrição textual, sem afirmar correspondência com um vídeo não recebido. Para concluir esses dois pontos, os arquivos precisam ser disponibilizados novamente.
