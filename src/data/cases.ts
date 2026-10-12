// Case studies. Every number and fact here comes from the verified résumé in the career repo
// (src/data/resume.*.json); nothing is extrapolated. Keep both languages in sync.

export interface CaseContent {
  title: string;
  summary: string;
  role: string;
  metrics: { value: string; label: string }[];
  context: string[];
  problem: string[];
  approach: string[];
  outcome: string[];
}

export interface CaseStudy {
  slug: string;
  period: { start: string; end?: string };
  stack: string[];
  en: CaseContent;
  pt: CaseContent;
}

export const cases: CaseStudy[] = [
  {
    slug: 'financial-micro-frontend',
    period: { start: '2026-04' },
    stack: ['TypeScript', 'React', 'Vite', 'Micro-frontends', 'Jest'],
    en: {
      title: 'Migrating a legacy financial module to a TypeScript micro-frontend',
      summary:
        'Architected the new financial module as a TypeScript micro-frontend and lead its incremental migration off the legacy JavaScript module, while the product keeps shipping.',
      role: 'Tech Lead and top committer (54% of the new codebase’s commits)',
      metrics: [
        { value: '2', label: 'screens live in production' },
        { value: '6', label: 'modules under way' },
        { value: '200+', label: 'test files in the new codebase' },
        { value: '54%', label: 'of commits authored by me' },
      ],
      context: [
        'The financial module serves a healthcare SaaS used by 30,000+ dental clinics and 200,000+ active users.',
        'It was built as a legacy JavaScript module inside the main application, where the squad had delivered features for years.',
      ],
      problem: [
        'Evolving the module meant working in untyped legacy code, where changes carried regression risk for a part of the product that handles money.',
        'A full rewrite would have frozen feature delivery for the clinics that depend on the module every day.',
      ],
      approach: [
        'Designed and stood up a separate micro-frontend in TypeScript, React and Vite for the financial module.',
        'Chose an incremental migration: screens move one at a time from the legacy module to the new codebase, so each release is small and reversible.',
        'Made tests part of the new codebase from the start: it already holds more than 200 test files.',
        'Lead the migration hands-on while leading the team, as the top committer of the new micro-frontend.',
      ],
      outcome: [
        'Two screens are live in production: checking account and NFSe issuer setup.',
        'Six more modules are under way on the new architecture.',
        'New work lands in a typed, tested codebase instead of the legacy module.',
      ],
    },
    pt: {
      title: 'Migrando um módulo financeiro legado para um micro-frontend em TypeScript',
      summary:
        'Arquitetei o novo módulo financeiro como um micro-frontend em TypeScript e conduzo sua migração incremental a partir do módulo legado em JavaScript, sem parar as entregas do produto.',
      role: 'Tech Lead e maior contribuidor (54% dos commits da nova base)',
      metrics: [
        { value: '2', label: 'telas em produção' },
        { value: '6', label: 'módulos em andamento' },
        { value: '200+', label: 'arquivos de teste na nova base' },
        { value: '54%', label: 'dos commits são meus' },
      ],
      context: [
        'O módulo financeiro atende um SaaS de saúde usado por mais de 30 mil clínicas odontológicas e mais de 200 mil usuários ativos.',
        'Ele nasceu como um módulo legado em JavaScript dentro da aplicação principal, onde o squad entregou funcionalidades por anos.',
      ],
      problem: [
        'Evoluir o módulo significava trabalhar em código legado sem tipagem, onde cada mudança trazia risco de regressão numa parte do produto que lida com dinheiro.',
        'Reescrever tudo de uma vez congelaria as entregas para as clínicas que dependem do módulo todos os dias.',
      ],
      approach: [
        'Desenhei e estabeleci um micro-frontend separado em TypeScript, React e Vite para o módulo financeiro.',
        'Optei por uma migração incremental: as telas saem do módulo legado uma por vez, então cada release é pequena e reversível.',
        'Testes fazem parte da nova base desde o início: ela já tem mais de 200 arquivos de teste.',
        'Conduzo a migração de forma hands-on enquanto lidero o time, como maior contribuidor do novo micro-frontend.',
      ],
      outcome: [
        'Duas telas estão em produção: conta corrente e configuração do emissor de NFSe.',
        'Outros seis módulos estão em andamento na nova arquitetura.',
        'O trabalho novo entra numa base tipada e testada, em vez do módulo legado.',
      ],
    },
  },
  {
    slug: 'financial-integrations',
    period: { start: '2022-02', end: '2026-04' },
    stack: ['Node.js', 'TypeScript', 'Google Cloud Pub/Sub', 'Datastore', 'REST APIs'],
    en: {
      title: 'Integrating the financial module with four external systems',
      summary:
        'Built and maintained the integrations between the financial module and four external systems: payments, invoicing and credit bureaus.',
      role: 'Full Stack Developer',
      metrics: [
        { value: '4', label: 'external systems integrated' },
        { value: '80+', label: 'features shipped in the module' },
        { value: '290+', label: 'PRs authored and merged' },
      ],
      context: [
        'Clinics use the financial module to charge patients, issue service invoices and manage receivables.',
        'Those flows depend on systems outside the platform, each with its own API and failure modes.',
      ],
      problem: [
        'Card payments, electronic service invoices (NFSe), credit lookups and debt registration each had to work reliably from inside the product.',
        'When an external call fails, the platform still has to end up in a consistent state, in a domain where errors mean wrong charges or missing invoices.',
      ],
      approach: [
        'Built and maintained integrations with the in-house fintech, Saúde Service (card payments), Focus (NFSe issuing) and CDL/SPC (credit lookups and SPC debt registration).',
        'Worked on the Node.js services on Google Cloud (Datastore, Pub/Sub) that back these flows.',
        'When messages failed in production, investigated the logs and reprocessed the Pub/Sub messages so each affected flow completed.',
      ],
      outcome: [
        'Clinics can charge by card, issue NFSe and check or register debts without leaving the platform.',
        'The integrations are part of the 80+ features I delivered in the module.',
      ],
    },
    pt: {
      title: 'Integrando o módulo financeiro com quatro sistemas externos',
      summary:
        'Construí e mantive as integrações do módulo financeiro com quatro sistemas externos: pagamentos, notas fiscais e birôs de crédito.',
      role: 'Desenvolvedor Full Stack',
      metrics: [
        { value: '4', label: 'sistemas externos integrados' },
        { value: '80+', label: 'funcionalidades entregues no módulo' },
        { value: '290+', label: 'PRs de autoria mergeados' },
      ],
      context: [
        'As clínicas usam o módulo financeiro para cobrar pacientes, emitir notas fiscais de serviço e controlar recebíveis.',
        'Esses fluxos dependem de sistemas fora da plataforma, cada um com sua API e seus modos de falha.',
      ],
      problem: [
        'Pagamento por cartão, emissão de NFSe, consulta de crédito e registro de dívidas precisavam funcionar de forma confiável de dentro do produto.',
        'Quando uma chamada externa falha, a plataforma ainda precisa terminar num estado consistente, num domínio em que erro significa cobrança errada ou nota faltando.',
      ],
      approach: [
        'Construí e mantive integrações com a fintech interna, Saúde Service (pagamento por cartão), Focus (emissão de NFSe) e CDL/SPC (consulta de crédito e registro no SPC).',
        'Trabalhei nos serviços Node.js no Google Cloud (Datastore, Pub/Sub) que sustentam esses fluxos.',
        'Quando mensagens falhavam em produção, investigava os logs e reprocessava as mensagens do Pub/Sub para que cada fluxo afetado fosse concluído.',
      ],
      outcome: [
        'As clínicas cobram por cartão, emitem NFSe e consultam ou registram dívidas sem sair da plataforma.',
        'As integrações fazem parte das mais de 80 funcionalidades que entreguei no módulo.',
      ],
    },
  },
  {
    slug: 'observability-and-production-support',
    period: { start: '2022-02' },
    stack: ['Grafana', 'Prometheus', 'Loki', 'Tempo', 'Google Cloud Logging', 'Pub/Sub'],
    en: {
      title: 'Observability and production support for a financial module',
      summary:
        'Authored the financial module’s observability dashboards and resolved 1,600+ production support tickets with them.',
      role: 'Full Stack Developer, now Tech Lead',
      metrics: [
        { value: '1,600+', label: 'production tickets resolved' },
        { value: '3', label: 'telemetry signals: metrics, logs, traces' },
        { value: '~100', label: 'bugs fixed across the system' },
      ],
      context: [
        'Financial flows touch payments, invoices and external systems, so production issues reach clinics directly.',
        'The squad needed to see what the module was doing in production, not only react to support tickets.',
      ],
      problem: [
        'Debugging a failed charge or invoice meant piecing together evidence from several sources.',
        'Without shared dashboards and alerts, the squad noticed problems late.',
      ],
      approach: [
        'Authored the financial module’s observability dashboards in Grafana over Prometheus (metrics), Loki (logs) and Tempo (traces).',
        'Used them, together with Google Cloud logs, to debug production issues and reprocess failed Pub/Sub messages.',
        'Paired support work with root-cause fixes: resolved 12 technical debt items and fixed around 100 bugs in the system.',
      ],
      outcome: [
        'Resolved 1,600+ production support tickets in the financial module.',
        'The dashboards and alerts are what the squad uses to monitor the module.',
      ],
    },
    pt: {
      title: 'Observabilidade e suporte em produção de um módulo financeiro',
      summary:
        'Criei os dashboards de observabilidade do módulo financeiro e resolvi mais de 1.600 chamados de suporte em produção com eles.',
      role: 'Desenvolvedor Full Stack, hoje Tech Lead',
      metrics: [
        { value: '1.600+', label: 'chamados de produção resolvidos' },
        { value: '3', label: 'sinais de telemetria: métricas, logs, traces' },
        { value: '~100', label: 'bugs corrigidos no sistema' },
      ],
      context: [
        'Fluxos financeiros envolvem pagamentos, notas e sistemas externos, então um problema em produção chega direto às clínicas.',
        'O squad precisava enxergar o que o módulo fazia em produção, e não só reagir aos chamados.',
      ],
      problem: [
        'Depurar uma cobrança ou nota com falha exigia juntar evidências de várias fontes.',
        'Sem dashboards e alertas compartilhados, o squad percebia os problemas tarde.',
      ],
      approach: [
        'Criei os dashboards de observabilidade do módulo financeiro em Grafana sobre Prometheus (métricas), Loki (logs) e Tempo (traces).',
        'Usei esses painéis, junto com os logs do Google Cloud, para depurar problemas em produção e reprocessar mensagens do Pub/Sub com falha.',
        'Combinei suporte com correção da causa raiz: resolvi 12 débitos técnicos e corrigi cerca de 100 bugs no sistema.',
      ],
      outcome: [
        'Mais de 1.600 chamados de suporte resolvidos em produção no módulo financeiro.',
        'Os dashboards e alertas são o que o squad usa para acompanhar o módulo.',
      ],
    },
  },
  {
    slug: 'engineering-quality-and-leadership',
    period: { start: '2023-01' },
    stack: ['Jest', 'TDD', 'Code review', 'Claude Code', 'Scrum/Kanban'],
    en: {
      title: 'Raising engineering quality: tests, reviews and a team of six',
      summary:
        'Brought automated testing to the squad, reviewed 800+ pull requests and now lead a team of six developers.',
      role: 'Full Stack Developer, then Tech Lead',
      metrics: [
        { value: '800+', label: 'pull requests reviewed since 2023' },
        { value: '30+', label: 'test suites created' },
        { value: '6', label: 'developers led' },
      ],
      context: [
        'The squad has 10 people; the development team I lead has 6 developers (1 junior, 4 mid-level, 1 senior).',
        'The code we ship handles clinics’ money, so quality has to be part of how we work, not a phase at the end.',
      ],
      problem: [
        'The team did not have an automated testing practice when I started pushing for it.',
        'As the team grew, keeping technical decisions and code quality consistent needed an owner.',
      ],
      approach: [
        'Drove the adoption of automated testing with Jest and TDD, creating and maintaining 30+ test suites across nearly 40 pull requests.',
        'Reviewed 800+ pull requests since 2023 and own the squad’s technical decisions and code quality.',
        'Automated parts of the squad’s workflow with Claude Code: pull request review, a twice-daily regression radar over support tickets, branch closing, preview deploys and UI test runs.',
      ],
      outcome: [
        'Tests are now standard: the new financial micro-frontend already has 200+ test files.',
        'Promoted to Tech Lead in April 2026, leading six developers while staying hands-on.',
      ],
    },
    pt: {
      title: 'Elevando a qualidade de engenharia: testes, revisões e um time de seis',
      summary:
        'Levei testes automatizados para o squad, revisei mais de 800 pull requests e hoje lidero um time de seis desenvolvedores.',
      role: 'Desenvolvedor Full Stack, depois Tech Lead',
      metrics: [
        { value: '800+', label: 'pull requests revisados desde 2023' },
        { value: '30+', label: 'suítes de teste criadas' },
        { value: '6', label: 'desenvolvedores liderados' },
      ],
      context: [
        'O squad tem 10 pessoas; o time de desenvolvimento que lidero tem 6 devs (1 júnior, 4 plenos, 1 sênior).',
        'O código que entregamos lida com o dinheiro das clínicas, então qualidade precisa fazer parte do processo, e não ser uma etapa no fim.',
      ],
      problem: [
        'O time não tinha uma prática de testes automatizados quando comecei a puxar esse tema.',
        'Com o time crescendo, manter decisões técnicas e qualidade de código consistentes precisava de um responsável.',
      ],
      approach: [
        'Conduzi a adoção de testes automatizados com Jest e TDD, criando e mantendo mais de 30 suítes de teste em quase 40 pull requests.',
        'Revisei mais de 800 pull requests desde 2023 e respondo pelas decisões técnicas e pela qualidade de código do squad.',
        'Automatizei partes do fluxo do squad com Claude Code: revisão de pull request, um radar de regressões duas vezes ao dia sobre chamados de suporte, fechamento de branch, deploy de pré e testes de UI.',
      ],
      outcome: [
        'Testes viraram padrão: o novo micro-frontend financeiro já tem mais de 200 arquivos de teste.',
        'Promovido a Tech Lead em abril de 2026, liderando seis desenvolvedores sem deixar o código.',
      ],
    },
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
