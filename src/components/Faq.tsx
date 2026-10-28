import { faq } from "@/data/faq";
import { Reveal } from "./Reveal";

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <p className="font-mono text-sm tracking-wider text-accent uppercase">Dúvidas frequentes</p>
        <h2 className="mt-3 max-w-[680px] text-4xl font-semibold tracking-tight">Respostas antes de você perguntar</h2>
      </Reveal>
      <div className="mt-12 max-w-3xl space-y-3">
        {faq.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-line bg-surface open:bg-raised">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-4 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-accent">
              {f.q}
              <span aria-hidden className="font-mono text-accent transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-4 pb-4 text-base text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
