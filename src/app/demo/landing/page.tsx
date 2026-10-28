import type { Metadata } from "next";
import { DemoShell } from "@/components/demo/DemoShell";
import { LandingDemo } from "@/components/demo/LandingDemo";

export const metadata: Metadata = { title: "Demo de landing page | Filipe" };

export default function Page() {
  return (
    <DemoShell title="Landing page" intro="Uma página completa de captação: oferta, prova, resultado e um formulário. Role a página e teste a validação deixando os campos vazios.">
      <LandingDemo />
    </DemoShell>
  );
}
