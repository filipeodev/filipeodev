const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? "5500000000000";

export function whatsappLink(message = "Olá Filipe! Vi seu portfólio e quero conversar sobre um projeto.") {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}`;
}
