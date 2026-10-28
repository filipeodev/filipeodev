"use client";

import { useState } from "react";
import { brl, categories, history, type Tx } from "@/data/crmDemo";
import { BarChart, Donut } from "./Charts";

export function totals(tx: Tx[]) {
  const receita = tx.filter((t) => t.tipo === "receita").reduce((s, t) => s + t.valor, 0);
  const despesa = tx.filter((t) => t.tipo === "despesa").reduce((s, t) => s + t.valor, 0);
  return { receita, despesa, saldo: receita - despesa };
}

export function chartData(tx: Tx[]) {
  const t = totals(tx);
  return [...history, { mes: "Out", receita: t.receita, despesa: t.despesa }];
}

export function CrmFinanceiro({ tx, onAdd }: { tx: Tx[]; onAdd: (t: Omit<Tx, "id">) => void }) {
  const [tipo, setTipo] = useState<Tx["tipo"]>("despesa");
  const [desc, setDesc] = useState("");
  const [categoria, setCategoria] = useState<string>(categories[0]);
  const [valor, setValor] = useState("");
  const [error, setError] = useState("");

  const t = totals(tx);
  const byCat = categories
    .map((c) => ({ label: c, value: tx.filter((x) => x.tipo === "despesa" && x.categoria === c).reduce((s, x) => s + x.valor, 0) }))
    .filter((i) => i.value > 0);

  const field =
    "min-h-11 w-full rounded-xl border border-line bg-raised px-3 py-2 text-base text-fg focus-visible:outline-2 focus-visible:outline-accent";

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

      <div className="overflow-x-auto rounded-2xl border border-line bg-surface" role="region" aria-label="Lançamentos" tabIndex={0}>
        <table className="w-full min-w-[520px] text-base">
          <caption className="sr-only">Lançamentos de outubro</caption>
          <thead>
            <tr className="border-b border-line">
              {["Tipo", "Descrição", "Categoria", "Valor"].map((h, i) => (
                <th key={h} scope="col" className={`px-4 py-3 font-mono text-xs tracking-wider text-muted uppercase ${i === 3 ? "text-end" : "text-start"}`}>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        noValidate
        className="rounded-2xl border border-line bg-surface p-4"
        onSubmit={(e) => {
          e.preventDefault();
          const v = Number(valor.replace(",", "."));
          if (!desc.trim() || !(v > 0)) {
            setError("Informe a descrição e um valor maior que zero.");
            return;
          }
          setError("");
          onAdd({ tipo, desc: desc.trim(), categoria: tipo === "receita" ? "Vendas" : categoria, valor: v });
          setDesc("");
          setValor("");
        }}
      >
        <h3 className="text-xl font-semibold">Novo lançamento</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="f-tipo" className="mb-1 block text-sm text-muted">Tipo</label>
            <select id="f-tipo" value={tipo} onChange={(e) => setTipo(e.target.value as Tx["tipo"])} className={field}>
              <option value="despesa">Despesa</option>
              <option value="receita">Receita</option>
            </select>
          </div>
          <div>
            <label htmlFor="f-desc" className="mb-1 block text-sm text-muted">Descrição</label>
            <input id="f-desc" value={desc} onChange={(e) => setDesc(e.target.value)} className={field} />
          </div>
          <div>
            <label htmlFor="f-cat" className="mb-1 block text-sm text-muted">Categoria</label>
            <select id="f-cat" value={categoria} disabled={tipo === "receita"} onChange={(e) => setCategoria(e.target.value)} className={`${field} disabled:opacity-40`}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-valor" className="mb-1 block text-sm text-muted">Valor em reais</label>
            <input id="f-valor" inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} className={field} />
          </div>
        </div>
        {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
        <button type="submit" className="mt-4 min-h-11 rounded-xl bg-accent px-4 py-2 text-base font-semibold text-on-accent transition-colors duration-300 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          Lançar
        </button>
      </form>
    </div>
  );
}
