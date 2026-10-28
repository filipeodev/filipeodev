import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Política de privacidade | Filipe" };

export default function Page() {
  return (
    <LegalPage title="Política de privacidade">
      <p>Este site apresenta os serviços de desenvolvimento do Filipe. Ele não usa cookies de rastreamento nem ferramentas de análise.</p>
      <h2 className="text-xl font-semibold text-fg">Dados que você informa</h2>
      <p>
        Os botões de contato abrem o WhatsApp com uma mensagem pronta. A conversa acontece no WhatsApp e segue a política dele.
        As páginas de demonstração usam dados fictícios e não enviam nem guardam nada que você digitar.
      </p>
      <h2 className="text-xl font-semibold text-fg">Como usamos o que você envia pelo WhatsApp</h2>
      <p>Usamos nome e telefone só para responder ao seu pedido e enviar a proposta. Não compartilhamos esses dados com terceiros.</p>
      <h2 className="text-xl font-semibold text-fg">Seus direitos</h2>
      <p>Você pode pedir a qualquer momento a consulta, a correção ou a exclusão dos seus dados, pelo mesmo WhatsApp.</p>
    </LegalPage>
  );
}
