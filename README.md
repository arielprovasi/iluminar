# Iluminar Web

Aplicacao institucional em `Next.js` + `TypeScript` + `Tailwind CSS` com componentes `shadcn/ui`.

## Stack

- `next` (App Router)
- `react`
- `tailwindcss`
- `shadcn/ui`

## Setup

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - ambiente de desenvolvimento
- `npm run build` - build estatico de producao (gera pasta `out/`)
- `npm run export` - alias para build estatico (`next build` com `output: "export"`)
- `npm run start` - sobe a build de producao
- `npm run lint` - lint com regras do Next.js

## Configuration

Informacoes institucionais e de contato ficam centralizadas em `src/config/site.ts`.

## Deploy estatico (cPanel)

1. Rode `npm run build`.
2. Faça upload de todo o conteudo da pasta `out/` para `public_html/` no cPanel.
3. Garanta que o dominio esteja apontando para a hospedagem no DNS (Registro.br).
4. Ative SSL no cPanel (AutoSSL/Let's Encrypt) e force HTTPS.
