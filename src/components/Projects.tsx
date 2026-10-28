import Link from "next/link";
import { projects } from "@/data/projects";
import { Reveal } from "./Reveal";
import { ProjectMock } from "./ProjectMock";

export function Projects() {
  return (
    <section id="projetos" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <p className="font-mono text-sm tracking-wider text-accent uppercase">Projetos de exemplo</p>
        <h2 className="mt-3 max-w-[680px] text-4xl font-semibold tracking-tight">Como cada solução fica na prática</h2>
        <p className="mt-4 max-w-[680px] text-lg text-muted">
          Exemplos ilustrativos, um para cada tipo de serviço. Nomes e números são fictícios.
        </p>
      </Reveal>
      <ul className="mt-12 grid gap-4 md:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.id}>
            <Reveal delay={i * 80} className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-4">
                <ProjectMock kind={p.mock} />
                <div className="px-2 pb-2">
                  <p className="font-mono text-xs tracking-wider text-accent uppercase">{p.category}</p>
                  <h3 className="mt-1 text-2xl font-semibold">{p.name}</h3>
                  <p className="mt-2 text-base text-muted">{p.summary}</p>
                  <p className="mt-3 font-mono text-sm text-fg">{p.metric}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologias usadas">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-lg border border-line px-2 py-1 font-mono text-xs text-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={p.demo}
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-raised px-4 py-2 text-base font-semibold text-fg transition-colors duration-300 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Ver demonstração<span className="sr-only"> de {p.name}</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
