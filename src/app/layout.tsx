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
  "Filipe, desenvolvedor full stack. Landing pages, CRMs, automação de WhatsApp e sistemas de agendamento sob medida.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Filipe | Landing pages, CRMs, WhatsApp e agendamentos",
  description,
  openGraph: {
    title: "Filipe | Desenvolvedor full stack",
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
