"use client";

import { useState } from "react";
import { brl, stages, type Lead } from "@/data/crmDemo";
import { currencyFromNumber, maskCurrency, parseCurrency } from "@/lib/masks";
import { btnDanger, btnGhost, btnPrimary, ConfirmDelete, inputCls, Modal } from "./Modal";

export type LeadInput = { name: string; company: string; value: number; stage: number };
type ModalState = { mode: "new" } | { mode: "edit"; id: number } | { mode: "del"; id: number } | null;

function LeadForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: Lead;
  submitLabel: string;
  onSubmit: (l: LeadInput) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [company, setCompany] = useState(initial?.company ?? "");
  const [value, setValue] = useState(initial ? currencyFromNumber(initial.value) : "");
  const [stage, setStage] = useState(initial?.stage ?? 0);
  const [error, setError] = useState("");

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const v = parseCurrency(value);
        if (!name.trim() || !company.trim() || !(v > 0)) {
          setError("Informe nome, empresa e um valor maior que zero.");
          return;
        }
        onSubmit({ name: name.trim(), company: company.trim(), value: v, stage });
      }}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="l-n" className="mb-1 block text-sm text-muted">Nome do contato</label>
          <input id="l-n" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="l-c" className="mb-1 block text-sm text-muted">Empresa</label>
          <input id="l-c" value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="l-v" className="mb-1 block text-sm text-muted">Valor do negócio em reais</label>
          <input id="l-v" inputMode="numeric" placeholder="R$ 0,00" value={value} onChange={(e) => setValue(maskCurrency(e.target.value))} className={inputCls} />
        </div>
        <div>
          <label htmlFor="l-s" className="mb-1 block text-sm text-muted">Etapa</label>
          <select id="l-s" value={stage} onChange={(e) => setStage(Number(e.target.value))} className={inputCls}>
            {stages.map((s, i) => (
              <option key={s} value={i}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" className={btnPrimary}>{submitLabel}</button>
        <button type="button" onClick={onCancel} className={btnGhost}>Cancelar</button>
      </div>
    </form>
  );
}

export function CrmFunil({
  leads,
  onMove,
  onAdd,
  onEdit,
  onDelete,
}: {
  leads: Lead[];
  onMove: (id: number, stage: number) => void;
  onAdd: (l: LeadInput) => void;
  onEdit: (id: number, l: LeadInput) => void;
  onDelete: (id: number) => void;
}) {
  const [openId, setOpenId] = useState<number | null>(1);
  const [dragId, setDragId] = useState<number | null>(null);
  const [modal, setModal] = useState<ModalState>(null);
  const close = () => setModal(null);
  const open = leads.find((l) => l.id === openId);
  const target = modal && modal.mode !== "new" ? leads.find((l) => l.id === modal.id) : undefined;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button type="button" onClick={() => setModal({ mode: "new" })} className={btnPrimary}>
          Novo negócio
        </button>
      </div>
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
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => setModal({ mode: "edit", id: open.id })} className={`${btnGhost} px-3 py-1 text-sm`}>
                  Editar
                </button>
                <button type="button" onClick={() => setModal({ mode: "del", id: open.id })} className={`${btnDanger} px-3 py-1 text-sm`}>
                  Excluir
                </button>
              </div>
            </>
          ) : (
            <p className="text-base text-muted">Escolha um cliente para ver o histórico.</p>
          )}
        </aside>
      </div>

      <Modal open={modal?.mode === "new"} onClose={close} title="Novo negócio">
        <LeadForm
          submitLabel="Cadastrar"
          onCancel={close}
          onSubmit={(l) => {
            onAdd(l);
            close();
          }}
        />
      </Modal>
      <Modal open={modal?.mode === "edit"} onClose={close} title="Editar negócio">
        {modal?.mode === "edit" && target && (
          <LeadForm
            initial={target}
            submitLabel="Salvar alterações"
            onCancel={close}
            onSubmit={(l) => {
              onEdit(modal.id, l);
              close();
            }}
          />
        )}
      </Modal>
      <ConfirmDelete
        open={modal?.mode === "del"}
        what={target?.name ?? ""}
        onCancel={close}
        onConfirm={() => {
          if (modal?.mode === "del") {
            onDelete(modal.id);
            if (openId === modal.id) setOpenId(null);
          }
          close();
        }}
      />
    </div>
  );
}
