import { WhatsAppButton } from "./WhatsAppButton";
import { HeroSceneLoader } from "./HeroSceneLoader";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-dvh items-center overflow-hidden">
      <div className="grid-lines absolute inset-0 -z-20" aria-hidden />
      <HeroSceneLoader />
      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 sm:px-6">
        <p className="mb-4 font-mono text-sm tracking-wider text-accent uppercase">Filipe · Desenvolvedor de sistemas</p>
        <h1 className="hero-title max-w-[680px] text-5xl font-semibold tracking-tight sm:text-6xl">
          Sistemas sob medida para agendar, atender e vender mais
        </h1>
        <p className="mt-6 max-w-[680px] text-lg text-muted">
          Eu crio sistemas de agendamento, automações no WhatsApp, CRMs e landing pages. Você explica o problema e eu entrego a
          solução funcionando.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <WhatsAppButton>Peça um orçamento no WhatsApp</WhatsAppButton>
          <span className="font-mono text-sm text-muted">Resposta no mesmo dia útil</span>
        </div>
      </div>
    </section>
  );
}
