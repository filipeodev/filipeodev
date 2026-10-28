import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://filipeodev.com";
const description =
  "Sistemas sob medida para agendar, atender e vender mais: agendamento online, automação no WhatsApp, CRMs e landing pages.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "filipe.odev | Agendamento, WhatsApp, CRM e landing pages",
  description,
  openGraph: {
    title: "filipe.odev | Sistemas sob medida",
    description,
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
