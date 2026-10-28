import { Reveal } from "./Reveal";

const steps = [
  { n: "01", title: "Conversa", text: "Você conta o problema. Eu faço as perguntas certas e digo se faz sentido." },
  { n: "02", title: "Proposta", text: "Envio escopo, prazo e valor fechado. Você aprova antes de eu começar." },
  { n: "03", title: "Desenvolvimento", text: "Você acompanha entregas semanais e testa o sistema enquanto ele nasce." },
  { n: "04", title: "Entrega e suporte", text: "Publico tudo na sua conta, ensino a usar e fico por perto nos primeiros 30 dias." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <p className="font-mono text-sm tracking-wider text-accent uppercase">Como funciona</p>
        <h2 className="mt-3 max-w-[680px] text-4xl font-semibold tracking-tight">Do primeiro contato ao sistema no ar, em quatro passos</h2>
      </Reveal>
      <ol className="mt-12 grid gap-4 md:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.n}>
            <Reveal delay={i * 80} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <span className="font-mono text-sm text-accent">{s.n}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-base text-muted">{s.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
