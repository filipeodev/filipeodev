import type { Project } from "@/data/projects";

// Miniaturas das telas das demonstrações, na mesma estrutura de cada sistema.
const dots = (
  <div className="mb-2 flex gap-2">
    <span className="size-2 rounded-full bg-line" />
    <span className="size-2 rounded-full bg-line" />
    <span className="size-2 rounded-full bg-line" />
  </div>
);

function Agenda() {
  const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  return (
    <div className="flex h-[calc(100%-1.25rem)] gap-3">
      <div className="w-2/5 space-y-2">
        {["Rafa", "Diego", "Caio"].map((n, i) => (
          <div key={n} className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 ${i === 0 ? "border-accent bg-raised" : "border-line bg-surface"}`}>
            <span className="size-4 shrink-0 rounded-full bg-line" />
            <span className="text-xs text-fg">{n}</span>
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex gap-1">
          {["Seg", "Ter", "Qua", "Qui", "Sex"].map((d, i) => (
            <span key={d} className={`flex-1 rounded-md py-1 text-center text-xs ${i === 2 ? "bg-accent font-semibold text-on-accent" : "bg-raised text-muted"}`}>
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1">
          {times.map((t, i) => (
            <span key={t} className={`rounded-md py-1 text-center font-mono text-xs ${i === 3 ? "border border-accent text-accent" : i === 1 ? "bg-surface text-muted line-through" : "bg-raised text-fg"}`}>
              {t}
            </span>
          ))}
        </div>
        <span className="mt-auto rounded-lg bg-accent py-1.5 text-center text-xs font-semibold text-on-accent">Confirmar horário</span>
      </div>
    </div>
  );
}

function Chat() {
  return (
    <div className="flex h-[calc(100%-1.25rem)] flex-col gap-2 text-xs">
      <div className="flex items-center gap-2 border-b border-line pb-2">
        <span className="size-5 rounded-full bg-accent" />
        <span className="font-semibold text-fg">Clínica Lume</span>
        <span className="text-accent">assistente virtual</span>
      </div>
      <p className="max-w-[80%] self-start rounded-lg bg-raised px-2 py-1.5 text-fg">Olá! O que você quer agendar?</p>
      <p className="max-w-[80%] self-end rounded-lg bg-accent px-2 py-1.5 text-on-accent">Limpeza de pele</p>
      <p className="max-w-[80%] self-start rounded-lg bg-raised px-2 py-1.5 text-fg">Para qual dia você prefere?</p>
      <div className="mt-auto flex gap-1">
        {["Amanhã", "Sexta", "Sábado"].map((o) => (
          <span key={o} className="rounded-lg border border-line bg-raised px-2 py-1 text-fg">
            {o}
          </span>
        ))}
      </div>
    </div>
  );
}

function Crm() {
  const bars = [40, 62, 48, 75, 58, 88];
  return (
    <div className="flex h-[calc(100%-1.25rem)] gap-3">
      <div className="w-1/4 space-y-1.5 rounded-lg border border-line bg-surface p-1.5">
        {["Visão geral", "Funil", "Clientes", "Fornecedores", "Financeiro"].map((m, i) => (
          <span key={m} className={`block truncate rounded-md px-1.5 py-1 text-xs ${i === 0 ? "bg-raised font-semibold text-accent" : "text-muted"}`}>
            {m}
          </span>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="grid grid-cols-3 gap-1.5">
          {[
            ["Em aberto", "12"],
            ["No funil", "R$ 48 mil"],
            ["Saldo", "R$ 17 mil"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-md border border-line bg-surface px-1.5 py-1">
              <p className="truncate text-xs text-muted">{l}</p>
              <p className="truncate font-mono text-xs font-semibold text-fg">{v}</p>
            </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 items-end gap-1.5 rounded-md border border-line bg-surface p-2">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 items-end gap-0.5" style={{ height: "100%" }}>
              <span className="w-1/2 rounded-sm bg-accent" style={{ height: `${h}%` }} />
              <span className="w-1/2 rounded-sm bg-[#a3a3a3]" style={{ height: `${Math.max(h - 22, 12)}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="-m-3 mt-0 h-[calc(100%+0.75rem)] overflow-hidden bg-[#faf5f0] text-[#2a2321]">
      <div className="flex items-center justify-between border-b border-[#e6d7cf] px-3 py-1.5">
        <span className="text-xs font-semibold">Clínica Aurora</span>
        <span className="rounded-md bg-[#a5455b] px-2 py-0.5 text-xs font-semibold text-white">Agendar</span>
      </div>
      <div className="grid grid-cols-2 items-center gap-2 px-3 py-2">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold tracking-wider text-[#a5455b] uppercase">Estética facial</p>
          <p className="text-sm leading-tight font-semibold">Pele renovada em 4 sessões</p>
          <span className="inline-block rounded-md bg-[#a5455b] px-2 py-1 text-xs font-semibold text-white">Avaliação gratuita</span>
        </div>
        <svg viewBox="0 0 120 90" className="w-full" aria-hidden>
          <path d="M20 50C8 25 40 5 70 12s40 28 28 48-38 28-60 20S28 70 20 50Z" fill="#f1d9d4" />
          <circle cx="62" cy="46" r="24" fill="#f8e9e4" stroke="#a5455b" strokeWidth="1.5" />
          <path d="M52 44q3-4 7 0M66 44q3-4 7 0M54 56q8 6 16 0" fill="none" stroke="#2a2321" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 22c10-6 20 2 17 13-11 3-21-3-17-13Z" fill="#8fae9a" />
        </svg>
      </div>
      <div className="grid grid-cols-3 border-t border-[#e6d7cf] bg-white py-1 text-center">
        {[
          ["1.200+", "clientes"],
          ["7 anos", "de casa"],
          ["98%", "satisfação"],
        ].map(([n, l]) => (
          <div key={l}>
            <p className="text-xs font-semibold text-[#a5455b]">{n}</p>
            <p className="text-xs text-[#6b5d57]">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectMock({ kind }: { kind: Project["mock"] }) {
  return (
    <div aria-hidden className="h-56 overflow-hidden rounded-xl border border-line bg-canvas p-3">
      {kind !== "landing" && dots}
      {kind === "agenda" && <Agenda />}
      {kind === "whatsapp" && <Chat />}
      {kind === "crm" && <Crm />}
      {kind === "landing" && <Landing />}
    </div>
  );
}
