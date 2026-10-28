"use client";

import { useState } from "react";

const columns = ["Novo contato", "Em conversa", "Proposta enviada", "Fechado"] as const;

type Lead = { id: number; name: string; company: string; value: string; stage: number; history: string[] };

const initial: Lead[] = [
  { id: 1, name: "Marcos Tavares", company: "Tavares Distribuidora", value: "R$ 4.820", stage: 0, history: ["Chegou pelo formulário do site"] },
  { id: 2, name: "Bianca Rocha", company: "Studio Rocha", value: "R$ 1.390", stage: 0, history: ["Indicação de cliente"] },
  { id: 3, name: "Heitor Lacerda", company: "Lacerda Odontologia", value: "R$ 7.250", stage: 1, history: ["Primeira ligação feita", "Pediu orçamento"] },
  { id: 4, name: "Sofia Mendes", company: "Mendes Contabilidade", value: "R$ 3.610", stage: 2, history: ["Reunião feita", "Proposta enviada por email"] },
  { id: 5, name: "Otávio Brandão", company: "Brandão Motos", value: "R$ 9.940", stage: 3, history: ["Proposta aceita", "Contrato assinado"] },
];

export function CrmDemo() {
  const [leads, setLeads] = useState(initial);
  const [openId, setOpenId] = useState<number | null>(1);
  const [dragId, setDragId] = useState<number | null>(null);

  const move = (id: number, stage: number) =>
    setLeads((ls) =>
      ls.map((l) =>
        l.id === id && l.stage !== stage ? { ...l, stage, history: [...l.history, `Movido para "${columns[stage]}"`] } : l,
      ),
    );

  const open = leads.find((l) => l.id === openId);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {columns.map((col, ci) => (
          <section
            key={col}
            aria-label={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragId !== null) move(dragId, ci);
              setDragId(null);
            }}
            className="min-h-40 rounded-2xl border border-line bg-surface p-3"
          >
            <h2 className="mb-3 font-mono text-xs tracking-wider text-muted uppercase">
              {col} · {leads.filter((l) => l.stage === ci).length}
            </h2>
            <ul className="space-y-2">
              {leads
                .filter((l) => l.stage === ci)
                .map((l) => (
                  <li
                    key={l.id}
                    draggable
                    onDragStart={() => setDragId(l.id)}
                    className={`rounded-xl border bg-raised p-3 ${openId === l.id ? "border-accent" : "border-line"}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(l.id)}
                      className="block w-full min-h-11 text-start focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <span className="block text-base font-semibold">{l.name}</span>
                      <span className="block text-sm text-muted">{l.company}</span>
                      <span className="mt-1 block font-mono text-sm text-accent tabular-nums">{l.value}</span>
                    </button>
                    <label className="mt-2 block text-xs text-muted">
                      <span className="sr-only">Mover {l.name} para</span>
                      <select
                        value={l.stage}
                        onChange={(e) => move(l.id, Number(e.target.value))}
                        className="min-h-11 w-full rounded-lg border border-line bg-surface px-2 text-sm text-fg focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        {columns.map((c, i) => (
                          <option key={c} value={i}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>

      <aside aria-label="Histórico do cliente" className="h-fit rounded-2xl border border-line bg-surface p-4">
        {open ? (
          <>
            <h2 className="text-xl font-semibold">{open.name}</h2>
            <p className="text-sm text-muted">{open.company}</p>
            <ol className="mt-4 space-y-2 border-s border-line ps-4">
              {open.history.map((h, i) => (
                <li key={i} className="text-base">
                  {h}
                </li>
              ))}
            </ol>
          </>
        ) : (
          <p className="text-base text-muted">Escolha um cliente para ver o histórico.</p>
        )}
      </aside>
    </div>
  );
}
