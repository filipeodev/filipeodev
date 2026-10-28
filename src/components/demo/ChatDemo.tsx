"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { from: "bot" | "me"; text: string };
type Step = { options: string[]; reply: (choice: string) => string; next?: number };

const flow: Step[] = [
  { options: ["Limpeza de pele", "Massagem", "Depilação"], reply: (c) => `Ótima escolha: ${c}. Para qual dia você prefere?` },
  { options: ["Amanhã", "Sexta", "Sábado"], reply: (c) => `Tenho horários ${c.toLowerCase()} às 10h e às 15h. Qual você quer?` },
  { options: ["10h", "15h"], reply: (c) => `Pronto, reservei às ${c}. Você recebe um lembrete antes do horário.` },
  { options: ["Falar com uma pessoa", "Está ótimo, obrigado"], reply: (c) =>
      c === "Falar com uma pessoa"
        ? "Certo, estou passando a conversa para a Marina. Ela responde em instantes."
        : "Por nada! Até logo." },
];

export function ChatDemo() {
  const [step, setStep] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Olá! Sou a assistente da Clínica Lume. O que você quer agendar?" }]);
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [msgs, typing]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const pick = (choice: string) => {
    const current = flow[step];
    setMsgs((m) => [...m, { from: "me", text: choice }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: current.reply(choice) }]);
      setTyping(false);
      setStep((s) => s + 1);
    }, 700);
  };

  // desfaz a última escolha, inclusive se a resposta do bot ainda está "digitando"
  const back = () => {
    clearTimeout(timer.current);
    const keepSteps = typing ? step : step - 1;
    setMsgs((m) => m.slice(0, 1 + 2 * keepSteps));
    setStep(keepSteps);
    setTyping(false);
  };

  const reset = () => {
    clearTimeout(timer.current);
    setStep(0);
    setTyping(false);
    setMsgs([{ from: "bot", text: "Olá! Sou a assistente da Clínica Lume. O que você quer agendar?" }]);
  };

  const finished = step >= flow.length;

  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-line bg-base">
      <div className="border-b border-line bg-surface px-4 py-3">
        <p className="font-semibold">Clínica Lume</p>
        <p className="font-mono text-xs text-accent">assistente virtual</p>
      </div>
      <div role="log" aria-live="polite" className="flex h-96 flex-col gap-2 overflow-y-auto p-4">
        {msgs.map((m, i) => (
          <p
            key={i}
            className={`max-w-[80%] rounded-xl px-3 py-2 text-base ${
              m.from === "bot" ? "self-start bg-raised text-fg" : "self-end bg-accent text-on-accent"
            }`}
          >
            {m.text}
          </p>
        ))}
        {typing && <p className="self-start rounded-xl bg-raised px-3 py-2 text-base text-muted">digitando…</p>}
        <div ref={end} />
      </div>
      <div className="flex flex-wrap gap-2 border-t border-line bg-surface p-3">
        {(step > 0 || typing) && (
          <button
            type="button"
            onClick={back}
            className="min-h-11 rounded-xl border border-line px-4 py-2 text-base text-muted transition-colors duration-300 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
          >
            ← Voltar
          </button>
        )}
        {finished ? (
          <button type="button" onClick={reset} className="min-h-11 rounded-xl border border-line bg-raised px-4 py-2 text-base focus-visible:outline-2 focus-visible:outline-accent">
            Reiniciar conversa
          </button>
        ) : (
          flow[step].options.map((o) => (
            <button
              key={o}
              type="button"
              disabled={typing}
              onClick={() => pick(o)}
              className="min-h-11 rounded-xl border border-line bg-raised px-4 py-2 text-base text-fg transition-colors duration-300 hover:border-accent focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-40"
            >
              {o}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
