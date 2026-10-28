import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Política de privacidade | filipe.odev" };

const h2 = "pt-2 text-xl font-semibold text-fg";

export default function Page() {
  return (
    <LegalPage title="Política de privacidade">
      <p>
        Esta política explica como o site filipe.odev trata dados pessoais, conforme a Lei Geral de Proteção de Dados (Lei
        13.709/2018, a LGPD).
      </p>

      <h2 className={h2}>Quem é o responsável</h2>
      <p>
        Filipe, responsável por este site e pelo atendimento. Contato sobre privacidade: WhatsApp +55 11 97720-6800.
      </p>

      <h2 className={h2}>O que o site coleta</h2>
      <p>
        O site não tem formulários que enviam dados, não usa cookies de rastreamento e não usa ferramentas de análise. As
        páginas de demonstração rodam só no seu navegador, com dados fictícios, e nada do que você digita nelas é enviado ou
        guardado.
      </p>
      <p>
        Como em qualquer servidor web, o servidor que hospeda o site pode registrar dados técnicos de acesso, como endereço IP,
        data, hora e página visitada. Esses registros servem para segurança e para corrigir falhas.
      </p>

      <h2 className={h2}>Conversa pelo WhatsApp</h2>
      <p>
        Os botões de contato abrem o WhatsApp com uma mensagem pronta. Se você enviar a mensagem, passo a receber o seu nome, o
        seu telefone e o que você escrever. O WhatsApp é um serviço da Meta e segue a política de privacidade dele.
      </p>
      <p>
        Uso esses dados só para responder ao seu pedido, enviar propostas e, se você contratar, executar o serviço. A base legal
        é o atendimento a pedido seu e a execução de contrato. Não vendo nem compartilho esses dados com terceiros para
        publicidade.
      </p>

      <h2 className={h2}>Por quanto tempo guardo</h2>
      <p>
        Guardo a conversa enquanto durar o atendimento ou o contrato. Depois, apago ou mantenho só o que a lei exigir, como
        registros fiscais.
      </p>

      <h2 className={h2}>Seus direitos</h2>
      <p>
        Pela LGPD, você pode pedir a confirmação de que tratamos seus dados, o acesso, a correção, a anonimização ou a exclusão
        deles, e a revogação de consentimento. Basta pedir pelo mesmo WhatsApp. Respondo em até 15 dias.
      </p>

      <h2 className={h2}>Mudanças nesta política</h2>
      <p>Se o site passar a usar cookies, análise ou formulários, atualizo esta página antes disso.</p>
    </LegalPage>
  );
}
