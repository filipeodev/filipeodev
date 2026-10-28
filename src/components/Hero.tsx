import { WhatsAppButton } from "./WhatsAppButton";
import { HeroSceneLoader } from "./HeroSceneLoader";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-dvh items-center overflow-hidden">
      <div className="grid-lines absolute inset-0 -z-20" aria-hidden />
      <div className="absolute inset-0 -z-10" aria-hidden>
        <HeroSceneLoader />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 sm:px-6">
        <p className="mb-4 font-mono text-sm tracking-wider text-accent uppercase">Filipe · Desenvolvedor full stack</p>
        <h1 className="hero-title max-w-[680px] text-5xl font-semibold tracking-tight sm:text-6xl">
          Sistemas que vendem, atendem e organizam o seu negócio
        </h1>
        <p className="mt-6 max-w-[680px] text-lg text-muted">
          Crio landing pages, CRMs, automações de WhatsApp e sistemas de agendamento. Você explica o problema, eu entrego
          a solução funcionando.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <WhatsAppButton>Peça um orçamento no WhatsApp</WhatsAppButton>
          <span className="font-mono text-sm text-muted">Resposta no mesmo dia útil</span>
        </div>
      </div>
    </section>
  );
}
