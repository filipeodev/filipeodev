export const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const stages = ["Novo contato", "Em conversa", "Proposta enviada", "Fechado"] as const;

export type Lead = { id: number; name: string; company: string; value: number; stage: number; history: string[] };

export const initialLeads: Lead[] = [
  { id: 1, name: "Marcos Tavares", company: "Tavares Distribuidora", value: 4820, stage: 0, history: ["Chegou pelo formulário do site"] },
  { id: 2, name: "Bianca Rocha", company: "Studio Rocha", value: 1390, stage: 0, history: ["Indicação de cliente"] },
  { id: 3, name: "Heitor Lacerda", company: "Lacerda Odontologia", value: 7250, stage: 1, history: ["Primeira ligação feita", "Pediu orçamento"] },
  { id: 4, name: "Sofia Mendes", company: "Mendes Contabilidade", value: 3610, stage: 2, history: ["Reunião feita", "Proposta enviada por email"] },
  { id: 5, name: "Otávio Brandão", company: "Brandão Motos", value: 9940, stage: 3, history: ["Proposta aceita", "Contrato assinado"] },
];

export type Row = Record<string, string>;

export const initialClientes: Row[] = [
  { nome: "Otávio Brandão", empresa: "Brandão Motos", telefone: "(11) 98812-4410", cidade: "Guarulhos" },
  { nome: "Lívia Prado", empresa: "Prado Pet Shop", telefone: "(11) 97431-0928", cidade: "São Paulo" },
  { nome: "Renato Vilela", empresa: "Vilela Engenharia", telefone: "(19) 99120-3377", cidade: "Campinas" },
  { nome: "Clara Nogueira", empresa: "Nogueira Estética", telefone: "(11) 96655-2041", cidade: "Osasco" },
];

export const initialFornecedores: Row[] = [
  { nome: "Papelaria Central", categoria: "Material de escritório", telefone: "(11) 3345-1020", prazo: "7 dias" },
  { nome: "Tecno Peças Ltda", categoria: "Equipamentos", telefone: "(11) 4002-8173", prazo: "15 dias" },
  { nome: "Gráfica Ponto Certo", categoria: "Impressão", telefone: "(11) 2290-6651", prazo: "5 dias" },
  { nome: "Cloud Host Brasil", categoria: "Hospedagem", telefone: "(11) 3003-4417", prazo: "Mensal" },
];

export const categories = ["Fornecedores", "Folha", "Marketing", "Impostos", "Outros"] as const;

export type Tx = { id: number; tipo: "receita" | "despesa"; desc: string; categoria: string; valor: number };

export const initialTx: Tx[] = [
  { id: 1, tipo: "receita", desc: "Contrato Brandão Motos", categoria: "Vendas", valor: 9940 },
  { id: 2, tipo: "receita", desc: "Mensalidades de clientes", categoria: "Recorrente", valor: 38600 },
  { id: 3, tipo: "receita", desc: "Projeto Studio Rocha", categoria: "Vendas", valor: 4160 },
  { id: 4, tipo: "despesa", desc: "Compra de equipamentos", categoria: "Fornecedores", valor: 9300 },
  { id: 5, tipo: "despesa", desc: "Folha de pagamento", categoria: "Folha", valor: 16800 },
  { id: 6, tipo: "despesa", desc: "Anúncios online", categoria: "Marketing", valor: 4200 },
  { id: 7, tipo: "despesa", desc: "Impostos do mês", categoria: "Impostos", valor: 3900 },
  { id: 8, tipo: "despesa", desc: "Hospedagem e licenças", categoria: "Outros", valor: 1250 },
];

// meses anteriores, só para o gráfico ter histórico
export const history = [
  { mes: "Mai", receita: 38200, despesa: 27100 },
  { mes: "Jun", receita: 41500, despesa: 29800 },
  { mes: "Jul", receita: 39800, despesa: 31200 },
  { mes: "Ago", receita: 46300, despesa: 30500 },
  { mes: "Set", receita: 44100, despesa: 33900 },
];
