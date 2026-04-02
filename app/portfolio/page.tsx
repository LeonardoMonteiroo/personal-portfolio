import { GitHubIcon, LinkedInIcon } from "@/components/icons"

const projects = [
  {
    title: "E-commerce React",
    description: "Loja virtual completa com carrinho de compras, autenticacao e integracao com API de pagamentos.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "#",
    demo: "#"
  },
  {
    title: "Dashboard Admin",
    description: "Painel administrativo com graficos, tabelas e gerenciamento de usuarios em tempo real.",
    tech: ["Next.js", "TypeScript", "Prisma"],
    github: "#",
    demo: "#"
  },
  {
    title: "API REST",
    description: "API RESTful com autenticacao JWT, documentacao Swagger e testes automatizados.",
    tech: ["Node.js", "Express", "PostgreSQL"],
    github: "#",
    demo: "#"
  },
]

export default function Portfolio() {
  return (
    <section className="py-16 min-h-[calc(100vh-72px)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 text-center">
          Portfolio
        </h2>
        <p className="text-center text-foreground-muted max-w-xl mx-auto mb-12 leading-relaxed">
          Confira alguns dos projetos que desenvolvi ao longo da minha jornada como desenvolvedor.
        </p>

        <div className="mb-16">
          <h3 className="text-lg font-semibold text-foreground-muted mb-6 pb-4 border-b border-border uppercase tracking-widest">
            Projetos em Destaque
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-primary hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.2)]"
              >
                <div className="bg-background-secondary aspect-video flex items-center justify-center overflow-hidden">
                  <span className="text-foreground-muted text-sm">Imagem do projeto</span>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-2">{project.title}</h4>
                  <p className="text-foreground-muted text-base leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6">
                    <a href={project.github} className="text-sm font-medium text-foreground-muted hover:text-primary transition-colors">
                      GitHub
                    </a>
                    <a href={project.demo} className="text-sm font-medium text-foreground-muted hover:text-primary transition-colors">
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground-muted mb-6 pb-4 border-b border-border uppercase tracking-widest">
            Links Uteis
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://github.com/LeonardoMonteiroo"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-card p-6 rounded-lg border border-border transition-all hover:border-primary hover:bg-card-hover"
            >
              <GitHubIcon className="w-8 h-8 text-foreground-muted group-hover:text-primary transition-colors" />
              <div>
                <h4 className="text-base font-semibold text-foreground">GitHub</h4>
                <p className="text-sm text-foreground-muted">Meus repositorios</p>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/leonardomonteiro"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-card p-6 rounded-lg border border-border transition-all hover:border-primary hover:bg-card-hover"
            >
              <LinkedInIcon className="w-8 h-8 text-foreground-muted group-hover:text-primary transition-colors" />
              <div>
                <h4 className="text-base font-semibold text-foreground">LinkedIn</h4>
                <p className="text-sm text-foreground-muted">Meu perfil profissional</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
