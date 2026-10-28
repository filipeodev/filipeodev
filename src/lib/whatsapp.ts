const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? "5511977206800";

export function whatsappLink(message = "Olá Filipe! Vi seu portfólio e quero conversar sobre um projeto.") {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}`;
}
