import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { WhatsAppButton } from "../WhatsAppButton";

export function DemoShell({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/#projetos"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm text-muted transition-colors duration-300 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
      >
        <ArrowLeft size={16} aria-hidden /> Voltar ao portfólio
      </Link>
      <p role="note" className="mt-4 rounded-xl border border-line bg-surface px-4 py-3 font-mono text-sm text-accent">
        Demonstração com dados fictícios. Nada aqui é salvo ou enviado.
      </p>
      <p className="mt-3 max-w-[680px] text-base text-muted">
        Esta é só uma prévia do que o sistema pode ter. Ele pode ser totalmente personalizado: telas, regras, integrações e
        visual são definidos de acordo com o seu negócio.
      </p>
      <h1 className="mt-8 max-w-[680px] text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 max-w-[680px] text-lg text-muted">{intro}</p>
      <div className="mt-8">{children}</div>
      <div className="mt-16 rounded-2xl border border-line bg-surface p-6">
        <h2 className="text-2xl font-semibold">Quer um sistema assim para o seu negócio?</h2>
        <p className="mt-2 text-base text-muted">Esta é só uma amostra. O sistema real é feito sob medida para o seu processo.</p>
        <div className="mt-4">
          <WhatsAppButton message={`Olá Filipe! Vi a demonstração "${title}" e quero um sistema assim.`}>
            Falar no WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </main>
  );
}
