# CBSOFT'27 — site

Site do Congresso Brasileiro de Software 2027 (Belo Horizonte, MG).
Aplicação **Vite + React + TypeScript**, com internacionalização PT/EN
(react-i18next) e código organizado por funcionalidade em `src/features/`.

## Requisitos

- Node 20+

## Scripts

```bash
npm install       # instala dependências
npm run dev       # servidor de desenvolvimento (http://localhost:5173/cbsoft/)
npm run build     # type-check + build de produção em dist/
npm run preview   # serve o build de dist/
npm run lint      # ESLint
npm test          # Vitest (testes ao lado de cada componente/página)
```

## Estrutura

```
src/
  main.tsx              ponto de entrada: estilos globais, i18n e <App />
  app/                  composição da aplicação
    App.tsx             roteador, header, footer e metadados
    i18n/               configuração react-i18next + locales pt/en ("common")
    config/             publication.ts: o que ainda depende de aprovação
  features/             uma pasta por área do site
    layout/             header, mega menu, menu mobile, idioma, footer, metadados
    home/               página inicial: hero, countdown, "O que é", busca
    symposia/           dados dos simpósios, agenda, carrossel, calendário
    venue/              seção e página do local (/local)
    about/              página Sobre (/sobre)
    registration/       inscrições (/inscricoes)
    calls/              chamadas: workshops, voluntários, CFP
    papers/             artigos aceitos
    conduct/            código de conduta
    previous-editions/  edições anteriores
    sponsorship/        "Quem está contribuindo"
    program/            palestrantes, convidados, comitê (seções desligadas)
  shared/               genérico, sem conhecimento de nenhuma feature
    components/         Button, DataTable, Reveal, SectionHeading, YouTubeEmbed,
                        brand/ (BrandBar, BrandStripes), icons/ (ícones de linha)
    hooks/              useInView, useOnClickOutside, useLang
    utils/              localized.ts (par { pt, en })
    constants/          routes.ts, congress.ts, assets.ts (imagens de public/)
  styles/               tokens, base, fontes, tailwind e components/ (um CSS por área)
  test/                 setup do Vitest
```

Dentro de cada feature, as subpastas seguem sempre o mesmo papel: `pages/`
(componentes de rota), `components/`, `hooks/`, `data/` (conteúdo tipado) e
`utils/`. Só existem as subpastas que a feature usa.

**Direção das dependências:** `app` → `features` → `shared`. `shared` nunca
importa de `features`; uma feature pode ler dados de outra (por exemplo,
`symposia`), sem ciclos. Não há barrel files (`index.ts`): importe o arquivo
direto, pelo alias `@/`.

**Estilos:** `styles/components.css` importa os arquivos de
`styles/components/` em ordem. A ordem é a da cascata, então um arquivo novo
entra na posição que suas regras exigem.

### Editar conteúdo

- **Textos de interface** (menus, botões, títulos de seção): `src/app/i18n/locales/{pt,en}/common.json`.
- **Datas, valores, simpósios, comitê**: arquivos `data/` da feature
  correspondente (ex.: `src/features/symposia/data/`). Campos bilíngues usam o
  par `{ pt, en }` (`Localized` em `src/shared/utils/localized.ts`).
- **Itens ainda não aprovados** (prazo do contador, datas, inscrições, links
  da chamada): `src/app/config/publication.ts`. `null` esconde o item.
- **URLs das páginas**: `src/shared/constants/routes.ts`.
- **Título e descrição de cada página**: `PAGE_KEYS` em
  `src/features/layout/components/PageMetadata.tsx`.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` faz build e publica `dist/` a cada push na `main`.
O `base` do Vite é `/cbsoft/` (project page). Para domínio próprio, defina
`VITE_BASE=/` no workflow.
