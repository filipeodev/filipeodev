import type { Metadata } from "next";
import { DemoShell } from "@/components/demo/DemoShell";
import { AgendaDemo } from "@/components/demo/AgendaDemo";

export const metadata: Metadata = { title: "Demo de agendamento | Filipe" };

export default function Page() {
  return (
    <DemoShell title="Sistema de agendamento" intro="Escolha profissional, dia e horário como o seu cliente faria. Horários ocupados ficam bloqueados.">
      <AgendaDemo />
    </DemoShell>
  );
}
