"use client";

import { useState } from "react";

export function LandingDemo() {
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-base">
      <div className="border-b border-line bg-surface px-6 py-3 font-semibold">Clínica Aurora</div>
      <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-2">
        <div>
          <p className="font-mono text-sm tracking-wider text-accent uppercase">Estética facial</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Pele renovada em 4 sessões</h2>
          <p className="mt-4 text-lg text-muted">
            Avaliação gratuita com a dermatologista. Plano de tratamento pensado para o seu tipo de pele.
          </p>
          <ul className="mt-6 space-y-2 text-base">
            <li>Mais de 1.200 clientes atendidas desde 2019</li>
            <li>Parcelamento em até 6 vezes</li>
            <li>Avaliação sem compromisso</li>
          </ul>
        </div>
        {sent ? (
          <div role="status" className="self-start rounded-2xl border border-accent bg-surface p-6">
            <h3 className="text-2xl font-semibold">Recebemos seu pedido</h3>
            <p className="mt-2 text-base text-muted">Entramos em contato em até 1 hora útil. (Simulado)</p>
          </div>
        ) : (
          <form
            noValidate
            className="space-y-4 self-start rounded-2xl border border-line bg-surface p-6"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const name = String(f.get("name") ?? "").trim();
              const phone = String(f.get("phone") ?? "").replace(/\D/g, "");
              const next: typeof errors = {};
              if (!name) next.name = "Informe seu nome.";
              if (phone.length < 10) next.phone = "Informe um telefone com DDD.";
              setErrors(next);
              if (!next.name && !next.phone) setSent(true);
            }}
          >
            <h3 className="text-2xl font-semibold">Agende sua avaliação</h3>
            <div>
              <label htmlFor="l-name" className="mb-1 block text-sm text-muted">Nome</label>
              <input id="l-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "l-name-e" : undefined}
                className="min-h-11 w-full rounded-xl border border-line bg-raised px-4 py-2 text-base text-fg focus-visible:outline-2 focus-visible:outline-accent" />
              {errors.name && <p id="l-name-e" className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="l-phone" className="mb-1 block text-sm text-muted">WhatsApp com DDD</label>
              <input id="l-phone" name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "l-phone-e" : undefined}
                className="min-h-11 w-full rounded-xl border border-line bg-raised px-4 py-2 text-base text-fg focus-visible:outline-2 focus-visible:outline-accent" />
              {errors.phone && <p id="l-phone-e" className="mt-1 text-sm text-red-400">{errors.phone}</p>}
            </div>
            <button type="submit" className="min-h-11 w-full rounded-xl bg-accent px-4 py-2 text-base font-semibold text-on-accent transition-colors duration-300 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              Quero minha avaliação gratuita
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
