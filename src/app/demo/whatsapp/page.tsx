import type { Metadata } from "next";
import { DemoShell } from "@/components/demo/DemoShell";
import { ChatDemo } from "@/components/demo/ChatDemo";

export const metadata: Metadata = { title: "Demo de automação com WhatsApp | Filipe" };

export default function Page() {
  return (
    <DemoShell title="Automação com WhatsApp" intro="Converse com o atendente virtual. Ele agenda o horário e passa para uma pessoa quando você pedir.">
      <ChatDemo />
    </DemoShell>
  );
}
