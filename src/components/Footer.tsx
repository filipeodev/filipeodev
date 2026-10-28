import Link from "next/link";

const linkCls =
  "inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-300 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 sm:px-6">
        <p className="font-mono text-sm text-muted">© Filipe · Desenvolvedor full stack</p>
        <nav aria-label="Informações legais" className="flex flex-wrap gap-4">
          <Link href="/privacidade" className={linkCls}>
            Privacidade
          </Link>
          <Link href="/termos" className={linkCls}>
            Termos de uso
          </Link>
        </nav>
      </div>
    </footer>
  );
}
