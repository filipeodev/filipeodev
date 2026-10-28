"use client";

import { useState } from "react";
import { maskPhone } from "@/lib/masks";
import { Reveal } from "../Reveal";
import { BeforeAfter, CountUp, HeroArt, TreatmentArt } from "./LandingParts";

const treatments = [
  { kind: "hidratacao", name: "Hidratação profunda", text: "Devolve viço e maciez para peles secas e opacas.", price: "A partir de R$ 189" },
  { kind: "peeling", name: "Peeling suave", text: "Renova a camada superficial e suaviza manchas leves.", price: "A partir de R$ 249" },
  { kind: "laser", name: "Laser fracionado", text: "Estimula colágeno e reduz marcas de acne e linhas finas.", price: "A partir de R$ 420" },
] as const;

const steps = [
  { n: "1", t: "Avaliação gratuita", d: "A dermatologista analisa sua pele e conversa sobre seus objetivos." },
  { n: "2", t: "Plano sob medida", d: "Você recebe um plano com número de sessões, cuidados e valores." },
  { n: "3", t: "Acompanhamento", d: "Cada sessão é registrada e você recebe orientações pelo WhatsApp." },
];

const reviews = [
  { name: "Juliana Carvalho", text: "Cheguei com manchas que me incomodavam há anos. Em 4 sessões minha pele mudou e o atendimento foi muito cuidadoso.", tag: "Peeling suave" },
  { name: "Patrícia Menezes", text: "O plano veio com valor fechado e sem surpresa. Recebo lembrete de cada sessão, o que me ajuda muito.", tag: "Hidratação profunda" },
  { name: "Renata Siqueira", text: "A avaliação gratuita me explicou tudo com calma. Fechei o laser sem pressa e adorei o resultado.", tag: "Laser fracionado" },
];

const faq = [
  { q: "A avaliação realmente não tem custo?", a: "Não tem custo e não cria compromisso. Você só paga se decidir começar um tratamento." },
  { q: "Quantas sessões vou precisar?", a: "Depende da sua pele. Na avaliação a dermatologista define o número de sessões e o intervalo entre elas." },
  { q: "Posso parcelar?", a: "Sim, em até 6 vezes no cartão, sem juros nos planos de 4 sessões ou mais." },
];

const vars = {
  "--c-bg": "#faf5f0",
  "--c-card": "#ffffff",
  "--c-ink": "#2a2321",
  "--c-mute": "#6b5d57",
  "--c-rose": "#b4536a",
  "--c-line": "#e6d7cf",
} as React.CSSProperties;

const inputCls =
  "min-h-11 w-full rounded-xl border border-[var(--c-line)] bg-white px-4 py-2 text-base text-[var(--c-ink)] focus-visible:outline-2 focus-visible:outline-[var(--c-rose)]";

export function LandingDemo() {
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);

  return (
    <div style={vars} className="overflow-hidden rounded-2xl border border-line bg-[var(--c-bg)] text-[var(--c-ink)]">
      <div className="flex items-center justify-between border-b border-[var(--c-line)] px-6 py-4">
        <span className="text-xl font-semibold">Clínica Aurora</span>
        <a href="#l-form" className="min-h-11 rounded-xl bg-[var(--c-rose)] px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-rose)]">
          Agendar avaliação
        </a>
      </div>

      {/* hero */}
      <section className="grid items-center gap-8 px-6 py-12 sm:px-10 md:grid-cols-2">
        <Reveal>
          <p className="font-mono text-sm tracking-wider text-[var(--c-rose)] uppercase">Estética facial</p>
          <h2 className="mt-3 text-5xl font-semibold tracking-tight">Pele renovada em 4 sessões</h2>
          <p className="mt-4 text-lg text-[var(--c-mute)]">
            Avaliação gratuita com a dermatologista e um plano de tratamento pensado para o seu tipo de pele.
          </p>
          <a href="#l-form" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[var(--c-rose)] px-4 py-2.5 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-rose)] motion-reduce:transition-none">
            Quero minha avaliação gratuita
          </a>
        </Reveal>
        <div className="flex justify-center">
          <HeroArt />
        </div>
      </section>

      {/* números */}
      <section aria-label="Números da clínica" className="border-y border-[var(--c-line)] bg-white px-6 py-8 sm:px-10">
        <dl className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[
            { to: 1200, suffix: "+", l: "clientes atendidas" },
            { to: 7, suffix: " anos", l: "de experiência" },
            { to: 98, suffix: "%", l: "de satisfação" },
            { to: 4, suffix: " sessões", l: "em média por plano" },
          ].map((n) => (
            <div key={n.l}>
              <dd className="text-4xl font-semibold text-[var(--c-rose)]">
                <CountUp to={n.to} suffix={n.suffix} />
              </dd>
              <dt className="mt-1 text-sm text-[var(--c-mute)]">{n.l}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* tratamentos */}
      <section className="px-6 py-14 sm:px-10">
        <Reveal>
          <h3 className="text-3xl font-semibold tracking-tight">Tratamentos</h3>
          <p className="mt-2 max-w-[680px] text-base text-[var(--c-mute)]">Cada protocolo começa na avaliação, nunca em um pacote pronto.</p>
        </Reveal>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {treatments.map((t, i) => (
            <li key={t.name}>
              <Reveal delay={i * 100} className="h-full">
                <article className="group h-full overflow-hidden rounded-2xl border border-[var(--c-line)] bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 motion-reduce:transition-none">
                  <div className="overflow-hidden">
                    <div className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:transition-none">
                      <TreatmentArt kind={t.kind} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-xl font-semibold">{t.name}</h4>
                    <p className="mt-2 text-base text-[var(--c-mute)]">{t.text}</p>
                    <p className="mt-3 font-mono text-sm text-[var(--c-rose)]">{t.price}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* faixa em movimento */}
      <div className="marquee overflow-hidden border-y border-[var(--c-line)] bg-[var(--c-rose)] py-3 text-white" aria-hidden>
        <div className="marquee-track flex gap-10 text-lg font-semibold">
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0 gap-10">
              {["Limpeza de pele", "Peeling", "Laser", "Hidratação", "Microagulhamento", "Revitalização"].map((w) => (
                <li key={w}>{w} ✦</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* antes e depois */}
      <section className="grid items-center gap-8 px-6 py-14 sm:px-10 md:grid-cols-2">
        <Reveal>
          <h3 className="text-3xl font-semibold tracking-tight">Resultado que você acompanha</h3>
          <p className="mt-3 text-base text-[var(--c-mute)]">
            Fotos de antes e depois são registradas a cada sessão, para você ver a evolução com clareza.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <BeforeAfter />
        </Reveal>
      </section>

      {/* como funciona */}
      <section className="bg-white px-6 py-14 sm:px-10">
        <Reveal>
          <h3 className="text-3xl font-semibold tracking-tight">Como funciona</h3>
        </Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 100} className="h-full">
                <div className="h-full rounded-2xl border border-[var(--c-line)] bg-[var(--c-bg)] p-5">
                  <span className="flex size-10 items-center justify-center rounded-full bg-[var(--c-rose)] font-semibold text-white">{s.n}</span>
                  <h4 className="mt-4 text-xl font-semibold">{s.t}</h4>
                  <p className="mt-2 text-base text-[var(--c-mute)]">{s.d}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* depoimentos */}
      <section className="px-6 py-14 sm:px-10">
        <Reveal>
          <h3 className="text-3xl font-semibold tracking-tight">Quem já passou por aqui</h3>
        </Reveal>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={r.name}>
              <Reveal delay={i * 100} className="h-full">
                <figure className="flex h-full flex-col rounded-2xl border border-[var(--c-line)] bg-white p-5">
                  <blockquote className="text-base">“{r.text}”</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3 pt-2">
                    <span aria-hidden className="flex size-10 items-center justify-center rounded-full bg-[#f1d9d4] font-semibold text-[var(--c-rose)]">
                      {r.name[0]}
                    </span>
                    <span>
                      <span className="block font-semibold">{r.name}</span>
                      <span className="block text-sm text-[var(--c-mute)]">{r.tag}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* dúvidas */}
      <section className="bg-white px-6 py-14 sm:px-10">
        <Reveal>
          <h3 className="text-3xl font-semibold tracking-tight">Dúvidas frequentes</h3>
        </Reveal>
        <div className="mt-8 max-w-3xl space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-[var(--c-line)] bg-[var(--c-bg)]">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-4 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-[var(--c-rose)]">
                {f.q}
                <span aria-hidden className="text-[var(--c-rose)] transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="px-4 pb-4 text-base text-[var(--c-mute)]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* formulário */}
      <section id="l-form" className="grid gap-8 px-6 py-14 sm:px-10 md:grid-cols-2">
        <Reveal>
          <h3 className="text-4xl font-semibold tracking-tight">Agende sua avaliação gratuita</h3>
          <ul className="mt-5 space-y-2 text-base text-[var(--c-mute)]">
            <li>Resposta em até 1 hora útil</li>
            <li>Parcelamento em até 6 vezes</li>
            <li>Sem compromisso</li>
          </ul>
        </Reveal>
        {sent ? (
          <div role="status" className="self-start rounded-2xl border border-[var(--c-rose)] bg-white p-6">
            <h4 className="text-2xl font-semibold">Recebemos seu pedido</h4>
            <p className="mt-2 text-base text-[var(--c-mute)]">Entramos em contato em até 1 hora útil. (Simulado)</p>
          </div>
        ) : (
          <form
            noValidate
            className="space-y-4 self-start rounded-2xl border border-[var(--c-line)] bg-white p-6"
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
            <div>
              <label htmlFor="l-name" className="mb-1 block text-sm text-[var(--c-mute)]">Nome</label>
              <input id="l-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "l-name-e" : undefined} className={inputCls} />
              {errors.name && <p id="l-name-e" className="mt-1 text-sm text-red-700">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="l-phone" className="mb-1 block text-sm text-[var(--c-mute)]">WhatsApp com DDD</label>
              <input id="l-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(11) 90000-0000" onChange={(e) => { e.target.value = maskPhone(e.target.value); }}aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "l-phone-e" : undefined} className={inputCls} />
              {errors.phone && <p id="l-phone-e" className="mt-1 text-sm text-red-700">{errors.phone}</p>}
            </div>
            <button type="submit" className="min-h-11 w-full rounded-xl bg-[var(--c-rose)] px-4 py-2 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-rose)] motion-reduce:transition-none">
              Quero minha avaliação gratuita
            </button>
          </form>
        )}
      </section>

      <footer className="border-t border-[var(--c-line)] px-6 py-6 text-sm text-[var(--c-mute)] sm:px-10">
        Clínica Aurora · Rua das Acácias, 120 · São Paulo (exemplo fictício)
      </footer>
    </div>
  );
}
