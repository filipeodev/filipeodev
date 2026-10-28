import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://filipeodev.com";
const paths = ["", "/demo/agendamento", "/demo/whatsapp", "/demo/crm", "/demo/landing", "/privacidade", "/termos"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${siteUrl}${p}` }));
}
