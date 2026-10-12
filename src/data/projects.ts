// Public repositories shown in the Projects panel. Descriptions are written here; live
// metadata (language, stars, last push) is fetched from the GitHub API at build time.

const OWNER = 'LeonardoMonteiroo';

interface ProjectDef {
  repo: string;
  stack: string[];
  en: string;
  pt: string;
}

const defs: ProjectDef[] = [
  {
    repo: 'voting-api',
    stack: ['TypeScript', 'Node.js', 'Fastify', 'Prisma', 'PostgreSQL', 'Redis', 'Docker', 'Zod', 'WebSocket'],
    en: 'Polling back end: REST API with Fastify and Prisma, PostgreSQL and Redis in Docker, Zod validation and real-time updates over WebSocket.',
    pt: 'Back-end de enquetes: API REST com Fastify e Prisma, PostgreSQL e Redis em Docker, validação com Zod e atualizações em tempo real via WebSocket.',
  },
  {
    repo: 'transactions-api',
    stack: ['TypeScript', 'Node.js', 'Fastify', 'Knex'],
    en: 'REST API for financial transactions in TypeScript, using Fastify and the Knex query builder.',
    pt: 'API REST de transações financeiras em TypeScript, com Fastify e o query builder Knex.',
  },
  {
    repo: 'habits-manager',
    stack: ['TypeScript', 'React', 'React Native'],
    en: 'Full-stack habit tracker with web and mobile clients built in TypeScript.',
    pt: 'Rastreador de hábitos full stack com clientes web e mobile em TypeScript.',
  },
  {
    repo: 'ts-test-course',
    stack: ['TypeScript', 'Jest'],
    en: 'Study repository on writing Jest tests for TypeScript code.',
    pt: 'Repositório de estudo sobre testes com Jest em código TypeScript.',
  },
];

export interface Project {
  name: string;
  url: string;
  stack: string[];
  description: { en: string; pt: string };
  language: string | null;
  stars: number | null;
  pushedAt: string | null;
}

interface GithubRepo {
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
}

async function fetchRepo(repo: string): Promise<GithubRepo | null> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-build' };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(`https://api.github.com/repos/${OWNER}/${repo}`, { headers });
    if (!res.ok) {
      console.warn(`[projects] GitHub API ${res.status} for ${repo}; rendering without live data`);
      return null;
    }
    return (await res.json()) as GithubRepo;
  } catch (err) {
    console.warn(`[projects] GitHub API unreachable for ${repo}: ${(err as Error).message}`);
    return null;
  }
}

let cache: Promise<Project[]> | undefined;

/** Fetched once per build and shared by both locales. */
export function getProjects(): Promise<Project[]> {
  cache ??= Promise.all(
    defs.map(async (d) => {
      const gh = await fetchRepo(d.repo);
      return {
        name: d.repo,
        url: gh?.html_url ?? `https://github.com/${OWNER}/${d.repo}`,
        stack: d.stack,
        description: { en: d.en, pt: d.pt },
        language: gh?.language ?? null,
        stars: gh?.stargazers_count ?? null,
        pushedAt: gh?.pushed_at ?? null,
      };
    }),
  );
  return cache;
}
