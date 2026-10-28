"use client";

import { useRef, useState } from "react";

export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="md:hidden"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          btn.current?.focus();
        }
      }}
    >
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => setOpen((o) => !o)}
        className="min-h-11 rounded-xl px-3 py-2 text-sm text-muted transition-colors duration-300 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
      >
        {open ? "Fechar menu" : "Menu"}
      </button>
      {open && (
        <ul
          id="menu-mobile"
          className="absolute inset-x-0 top-full mt-2 rounded-2xl border border-line bg-surface p-2"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-xl px-3 text-base text-fg hover:bg-raised focus-visible:outline-2 focus-visible:outline-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
