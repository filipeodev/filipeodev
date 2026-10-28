import { ImageResponse } from "next/og";

export const alt = "Filipe, desenvolvedor full stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#000",
          color: "#ededed",
        }}
      >
        <div style={{ fontSize: 32, color: "#34d399", letterSpacing: 4 }}>FILIPE · DESENVOLVEDOR FULL STACK</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          Sistemas que vendem, atendem e organizam o seu negócio
        </div>
        <div style={{ fontSize: 32, color: "#a3a3a3", marginTop: 32 }}>
          Agendamento · Automação de WhatsApp · CRM · Landing pages
        </div>
      </div>
    ),
    size,
  );
}
