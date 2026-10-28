"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

// a animação roda sempre, por decisão do dono do site (ignora prefers-reduced-motion)
export function HeroSceneLoader() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30 transition-opacity duration-500 lg:opacity-100" aria-hidden>
      <HeroScene />
    </div>
  );
}
