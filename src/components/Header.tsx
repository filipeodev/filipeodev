import { whatsappLink } from "@/lib/whatsapp";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#stack", label: "Tecnologias" },
  { href: "#faq", label: "Dúvidas" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4">
      <nav
        aria-label="Principal"
        className="flex items-center gap-3 rounded-2xl border border-line bg-canvas/70 p-2 pl-4 backdrop-blur-md"
      >
        <a href="#inicio" className="font-mono text-sm font-semibold text-fg focus-visible:outline-2 focus-visible:outline-accent">
          filipe<span className="text-accent">.dev</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors duration-300 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-on-accent transition-colors duration-300 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Conversar
        </a>
      </nav>
    </header>
  );
}
