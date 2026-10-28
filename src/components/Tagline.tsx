"use client";

import { useEffect, useRef } from "react";

const TEXT = "Tecnologia boa é a que você não precisa explicar. Ela atende o cliente, organiza a agenda e fecha a venda enquanto você cuida do resto.";

export function Tagline() {
  const root = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const words = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-w]") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.on = "true";
            io.unobserve(e.target);
          }
        }
      },
      // linha de gatilho a 25% da base da tela
      { rootMargin: "0px 0px -25% 0px", threshold: 1 },
    );
    words.forEach((w) => io.observe(w));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label="Filosofia de trabalho" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <p ref={root} className="max-w-[680px] text-4xl font-semibold tracking-tight sm:text-5xl">
        {TEXT.split(" ").map((w, i) => (
          <span
            key={i}
            data-w
            className="text-fg/30 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[on=true]:text-fg motion-reduce:transition-none"
          >
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
