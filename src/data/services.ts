export type Service = {
  id: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  message: string;
};

export const services: Service[] = [
  {
    id: "agendamento",
    title: "Sistemas de agendamento",
    problem: "Marcar horário por mensagem gera faltas e confusão.",
    solution: "Agenda online com confirmação e lembrete automático ao cliente.",
    result: "Menos faltas e a agenda sempre organizada.",
    message: "Olá Filipe! Quero um sistema de agendamento online.",
  },
  {
    id: "whatsapp",
    title: "Automação com WhatsApp",
    problem: "Você responde as mesmas perguntas o dia todo.",
    solution:
      "Fluxos que respondem, qualificam o contato e avisam a equipe. Também crio sistemas integrados com automações no WhatsApp, como agenda, CRM e cobrança conversando com o cliente.",
    result: "Atendimento rápido, mesmo fora do horário comercial.",
    message: "Olá Filipe! Quero um sistema integrado com automação no WhatsApp.",
  },
  {
    id: "crm",
    title: "CRMs sob medida",
    problem: "Clientes e vendas espalhados em planilhas e conversas.",
    solution: "Um painel com funil de vendas, histórico do cliente e lembretes.",
    result: "Nenhum contato esquecido e a equipe inteira no mesmo lugar.",
    message: "Olá Filipe! Quero um CRM para organizar minhas vendas.",
  },
  {
    id: "landing",
    title: "Landing pages",
    problem: "Seu anúncio traz visitas, mas poucas viram contato.",
    solution: "Uma página rápida, com uma oferta clara e um único botão de ação.",
    result: "Mais pedidos de orçamento vindos do mesmo tráfego.",
    message: "Olá Filipe! Quero uma landing page para o meu negócio.",
  },
];
