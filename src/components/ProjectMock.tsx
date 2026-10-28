import type { Project } from "@/data/projects";

const bar = "rounded bg-raised";

export function ProjectMock({ kind }: { kind: Project["mock"] }) {
  return (
    <div aria-hidden className="rounded-xl border border-line bg-canvas p-3">
      <div className="mb-3 flex gap-2">
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
      </div>
      {kind === "landing" && (
        <div className="space-y-2">
          <div className={`${bar} h-3 w-3/4`} />
          <div className={`${bar} h-3 w-1/2`} />
          <div className="mt-3 h-6 w-24 rounded-lg bg-accent" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className={`${bar} h-10`} />
            <div className={`${bar} h-10`} />
            <div className={`${bar} h-10`} />
          </div>
        </div>
      )}
      {kind === "crm" && (
        <div className="grid grid-cols-3 gap-2">
          {[2, 3, 1].map((n, c) => (
            <div key={c} className="space-y-2">
              <div className="h-2 w-10 rounded bg-line" />
              {Array.from({ length: n }).map((_, i) => (
                <div key={i} className={`${bar} h-8 ${c === 2 && i === 0 ? "border border-accent" : ""}`} />
              ))}
            </div>
          ))}
        </div>
      )}
      {kind === "whatsapp" && (
        <div className="space-y-2 text-xs">
          <div className="w-2/3 rounded-lg bg-raised px-2 py-1.5">Oi! Quero saber o preço.</div>
          <div className="ml-auto w-3/4 rounded-lg bg-accent px-2 py-1.5 text-on-accent">Claro! Qual serviço você procura?</div>
          <div className="w-1/2 rounded-lg bg-raised px-2 py-1.5">Limpeza de pele.</div>
        </div>
      )}
      {kind === "agenda" && (
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 21 }).map((_, i) => (
            <div key={i} className={`h-6 rounded ${i === 9 || i === 16 ? "bg-accent" : i % 4 === 0 ? "bg-line" : "bg-raised"}`} />
          ))}
        </div>
      )}
    </div>
  );
}
