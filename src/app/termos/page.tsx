import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Termos de uso | filipe.odev" };

const h2 = "pt-2 text-xl font-semibold text-fg";

export default function Page() {
  return (
    <LegalPage title="Termos de uso">
      <p>Ao usar o site filipe.odev, você concorda com estes termos. O site apresenta os serviços de desenvolvimento de Filipe.</p>

      <h2 className={h2}>Conteúdo informativo</h2>
      <p>
        Os textos, prazos e condições do site são informativos e não formam uma oferta fechada. Escopo, prazo e valor de cada
        projeto ficam em uma proposta por escrito, aprovada por você antes do início do trabalho.
      </p>

      <h2 className={h2}>Demonstrações e exemplos</h2>
      <p>
        Os projetos e as demonstrações exibidos aqui são exemplos fictícios, criados para ilustrar o que pode ser feito. Nomes,
        empresas, números e resultados não representam clientes reais. Nada digitado nas demonstrações é enviado ou guardado.
      </p>

      <h2 className={h2}>Propriedade intelectual</h2>
      <p>
        O código, o texto e o visual deste site pertencem a Filipe. Você pode compartilhar o endereço do site, mas não copiar
        ou redistribuir o conteúdo sem autorização. Nos projetos contratados, a titularidade do que for entregue fica
        definida na proposta.
      </p>

      <h2 className={h2}>Disponibilidade</h2>
      <p>
        Faço o possível para manter o site no ar, mas não garanto funcionamento sem interrupções. Links para serviços de
        terceiros, como o WhatsApp, seguem os termos de cada serviço.
      </p>

      <h2 className={h2}>Lei aplicável</h2>
      <p>Estes termos seguem as leis do Brasil.</p>
    </LegalPage>
  );
}
