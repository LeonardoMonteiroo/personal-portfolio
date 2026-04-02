import Image from "next/image"
import Link from "next/link"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-72px)] flex items-center py-16 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.15),transparent),var(--color-background)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div className="animate-fade-in-up lg:order-1 order-2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground mb-6">
              Ola, eu sou Leonardo Monteiro
            </h2>
            <span className="inline-block text-lg font-medium text-primary mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              Desenvolvedor Full Stack
            </span>
            <p className="text-lg text-foreground-muted leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Entusiasta de Tecnologia e Desenvolvedor Full Stack com mais de tres anos de experiencia solida em desenvolvimento com React e Node.js. Atualmente, curso Engenharia de Software na Uninter, onde continuo aprimorando minhas habilidades e conhecimentos.
            </p>
            
            <div className="flex gap-4 flex-wrap justify-center lg:justify-start mb-8">
              <Link
                href="/contato"
                className="inline-flex items-center justify-center px-7 py-3 text-base font-semibold rounded-lg bg-primary text-background hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(56,189,248,0.4)] transition-all duration-200"
              >
                Entre em Contato
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-7 py-3 text-base font-semibold rounded-lg text-foreground bg-transparent border border-border hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all duration-200"
              >
                Ver Projetos
              </Link>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/LeonardoMonteiroo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-lg text-foreground-muted bg-card border border-border hover:text-primary hover:border-primary hover:-translate-y-0.5 transition-all duration-200"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://linkedin.com/in/leonardomonteiro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-lg text-foreground-muted bg-card border border-border hover:text-primary hover:border-primary hover:-translate-y-0.5 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up-delay flex justify-center items-center lg:order-2 order-1">
            <div className="relative">
              <div className="absolute inset-[-8px] rounded-full bg-gradient-to-br from-primary to-accent opacity-50 animate-pulse-glow" />
              <Image
                src="/profile.png"
                alt="Foto de Leonardo Monteiro"
                width={280}
                height={280}
                className="relative rounded-full object-cover border-4 border-background shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
