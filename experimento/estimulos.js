var titulos = [
    "Srinivasa Ramanujan",
    "Ada Lovelace",
    "Vincent van Gogh",
    "Isaac Newton",
    "Guilherme, o Conquistador",
    "Edsger Dijkstra",
    "Marie Curie",
    "José Bonifácio",
    "Heitor Villa-Lobos",
    "Guimarães Rosa",
    "Carl Sagan",
    "Pierre Simon de Laplace",
    "Arthur Rimbaud",
    "Pierre de Fermat",
    "Ludwig Wittgenstein"
];

var palavras = [
    155,
    156,
    169,
    136,
    165,
    122,
    148,
    118,
    129,
    137,
    165,
    163,
    150,
    149,
    166
];

var textos = [
    "Aos cinco anos vai para a escola e impressiona todos por sua excepcional inteligência,                         parece já saber tudo o que é ensinado. Ganha uma bolsa para o Liceu de Kumbakonam, onde                         desperta admiração nos colegas e mestres. Na adolescência começou a estudar sozinho séries                       aritméticas e séries geométricas e com 15 anos pode achar soluções de polinômios de terceiro                     e quarto grau.<br> Nessa idade, seus colegas conseguiram que a biblioteca lhe emprestasse                       um livro que foi essencial ao seu desenvolvimento e brilhantismo matemático. Tratava-se de                       'Synopsis of Elementary Results on Pure Mathematics', obra do autor George Shoobridge Carr                       (professor da Universidade de Cambridge). O livro apresentava cerca de 6.000 teoremas e                         fórmulas com poucas demonstrações, o que influenciou a maneira de Ramanujan interpretar a                       matemática. Demonstrou todas as fórmulas e teoremas, esgotou a geometria, passou a se                           dedicar à álgebra. Ele mais tarde diria que a Deusa Namagiri lhe aparecia para auxiliá-lo                       nos cálculos mais difíceis.",
    
    "Em 1842 Charles Babbage foi convidado a ministrar um seminário na Universidade de Turim                         sobre sua máquina analítica. Luigi Menabrea, um jovem engenheiro italiano e futuro                               Primeiro-ministro da Itália, publicou a palestra de Babbage em francês e esta transcrição                       foi posteriormente publicada na Bibliothèque universelle de Genève, em 1842.<br> Babbage                         pediu a Ada para traduzir o artigo de Menabrea para o inglês, adicionando depois a tradução                     com as anotações que ela mesma havia feito. Ada levou grande parte do ano nesta tarefa.                         Estas notas, que são mais extensas que o artigo de Menabrea, foram então publicados no The                       Ladies' Diary e no Memorial Científico de Taylor sob as iniciais 'AAL'.<br> Em 1953, mais                       de cem anos depois de sua morte, as notas de Ada sobre a máquina analítica de Babbage foram                     republicadas. A máquina foi reconhecida como um primeiro modelo de computador e as notas de                     Ada como a descrição de um computador e um software.",
    
    "Van Gogh nasceu numa família de classe média alta e passou o início de sua vida adulta a                       trabalhar para uma firma de negociantes de arte. Viajou por Haia, Londres e Paris,                               posteriormente indo lecionar em Isleworth e Ramsgate. Profundamente religioso quando mais                       jovem, aspirava a ser um pastor. A partir de 1879, serviu como missionário numa região de                       mineração na Bélgica, onde começou a esboçar representações de pessoas da comunidade local.                     Em 1885, pintou seu primeiro grande trabalho. A paleta por ele empregada à época consistia                       principalmente em tons terrosos sombrios e não mostrava nenhum sinal da coloração vívida que                     viria a distinguir suas pinturas posteriores. Em março de 1886, mudou-se para Paris, onde                       conheceu os impressionistas franceses. Mais tarde, migrou para o sul daquele país, onde                         passou a ser influenciado pela forte incidência solar da região, algo que estimulou o                           desenvolvimento de trabalhos em maior complexidade cromática. Essa mudança veio a criar um                       estilo único e altamente reconhecível que encontrou auge durante sua estada em Arles, em                         1888.",
    
    "O matemático francês Abraham de Moivre, um dos melhores amigos de Newton, lhe indagou sobre as origens do interesse de Newton por matemática, e pediu detalhes a respeito de seus estudos. Descobriu que o interesse de Newton começou em 1663, aos 20 anos, quando ele comprou um livro de astrologia e não conseguiu entender a matemática usada nele. Assim, Newton comprou um livro de trigonometria, e não conseguindo entender as demonstrações, começou a estudar Os Elementos de Euclides, que leu inteiro. Prosseguiu para o Clavis Mathematicae, de Oughtred, e então para o La Géométrie, de Descartes. Seguiu o estudo com Exercitationum mathematicarum, de Schooten, e então o Opera Mathematica, de Viète. E finalmente para os dois livros de Wallis: Arithmetica infinitorum e Tractatus duo. Estudos que Newton realizou como autodidata em pouco mais de um ano.",
    
    "Guilherme era o filho do solteiro Roberto I, duque da Normandia, com sua amante Herleva. Seu estado como filho ilegítimo e sua juventude causaram algumas dificuldades para ele depois que sucedeu seu pai, assim como a anarquia que assolou os primeiros anos de seu governo. Durante sua infância e adolescência, membros da aristocracia normanda lutaram entre si, tanto para ter o controle do jovem duque quanto para seus próprios fins. Em 1047, Guilherme foi capaz de esmagar uma rebelião e começar a estabelecer sua autoridade sobre o ducado, um processo que não ficou completo até cerca de 1060. Seu casamento no início da década de 1050 com Matilde de Flandres forneceu-lhe um poderoso aliado no condado vizinho do Flandres. Na época de seu casamento, o duque foi capaz de providenciar as nomeações de seus partidários como bispos e abades na igreja normanda. Sua consolidação no poder lhe permitiu expandir seus horizontes, e em 1062 foi capaz de garantir o controle do condado vizinho do Maine.",
    
    "Nascido em Roterdã, Dijkstra era filho de um pai professor de química para ensino                               secundário e de uma mãe matemática que não trabalhava. Durante seus últimos anos de ensino                       secundário, Dijkstra considerou estudar Direito, esperando representar seu país nas Nações                       Unidas. Entretanto, acabou escolhendo exercer uma profissão de acordo com suas habilidades e                     não seu idealismo, mudando para o campo da ciência. <br> Estudou matemática e física nos                         primeiros anos da Universidade de Leiden para posteriormente dedicar-se somente à física                         teórica, mas logo percebeu que era mais interessado em ciência da computação. Em 1951, após                     seu pai tomar conhecimento de um curso de programação de computadores, Dijkstra concluiu que                     tal habilidade seria importante em suas atribuições como físico teórico, e decidiu assistir                     às aulas.",
    
    "Maria Sklodowska (Marie Curie) nasceu na atual capital da Polônia, Varsóvia, em 7 de                           novembro de 1867, quando essa ainda fazia parte do Império Russo e foi a quinta e mais nova                     filha de professores bem conhecidos da cidade. A família havia perdido suas propriedades e                       fortunas devido ao envolvimento em levantes patrióticos poloneses que visavam a restauração                     da independência da Polônia, o que condenou Maria e seus irmãos a uma vida difícil. Educou-                     se em pequenas escolas da região de Varsóvia, obtendo um nível básico de formação científica                     com seu pai, Władysław Skłodowski, que era professor de física e matemática e havia levado                       instrumentos de laboratório para casa após autoridades russas proibirem este ensino em                           escolas polonesas. Sua mãe, que era católica, faleceu quando ela tinha doze anos e a irmã                       mais velha dois anos depois, o que a influenciou a abandonar o catolicismo e se tornar                           agnóstica.",
    
    "Em São Paulo, frequentou aulas de gramática, retórica e filosofia, nos cursos abertos por                       Dom Frei Manuel da Ressurreição, dono também de boa biblioteca. Era o ensino preparatório                       para o ingresso na universidade em Coimbra, para onde iam os brasileiros com alguns                             recursos. Tinha 16 anos quando, com seus irmãos Antônio Carlos e Martim Francisco, José                         Bonifácio requereu habilitação de genere, passo indispensável à carreira eclesiástica. Não                       havia universidades no Brasil nem qualquer prelo. <br> Em 1783, partiu do Rio de Janeiro                         para Portugal, matriculando-se em outubro na Universidade de Coimbra e iniciando a 30 de                         outubro seu curso de estudos jurídicos, acrescidos um ano mais tarde, 11 e 12 de outubro de                     1784, dos de matemática e filosofia natural.",
    
    "Filho de Noêmia Monteiro Villa-Lobos e Raul Villa-Lobos, foi desde cedo incentivado aos                         estudos, pois sua mãe queria vê-lo médico. No entanto, Raul Villa-Lobos, pai do compositor,                     funcionário da Biblioteca Nacional e músico amador, deu-lhe instrução musical e adaptou uma                     viola para que o pequeno Heitor iniciasse seus estudos de violoncelo. Aos 12 anos, órfão de                     pai, Villa-Lobos passou a tocar violoncelo em teatros, cafés e bailes; paralelamente,                           interessou-se pela intensa musicalidade dos 'chorões', representantes da melhor música                           popular do Rio de Janeiro, e, neste contexto, desenvolveu-se também no violão. De                               temperamento inquieto, empreendeu desde cedo escapadas pelo interior do Brasil, primeiras                       etapas de um processo de absorção de todo o universo musical brasileiro. Em 1913 Villa-Lobos                     casou-se com a pianista Lucília Guimarães, indo viver no Rio de Janeiro.",
    
    "Ainda pequeno, mudou-se para a casa dos avós, em Belo Horizonte, onde concluiu o curso                         primário. Iniciou o curso secundário no Colégio Santo Antônio, em São João del-Rei, mas logo                     retornou a Belo Horizonte, onde se formou. Em 1925 matriculou-se na então 'Faculdade de                         Medicina da Universidade de Minas Gerais', com apenas 16 anos. <br> De volta de Itaguara,                       Guimarães Rosa serviu como médico voluntário da Força Pública (atual Polícia Militar),                           durante a Revolução Constitucionalista de 1932, indo para o setor do Túnel em Passa-Quatro                       (MG) onde tomou contato com o futuro presidente Juscelino Kubitschek, naquela ocasião o                         médico-chefe do Hospital de Sangue. Em 1933 foi para Barbacena na qualidade de Oficial                           Médico do 9º Batalhão de Infantaria. Aprovado em concurso para o Itamaraty, passou alguns                       anos de sua vida como diplomata na Europa e na América.",

    "Carl Sagan frequentou a Universidade de Chicago, graduando-se em artes em 1954, e com honras especiais e gerais em ciências em 1955. Obteve um mestrado em física em 1956, e por fim, tornou-se doutor em astronomia e astrofísica, em 1960.<br>Sagan lecionou e pesquisou na Universidade de Harvard até 1968, ano em que ele se juntou a Universidade Cornell. Em 1971, foi nomeado professor titular e diretor do laboratório de estudos planetários. De 1972 a 1981, Sagan foi diretor associado ao centro de radiofísica e investigação espacial de Cornell.<br>Desde a década de 50, trabalhou como assessor da NASA, onde um de seus feitos foi dar as instruções aos astronautas participantes do programa Apollo antes de partirem à Lua. Sagan participou de várias missões que enviaram naves espaciais robóticas para explorar o Sistema Solar. Sagan concebeu a ideia de incluir junto as naves espaciais que fossem abandonar o Sistema Solar uma mensagem universal que pudesse ser potencialmente compreensível por qualquer inteligência extraterrestre que a encontrasse.",

    "Pierre Simon de Laplace nasceu em Beaumont-en-Auge, Normandia, filho de um pequeno trabalhador rural e deve sua educação a alguns vizinhos abastados. De pupilo, tornou-se professor-assistente na escola em Beaumont. Já em Paris, conheceu d'Alembert e, sob sua recomendação, foi-lhe oferecida uma vaga na escola militar.<br> Laplace tinha um amplo conhecimento de todas as ciências e dominava todas as discussões na Academia Francesa. Passou a maior parte de sua vida trabalhando na astronomia matemática, o que culminou em sua obra-prima sobre a estabilidade dinâmica do sistema solar, com a suposição de que ele consistia num conjunto de corpos rígidos no vácuo. Ele formulou independentemente a hipótese nebular e foi um dos primeiros cientistas a postular a existência de buracos negros e a noção do colapso gravitacional. Também contribuiu batante para o desenvolvimento da probabilística.<br>Muitas vezes chamado de Newton francês, conta-se que quando Napoleão o recebeu indagando por que seu trabalho não continha menção a Deus, Laplace respondeu: \“Não precisei fazer tal suposição\”.",

    "Nasceu no seio da classe média provincial de Charleville, no nordeste da França. Quando garoto era impaciente, inquieto, porém um estudante brilhante. Pela idade de quinze anos ganhou muitos prêmios e compôs versos originais e diálogos em Latim.<br>Rimbaud fugia freqüentemente de casa e ainda jovem chocava a burguesia local com suas vestes rotas e o cabelo longo. Em 1871, mudou-se para a casa de Paul Verlaine (depois que Rimbaud lhe mandou uma carta contendo vários exemplos do seu trabalho). Este, que era casado, apaixonou-se prontamente pelo adolescente. O relacionamento levou Verlaine abandonar sua esposa e um filho pequeno.<br>Mais tarde, já separado de Verlaine, Rimbaud decidiu abandonar a poesia e passou a viajar sem rumo: alistou-se no Exército Colonial Holandês para poder ir à Indonésia, foi trabalhar com construção civil no Chipre e, na Etiópia, ganhou o sustento como traficante de armas. Morreu de câncer com apenas 37 anos.",

    "Fermat teve uma educação privilegiada, inicialmente no mosteiro franciscano de Grandselve e depois na Universidade de Toulouse. Ingressou no serviço público em 1631. Em 1652 foi promovido a Juiz Supremo, na Corte Criminal Soberana do Parlamento de Toulouse.<br>A influência de Pierre de Fermat foi limitada pela falta de interesse na publicação das suas descobertas, conhecidas principalmente pelas cartas a amigos e anotações na sua cópia da Arithmetica, de Diofanto. As suas cartas sugerem um homem envergonhado e reservado, cortês e afável, mas um pouco distante. Estas cartas passaram a ser publicadas a partir de 1636, por intermédio do padre Mersenne, em Paris, que procurou Fermat após ouvir falar dele.<br>Fermat gostava de trocar e resolver desafios. Descartes travou argumentos com ele diversas vezes. Como um estrangeiro, Fermat não conhecia o monumental egocentrismo e disposição melindrosa de Descartes, e com calma e cortesia o demoliu em todas as ocasiões.",

    "Ludwig Wittgenstein nasceu em Viena aos 26 de abril de 1889. O pai de Ludwig, Karl Wittgenstein, foi um empreendedor de sucesso. Seus negócios na indústria de ferro e aço alçaram-no à condição de um dos homens mais ricos do império Habsburgo.<br>Durante a Primeira Guerra Mundial, Ludwig Wittgenstein elabora o material que viria a ser a base de seu livro de filosofia, o Tractatus Logico-Philosophicus, enquanto trabalha como voluntário no exército austro-húngaro.<br>Após a Primeira Guerra Wittgenstein enfrentou dificuldades em se readaptar à vida civil. Além disso, a elaboração do Tractatus havia sido extremamente desgastante, tanto intelectual como emocionalmente. Como consequência buscou um novo estilo de vida, mais simples e austero, decidindo, então, abdicar a herança deixada por seu pai.<br>Wittgenstein achava, sem considerações de modéstia, que o seu Tractatus havia resolvido todos os problemas filosóficos que existiam ou que viessem a existir. Não havendo mais nada a ser feito em filosofia, só lhe restava procurar outra ocupação. Resolveu tornar-se, então, professor da escola primária."
];

var questoes = [
    //questão 1
    ["1) Segundo Ramanujan, quem o auxiliava nos cálculos mais difíceis?",
     "2) Segundo o texto, o que foi essencial para o desenvolvimento matemático de Ramanujan?",
     "3) O livro \"Synopsis of Elementary Results on Pure Mathematics\" continha aproximadamente                       quantos teoremas e fórmulas?"],
    
    //questão 2
    ["1) Segundo o texto, quem ministrou o seminário sobre a Máquina Analítica?",
     "2) As notas de Ada foram publicadas quanto tempo após a sua morte?",
     "3) Segundo o texto, quem foi o primeiro a publicar a transcrição da palestra sobre a                            Máquina Analítica?"],
    
    //questão 3
    ["1) Segundo o texto, o que Van Gogh foi fazer na região de mineração na Bélgica?",
     "2) Como era a paleta empregada por Van Gogh em seu primeiro grande trabalho?",
     "3) Segundo o texto, o que influenciou o trabalho de Van Gogh ao se mudar para o sul da                          França?"],
    
    //questão 4
    ["1) Segundo o texto, quem era um dos melhores amigos de Newton?",
     "2) O interesse de Newton por matemática começou quando ele tinha quantos anos?",
     "3) Segundo o texto, o que causou o interesse de Newton por matemática?"],
    
    //questão 5
    ["1) Segundo o texto, o que causou dificuldades para Guilherme depois que sucedeu seu pai?",
     "2) Quando Guilherme foi capaz de providenciar as nomeações de seus partidários como bispos                      e abades?",
     "3) De acordo com o texto, Guilherme se casou com:"],
    
    //questão 6
    ["1) De acordo com o texto, qual profissão Dijkstra considerou seguir nos últimos anos de                        ensino secundário?",
     "2) Segundo o texto, por que Dijkstra decidiu assistir ao curso de programação de                                computadores?",
     "3) Com o que a mãe de Dijkstra trabalhava?"],
    
    //questão 7
    ["1) Qual era a profissão do pai de Maria?",
     "2) Por que a família de Maria perdeu suas propriedades?",
     "3) Segundo o texto, o que influenciou Maria a se tornar agnóstica?"],
    
    //questão 8
    ["1) No que consistia o ensino preparatório para o ingresso na universidade de Coimbra?",
     "2) Inicialmente José Bonifácio cursou na Universidade de Coimbra:",
     "3) Quantos anos José Bonifácio tinha quando requereu habilitação de genere?"],
    
    //questão 9
    ["1) O que a mãe de Heitor Villa-Lobos queria que ele se tornasse?",
     "2) De acordo com o texto, qual instrumento Heitor Villa-Lobos ganhou de seu pai?",
     "3) Quantos anos Heitor Villa-Lobos tinha quando se interessou pelos \"chorões\"?"],
    
    //questão 10
    ["1) De acordo com o texto, como Guimarães Rosa serviu durante a Revolução                                        Constitucionalista?",
     "2) Quantos anos Guimarães Rosa tinha quando matriculou-se na faculdade?",
     "3) Segundo o texto, quem Guimarães Rosa conheceu durante a Revolução Constitucionalista?"],

    //questão 11
    ["1)Em que área de pesquisa Carl Sagan obteve seu doutorado?",
     "2)Em que universidades Sagan lecionou?",
     "3)Qual das ideias abaixo foram de Sagan enquanto assessorava a NASA?"],

    //questão 12
    ["1)Quem ajudou Laplace a entrar para a escola militar?",
     "2)Laplace foi um dos primeiros cientistas a postular sobre…",
     "3)Como Laplace era conhecido?"],

    //questão 13
    ["1)Por qual motivo Rimbaud chocava a burguesia francesa?",
     "2)Por que Rimbaud se alistou no Exército Colonial Holandês?",
     "3)Em que região da França ficava Charleville?"],

    //questão 14
    ["1)Qual era a profissão de Fermat?",
     "2)Qual o nome do amigo de Fermat que ajudou a divulgar seus trabalhos?",
     "3)Por que Fermat teve uma influência limitada em sua época?"],

    //questão 15
    ["1)De acordo com o texto, o que Wittgenstein pensava sobre seu livro de filosofia?",
     "2)O que Wittgenstein fez com a herança deixada por seu pai?",
     "3)Por que Wittgenstein decidiu tornar-se professor de escola primária?"]
];

var alternativas = [
     //questão 1
     ["Um colega da escola",
      "Uma divindade",
      "George Shoobridge Carr (professor da Universidade de Cambridge)",
      "Kumbakonam",
      "n.d.a.",
         
      "Um professor da escola",
      "O Liceu de Kumbakonam",
      "Uma conversa com o professor George Shoobridge Carr",
      "Um livro de matemática",
      "n.d.a",

      "4.000",
      "5.000",
      "6.000",
      "7.000",
      "8.000"],

    //questão 2
    ["Ada Lovelace",
     "Luigi Menabrea",
     "Charles Babbage",
     "George Gordon Byron",
     "n.d.a",

     "1 ano",
     "10 anos",
     "50 anos",
     "Entre 50 e 100 anos",
     "Mais de 100 anos",

     "Ada Lovelace",
     "Luigi Menabrea",
     "Charles Babbage",
     "George Gordon Byron",
     "n.d.a"],

    //questão 3
    ["Ser missionário",
     "Ser pastor",
     "Estudar pintura",
     "Trabalhar como negociante de arte",
     "Lecionar pintura",

     "Tons de azul",
     "Tons de cinza",
     "Com uma grande complexidade cromática",
     "Coloração vívida",
     "Tons terrosos sombrios",

     "Seu trabalho como missionário",
     "Os impressionistas franceses",
     "As pessoas da comunidade local",
     "A forte incidência solar",
     "Sua viagem a Paris"],
    
    //questão 4
    ["Abraham de Moivre",
     "René Descartes",
     "William Oughtred",
     "John Wallis",
     "Frans van Schooten",
     
     "12",
     "15",
     "17",
     "20",
     "22",
     
     "O livro \"Os Elementos\", de Euclides",
     "Um livro de astrologia",
     "Um livro de trigonometria",
     "Um livro de alquimia",
     "O livro \"La Géométrie\", de Descartes"],

    //questão 5
    ["A luta entre os membros da aristocracia",
     "A desaprovação de sua mãe",
     "O fato de não ser filho de Roberto I",
     "Problemas de saúde",
     "O fato de ser filho ilegítimo",
     
     "Durante sua adolescência",
     "Antes da luta entre os membros da aristocracia",
     "Na época de seu casamento",
     "Quando garantiu o controle do condade de Maine",
     "Em 1062",
     
     "Adelaide da Normandia",
     "Ema da Normandia",
     "Herleva de Falaise",
     "Matilde de Flandres",
     "Margarida da Escócia"],
    
    //questão 6
    ["Medicina",
     "Direito",
     "Química",
     "Comerciante",
     "n.d.a.",
     
     "Porque percebeu que não gostava do seu curso na faculdade",
     "Porque gostava de matemática",
     "Porque seu pai era professor do curso",
     "Porque seria uma habilidade importante em seu trabalho",
     "n.d.a.",
     
     "Costureira",
     "Professora de química",
     "Professora de matemática",
     "Física teórica",
     "n.d.a."],
    
    //questão 7
    ["Professor",
     "Agricultor",
     "Comerciante",
     "Advogado",
     "n.d.a.",
     
     "Porque abandonaram tudo para fugir da guerra",
     "Porque se envolveram com movimentos pela independência",
     "Porque se envolveram em escândalos com a igreja católica",
     "Porque seu pai furtou equipamentos do governo",
     "n.d.a.",
     
     "A vida difícil na Polônia",
     "O assassinato do pai",
     "A morte de sua mãe",
     "A perda das propriedades",
     "n.d.a."],
    
    //questão 8
    ["Aulas de gramática, retórica e filosofia",
     "Aulas de retórica, matemática e filosofia",
     "Aulas de matemática, física e filosofia",
     "Aulas de retórica, história e filosofia",
     "n.d.a.",
     
     "Teologia",
     "Mineralogia",
     "Matemática",
     "Estudos jurídicos",
     "Filosofia",
     
     "14",
     "16",
     "18",
     "20",
     "22"],
    
    //questão 9
    ["Artista",
     "Maestro",
     "Médico",
     "Diplomata",
     "Cientista",
     
     "Piano",
     "Violoncelo",
     "Violão",
     "Flauta",
     "Viola",
     
     "8",
     "10",
     "12",
     "14",
     "16"],
    
    //questão 10
    ["Policial",
     "Diplomata",
     "Jornalista",
     "Médico",
     "n.d.a.",
     
     "16",
     "18",
     "20",
     "22",
     "24",
     
     "O presidente da república",
     "O médico-chefe do Hospital de Sangue",
     "Um diplomata",
     "Um jornalista",
     "O governador de Minas Gerais"],

     //questão 11
     ["astronomia e física",
      "astronomia e astrofísica",
      "astrobiologia e astrofísica",
      "artes e ciências gerais",
      "astrobiologia e física",

      "Harvard e Cornell", 
      "Harvard e Yale",
      "Cornell e Yale",
      "MIT e Cornell",
      "MIT e Harvard",

      "Instruir os astronautas depois de voltarem da Lua",
      "Criar novas naves para explorar o Sistema Solar",
      "Atualizar o hardware dos equipamentos de exploração",
      "Criar uma mensagem capaz de ser reconhecida por extraterrestres",
      "Criar programas tripulados de exploração do Sistema Solar"],

     //questão 12
     ["Seu pai",
      "Vizinhos abastados",
      "D'Alambert",
      "Lagrange",
      "Napoleão",

      "A existência de supernovas",
      "A existência de buracos negros",
      "A expansão do universo",
      "O colapso de galáxias",
      "A formação de planetas gasosos",

      "O Kepler francês",
      "O Galileu francês",
      "O Huygens francês",
      "O Brahe francês",
      "O Newton francês"],

     //questão 13
     ["Sua orientação sexual",
      "Sua crença religiosa",
      "Suas posições políticas",
      "Seus poemas modernistas",
      "Sua aparência",

      "Para ir ao Chipre",
      "Para ir à Indonésia",
      "Para ir à Índia",
      "Para ir à Indochina",
      "Para ir ao Chile",

      "Norte",
      "Noroeste",
      "Nordeste",
      "Oeste",
      "Leste"],

     //questão 14
     ["Juiz da Corte Criminal de Toulouse",
      "matemático da Academia Parisiense de Ciências",
      "físico da Academia de Ciências de Toulouse",
      "químico da Academia de Ciências de Marselha",
      "Promotor da Corte Suprema de Paris",

      "Pascal",
      "Mersenne",
      "Descartes",
      "Bernoulli",
      "Euler",

      "Os matemáticos o consideravam amador",
      "Sua obras eram consideras de difícil compreensão",
      "Ele colecionava muitos inimigos",
      "Não houve interesse na publicação de seus trabalhos",
      "Porque ele só discutia matemática por cartas"],

     //questão 15
     ["Achava que o livro estava incompleto por sua imaturidade emocional",
      "Achava que o livro estava incompleto por sua imaturidade intelectual",
      "Achava que o livro possuía fortes influências de sua participação na Primeira Guerra",
      "Achava que o livro havia resolvido todos os problemas filosóficos existentes",
      "Achava que o livro poderia ser usado para o ensino na escola primária",

      "Usou para financiar seu livro de filosofia",
      "Abdicou a herança",
      "Gastou durante seu período como voluntário na Primeira Guerra",
      "Financiou uma escola primária",
      "Investiu em negócios na indústria de ferro e aço",

      "Porque havia esgotado seus recursos financeiros",
      "Porque buscava uma vida mais simples",
      "Para se readaptar à vida civil",
      "Para ensinar filosofia",
      "Porque não havia mais nada a ser feito em filosofia"]
];

var questoesImagens = [
    "Há quantas bananas na imagem?",
    "Há quantas laranjas na imagem?",
    "Há quantos tomates na imagem?",
    "Há quantos morangos na imagem?",
    "Há quantos morangos na imagem?",
    "Há quantos minions na imagem?",
    "Há quantas bolas de golfe de chocolate na imagem?",
    "Há quantas pessoas na imagem?",
    "Há quantas pessoas na imagem?",
    "Há quantas pessoas na imagem?"
];

var imagens = [];
for (var i = 0; i < questoesImagens.length; i++) imagens.push("imgs/img" + (i + 1) + ".jpg");

estimulos = {
    titulos: titulos, 
    palavras: palavras, 
    textos: textos, 
    questoes: questoes, 
    alternativas: alternativas, 
    questoesImagens: questoesImagens,
    imagens: imagens
}
