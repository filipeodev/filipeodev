import { brl } from "@/data/crmDemo";

type Month = { mes: string; receita: number; despesa: number };

export function BarChart({ data }: { data: Month[] }) {
  const W = 600;
  const H = 240;
  const pad = { l: 8, r: 8, t: 12, b: 28 };
  const max = Math.max(...data.flatMap((d) => [d.receita, d.despesa])) * 1.1;
  const gw = (W - pad.l - pad.r) / data.length;
  const bw = Math.min(28, gw / 3);
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / max);

  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Receitas e despesas por mês" className="w-full">
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} x1={pad.l} x2={W - pad.r} y1={y(max * f * 0.909)} y2={y(max * f * 0.909)} stroke="#313131" strokeDasharray="3 4" />
        ))}
        {data.map((d, i) => {
          const cx = pad.l + gw * i + gw / 2;
          return (
            <g key={d.mes}>
              <rect x={cx - bw - 2} y={y(d.receita)} width={bw} height={H - pad.b - y(d.receita)} rx={4} fill="#34d399">
                <title>{`${d.mes}: receitas ${brl.format(d.receita)}`}</title>
              </rect>
              <rect x={cx + 2} y={y(d.despesa)} width={bw} height={H - pad.b - y(d.despesa)} rx={4} fill="#a3a3a3">
                <title>{`${d.mes}: despesas ${brl.format(d.despesa)}`}</title>
              </rect>
              <text x={cx} y={H - 8} textAnchor="middle" fontSize="12" fill="#a3a3a3">
                {d.mes}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 flex gap-4 text-sm text-muted">
        <span className="flex items-center gap-2"><span className="size-3 rounded-sm bg-accent" aria-hidden /> Receitas</span>
        <span className="flex items-center gap-2"><span className="size-3 rounded-sm bg-[#a3a3a3]" aria-hidden /> Despesas</span>
      </figcaption>
      <table className="sr-only">
        <caption>Receitas e despesas por mês</caption>
        <thead><tr><th>Mês</th><th>Receitas</th><th>Despesas</th></tr></thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.mes}><td>{d.mes}</td><td>{brl.format(d.receita)}</td><td>{brl.format(d.despesa)}</td></tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

const palette = ["#34d399", "#fbbf24", "#60a5fa", "#f472b6", "#a3a3a3"];

export function Donut({ items }: { items: { label: string; value: number }[] }) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  const r = 52;
  const c = 2 * Math.PI * r;
  const lens = items.map((it) => (it.value / total) * c);
  const offsets = lens.map((_, i) => lens.slice(0, i).reduce((s, l) => s + l, 0));

  return (
    <figure className="flex flex-wrap items-center gap-6">
      <svg viewBox="0 0 140 140" role="img" aria-label="Despesas por categoria" className="size-40 shrink-0 -rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#1f1f1f" strokeWidth="20" />
        {items.map((it, i) => (
          <circle
            key={it.label}
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={palette[i % palette.length]}
            strokeWidth="20"
            strokeDasharray={`${lens[i]} ${c - lens[i]}`}
            strokeDashoffset={-offsets[i]}
          />
        ))}
      </svg>
      <figcaption>
        <ul className="space-y-2 text-base">
          {items.map((it, i) => (
            <li key={it.label} className="flex items-center gap-2">
              <span className="size-3 rounded-sm" style={{ background: palette[i % palette.length] }} aria-hidden />
              <span>{it.label}</span>
              <span className="font-mono text-sm text-muted tabular-nums">
                {brl.format(it.value)} · {Math.round((it.value / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
