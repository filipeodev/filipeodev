import { brl, stages, type Lead, type Tx } from "@/data/crmDemo";
import { BarChart } from "./Charts";
import { chartData, totals } from "./CrmFinanceiro";

export function CrmVisao({ leads, tx }: { leads: Lead[]; tx: Tx[] }) {
  const open = leads.filter((l) => l.stage < 3);
  const pipeline = open.reduce((s, l) => s + l.value, 0);
  const t = totals(tx);
  const kpis = [
    { l: "Negócios em aberto", v: String(open.length) },
    { l: "Valor no funil", v: brl.format(pipeline) },
    { l: "Receitas do mês", v: brl.format(t.receita) },
    { l: "Saldo do mês", v: brl.format(t.saldo) },
  ];

  return (
    <div className="space-y-6">
      <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-2xl border border-line bg-surface p-4">
            <dt className="font-mono text-xs tracking-wider text-muted uppercase">{k.l}</dt>
            <dd className="mt-1 text-3xl font-semibold text-fg tabular-nums">{k.v}</dd>
          </div>
        ))}
      </dl>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-line bg-surface p-4">
          <h3 className="mb-3 text-xl font-semibold">Receitas e despesas</h3>
          <BarChart data={chartData(tx)} />
        </section>
        <section className="rounded-2xl border border-line bg-surface p-4">
          <h3 className="mb-3 text-xl font-semibold">Funil por etapa</h3>
          <ul className="space-y-3">
            {stages.map((s, i) => {
              const n = leads.filter((l) => l.stage === i).length;
              return (
                <li key={s}>
                  <div className="flex justify-between text-base">
                    <span className="text-fg">{s}</span>
                    <span className="font-mono text-muted tabular-nums">{n}</span>
                  </div>
                  <div className="mt-1 h-2 rounded bg-raised" aria-hidden>
                    <div className="h-2 rounded bg-accent" style={{ width: `${(n / Math.max(leads.length, 1)) * 100}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
