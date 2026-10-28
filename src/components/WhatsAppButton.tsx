import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { whatsappLink } from "@/lib/whatsapp";

export function WhatsAppButton({
  message,
  children = "Falar no WhatsApp",
  variant = "primary",
}: {
  message?: string;
  children?: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-base font-semibold transition-colors duration-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles =
    variant === "primary"
      ? "bg-accent text-on-accent hover:bg-accent-hover"
      : "border border-line bg-surface text-fg hover:bg-raised";
  return (
    <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
      <WhatsappLogo size={20} weight="fill" aria-hidden />
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}
