import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Termos de uso | Filipe" };

export default function Page() {
  return (
    <LegalPage title="Termos de uso">
      <p>Este site tem caráter informativo. Os textos e valores citados não são uma oferta fechada.</p>
      <h2 className="text-xl font-semibold text-fg">Demonstrações</h2>
      <p>
        Os projetos e as demonstrações exibidos aqui são exemplos fictícios, criados para ilustrar o que pode ser feito. Nomes,
        números e resultados não representam clientes reais.
      </p>
      <h2 className="text-xl font-semibold text-fg">Propostas</h2>
      <p>Escopo, prazo e valor de cada projeto são combinados em uma proposta por escrito, aprovada antes do início do trabalho.</p>
    </LegalPage>
  );
}
