export type Project = {
  id: string;
  category: string;
  name: string;
  summary: string;
  metric: string;
  stack: string[];
  mock: "landing" | "crm" | "whatsapp" | "agenda";
  demo: string;
};

// Exemplos fictícios. Troque por projetos reais quando tiver.
// Ordem segue a dos serviços: agendamento, WhatsApp, CRM, landing page.
export const projects: Project[] = [
  {
    id: "agenda",
    category: "Agendamento",
    name: "Barbearia Sete",
    summary: "Agenda online por profissional, com lembrete automático e pagamento de sinal.",
    metric: "Faltas caíram de 22% para 6%",
    stack: ["Next.js", "Prisma", "Postgres"],
    mock: "agenda",
    demo: "/demo/agendamento",
  },
  {
    id: "bot",
    category: "Automação WhatsApp",
    name: "Atendente Lume",
    summary: "Bot que responde dúvidas, coleta dados e passa o caso para uma pessoa quando precisa.",
    metric: "61% dos chamados resolvidos sozinho",
    stack: ["Next.js", "Supabase", "Postgres"],
    mock: "whatsapp",
    demo: "/demo/whatsapp",
  },
  {
    id: "vendas",
    category: "CRM",
    name: "Pipeline Norte",
    summary: "Funil de vendas com histórico por cliente, tarefas e relatório semanal.",
    metric: "38 vendedores no mesmo painel",
    stack: ["Laravel", "MySQL"],
    mock: "crm",
    demo: "/demo/crm",
  },
  {
    id: "clinica",
    category: "Landing page",
    name: "Clínica Aurora",
    summary: "Página de captação para uma clínica de estética, com formulário e botão de WhatsApp.",
    metric: "Taxa de contato de 7,4%",
    stack: ["Next.js", "Tailwind"],
    mock: "landing",
    demo: "/demo/landing",
  },
];
