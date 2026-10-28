import { Browser, ChartLineUp, ChatCircleDots, CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import { services } from "@/data/services";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";

const icons: Record<string, typeof Browser> = {
  landing: Browser,
  crm: ChartLineUp,
  whatsapp: ChatCircleDots,
  agendamento: CalendarCheck,
};

export function Services() {
  return (
    <section id="servicos" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <p className="font-mono text-sm tracking-wider text-accent uppercase">O que eu ofereço</p>
        <h2 className="mt-3 max-w-[680px] text-4xl font-semibold tracking-tight">
          Quatro tipos de sistema, cada um resolve um problema do dia a dia
        </h2>
      </Reveal>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {services.map((s, i) => {
          const Icon = icons[s.id];
          return (
            <li key={s.id}>
              <Reveal delay={i * 80} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                  <Icon size={32} weight="duotone" className="text-accent" aria-hidden />
                  <h3 className="mt-4 text-2xl font-semibold">{s.title}</h3>
                  <dl className="mt-4 space-y-3 text-base text-fg">
                    <div>
                      <dt className="font-mono text-xs tracking-wider text-muted uppercase">O problema</dt>
                      <dd className="mt-1">{s.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs tracking-wider text-muted uppercase">A solução</dt>
                      <dd className="mt-1">{s.solution}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs tracking-wider text-accent uppercase">O resultado</dt>
                      <dd className="mt-1">{s.result}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 pt-2">
                    <WhatsAppButton message={s.message} variant="ghost">
                      Quero isso
                    </WhatsAppButton>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
