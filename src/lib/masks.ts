const digitsOf = (v: string) => v.replace(/\D/g, "");

// (11) 98765-4321 ou (11) 3456-7890
export function maskPhone(v: string) {
  const d = digitsOf(v).slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export const phoneDigits = (v: string) => digitsOf(v).length;

// digita só números e o valor vai se formando em centavos: R$ 1.234,56
export function maskCurrency(v: string) {
  const d = digitsOf(v).slice(0, 11);
  if (!d) return "";
  const n = Number(d) / 100;
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export const parseCurrency = (v: string) => Number(digitsOf(v)) / 100;

export const currencyFromNumber = (n: number) => maskCurrency(String(Math.round(n * 100)));
