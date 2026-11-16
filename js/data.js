/* =========================================================
   DETETIVES DA MATÉRIA — conteúdo
   Tudo o que aparece na tela está aqui: textos, casos, quiz.
   ========================================================= */

window.DM = window.DM || {};

/* ---------- CRÉDITOS DO TRABALHO ACADÊMICO ---------- */
DM.creditos = {
  logo: 'assets/img/logo-unimam.png',          // cores originais (usada no certificado, fundo claro)
  logoClara: 'assets/img/logo-unimam-clara.png', // versão para fundo escuro (tela inicial)
  instituicao: 'UNIMAM · Centro Universitário Maria Milza',
  disciplina: 'Química Geral e Inorgânica',
  docente: 'Uiara Souza',
  discentes: ['Amanda', 'Andressa', 'Bruna', 'Késsia', 'Larah', 'Sheila'],
  desenvolvedor: 'Quervin Damasceno do Nascimento',
  instagram: '@quervin__'
};
DM.listaNomes = (l) => l.length > 1 ? l.slice(0, -1).join(', ') + ' e ' + l[l.length - 1] : l.join('');

/* ---------- CENTRAL DE CONHECIMENTOS ---------- */
DM.conhecimentos = [
  {
    id: 'materia',
    codigo: 'ARQ-01',
    titulo: 'Matéria',
    resumo: 'Tudo o que tem massa e ocupa lugar no espaço.',
    texto: 'Matéria é <strong>tudo aquilo que tem massa e ocupa lugar no espaço</strong>. A água do copo, o ar que enche um balão, a madeira da mesa e o nosso próprio corpo são matéria. Ela é formada por partículas muito pequenas (átomos e moléculas), que podem estar mais juntas ou mais afastadas.',
    pontos: [
      ['Sólido', 'Partículas bem juntas e organizadas: forma e volume fixos.'],
      ['Líquido', 'Partículas próximas, mas que deslizam: volume fixo, forma do recipiente.'],
      ['Gasoso', 'Partículas afastadas e agitadas: ocupam todo o espaço disponível.']
    ],
    pista: 'Luz, som e calor <strong>não</strong> são matéria: não têm massa. Eles são formas de energia.',
    ilustracao: 'estados'
  },
  {
    id: 'energia',
    codigo: 'ARQ-02',
    titulo: 'Energia',
    resumo: 'A capacidade de realizar trabalho e provocar transformações.',
    texto: 'Energia é <strong>a capacidade de realizar trabalho ou de provocar transformações</strong> na matéria. Ela não pode ser criada nem destruída, apenas <strong>transformada</strong> de uma forma em outra: a energia química do gás de cozinha vira energia térmica na chama.',
    pontos: [
      ['Térmica', 'Calor que faz a água ferver e evaporar.'],
      ['Elétrica', 'Faz a lâmpada e o aquecedor funcionarem.'],
      ['Luminosa', 'A luz do Sol, que seca a água das salinas.'],
      ['Química', 'Guardada nos combustíveis e nos alimentos.']
    ],
    pista: 'Na <strong>evaporação</strong> e na <strong>destilação</strong>, o detetive fornece energia térmica para a água mudar de estado e se separar do sal.',
    ilustracao: 'energia'
  },
  {
    id: 'pura',
    codigo: 'ARQ-03',
    titulo: 'Substâncias puras',
    resumo: 'Um único tipo de componente, com propriedades constantes.',
    texto: 'Uma substância pura é formada por <strong>um único tipo de componente</strong>. Por isso tem <strong>composição fixa</strong> e propriedades constantes: a água pura, ao nível do mar, sempre ferve a 100 °C e congela a 0 °C.',
    pontos: [
      ['Simples', 'Formada por um só elemento químico: gás oxigênio (O₂), ferro (Fe).'],
      ['Composta', 'Formada por dois ou mais elementos: água (H₂O), sal de cozinha (NaCl).']
    ],
    pista: 'Temperatura de fervura que <strong>não muda</strong> durante todo o aquecimento é sinal de substância pura.',
    ilustracao: 'pura'
  },
  {
    id: 'misturas',
    codigo: 'ARQ-04',
    titulo: 'Misturas',
    resumo: 'Duas ou mais substâncias juntas, cada uma com suas propriedades.',
    texto: 'Mistura é a união de <strong>duas ou mais substâncias</strong> em que cada uma mantém suas propriedades. A composição é variável (pode ter mais ou menos sal na água) e a mistura <strong>não tem temperatura de fervura fixa</strong>.',
    pontos: [
      ['Componente', 'Cada substância que faz parte da mistura.'],
      ['Fase', 'Cada parte da mistura com aspecto uniforme. Água + óleo tem 2 fases.'],
      ['Separação', 'Como cada componente mantém suas propriedades, dá para separá-los.']
    ],
    pista: 'Contar as fases é o primeiro passo da investigação: <strong>1 fase</strong> = homogênea, <strong>2 ou mais</strong> = heterogênea.',
    ilustracao: 'misturas'
  },
  {
    id: 'homogenea',
    codigo: 'ARQ-05',
    titulo: 'Misturas homogêneas',
    resumo: 'Uma única fase: não dá para ver os componentes.',
    texto: 'Na mistura homogênea, os componentes estão tão bem misturados que formam <strong>uma única fase</strong>. Nem com lupa ou microscópio comum conseguimos distinguir um do outro. Também é chamada de <strong>solução</strong>.',
    pontos: [
      ['Exemplos', 'Água + sal dissolvido, água + açúcar, água + álcool, vinagre, ar filtrado.'],
      ['Separação', 'Pede métodos que usam mudança de estado, como evaporação e destilação.']
    ],
    pista: 'Se puser sal demais, o excesso fica no fundo do copo e a mistura passa a ter <strong>2 fases</strong>: vira heterogênea.',
    ilustracao: 'homogenea'
  },
  {
    id: 'heterogenea',
    codigo: 'ARQ-06',
    titulo: 'Misturas heterogêneas',
    resumo: 'Duas ou mais fases: dá para ver a divisão.',
    texto: 'Na mistura heterogênea é possível perceber <strong>duas ou mais fases</strong>, a olho nu ou com lupa. Os componentes ficam separados por regiões, como o óleo boiando sobre a água.',
    pontos: [
      ['Exemplos', 'Água + óleo, água + areia, granito, feijão + pedrinhas, areia + limalha de ferro.'],
      ['Separação', 'Usa diferenças de tamanho, densidade ou magnetismo: filtração, decantação, catação, peneiração, ímã.']
    ],
    pista: 'O granito tem <strong>3 fases</strong>: quartzo, feldspato e mica. Cada cor é um componente diferente.',
    ilustracao: 'heterogenea'
  }
];

/* ---------- LABORATÓRIO DE MÉTODOS ---------- */
DM.metodos = [
  {
    id: 'filtracao',
    nome: 'Filtração',
    principio: 'Diferença de tamanho entre as partículas',
    mistura: 'Heterogênea: sólido + líquido',
    texto: 'O filtro tem poros minúsculos. O líquido atravessa e o sólido, maior que os poros, fica retido no papel.',
    passos: ['A mistura é despejada no funil com papel de filtro.', 'O sólido (resíduo) fica preso no papel.', 'O líquido (filtrado) escorre para o béquer.'],
    cotidiano: 'Coar o café; o filtro de barro que limpa a água.',
    cena: 'filtracao'
  },
  {
    id: 'decantacao',
    nome: 'Decantação',
    principio: 'Diferença de densidade',
    mistura: 'Heterogênea: sólido + líquido ou líquidos que não se misturam',
    texto: 'Em repouso, o componente mais denso vai para o fundo. Com o funil de separação, abrimos a torneira e retiramos só a camada de baixo.',
    passos: ['A mistura descansa no funil de separação.', 'A água, mais densa, fica embaixo; o óleo, em cima.', 'A torneira é aberta e fechada quando a água acaba.'],
    cotidiano: 'Estações de tratamento de água deixam a sujeira assentar no fundo dos tanques.',
    cena: 'decantacao'
  },
  {
    id: 'magnetica',
    nome: 'Separação magnética',
    principio: 'Propriedade magnética de um dos componentes',
    mistura: 'Heterogênea: sólidos, um deles atraído por ímã',
    texto: 'O ímã atrai metais como o ferro e deixa para trás o que não é magnético, como a areia.',
    passos: ['O ímã é aproximado da mistura.', 'A limalha de ferro salta e gruda no ímã.', 'A areia fica na bandeja.'],
    cotidiano: 'Usinas de reciclagem separam latas de aço do lixo com grandes eletroímãs.',
    cena: 'magnetica'
  },
  {
    id: 'evaporacao',
    nome: 'Evaporação',
    principio: 'O líquido evapora e o sólido dissolvido fica',
    mistura: 'Homogênea: sólido dissolvido em líquido',
    texto: 'Com calor, a água passa para o estado gasoso e vai para o ar. O sólido que estava dissolvido, como o sal, fica no recipiente.',
    passos: ['A solução é aquecida na cápsula de porcelana.', 'A água vira vapor e sai para o ambiente.', 'Os cristais de sal ficam no fundo.'],
    cotidiano: 'As salinas: a água do mar evapora ao sol e o sal fica nos tanques.',
    cena: 'evaporacao'
  },
  {
    id: 'destilacao',
    nome: 'Destilação simples',
    principio: 'Diferença de temperatura de ebulição',
    mistura: 'Homogênea: sólido dissolvido em líquido',
    texto: 'Como na evaporação, a água ferve e vira vapor. Mas aqui o vapor passa por um condensador frio, volta a ser líquido e é recolhido: recuperamos a água e o sal.',
    passos: ['O balão com a solução é aquecido.', 'O vapor de água esfria no condensador e vira líquido.', 'A água pura (destilado) pinga no frasco; o sal fica no balão.'],
    cotidiano: 'Produção de água destilada e dessalinização da água do mar.',
    cena: 'destilacao'
  },
  {
    id: 'catacao',
    nome: 'Catação',
    principio: 'Diferença visível de aspecto entre os componentes',
    mistura: 'Heterogênea: sólidos grandes e fáceis de distinguir',
    texto: 'O método mais simples: com a mão ou uma pinça, retiramos um a um os componentes indesejados.',
    passos: ['A mistura é espalhada numa superfície.', 'Cada pedrinha é identificada a olho.', 'Ela é retirada com a pinça ou com a mão.'],
    cotidiano: 'Escolher o feijão antes de cozinhar; separar o lixo reciclável.',
    cena: 'catacao'
  },
  {
    id: 'peneiracao',
    nome: 'Peneiração',
    principio: 'Diferença de tamanho entre sólidos',
    mistura: 'Heterogênea: sólidos com grãos de tamanhos diferentes',
    texto: 'A peneira deixa passar os grãos pequenos pela malha e segura os grandes.',
    passos: ['A mistura é colocada na peneira.', 'A peneira é agitada.', 'Os grãos finos caem; os grossos ficam.'],
    cotidiano: 'Peneirar a farinha do bolo; separar areia fina da grossa na construção.',
    cena: 'peneiracao'
  }
];

/* ---------- CASOS DE INVESTIGAÇÃO ---------- */
const CLASSES = [
  { id: 'pura', txt: 'Substância pura' },
  { id: 'homogenea', txt: 'Mistura homogênea' },
  { id: 'heterogenea', txt: 'Mistura heterogênea' }
];
const FASES = [
  { id: '1', txt: '1 fase' },
  { id: '2', txt: '2 fases' },
  { id: '3', txt: '3 fases' }
];

DM.casos = [
  {
    id: 'c1',
    numero: '001',
    titulo: 'O mistério da praia',
    local: 'Beira-mar, depois da maré',
    amostra: 'agua-areia',
    pistas: [
      'Grãos sólidos e claros misturados a um líquido transparente.',
      'Mesmo agitando, os grãos não somem: não se dissolvem.',
      'Depois de alguns minutos parados, os grãos se acumulam no fundo.'
    ],
    etapas: [
      {
        tipo: 'identificar',
        pergunta: 'Que mistura é esta?',
        opcoes: [
          { id: 'a', txt: 'Água + areia', ok: true },
          { id: 'b', txt: 'Água + sal dissolvido' },
          { id: 'c', txt: 'Água + óleo' },
          { id: 'd', txt: 'Areia + limalha de ferro' }
        ],
        explica: 'Os grãos claros que não se dissolvem e afundam são <strong>areia</strong>. O líquido transparente é <strong>água</strong>.'
      },
      {
        tipo: 'classificar',
        pergunta: 'Como ela se classifica?',
        opcoes: CLASSES, certo: 'heterogenea',
        explica: 'Dá para ver a areia separada da água: a mistura é <strong>heterogênea</strong>.'
      },
      {
        tipo: 'fases',
        pergunta: 'Quantas fases ela apresenta?',
        opcoes: FASES, certo: '2',
        explica: 'São <strong>2 fases</strong>: a água (líquida) e a areia depositada no fundo.'
      },
      {
        tipo: 'metodo',
        pergunta: 'Qual método separa os componentes?',
        opcoes: [
          { id: 'filtracao', txt: 'Filtração', ok: true },
          { id: 'decantacao', txt: 'Decantação', ok: true },
          { id: 'magnetica', txt: 'Separação magnética' },
          { id: 'destilacao', txt: 'Destilação' }
        ],
        explica: '<strong>Filtração</strong>: o papel segura a areia e deixa a água passar. <strong>Decantação</strong> também funciona: a areia, mais densa, assenta no fundo e a água é despejada com cuidado. As duas respostas resolvem o caso.'
      }
    ],
    conclusao: { tipo: 'Heterogênea', fases: '2 fases', metodo: 'Filtração ou decantação', cena: 'filtracao' }
  },
  {
    id: 'c2',
    numero: '002',
    titulo: 'A mancha dourada',
    local: 'Pia da cozinha do restaurante',
    amostra: 'agua-oleo',
    pistas: [
      'Uma camada amarelada flutua sobre um líquido transparente.',
      'Agitando, formam-se bolhas que logo voltam a se juntar no topo.',
      'O líquido de cima é escorregadio ao toque.'
    ],
    etapas: [
      {
        tipo: 'identificar',
        pergunta: 'Que mistura é esta?',
        opcoes: [
          { id: 'a', txt: 'Água + álcool' },
          { id: 'b', txt: 'Água + óleo', ok: true },
          { id: 'c', txt: 'Água + açúcar' },
          { id: 'd', txt: 'Água + areia' }
        ],
        explica: 'O líquido amarelado, escorregadio e que boia é <strong>óleo</strong>. Ele não se mistura com a <strong>água</strong>: os dois são imiscíveis.'
      },
      {
        tipo: 'classificar',
        pergunta: 'Como ela se classifica?',
        opcoes: CLASSES, certo: 'heterogenea',
        explica: 'Água e óleo não se misturam e dá para ver a divisão entre eles: mistura <strong>heterogênea</strong>.'
      },
      {
        tipo: 'fases',
        pergunta: 'Quantas fases ela apresenta?',
        opcoes: FASES, certo: '2',
        explica: '<strong>2 fases</strong>: o óleo, menos denso, em cima; a água, mais densa, embaixo.'
      },
      {
        tipo: 'metodo',
        pergunta: 'Qual método separa os componentes?',
        opcoes: [
          { id: 'filtracao', txt: 'Filtração' },
          { id: 'evaporacao', txt: 'Evaporação' },
          { id: 'decantacao', txt: 'Decantação', ok: true },
          { id: 'magnetica', txt: 'Separação magnética' }
        ],
        explica: '<strong>Decantação</strong> com funil de separação: a água, mais densa, sai primeiro pela torneira; quando o óleo chega à torneira, ela é fechada.'
      }
    ],
    conclusao: { tipo: 'Heterogênea', fases: '2 fases', metodo: 'Decantação (funil de separação)', cena: 'decantacao' }
  },
  {
    id: 'c3',
    numero: '003',
    titulo: 'Os grãos atraídos',
    local: 'Oficina de um ferreiro',
    amostra: 'areia-ferro',
    pistas: [
      'Um pó escuro e brilhante está misturado a grãos claros.',
      'Alguns grãos são metálicos e cinzentos.',
      'Um ímã de geladeira deixado perto da amostra ficou cheio de pó escuro.'
    ],
    etapas: [
      {
        tipo: 'identificar',
        pergunta: 'Que mistura é esta?',
        opcoes: [
          { id: 'a', txt: 'Areia + sal' },
          { id: 'b', txt: 'Feijão + pedrinhas' },
          { id: 'c', txt: 'Areia + limalha de ferro', ok: true },
          { id: 'd', txt: 'Água + areia' }
        ],
        explica: 'O pó escuro, metálico e atraído pelo ímã é <strong>limalha de ferro</strong>; os grãos claros são <strong>areia</strong>.'
      },
      {
        tipo: 'classificar',
        pergunta: 'Como ela se classifica?',
        opcoes: CLASSES, certo: 'heterogenea',
        explica: 'Com uma lupa, distinguimos os grãos de areia e de ferro: mistura <strong>heterogênea</strong>.'
      },
      {
        tipo: 'fases',
        pergunta: 'Quantas fases ela apresenta?',
        opcoes: FASES, certo: '2',
        explica: '<strong>2 fases</strong>: os grãos de areia e os de ferro, cada um com aspecto próprio.'
      },
      {
        tipo: 'metodo',
        pergunta: 'Qual método separa os componentes?',
        opcoes: [
          { id: 'peneiracao', txt: 'Peneiração' },
          { id: 'magnetica', txt: 'Separação magnética', ok: true },
          { id: 'destilacao', txt: 'Destilação' },
          { id: 'decantacao', txt: 'Decantação' }
        ],
        explica: '<strong>Separação magnética</strong>: o ímã atrai o ferro e a areia, que não é magnética, fica para trás.'
      }
    ],
    conclusao: { tipo: 'Heterogênea', fases: '2 fases', metodo: 'Separação magnética', cena: 'magnetica' }
  },
  {
    id: 'c4',
    numero: '004',
    titulo: 'A água que esconde algo',
    local: 'Garrafa sem rótulo no laboratório',
    amostra: 'agua-sal',
    pistas: [
      'Parece água pura: transparente e sem nenhum grão visível.',
      'Uma gota deixada secando ao sol virou um pó branco.',
      'A amostra ferve acima de 100 °C, e a temperatura sobe durante a fervura.'
    ],
    etapas: [
      {
        tipo: 'identificar',
        pergunta: 'Que mistura é esta?',
        opcoes: [
          { id: 'a', txt: 'Água pura' },
          { id: 'b', txt: 'Água + óleo' },
          { id: 'c', txt: 'Água + areia' },
          { id: 'd', txt: 'Água + sal dissolvido', ok: true }
        ],
        explica: 'O pó branco que sobra após secar é <strong>sal</strong>. A fervura acima de 100 °C mostra que não é água pura: é <strong>água + sal dissolvido</strong>.'
      },
      {
        tipo: 'classificar',
        pergunta: 'Como ela se classifica?',
        opcoes: CLASSES, certo: 'homogenea',
        explica: 'O sal se dissolve por completo e não dá para vê-lo: mistura <strong>homogênea</strong> (uma solução).'
      },
      {
        tipo: 'fases',
        pergunta: 'Quantas fases ela apresenta?',
        opcoes: FASES, certo: '1',
        explica: '<strong>1 fase</strong>: a solução tem o mesmo aspecto em todos os pontos.'
      },
      {
        tipo: 'metodo',
        pergunta: 'Qual método separa os componentes?',
        opcoes: [
          { id: 'filtracao', txt: 'Filtração' },
          { id: 'evaporacao', txt: 'Evaporação', ok: true },
          { id: 'destilacao', txt: 'Destilação simples', ok: true },
          { id: 'catacao', txt: 'Catação' }
        ],
        explica: '<strong>Evaporação</strong> recupera o sal (a água vai para o ar). <strong>Destilação simples</strong> recupera os dois: o vapor é condensado e a água é recolhida. A filtração não funciona: o sal dissolvido passa pelo filtro.'
      }
    ],
    conclusao: { tipo: 'Homogênea', fases: '1 fase', metodo: 'Evaporação ou destilação simples', cena: 'destilacao' }
  },
  {
    id: 'c5',
    numero: '005',
    titulo: 'O feijão suspeito',
    local: 'Pacote aberto na despensa',
    amostra: 'feijao-pedras',
    pistas: [
      'Grãos marrons e lisos, todos com o mesmo formato.',
      'Alguns "grãos" são duros, cinzentos e de formato irregular.',
      'Os componentes são grandes e fáceis de ver a olho nu.'
    ],
    etapas: [
      {
        tipo: 'identificar',
        pergunta: 'Que mistura é esta?',
        opcoes: [
          { id: 'a', txt: 'Feijão + pedrinhas', ok: true },
          { id: 'b', txt: 'Arroz + feijão' },
          { id: 'c', txt: 'Areia + limalha de ferro' },
          { id: 'd', txt: 'Feijão + sal' }
        ],
        explica: 'Os grãos marrons e lisos são <strong>feijões</strong>; os cinzentos e irregulares são <strong>pedrinhas</strong>.'
      },
      {
        tipo: 'classificar',
        pergunta: 'Como ela se classifica?',
        opcoes: CLASSES, certo: 'heterogenea',
        explica: 'A olho nu vemos dois tipos de componente: mistura <strong>heterogênea</strong>.'
      },
      {
        tipo: 'fases',
        pergunta: 'Quantas fases ela apresenta?',
        opcoes: FASES, certo: '2',
        explica: '<strong>2 fases</strong>: os feijões e as pedrinhas.'
      },
      {
        tipo: 'metodo',
        pergunta: 'Qual método separa os componentes?',
        opcoes: [
          { id: 'peneiracao', txt: 'Peneiração' },
          { id: 'magnetica', txt: 'Separação magnética' },
          { id: 'filtracao', txt: 'Filtração' },
          { id: 'catacao', txt: 'Catação', ok: true }
        ],
        explica: '<strong>Catação</strong>: as pedrinhas são retiradas uma a uma, com a mão ou uma pinça. A peneira não resolve, porque feijões e pedrinhas têm tamanhos parecidos.'
      }
    ],
    conclusao: { tipo: 'Heterogênea', fases: '2 fases', metodo: 'Catação', cena: 'catacao' }
  }
];

DM.nomesEtapa = {
  identificar: 'Identificar',
  classificar: 'Classificar',
  fases: 'Contar fases',
  metodo: 'Separar'
};

/* ---------- DESAFIO SURPRESA (banco do quiz) ---------- */
DM.quiz = [
  { p: 'O que é matéria?', o: ['Tudo o que tem massa e ocupa lugar no espaço', 'Tudo o que podemos ver', 'Apenas os sólidos e líquidos', 'Tudo o que produz calor'], c: 0,
    e: 'Matéria é tudo o que tem massa e ocupa espaço, mesmo que seja invisível, como o ar.' },
  { p: 'Qual destes NÃO é matéria?', o: ['O ar', 'A água', 'A luz', 'Uma pedra'], c: 2,
    e: 'A luz não tem massa nem ocupa espaço: ela é uma forma de energia.' },
  { p: 'Energia pode ser definida como…', o: ['Um tipo de substância pura', 'A capacidade de realizar trabalho ou provocar transformações', 'Tudo o que tem massa', 'Um estado físico da matéria'], c: 1,
    e: 'Energia é a capacidade de realizar trabalho e de provocar transformações na matéria.' },
  { p: 'Para evaporar a água de uma solução, qual forma de energia usamos?', o: ['Elétrica', 'Sonora', 'Térmica', 'Magnética'], c: 2,
    e: 'O calor (energia térmica) faz as partículas de água se agitarem até passarem para o estado gasoso.' },
  { p: 'Uma substância pura se caracteriza por…', o: ['Ter sempre duas fases', 'Composição fixa e propriedades constantes', 'Ser sempre líquida', 'Ter vários componentes'], c: 1,
    e: 'A substância pura tem um único componente, por isso composição fixa e temperaturas de fusão e ebulição constantes.' },
  { p: 'Qual destes é uma substância pura?', o: ['Água do mar', 'Ar atmosférico', 'Água destilada', 'Suco de laranja'], c: 2,
    e: 'A água destilada contém apenas H₂O. As outras opções são misturas.' },
  { p: 'Qual destas é uma substância composta?', o: ['Gás oxigênio (O₂)', 'Ferro (Fe)', 'Água (H₂O)', 'Gás nitrogênio (N₂)'], c: 2,
    e: 'A água é formada por dois elementos diferentes: hidrogênio e oxigênio. As outras têm um só elemento.' },
  { p: 'Quantas fases tem uma mistura homogênea?', o: ['Nenhuma', '1', '2', '3 ou mais'], c: 1,
    e: 'A mistura homogênea tem uma única fase: aspecto igual em todos os pontos.' },
  { p: 'Qual destas é uma mistura heterogênea?', o: ['Água + sal dissolvido', 'Água + álcool', 'Água + óleo', 'Ar filtrado'], c: 2,
    e: 'Água e óleo não se misturam e formam duas fases visíveis.' },
  { p: 'Qual destas é uma mistura homogênea?', o: ['Água + areia', 'Água + açúcar dissolvido', 'Feijão + pedrinhas', 'Granito'], c: 1,
    e: 'O açúcar se dissolve totalmente na água e forma uma solução de uma fase.' },
  { p: 'Como separar limalha de ferro misturada com areia?', o: ['Destilação', 'Separação magnética', 'Evaporação', 'Decantação'], c: 1,
    e: 'O ferro é atraído pelo ímã; a areia não.' },
  { p: 'Que método obtém água pura a partir da água do mar?', o: ['Filtração', 'Catação', 'Destilação simples', 'Peneiração'], c: 2,
    e: 'Na destilação, a água evapora, é condensada e recolhida, deixando o sal para trás.' },
  { p: 'Nas salinas, o sal é obtido por…', o: ['Evaporação', 'Filtração', 'Separação magnética', 'Peneiração'], c: 0,
    e: 'O sol aquece a água do mar, a água evapora e o sal fica nos tanques.' },
  { p: 'Coar o café no filtro de papel é um exemplo de…', o: ['Decantação', 'Filtração', 'Destilação', 'Catação'], c: 1,
    e: 'O papel retém o pó (sólido) e deixa passar o café líquido.' },
  { p: 'Escolher as pedrinhas do feijão com a mão é…', o: ['Peneiração', 'Catação', 'Filtração', 'Evaporação'], c: 1,
    e: 'Catação: separar à mão componentes sólidos fáceis de ver.' },
  { p: 'Separar areia fina de areia grossa numa obra é feito por…', o: ['Peneiração', 'Destilação', 'Decantação', 'Separação magnética'], c: 0,
    e: 'A peneira deixa passar os grãos finos e segura os grossos.' },
  { p: 'O funil de separação é usado para separar…', o: ['Sal dissolvido na água', 'Dois líquidos que não se misturam', 'Ferro e areia', 'Gases do ar'], c: 1,
    e: 'É a decantação de líquidos imiscíveis, como água e óleo: o mais denso sai primeiro pela torneira.' },
  { p: 'A decantação se baseia na diferença de…', o: ['Cor', 'Cheiro', 'Densidade', 'Magnetismo'], c: 2,
    e: 'O componente mais denso vai para o fundo e o menos denso fica em cima.' },
  { p: 'Na destilação, onde o vapor volta a ser líquido?', o: ['No balão', 'No condensador', 'Na chama', 'No funil'], c: 1,
    e: 'O condensador é resfriado por água corrente, e o vapor se condensa dentro dele.' },
  { p: 'Por que a filtração NÃO separa o sal da água?', o: ['O sal é muito pesado', 'O sal dissolvido passa pelos poros do filtro', 'O filtro derrete', 'A água fica presa no papel'], c: 1,
    e: 'Dissolvido, o sal está em partículas minúsculas, menores que os poros do papel.' },
  { p: 'O granito (quartzo, feldspato e mica) é uma mistura…', o: ['Homogênea de 1 fase', 'Heterogênea de 2 fases', 'Heterogênea de 3 fases', 'Substância pura'], c: 2,
    e: 'Cada mineral tem cor e aspecto próprios: 3 fases visíveis.' },
  { p: 'Uma mistura de água, óleo e areia tem quantas fases?', o: ['1', '2', '3', '4'], c: 2,
    e: 'Óleo em cima, água no meio e areia no fundo: 3 fases.' },
  { p: 'O que é uma fase de uma mistura?', o: ['Cada etapa da separação', 'Cada porção com aspecto uniforme', 'O estado físico da mistura', 'O recipiente da mistura'], c: 1,
    e: 'Fase é cada região da mistura com o mesmo aspecto em todos os seus pontos.' },
  { p: 'A peneiração separa componentes pela diferença de…', o: ['Tamanho dos grãos', 'Temperatura de ebulição', 'Densidade', 'Cor'], c: 0,
    e: 'Os grãos menores que a malha atravessam a peneira; os maiores ficam.' },
  { p: 'Na evaporação da água salgada, o que acontece com a água?', o: ['Vira sal', 'Fica no fundo da cápsula', 'Vira vapor e vai para o ar', 'É recolhida no condensador'], c: 2,
    e: 'A água passa para o estado gasoso e se espalha no ambiente; o sal fica. Para recolher a água, usamos a destilação.' },
  { p: 'Quais são os três estados físicos mais comuns da matéria?', o: ['Sólido, líquido e gasoso', 'Quente, morno e frio', 'Puro, misto e composto', 'Leve, médio e pesado'], c: 0,
    e: 'Sólido, líquido e gasoso diferem na organização e na agitação das partículas.' }
];

DM.VOLUME = 1;             // volume dos sons do site: 0 (mudo) a 1 (máximo)
DM.QUIZ_TOTAL = 10;        // perguntas por rodada
DM.QUIZ_TEMPO = 15;        // segundos para responder cada pergunta
DM.QUIZ_PAUSA = 6;         // segundos mostrando a explicação antes de passar sozinho
DM.PONTOS_ETAPA = 10;      // 4 etapas x 5 casos = 200
DM.PONTOS_QUIZ = 10;       // 10 perguntas = 100
DM.PONTOS_MAX = 300;

DM.distintivos = [
  { min: 270, nome: 'Distintivo de Ouro', titulo: 'Detetive-Chefe da Matéria', cor: 'ouro' },
  { min: 210, nome: 'Distintivo de Prata', titulo: 'Investigação de alto nível', cor: 'prata' },
  { min: 140, nome: 'Distintivo de Bronze', titulo: 'Faro científico em treinamento', cor: 'bronze' },
  { min: 0, nome: 'Distintivo de Aprendiz', titulo: 'Toda grande investigação começa assim', cor: 'aprendiz' }
];
