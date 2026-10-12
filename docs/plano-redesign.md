# Plano: novo portfolio do zero

Data: 2026-09-26 · Fonte dos dados: repo `career` (`pt/resume.json`, `en/resume.json`, `en/goals.json`)

## 1. Diagnóstico do site atual

| Problema | Impacto |
|---|---|
| 5 páginas HTML separadas com header/footer duplicados e CSS/JS globais | Difícil de manter; qualquer mudança é repetida 5 vezes |
| Conteúdo desatualizado ("mais de três anos", "estudante", sem Tech Lead, sem números) | Vende você abaixo do nível real (4 anos, Tech Lead de 6 devs, 800+ PRs revisados) |
| Formulário de contato que só faz `console.log` | Recrutador acha que enviou e a mensagem se perde |
| Hero genérico (foto + parágrafo), nenhuma interação | Não diferencia de milhares de portfolios; não mostra habilidade de front-end |
| Só português, sem SEO/OG, sem dados estruturados | Invisível para vagas internacionais em USD, que o `goals.json` prioriza |
| Portfolio com projetos sem contexto (sem problema, decisões, resultado) | O que o mercado mais pede é justamente a narrativa por trás do código |

## 2. O que o mercado espera (pesquisa, set/2026)

- **Trabalho antes da biografia**: poucos projetos reais, cada um explicado em 1–2 linhas, com link para código ou demo.
- **Narrativa e trade-offs**: recrutadores valorizam entender *por que* você decidiu algo, não só a stack.
- **Contato em 10 segundos** e **mobile first**: mais de 60% dos recrutadores abrem portfolios no celular.
- **Interatividade que prova front-end**, mas sem exagero: animação pesada que atrapalha a leitura é apontada como erro comum.
- **Stack criativa de referência em 2026**: Astro (ilhas + View Transitions) com GSAP/Motion e, quando necessário, WebGL — mantém nota alta no PageSpeed mesmo com animação.
- Padrões visuais em alta: navegação estilo dock, glassmorphism maduro sobre fundo escuro, command palette (⌘K).

Fontes: [Envato — portfolio trends 2026](https://elements.envato.com/learn/portfolio-trends), [Colorlib — developer portfolios 2026](https://colorlib.com/wp/developer-portfolios/), [Codeboards — portfolio guide 2026](https://codeboards.io/blog/developer-portfolio-guide-2026), [SD Solutions — o que recrutadores buscam](https://www.sdsolutions.tech/post/what-recruiters-really-look-for-in-software-engineers-2026-update), [Codrops — Astro + GSAP portfolio](https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/), [Codrops — transições em Astro](https://tympanus.net/codrops/2026/04/08/creating-custom-page-transitions-in-astro-with-barba-js-and-gsap/).

## 3. Decisões alinhadas

| Tema | Decisão |
|---|---|
| Conceito | **Painel de observabilidade**: o site é um dashboard estilo Grafana sobre a sua carreira |
| Idioma | **Bilíngue**, EN como padrão (`/`) e PT em `/pt` |
| Hospedagem | **GitHub Pages** (mantém `leonardomonteiroo.github.io/personal-portfolio`) |
| Conteúdo de projetos | **Cases da Clinicorp em texto** (alto nível, sem código ou prints internos) + **projetos públicos do GitHub** |

## 4. Conceito: "leonardo — career observability"

A ideia conecta com a sua experiência real: você criou os dashboards de observabilidade do módulo financeiro (Grafana sobre Prometheus, Loki e Tempo). O portfolio usa essa mesma linguagem visual para contar a carreira.

Mapeamento seção → metáfora:

| Seção | Metáfora de observabilidade | Conteúdo |
|---|---|---|
| **Overview** (hero) | Dashboard com painéis de *stat* | Nome, cargo, status `● open to work`, e 4 painéis: 800+ PRs revisados, 80+ features, 1.600+ tickets resolvidos, 30 mil clínicas atendidas. Botões de e-mail e CV visíveis de cara |
| **Experience** | **Trace distribuído** (estilo Tempo) | Cada cargo é um *span* numa linha do tempo; passar o mouse/tocar abre os destaques. Estágio → Full Stack → Tech Lead aparecem como spans aninhados |
| **Cases** | **Runbooks / postmortems** | 3–4 cases da Clinicorp no formato Contexto → Problema → Decisão → Resultado |
| **Projects** | Painel de **serviços** com *health check* | Repos públicos com dados reais do GitHub (linguagem, último commit, estrelas) |
| **Stack** | **Métricas por serviço** | Skills agrupadas (Frontend, Backend, Cloud, Qualidade) como painéis, sem barras de "nível %" inventadas |
| **About** | **Logs** (estilo Loki) | Linhas de log com a história pessoal: Porto Alegre → Florianópolis, SENAI, UNINTER, LIBRAS, vôlei/basquete, MOBA, fantasia |
| **Contact** | **Canal de alerta** | E-mail com botão copiar, LinkedIn, GitHub, download do CV em PT/EN |
| **404** | Página de **incidente** | "Incident #404: page not found", com link de volta |

### Interações planejadas

1. **Seletor de intervalo de tempo** (`Last 1y · 3y · 5y · All`), igual ao do Grafana: filtra o trace de experiência e anima os painéis. É a interação "assinatura" do site.
2. **Command palette ⌘K / Ctrl+K**: navegar por seções, trocar idioma/tema, copiar e-mail, baixar CV.
3. **Contadores e sparklines** que animam ao entrar na tela.
4. **Hover/tap nos spans do trace** expande detalhes, com View Transitions entre overview e página do case.
5. **Botão "refresh"** no header que reanima o dashboard (easter egg), e **modo "raw JSON"** que mostra o `resume.json` por trás do painel. Mostra que o conteúdo vem de dados estruturados.
6. **Tema** dark (padrão, visual Grafana) e light.

### Regras de honestidade dos dados

- Os números vêm do `resume.json` do repo career, que já foram verificados via Jira/GitHub. **Nada é arredondado para cima nem inventado.**
- O rótulo "live" só aparece em dados realmente atualizados (GitHub, via rebuild diário). Métricas de carreira ficam marcadas como `snapshot 2026-09`.
- Inglês descrito exatamente como no perfil: "EF SET C1 certified (reading C2, listening B2)".

## 5. Stack técnica proposta (substitui HTML/CSS/JS puros)

> **Como foi implementado (2026-09-26):** Astro + TypeScript, mas as ilhas interativas (trace, seletor de tempo, ⌘K, tema, contadores) foram feitas em **TypeScript puro**, sem React, Tailwind, Motion ou cmdk. CSS próprio com tokens. Resultado: nenhuma dependência de UI no cliente e Lighthouse mobile 100 em todas as categorias. GoatCounter ainda não foi adicionado (precisa de conta). Tema escuro é o padrão; o claro só entra pelo botão.

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | **Astro** (versão estável mais recente) + TypeScript | HTML estático por padrão, JS só nas ilhas interativas; i18n e View Transitions nativos; ótimo para GitHub Pages |
| Ilhas interativas | **React 19** | Você já domina; usado só no trace, no seletor de tempo e no ⌘K |
| Estilo | **Tailwind CSS v4** com tokens CSS (`--panel-bg`, `--accent`...) | Design system consistente, tema dark/light por variáveis |
| Animação | **Motion** (ex-Framer Motion) + CSS scroll-driven animations | Leve; `prefers-reduced-motion` respeitado em tudo |
| Gráficos | SVG próprio para sparklines/spans | Sem biblioteca de chart pesada; controle total do visual |
| Command palette | **cmdk** | Acessível e pequena |
| Conteúdo | **Content Collections** (Zod) + MDX para cases | Tipagem e validação do conteúdo; cases em PT e EN lado a lado |
| Fonte de dados | Script `sync-career` que copia `pt/resume.json` e `en/resume.json` do repo career para `src/data/` | Uma única fonte de verdade: atualizou o currículo, atualiza o site |
| GitHub | Fetch da API do GitHub **no build** | Sem token no cliente; dados dos repos públicos |
| Qualidade | ESLint, Prettier, **Vitest** (utilitários), **Playwright** (smoke + axe) | Você já trabalha com TDD; mostra isso no próprio repo |
| Deploy | **GitHub Actions → GitHub Pages** (`withastro/action`), com `base: '/personal-portfolio'` e **cron diário** para atualizar dados do GitHub | Mantém a URL atual e deixa o "live" verdadeiro |
| Analytics | **GoatCounter** (gratuito, sem cookies) | Saber se recrutadores abrem o site sem banner de cookies |
| Fontes | JetBrains Mono (números/labels) + Inter (texto), self-hosted | Visual de dashboard, sem depender de CDN |

## 6. Estrutura do projeto

```
personal-portfolio/
├─ .github/workflows/deploy.yml     # build + deploy Pages + cron diário
├─ scripts/sync-career.mjs          # copia resume.json (pt/en) do repo career
├─ public/cv/                       # PDFs de CV PT/EN, favicon, og-image
├─ src/
│  ├─ data/resume.{pt,en}.json      # gerados pelo sync, não editar à mão
│  ├─ content/cases/{en,pt}/*.mdx   # runbooks dos cases
│  ├─ i18n/ui.ts                    # strings da interface
│  ├─ components/
│  │  ├─ panels/                    # StatPanel, Sparkline, LogPanel, ServicePanel
│  │  ├─ TraceTimeline.tsx          # ilha React
│  │  ├─ TimeRangePicker.tsx        # ilha React
│  │  └─ CommandPalette.tsx         # ilha React
│  ├─ layouts/Dashboard.astro
│  └─ pages/
│     ├─ index.astro                # EN
│     ├─ cases/[slug].astro
│     ├─ pt/index.astro             # PT
│     ├─ pt/cases/[slug].astro
│     └─ 404.astro
└─ tests/ (vitest + playwright)
```

Os arquivos antigos (`*.html`, `styles.css`, `script.js`) são removidos na fase de lançamento; o histórico git preserva a versão atual.

## 7. Conteúdo a produzir

**Cases da Clinicorp (texto, alto nível):**
1. **Migração do módulo financeiro para micro-frontend** (React + Vite + TS): estratégia incremental, 2 telas em produção, 6 módulos em andamento, 200+ arquivos de teste.
2. **Integrações financeiras externas**: fintech interna, pagamento por cartão, emissão de NFSe (Focus) e CDL/SPC. Desafios de consistência e reprocessamento via Pub/Sub.
3. **Observabilidade do módulo financeiro**: dashboards Grafana (Prometheus, Loki, Tempo) e o uso no suporte de 1.600+ tickets.
4. **Cultura de testes e liderança técnica**: adoção de Jest/TDD (30+ suítes), 800+ PRs revisados, time de 6 devs.

**Projetos públicos:** `voting-api`, `transactions-api`, `habits-manager`. Antes do lançamento, cada um precisa de README com contexto, como rodar, decisões técnicas e, se possível, demo ou GIF.

## 8. Fases de execução

| Fase | Entregas | Critério de pronto |
|---|---|---|
| **0. Preparação** | Checar se a Clinicorp permite citar os cases (política interna); foto nova; revisar READMEs dos 3 repos; textos dos cases em PT/EN (rascunho meu, revisão sua) | Conteúdo aprovado por você |
| **1. Fundação** | Projeto Astro + TS + Tailwind; i18n `/` e `/pt`; `sync-career`; workflow de deploy no Pages rodando com página placeholder | Deploy verde no Pages com base path correto |
| **2. Design system** | Tokens dark/light, tipografia, componentes de painel (`StatPanel`, `LogPanel`, `ServicePanel`, grid do dashboard) | Página de componentes revisada por você |
| **3. Seções** | Overview, Experience (trace), Cases (lista + página), Projects, Stack, About, Contact, 404 | Todo o conteúdo do `resume.json` aparece nos dois idiomas |
| **4. Interações** | Seletor de tempo, ⌘K, contadores/sparklines, View Transitions, raw JSON, refresh, tema | Tudo funciona por teclado e com `prefers-reduced-motion` |
| **5. Qualidade** | SEO (meta, OG image por idioma, `hreflang`, JSON-LD `Person`), sitemap, GoatCounter, testes Playwright + axe | Lighthouse ≥ 95 em todas as categorias no mobile; zero violações axe |
| **6. Lançamento** | Remover site antigo, atualizar links no LinkedIn e no CV (repo career), post de lançamento opcional | Site novo no ar na mesma URL |

## 9. Orçamentos e requisitos não funcionais

- JS na home ≤ 100 KB gzip; LCP < 2,0 s em 4G; CLS < 0,05.
- Legível sem JavaScript: o conteúdo é HTML estático, as ilhas só adicionam interação.
- Layout mobile em coluna única; o trace vira lista vertical em telas estreitas.
- Contraste AA nos dois temas; foco visível; navegação completa por teclado.
- E-mail e CV acessíveis em até um clique a partir de qualquer página.

## 10. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Visual de dashboard ficar denso e difícil de ler | Hierarquia clara: 4 números grandes no topo, resto abaixo da dobra; teste de "5 segundos" com 2–3 pessoas |
| Expor informação interna da Clinicorp | Cases só em alto nível, sem nomes de clientes, código ou prints; confirmar política antes de publicar |
| Conteúdo divergir do currículo | Site lê o `resume.json` do repo career; editar sempre lá |
| Base path do GitHub Pages quebrar links/assets | Usar `import.meta.env.BASE_URL` em todos os links; teste Playwright no build de produção |
| Animações pesarem no mobile | Orçamento de JS, animação só com `transform`/`opacity`, reduced motion |

## 11. Pendências com você

1. Confirmar se pode citar os 4 cases da Clinicorp (e com que nível de detalhe).
2. Foto: manter a atual `profile.png` ou tirar uma nova?
3. Status "open to work" deve aparecer publicamente no site?
4. Quer incluir telefone no site ou só e-mail/LinkedIn?
