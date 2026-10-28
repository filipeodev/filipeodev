"use client";

import { useId, useState } from "react";
import type { Row } from "@/data/crmDemo";
import { btnDanger, btnGhost, btnPrimary, ConfirmDelete, inputCls, Modal } from "./Modal";

type Field = { key: string; label: string; type?: string };
type ModalState = { mode: "new" } | { mode: "edit"; index: number } | { mode: "del"; index: number } | null;

function RowForm({
  fields,
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  fields: Field[];
  initial: Row;
  submitLabel: string;
  onSubmit: (row: Row) => void;
  onCancel: () => void;
}) {
  const uid = useId();
  const [form, setForm] = useState<Row>(initial);
  const [error, setError] = useState("");

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (fields.some((f) => !form[f.key]?.trim())) {
          setError("Preencha todos os campos.");
          return;
        }
        onSubmit(form);
      }}
    >
      <div className="space-y-4">
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
              className={inputCls}
            />
          </div>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" className={btnPrimary}>
          {submitLabel}
        </button>
        <button type="button" onClick={onCancel} className={btnGhost}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export function CrmCadastro({
  title,
  singular,
  fields,
  rows,
  onAdd,
  onEdit,
  onDelete,
}: {
  title: string;
  singular: string;
  fields: Field[];
  rows: Row[];
  onAdd: (row: Row) => void;
  onEdit: (index: number, row: Row) => void;
  onDelete: (index: number) => void;
}) {
  const [modal, setModal] = useState<ModalState>(null);
  const close = () => setModal(null);
  const target = modal && modal.mode !== "new" ? rows[modal.index] : undefined;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-base text-muted">
          {rows.length} {rows.length === 1 ? "registro" : "registros"}
        </p>
        <button type="button" onClick={() => setModal({ mode: "new" })} className={btnPrimary}>
          Novo {singular}
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-surface" role="region" aria-label={title} tabIndex={0}>
        <table className="w-full min-w-[620px] text-start text-base">
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr className="border-b border-line">
              {fields.map((f) => (
                <th key={f.key} scope="col" className="px-4 py-3 text-start font-mono text-xs tracking-wider text-muted uppercase">
                  {f.label}
                </th>
              ))}
              <th scope="col" className="px-4 py-3 text-end font-mono text-xs tracking-wider text-muted uppercase">
                Ações
              </th>
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
                <td className="px-4 py-2">
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setModal({ mode: "edit", index: i })} className={`${btnGhost} px-3 py-1 text-sm`}>
                      Editar<span className="sr-only"> {r[fields[0].key]}</span>
                    </button>
                    <button type="button" onClick={() => setModal({ mode: "del", index: i })} className={`${btnDanger} px-3 py-1 text-sm`}>
                      Excluir<span className="sr-only"> {r[fields[0].key]}</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={fields.length + 1} className="px-4 py-8 text-center text-muted">
                  Nenhum {singular} cadastrado. Use o botão “Novo {singular}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={modal?.mode === "new"} onClose={close} title={`Novo ${singular}`}>
        <RowForm
          fields={fields}
          initial={{}}
          submitLabel="Cadastrar"
          onCancel={close}
          onSubmit={(r) => {
            onAdd(r);
            close();
          }}
        />
      </Modal>
      <Modal open={modal?.mode === "edit"} onClose={close} title={`Editar ${singular}`}>
        {modal?.mode === "edit" && target && (
          <RowForm
            fields={fields}
            initial={target}
            submitLabel="Salvar alterações"
            onCancel={close}
            onSubmit={(r) => {
              onEdit(modal.index, r);
              close();
            }}
          />
        )}
      </Modal>
      <ConfirmDelete
        open={modal?.mode === "del"}
        what={target?.[fields[0].key] ?? ""}
        onCancel={close}
        onConfirm={() => {
          if (modal?.mode === "del") onDelete(modal.index);
          close();
        }}
      />
    </div>
  );
}
