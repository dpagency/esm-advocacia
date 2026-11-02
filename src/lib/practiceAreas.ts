export const practiceAreas = [
  {
    id: 1, title: "Imóveis e moradia", category: "Direito Imobiliário",
    description: "Orientação em compra, venda, aluguel e regularização de imóveis.",
    services: ["Problemas com aluguel", "Contratos de compra e venda", "Usucapião e regularização de imóveis"],
    situations: ["Compra e venda de imóveis", "Contratos de locação e problemas com aluguel", "Regularização imobiliária", "Usucapião", "Conflitos possessórios"],
    details: "Atuação em contratos imobiliários, distratos e conflitos sobre a posse de imóveis.",
    keywords: "imovel imoveis moradia aluguel alugueis locacao inquilino proprietario despejo casa apartamento terreno imobiliarias",
  },
  {
    id: 2, title: "Planos de saúde e tratamentos", category: "Direito da Saúde",
    description: "Orientação sobre planos de saúde, acesso a tratamentos e medicamentos.",
    services: ["Negativa de cobertura ou cirurgia", "Reembolso de despesas", "Acesso a tratamentos e medicamentos"],
    situations: ["Negativa de cobertura ou cirurgia pelo plano de saúde", "Reembolso de despesas", "Acesso a tratamentos", "Acesso a medicamentos"],
    details: "Análise de negativas de cobertura e pedidos de reembolso, considerando os documentos e as particularidades de cada situação.",
    keywords: "plano convenio saude cirurgia negou negado negada exame hospital tratamento remedio medicamento",
  },
  {
    id: 3, title: "Viagens aéreas", category: "Direito do Passageiro Aéreo",
    description: "Informações e atendimento para problemas durante viagens de avião.",
    services: ["Voo atrasado ou cancelado", "Mala extraviada ou danificada", "Overbooking e reacomodação"],
    situations: ["Atraso e cancelamento de voo", "Extravio e danos à bagagem", "Overbooking", "Reacomodação de passageiros"],
    details: "Análise de ocorrências no transporte aéreo e orientação sobre os caminhos aplicáveis ao caso do passageiro.",
    keywords: "voo voos aviao viagem viagens aereas passagem companhia mala malas sumiu bagagem bagagens extravio cancelamento aeroporto",
  },
  {
    id: 4, title: "Família e convivência", category: "Direito de Família",
    description: "Orientação sobre relações familiares e organização da convivência.",
    services: ["Divórcio", "Guarda e visitas", "Pensão alimentícia"],
    situations: ["Divórcio", "Guarda", "Pensão alimentícia", "Regulamentação de convivência e visitas"],
    details: "Atuação em divórcio, guarda, alimentos e regulamentação de convivência, com análise individual de cada contexto familiar.",
    keywords: "familia pensao alimenticia alimentos separacao divorcio guarda visita visitas convivencia filhos",
  },
  {
    id: 5, title: "Inventários e heranças", category: "Direito de Sucessões",
    description: "Orientação para organizar a sucessão e a partilha de bens.",
    services: ["Inventário", "Partilha de bens", "Planejamento sucessório"],
    situations: ["Inventários judiciais e extrajudiciais", "Partilha de bens", "Planejamento sucessório"],
    details: "Atuação em inventários e partilhas judiciais e extrajudiciais e em planejamento sucessório.",
    keywords: "inventario inventarios heranca herancas herdeiro herdeiros falecimento sucessao sucessoes testamento partilha",
  },
  {
    id: 6, title: "Trabalho e emprego", category: "Direito Trabalhista",
    description: "Atendimento a trabalhadores e empregadores sobre relações de trabalho.",
    services: ["Rescisão não recebida", "Reclamações trabalhistas", "Acordos de trabalho"],
    situations: ["Rescisão do contrato de trabalho e valores não recebidos", "Reclamações trabalhistas", "Acordos", "Prevenção de riscos nas relações de trabalho"],
    details: "Orientação em conflitos trabalhistas e prevenção de riscos nas relações de trabalho.",
    keywords: "trabalho emprego empregado empregador rescisao rescisoes demissao demitido salario salarios ferias fgts horas extras",
  },
  {
    id: 7, title: "Telefonia e serviços", category: "Direito de Telefonia",
    description: "Orientação sobre cobranças e problemas com serviços de telefonia.",
    services: ["Cobrança de telefone", "Serviços não contratados", "Cancelamento indevido da linha"],
    situations: ["Cobranças indevidas de telefonia", "Serviços não contratados", "Cancelamento indevido", "Falhas na prestação do serviço"],
    details: "Análise de cobranças indevidas e de falhas na prestação de serviços de telefonia.",
    keywords: "telefone telefonia celular operadora linha fatura portabilidade sinal internet fixa banda larga",
  },
  {
    id: 8, title: "Bancos e cobranças", category: "Direito Bancário",
    description: "Orientação sobre contratos, dívidas e fraudes em operações bancárias.",
    services: ["Golpe no Pix", "Empréstimo não contratado", "Juros e cobranças bancárias"],
    situations: ["Fraudes bancárias e golpes no Pix", "Empréstimos não contratados", "Revisão de contratos bancários", "Juros e cobranças", "Renegociação de dívidas"],
    details: "Atuação em revisão de contratos, fraudes bancárias e renegociação de dívidas, conforme a análise de cada caso.",
    keywords: "banco bancos bancario bancaria golpe golpes pix emprestimo emprestimos fraude fraudes cartao juros divida dividas financiamento consignado",
  },
  {
    id: 9, title: "Internet e proteção de dados", category: "Direito Digital",
    description: "Orientação sobre privacidade e relações no ambiente digital.",
    services: ["Vazamento de dados", "Contratos digitais", "Responsabilidade em ambiente online"],
    situations: ["Proteção de dados, privacidade e vazamento de dados", "Adequação à LGPD", "Contratos digitais", "Responsabilidade civil no ambiente online"],
    details: "Assessoria em proteção de dados, adequação à LGPD, contratos digitais e responsabilidade civil online.",
    keywords: "internet digital digitais protecao dados vazamento privacidade lgpd online rede redes sociais",
  },
];

export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

// Ignore conversational words so everyday phrases can match the relevant subject.
const stopWords = new Set("a o as os um uma de da do das dos em no na nos nas com para por e ou que nao meu minha meus minhas foi fiz fazer preciso recebi sobre gostaria quero tenho estou esta ao uns umas qual como ajuda problema problemas".split(" "));

export function filterPracticeAreas(query: string, category = "Todas") {
  const normalizedQuery = normalizeSearch(query);
  const terms = normalizedQuery.split(" ").filter(term => term && !stopWords.has(term));
  return practiceAreas.filter(area => {
    const words = new Set(normalizeSearch([area.title, area.category, area.description, ...area.services, ...area.situations, area.keywords].join(" ")).split(" "));
    return (category === "Todas" || area.category === category) &&
      (!normalizedQuery || (terms.length > 0 && terms.some(term => words.has(term))));
  });
}

export const getContactPath = (category: string) => `/contact?assunto=${encodeURIComponent(category)}`;
