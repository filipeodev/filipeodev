"use client";

import { useState } from "react";
import { brl, stages, type Lead } from "@/data/crmDemo";

export function CrmFunil({ leads, onMove }: { leads: Lead[]; onMove: (id: number, stage: number) => void }) {
  const [openId, setOpenId] = useState<number | null>(1);
  const [dragId, setDragId] = useState<number | null>(null);
  const open = leads.find((l) => l.id === openId);

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
      <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
        {stages.map((col, ci) => (
          <section
            key={col}
            aria-label={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragId !== null) onMove(dragId, ci);
              setDragId(null);
            }}
            className="min-h-40 rounded-2xl border border-line bg-surface p-3"
          >
            <h3 className="mb-3 font-mono text-xs tracking-wider text-muted uppercase">
              {col} · {leads.filter((l) => l.stage === ci).length}
            </h3>
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
                      className="block min-h-11 w-full text-start text-fg focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <span className="block text-base font-semibold">{l.name}</span>
                      <span className="block text-sm text-muted">{l.company}</span>
                      <span className="mt-1 block font-mono text-sm text-accent tabular-nums">{brl.format(l.value)}</span>
                    </button>
                    <label className="mt-2 block">
                      <span className="sr-only">Mover {l.name} para</span>
                      <select
                        value={l.stage}
                        onChange={(e) => onMove(l.id, Number(e.target.value))}
                        className="min-h-11 w-full rounded-lg border border-line bg-surface px-2 text-sm text-fg focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        {stages.map((c, i) => (
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
            <h3 className="text-xl font-semibold">{open.name}</h3>
            <p className="text-sm text-muted">{open.company}</p>
            <ol className="mt-4 space-y-2 border-s border-line ps-4">
              {open.history.map((h, i) => (
                <li key={i} className="text-base text-fg">
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
