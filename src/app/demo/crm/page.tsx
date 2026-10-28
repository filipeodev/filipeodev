import type { Metadata } from "next";
import { DemoShell } from "@/components/demo/DemoShell";
import { CrmDemo } from "@/components/demo/CrmDemo";

export const metadata: Metadata = { title: "Demo de CRM | Filipe" };

export default function Page() {
  return (
    <DemoShell title="CRM sob medida" intro="Arraste os cards entre as etapas do funil, ou use o seletor de cada card. Clique em um cliente para ver o histórico.">
      <CrmDemo />
    </DemoShell>
  );
}
