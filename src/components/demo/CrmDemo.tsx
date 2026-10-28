"use client";

import { useState } from "react";
import {
  initialClientes,
  initialFornecedores,
  initialLeads,
  initialTx,
  stages,
  type Lead,
  type Row,
  type Tx,
} from "@/data/crmDemo";
import { CrmCadastro } from "./CrmCadastro";
import { CrmFinanceiro } from "./CrmFinanceiro";
import { CrmFunil } from "./CrmFunil";
import { CrmVisao } from "./CrmVisao";

const menu = [
  { id: "visao", label: "Visão geral" },
  { id: "funil", label: "Funil de vendas" },
  { id: "clientes", label: "Clientes" },
  { id: "fornecedores", label: "Fornecedores" },
  { id: "financeiro", label: "Despesas e receitas" },
] as const;

type Tab = (typeof menu)[number]["id"];

export function CrmDemo() {
  const [tab, setTab] = useState<Tab>("visao");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [clientes, setClientes] = useState<Row[]>(initialClientes);
  const [fornecedores, setFornecedores] = useState<Row[]>(initialFornecedores);
  const [tx, setTx] = useState<Tx[]>(initialTx);

  const move = (id: number, stage: number) =>
    setLeads((ls) =>
      ls.map((l) =>
        l.id === id && l.stage !== stage ? { ...l, stage, history: [...l.history, `Movido para "${stages[stage]}"`] } : l,
      ),
    );

  const current = menu.find((m) => m.id === tab)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <nav aria-label="Menu do sistema" className="h-fit rounded-2xl border border-line bg-surface p-2">
        <ul className="flex flex-wrap gap-1 lg:flex-col">
          {menu.map((m) => (
            <li key={m.id} className="lg:w-full">
              <button
                type="button"
                aria-current={tab === m.id ? "page" : undefined}
                onClick={() => setTab(m.id)}
                className={`min-h-11 w-full rounded-xl px-3 py-2 text-start text-base transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-accent ${
                  tab === m.id ? "bg-raised font-semibold text-accent" : "text-muted hover:text-fg"
                }`}
              >
                {m.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section aria-labelledby="crm-title" className="min-w-0">
        <h2 id="crm-title" className="mb-4 text-2xl font-semibold">
          {current.label}
        </h2>
        {tab === "visao" && <CrmVisao leads={leads} tx={tx} />}
        {tab === "funil" && <CrmFunil leads={leads} onMove={move} />}
        {tab === "clientes" && (
          <CrmCadastro
            title="Clientes cadastrados"
            singular="cliente"
            fields={[
              { key: "nome", label: "Nome" },
              { key: "empresa", label: "Empresa" },
              { key: "telefone", label: "Telefone", type: "tel" },
              { key: "cidade", label: "Cidade" },
            ]}
            rows={clientes}
            onAdd={(r) => setClientes((c) => [...c, r])}
          />
        )}
        {tab === "fornecedores" && (
          <CrmCadastro
            title="Fornecedores cadastrados"
            singular="fornecedor"
            fields={[
              { key: "nome", label: "Nome" },
              { key: "categoria", label: "Categoria" },
              { key: "telefone", label: "Telefone", type: "tel" },
              { key: "prazo", label: "Prazo de entrega" },
            ]}
            rows={fornecedores}
            onAdd={(r) => setFornecedores((f) => [...f, r])}
          />
        )}
        {tab === "financeiro" && (
          <CrmFinanceiro tx={tx} onAdd={(t) => setTx((x) => [...x, { ...t, id: x.length + 1 }])} />
        )}
      </section>
    </div>
  );
}
