# CBSOFT'27 — site

Site do Congresso Brasileiro de Software 2027 (Belo Horizonte, MG).
Aplicação **Vite + React + TypeScript**, com internacionalização PT/EN
(react-i18next) e conteúdo estruturado em `src/data/`.

## Requisitos

- Node 20+

## Scripts

```bash
npm install       # instala dependências
npm run dev       # servidor de desenvolvimento (http://localhost:5173/cbsoft/)
npm run build     # type-check + build de produção em dist/
npm run preview   # serve o build de dist/
npm run lint      # ESLint
npm test          # Vitest (lib/calendar + smoke test da App)
```

## Estrutura

```
src/
  i18n/            configuração react-i18next + locales pt/en (namespace "common")
  styles/          tokens.css (design tokens + temas), base.css, components.css
  data/            conteúdo tipado: nav, symposia, agenda, cfp, registration,
                   committee, sponsors, keynotes, config
  lib/             calendar.ts (links "adicionar ao calendário"), localized.ts
  hooks/           useCountdown, useInView, useOnClickOutside, useLang
  components/
    layout/        Header, MobileMenu, LanguageSwitcher, Footer
    ui/            Button, Reveal, SectionHeading, DataTable, Wordmark
    sections/      Hero, Countdown, Agenda, SymposiumCarousel, AddToCalendar,
                   About, Symposia, CallForPapers, Keynotes, Registration,
                   Committee, Sponsorship
```

### Editar conteúdo

- **Textos de interface** (menus, botões, títulos de seção): `src/i18n/locales/{pt,en}/common.json`.
- **Datas, valores, simpósios, comitê**: arquivos em `src/data/`. Campos
  bilíngues usam o par `{ pt, en }` (`Localized` em `src/lib/localized.ts`).
- **Prazo do contador regressivo**: `COUNTDOWN_DEADLINE` em `src/data/config.ts`.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` faz build e publica `dist/` a cada push na `main`.
O `base` do Vite é `/cbsoft/` (project page). Para domínio próprio, defina
`VITE_BASE=/` no workflow.
