"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export function HeroSceneLoader() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <div className="absolute inset-0 -z-10" aria-hidden>
        <HeroScene paused={paused} />
      </div>
      {/* movimento contínuo precisa de pausa (WCAG 2.2.2); sem sentido quando o movimento já está reduzido */}
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
        className="absolute right-4 bottom-4 z-10 min-h-11 rounded-xl border border-line bg-surface/80 px-3 py-2 font-mono text-sm text-muted backdrop-blur-md transition-colors duration-300 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:hidden"
      >
        {paused ? "Retomar animação" : "Pausar animação"}
      </button>
    </>
  );
}
