"use client";

import { useState } from "react";

const pros = [
  { id: "rafa", name: "Rafa", role: "Corte e barba" },
  { id: "diego", name: "Diego", role: "Corte" },
  { id: "caio", name: "Caio", role: "Barba" },
];
const days = ["Seg 03", "Ter 04", "Qua 05", "Qui 06", "Sex 07"];
const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
// horários já ocupados, só para a demo parecer real
const taken = new Set(["rafa|Seg 03|10:00", "rafa|Ter 04|14:00", "diego|Qua 05|09:00", "caio|Seg 03|15:00", "diego|Seg 03|11:00"]);

const chip =
  "min-h-11 rounded-xl border px-4 py-2 text-base transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40";

export function AgendaDemo() {
  const [pro, setPro] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  const sel = (on: boolean) => (on ? "border-accent bg-raised text-fg" : "border-line bg-surface text-muted hover:text-fg");
  const proName = pros.find((p) => p.id === pro)?.name;

  if (done) {
    return (
      <div role="status" className="max-w-xl rounded-2xl border border-accent bg-surface p-6">
        <h2 className="text-2xl font-semibold">Horário confirmado</h2>
        <p className="mt-2 text-base">
          {name}, seu horário com {proName} está marcado para {day} às {time}.
        </p>
        <p className="mt-3 rounded-xl bg-raised p-3 font-mono text-sm text-muted">
          Lembrete simulado: “Olá {name}! Amanhã às {time} você tem horário com {proName}. Responda 1 para confirmar.”
        </p>
        <button
          type="button"
          onClick={() => {
            setPro("");
            setDay("");
            setTime("");
            setName("");
            setDone(false);
          }}
          className={`${chip} mt-4 border-line bg-surface text-fg hover:bg-raised`}
        >
          Agendar outro horário
        </button>
      </div>
    );
  }

  return (
    <form
      className="max-w-2xl space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (pro && day && time && name.trim()) setDone(true);
      }}
    >
      <fieldset>
        <legend className="mb-3 font-mono text-sm tracking-wider text-muted uppercase">1. Profissional</legend>
        <div className="flex flex-wrap gap-3">
          {pros.map((p) => (
            <button key={p.id} type="button" aria-pressed={pro === p.id} onClick={() => { setPro(p.id); setTime(""); }} className={`${chip} ${sel(pro === p.id)}`}>
              {p.name} <span className="text-sm text-muted">· {p.role}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset disabled={!pro} className="disabled:opacity-50">
        <legend className="mb-3 font-mono text-sm tracking-wider text-muted uppercase">2. Dia</legend>
        <div className="flex flex-wrap gap-3">
          {days.map((d) => (
            <button key={d} type="button" aria-pressed={day === d} onClick={() => { setDay(d); setTime(""); }} className={`${chip} ${sel(day === d)}`}>
              {d}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset disabled={!pro || !day} className="disabled:opacity-50">
        <legend className="mb-3 font-mono text-sm tracking-wider text-muted uppercase">3. Horário</legend>
        <div className="flex flex-wrap gap-3">
          {times.map((t) => {
            const busy = taken.has(`${pro}|${day}|${t}`);
            return (
              <button key={t} type="button" disabled={busy} aria-pressed={time === t} onClick={() => setTime(t)} className={`${chip} font-mono tabular-nums ${sel(time === t)}`}>
                {t}
                {busy && <span className="sr-only"> (ocupado)</span>}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="agenda-nome" className="mb-3 block font-mono text-sm tracking-wider text-muted uppercase">
          4. Seu nome
        </label>
        <input
          id="agenda-nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="given-name"
          className="min-h-11 w-full max-w-sm rounded-xl border border-line bg-surface px-4 py-2 text-base text-fg focus-visible:outline-2 focus-visible:outline-accent"
        />
      </div>

      <button
        type="submit"
        disabled={!pro || !day || !time || !name.trim()}
        className="min-h-11 rounded-xl bg-accent px-4 py-2 text-base font-semibold text-on-accent transition-colors duration-300 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
      >
        Confirmar horário
      </button>
    </form>
  );
}
