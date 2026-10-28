import { stack } from "@/data/stack";
import { Reveal } from "./Reveal";

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <p className="font-mono text-sm tracking-wider text-accent uppercase">Tecnologias</p>
        <h2 className="mt-3 max-w-[680px] text-4xl font-semibold tracking-tight">Ferramentas que uso e para que cada uma serve</h2>
      </Reveal>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((s, i) => (
          <li key={s.name}>
            <Reveal delay={(i % 3) * 80} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-mono text-base font-semibold text-accent">{s.name}</h3>
                <p className="mt-2 text-base text-muted">{s.use}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
