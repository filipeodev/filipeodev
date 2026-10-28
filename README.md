# filipe.odev

Portfólio de Filipe: sistemas de agendamento, automação no WhatsApp, CRMs e landing pages, com demonstrações interativas.

Next.js (App Router), TypeScript, Tailwind CSS 4 e Three.js. Sem backend e sem banco de dados.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em http://localhost:3000. Copie `.env.example` para `.env.local` para mudar o número do WhatsApp e o endereço do site.

## Variáveis de ambiente

| Variável | Para que serve | Padrão |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP` | Número dos botões de contato, só dígitos com DDI e DDD | `5511977206800` |
| `NEXT_PUBLIC_SITE_URL` | Endereço público, usado no `sitemap`, no `robots` e nas imagens de compartilhamento | `https://filipeodev.com` |

As duas são embutidas no build. Mudou o valor, faça um novo deploy.

## Deploy no Coolify (Contabo)

1. Crie um recurso do tipo **Dockerfile** apontando para este repositório. O `Dockerfile` está na raiz.
2. Porta exposta: `3000`.
3. Em **Environment Variables**, adicione `NEXT_PUBLIC_WHATSAPP` e `NEXT_PUBLIC_SITE_URL` e marque **Build Variable** nas duas.
4. Domínio: `https://filipeodev.com` (e `www`, se usar). O Coolify emite o certificado.
5. Healthcheck: já está no `Dockerfile` (`GET /` na porta 3000).

Teste a imagem localmente:

```bash
docker build -t filipeodev .
docker run --rm -p 3000:3000 filipeodev
```

## Estrutura

- `src/app`: páginas (`/`, `/demo/*`, `/privacidade`, `/termos`), `sitemap`, `robots`, `not-found` e imagem de compartilhamento.
- `src/components`: seções da home. Em `demo/`, as demonstrações.
- `src/data`: textos dos serviços, projetos, bastidores e dúvidas. Para trocar os projetos de exemplo por reais, edite `projects.ts`.
- `src/lib`: link do WhatsApp e máscaras de campo.
