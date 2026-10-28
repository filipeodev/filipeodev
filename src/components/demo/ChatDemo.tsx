"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { from: "bot" | "me"; text: string };
type Step = { ask: string; options: string[]; reply: (choice: string) => string };

const flow: Step[] = [
  { ask: "O que você quer agendar?", options: ["Limpeza de pele", "Massagem", "Depilação"], reply: (c) => `Ótima escolha: ${c}. Para qual dia você prefere?` },
  { ask: "Para qual dia você prefere?", options: ["Amanhã", "Sexta", "Sábado"], reply: (c) => `Tenho horários ${c.toLowerCase()} às 10h e às 15h. Qual você quer?` },
  { ask: "Qual horário você prefere, 10h ou 15h?", options: ["10h", "15h"], reply: (c) => `Pronto, reservei às ${c}. Você recebe um lembrete antes do horário.` },
  { ask: "Posso ajudar em mais alguma coisa?", options: ["Falar com uma pessoa", "Está ótimo, obrigado"], reply: (c) =>
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

  // os botões são trocados a cada passo: devolve o foco ao primeiro botão novo
  const opts = useRef<HTMLDivElement>(null);
  const refocus = useRef(false);
  useEffect(() => {
    if (!refocus.current || typing) return;
    refocus.current = false;
    opts.current?.querySelector<HTMLButtonElement>("button[data-opt]:not(:disabled)")?.focus();
  }, [typing, step, msgs]);

  const pick = (choice: string) => {
    refocus.current = true;
    const current = flow[step];
    setMsgs((m) => [...m, { from: "me", text: choice }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: current.reply(choice) }]);
      setTyping(false);
      setStep((s) => s + 1);
    }, 700);
  };

  // a pessoa avisa que errou, e o bot repete a pergunta anterior.
  // Se a resposta ainda está "digitando", ela é cancelada e o passo atual se repete.
  const back = () => {
    refocus.current = true;
    clearTimeout(timer.current);
    const target = typing ? step : step - 1;
    setMsgs((m) => [
      ...m,
      { from: "me", text: "Errei a opção, quero escolher novamente." },
      { from: "bot", text: `Sem problema! ${flow[target].ask}` },
    ]);
    setStep(target);
    setTyping(false);
  };

  const reset = () => {
    refocus.current = true;
    clearTimeout(timer.current);
    setStep(0);
    setTyping(false);
    setMsgs([{ from: "bot", text: "Olá! Sou a assistente da Clínica Lume. O que você quer agendar?" }]);
  };

  const finished = step >= flow.length;

  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-line bg-canvas">
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
      <div ref={opts} className="flex flex-wrap gap-2 border-t border-line bg-surface p-3">
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
          <button type="button" data-opt onClick={reset} className="min-h-11 rounded-xl border border-line bg-raised px-4 py-2 text-base focus-visible:outline-2 focus-visible:outline-accent">
            Reiniciar conversa
          </button>
        ) : (
          flow[step].options.map((o) => (
            <button
              key={o}
              type="button"
              data-opt
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
