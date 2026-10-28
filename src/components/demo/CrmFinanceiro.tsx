"use client";

import { useState } from "react";
import { brl, categories, history, type Tx } from "@/data/crmDemo";
import { currencyFromNumber, maskCurrency, parseCurrency } from "@/lib/masks";
import { BarChart, Donut } from "./Charts";
import { btnDanger, btnGhost, btnPrimary, ConfirmDelete, inputCls, Modal } from "./Modal";

export function totals(tx: Tx[]) {
  const receita = tx.filter((t) => t.tipo === "receita").reduce((s, t) => s + t.valor, 0);
  const despesa = tx.filter((t) => t.tipo === "despesa").reduce((s, t) => s + t.valor, 0);
  return { receita, despesa, saldo: receita - despesa };
}

export function chartData(tx: Tx[]) {
  const t = totals(tx);
  return [...history, { mes: "Out", receita: t.receita, despesa: t.despesa }];
}

type ModalState = { mode: "new" } | { mode: "edit"; id: number } | { mode: "del"; id: number } | null;

function TxForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: Tx;
  submitLabel: string;
  onSubmit: (t: Omit<Tx, "id">) => void;
  onCancel: () => void;
}) {
  const [tipo, setTipo] = useState<Tx["tipo"]>(initial?.tipo ?? "despesa");
  const [desc, setDesc] = useState(initial?.desc ?? "");
  const [categoria, setCategoria] = useState<string>(initial?.tipo === "despesa" ? initial.categoria : categories[0]);
  const [valor, setValor] = useState(initial ? currencyFromNumber(initial.valor) : "");
  const [error, setError] = useState("");

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const v = parseCurrency(valor);
        if (!desc.trim() || !(v > 0)) {
          setError("Informe a descrição e um valor maior que zero.");
          return;
        }
        onSubmit({ tipo, desc: desc.trim(), categoria: tipo === "receita" ? "Vendas" : categoria, valor: v });
      }}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="f-tipo" className="mb-1 block text-sm text-muted">Tipo</label>
          <select id="f-tipo" value={tipo} onChange={(e) => setTipo(e.target.value as Tx["tipo"])} className={inputCls}>
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>
        </div>
        <div>
          <label htmlFor="f-desc" className="mb-1 block text-sm text-muted">Descrição</label>
          <input id="f-desc" value={desc} onChange={(e) => setDesc(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="f-cat" className="mb-1 block text-sm text-muted">Categoria</label>
          <select id="f-cat" value={categoria} disabled={tipo === "receita"} onChange={(e) => setCategoria(e.target.value)} className={`${inputCls} disabled:opacity-40`}>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-valor" className="mb-1 block text-sm text-muted">Valor em reais</label>
          <input id="f-valor" inputMode="numeric" placeholder="R$ 0,00" value={valor} onChange={(e) => setValor(maskCurrency(e.target.value))} className={inputCls} />
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

export function CrmFinanceiro({
  tx,
  onAdd,
  onEdit,
  onDelete,
}: {
  tx: Tx[];
  onAdd: (t: Omit<Tx, "id">) => void;
  onEdit: (id: number, t: Omit<Tx, "id">) => void;
  onDelete: (id: number) => void;
}) {
  const [modal, setModal] = useState<ModalState>(null);
  const close = () => setModal(null);
  const target = modal && modal.mode !== "new" ? tx.find((x) => x.id === modal.id) : undefined;

  const t = totals(tx);
  const byCat = categories
    .map((c) => ({ label: c, value: tx.filter((x) => x.tipo === "despesa" && x.categoria === c).reduce((s, x) => s + x.valor, 0) }))
    .filter((i) => i.value > 0);

  return (
    <div className="space-y-6">
      <dl className="grid gap-3 sm:grid-cols-3">
        {[
          { l: "Receitas de outubro", v: t.receita, c: "text-accent" },
          { l: "Despesas de outubro", v: t.despesa, c: "text-fg" },
          { l: "Saldo", v: t.saldo, c: t.saldo >= 0 ? "text-accent" : "text-red-400" },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl border border-line bg-surface p-4">
            <dt className="font-mono text-xs tracking-wider text-muted uppercase">{k.l}</dt>
            <dd className={`mt-1 text-3xl font-semibold tabular-nums ${k.c}`}>{brl.format(k.v)}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-line bg-surface p-4">
          <h3 className="mb-3 text-xl font-semibold">Receitas e despesas</h3>
          <BarChart data={chartData(tx)} />
        </section>
        <section className="rounded-2xl border border-line bg-surface p-4">
          <h3 className="mb-3 text-xl font-semibold">Despesas por categoria</h3>
          <Donut items={byCat} />
        </section>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold">Lançamentos</h3>
        <button type="button" onClick={() => setModal({ mode: "new" })} className={btnPrimary}>
          Novo lançamento
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-surface" role="region" aria-label="Lançamentos" tabIndex={0}>
        <table className="w-full min-w-[640px] text-base">
          <caption className="sr-only">Lançamentos de outubro</caption>
          <thead>
            <tr className="border-b border-line">
              {["Tipo", "Descrição", "Categoria", "Valor", "Ações"].map((h, i) => (
                <th key={h} scope="col" className={`px-4 py-3 font-mono text-xs tracking-wider text-muted uppercase ${i >= 3 ? "text-end" : "text-start"}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tx.map((x) => (
              <tr key={x.id} className="border-b border-line last:border-0">
                <td className={`px-4 py-3 ${x.tipo === "receita" ? "text-accent" : "text-muted"}`}>{x.tipo === "receita" ? "Receita" : "Despesa"}</td>
                <td className="px-4 py-3 text-fg">{x.desc}</td>
                <td className="px-4 py-3 text-muted">{x.categoria}</td>
                <td className="px-4 py-3 text-end font-mono tabular-nums text-fg">
                  {x.tipo === "despesa" ? "− " : "+ "}
                  {brl.format(x.valor)}
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setModal({ mode: "edit", id: x.id })} className={`${btnGhost} px-3 py-1 text-sm`}>
                      Editar<span className="sr-only"> {x.desc}</span>
                    </button>
                    <button type="button" onClick={() => setModal({ mode: "del", id: x.id })} className={`${btnDanger} px-3 py-1 text-sm`}>
                      Excluir<span className="sr-only"> {x.desc}</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {tx.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  Nenhum lançamento. Use o botão “Novo lançamento”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={modal?.mode === "new"} onClose={close} title="Novo lançamento">
        <TxForm
          submitLabel="Lançar"
          onCancel={close}
          onSubmit={(v) => {
            onAdd(v);
            close();
          }}
        />
      </Modal>
      <Modal open={modal?.mode === "edit"} onClose={close} title="Editar lançamento">
        {modal?.mode === "edit" && target && (
          <TxForm
            initial={target}
            submitLabel="Salvar alterações"
            onCancel={close}
            onSubmit={(v) => {
              onEdit(modal.id, v);
              close();
            }}
          />
        )}
      </Modal>
      <ConfirmDelete
        open={modal?.mode === "del"}
        what={target?.desc ?? ""}
        onCancel={close}
        onConfirm={() => {
          if (modal?.mode === "del") onDelete(modal.id);
          close();
        }}
      />
    </div>
  );
}
