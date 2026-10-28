import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm text-muted transition-colors duration-300 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
      >
        <ArrowLeft size={16} aria-hidden /> Voltar ao início
      </Link>
      <h1 className="mt-8 text-4xl font-semibold tracking-tight">{title}</h1>
      <div className="mt-6 space-y-4 text-base text-muted">{children}</div>
    </main>
  );
}
