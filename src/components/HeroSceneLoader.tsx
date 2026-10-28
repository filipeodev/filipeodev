"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function HeroSceneLoader() {
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  // null = segue a preferência do sistema; com movimento reduzido a cena começa parada
  // e a própria pessoa decide reproduzir (WCAG 2.2.2 e 2.3.3)
  const [choice, setChoice] = useState<boolean | null>(null);
  const paused = choice ?? reduced;

  return (
    <>
      <div className="absolute inset-0 -z-10" aria-hidden>
        <HeroScene paused={paused} />
      </div>
      <button
        type="button"
        aria-pressed={!paused}
        onClick={() => setChoice(!paused)}
        className="absolute right-4 bottom-4 z-10 min-h-11 rounded-xl border border-line bg-surface/80 px-3 py-2 font-mono text-sm text-muted backdrop-blur-md transition-colors duration-300 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {paused ? "Reproduzir animação" : "Pausar animação"}
      </button>
    </>
  );
}
