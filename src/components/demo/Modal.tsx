"use client";

import { useEffect, useId, useRef } from "react";

export const btnPrimary =
  "min-h-11 rounded-xl bg-accent px-4 py-2 text-base font-semibold text-on-accent transition-colors duration-300 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export const btnGhost =
  "min-h-11 rounded-xl border border-line bg-raised px-4 py-2 text-base font-semibold text-fg transition-colors duration-300 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export const btnDanger =
  "min-h-11 rounded-xl border border-red-400/60 bg-raised px-4 py-2 text-base font-semibold text-red-400 transition-colors duration-300 hover:bg-red-400/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400";
export const inputCls =
  "min-h-11 w-full rounded-xl border border-line bg-raised px-3 py-2 text-base text-fg focus-visible:outline-2 focus-visible:outline-accent";

// <dialog> nativo: foco preso, Esc fecha e o resto da página fica inerte
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[min(92vw,32rem)] rounded-2xl border border-line bg-surface p-0 text-fg backdrop:bg-black/70"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 id={titleId} className="text-2xl font-semibold">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl text-xl text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span aria-hidden>×</span>
          </button>
        </div>
        <div className="mt-4">{open && children}</div>
      </div>
    </dialog>
  );
}

export function ConfirmDelete({
  open,
  what,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  what: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal open={open} onClose={onCancel} title="Excluir registro">
      <p className="text-base text-muted">
        Tem certeza que deseja excluir <strong className="text-fg">{what}</strong>? Na demonstração, a exclusão vale só até
        recarregar a página.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={onConfirm} className={btnDanger}>
          Excluir
        </button>
        <button type="button" onClick={onCancel} className={btnGhost}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
}
