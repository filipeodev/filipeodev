import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-6xl flex-col items-start justify-center px-4 sm:px-6">
      <p className="font-mono text-sm tracking-wider text-accent uppercase">Erro 404</p>
      <h1 className="mt-3 max-w-[680px] text-5xl font-semibold tracking-tight">Esta página não existe</h1>
      <p className="mt-4 max-w-[680px] text-lg text-muted">O endereço pode ter mudado ou estar digitado errado. Volte ao início ou fale comigo.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-xl bg-accent px-4 py-2 text-base font-semibold text-on-accent transition-colors duration-300 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Voltar ao início
        </Link>
        <WhatsAppButton variant="ghost">Falar no WhatsApp</WhatsAppButton>
      </div>
    </main>
  );
}
