"use client";

import { useId, useState } from "react";
import type { Row } from "@/data/crmDemo";

type Field = { key: string; label: string; type?: string };

export function CrmCadastro({
  title,
  singular,
  fields,
  rows,
  onAdd,
}: {
  title: string;
  singular: string;
  fields: Field[];
  rows: Row[];
  onAdd: (row: Row) => void;
}) {
  const uid = useId();
  const [form, setForm] = useState<Row>({});
  const [error, setError] = useState("");

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface" role="region" aria-label={title} tabIndex={0}>
        <table className="w-full min-w-[520px] text-start text-base">
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr className="border-b border-line">
              {fields.map((f) => (
                <th key={f.key} scope="col" className="px-4 py-3 text-start font-mono text-xs tracking-wider text-muted uppercase">
                  {f.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                {fields.map((f, j) => (
                  <td key={f.key} className={`px-4 py-3 ${j === 0 ? "font-semibold text-fg" : "text-muted"}`}>
                    {r[f.key]}
                  </td>
                ))}
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
          if (fields.some((f) => !form[f.key]?.trim())) {
            setError("Preencha todos os campos.");
            return;
          }
          setError("");
          onAdd(form);
          setForm({});
        }}
      >
        <h3 className="text-xl font-semibold">Cadastrar {singular}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label htmlFor={`${uid}-${f.key}`} className="mb-1 block text-sm text-muted">
                {f.label}
              </label>
              <input
                id={`${uid}-${f.key}`}
                value={form[f.key] ?? ""}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                type={f.type ?? "text"}
                className="min-h-11 w-full rounded-xl border border-line bg-raised px-3 py-2 text-base text-fg focus-visible:outline-2 focus-visible:outline-accent"
              />
            </div>
          ))}
        </div>
        {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="mt-4 min-h-11 rounded-xl bg-accent px-4 py-2 text-base font-semibold text-on-accent transition-colors duration-300 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
