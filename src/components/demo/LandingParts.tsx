"use client";

import { useEffect, useRef, useState } from "react";

export function HeroArt() {
  return (
    <svg viewBox="0 0 400 440" role="img" aria-label="Ilustração de rosto com folhas e gotas" className="w-full max-w-md">
      <path d="M70 230C40 120 140 30 240 50s150 110 110 210-130 160-210 130S100 330 70 230Z" fill="#f1d9d4" />
      <circle cx="205" cy="210" r="96" fill="#f8e9e4" stroke="#b4536a" strokeWidth="2" />
      <path d="M160 200q10-14 24 0M226 200q10-14 24 0" fill="none" stroke="#2a2321" strokeWidth="3" strokeLinecap="round" />
      <path d="M180 250q25 22 50 0" fill="none" stroke="#b4536a" strokeWidth="3" strokeLinecap="round" />
      <path d="M95 110c40-20 70 10 60 50-40 10-70-10-60-50Z" fill="#8fae9a" className="float-slow" />
      <path d="M320 300c-40 0-60 30-40 65 40-5 55-35 40-65Z" fill="#8fae9a" className="float-slow float-delay" />
      <circle cx="320" cy="110" r="14" fill="#b4536a" className="float-slow" />
      <circle cx="90" cy="320" r="9" fill="#e9b8a8" className="float-slow float-delay" />
      <path d="M300 170c10 16 10 26 0 32-10-6-10-16 0-32Z" fill="#7aa7c7" className="float-slow" />
    </svg>
  );
}

export function TreatmentArt({ kind }: { kind: "hidratacao" | "peeling" | "laser" }) {
  return (
    <svg viewBox="0 0 320 180" aria-hidden className="w-full">
      {kind === "hidratacao" && (
        <>
          <rect width="320" height="180" fill="#dcebf3" />
          <path d="M0 120q40-30 80 0t80 0 80 0 80 0v60H0Z" fill="#a9cde2" />
          <path d="M0 140q40-25 80 0t80 0 80 0 80 0v40H0Z" fill="#7aa7c7" />
          <path d="M160 30c24 30 34 48 0 70-34-22-24-40 0-70Z" fill="#ffffff" opacity=".9" className="float-slow" />
        </>
      )}
      {kind === "peeling" && (
        <>
          <rect width="320" height="180" fill="#f6e3d6" />
          {Array.from({ length: 28 }).map((_, i) => (
            <circle key={i} cx={20 + (i % 7) * 46} cy={26 + Math.floor(i / 7) * 42} r={i % 3 === 0 ? 10 : 6} fill={i % 2 ? "#e9b8a8" : "#d98f7a"} />
          ))}
          <circle cx="160" cy="90" r="34" fill="#b4536a" opacity=".85" className="float-slow" />
        </>
      )}
      {kind === "laser" && (
        <>
          <rect width="320" height="180" fill="#2a2321" />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1="160" y1="10" x2={20 + i * 35} y2="170" stroke="#e9b8a8" strokeWidth="1.5" opacity=".55" />
          ))}
          <circle cx="160" cy="26" r="16" fill="#b4536a" className="float-slow" />
        </>
      )}
    </svg>
  );
}

export function CountUp({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1400, 1);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    // começa em 0 só quando a animação pode rodar
    raf = requestAnimationFrame(() => setVal(0));
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const spots = [
    [60, 50], [130, 90], [210, 40], [260, 120], [90, 150], [180, 140], [300, 70], [40, 110], [240, 170], [150, 30],
  ];
  return (
    <div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[#e6d7cf]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#f8e9e4,#f1d9d4)]" aria-hidden />
        <svg viewBox="0 0 340 200" className="absolute inset-0 size-full" aria-hidden preserveAspectRatio="none">
          <rect width="340" height="200" fill="#e7c4b6" opacity=".35" />
          {spots.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={6 + (i % 3) * 3} fill="#b9856f" opacity=".55" />
          ))}
        </svg>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#fff6f2,#f8e3dc)]" />
        </div>
        <div className="absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }} aria-hidden />
        <span className="absolute top-3 left-3 rounded-lg bg-[#2a2321]/80 px-2 py-1 text-xs text-white">Antes</span>
        <span className="absolute top-3 right-3 rounded-lg bg-[#2a2321]/80 px-2 py-1 text-xs text-white">Depois</span>
      </div>
      <label className="mt-3 block text-sm text-[#6b5d57]">
        Arraste para comparar (ilustração)
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="mt-2 block min-h-11 w-full accent-[#b4536a]"
        />
      </label>
    </div>
  );
}
