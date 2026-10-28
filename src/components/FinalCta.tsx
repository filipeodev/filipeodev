import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";

export function FinalCta() {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <div className="rounded-2xl border border-line bg-surface p-8 sm:p-12">
          <h2 className="max-w-[680px] text-4xl font-semibold tracking-tight">Conte o seu problema e receba uma proposta em até 24 horas</h2>
          <p className="mt-4 max-w-[680px] text-lg text-muted">
            A primeira conversa não custa nada e não cria compromisso. Se eu não puder ajudar, digo isso na hora.
          </p>
          <div className="mt-8">
            <WhatsAppButton>Peça um orçamento no WhatsApp</WhatsAppButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
