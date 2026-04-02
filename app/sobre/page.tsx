import Image from "next/image"
import { GamepadIcon, BookIcon, MusicIcon, CompassIcon } from "@/components/icons"

const hobbies = [
  {
    icon: GamepadIcon,
    title: "Jogos",
    description: "Gosto de jogar videogames, especialmente jogos moba e de estrategia"
  },
  {
    icon: BookIcon,
    title: "Leitura",
    description: "Adoro ler livros sobre desenvolvimento de software e fantasia"
  },
  {
    icon: MusicIcon,
    title: "Musica",
    description: "Gosto de ouvir musica enquanto trabalho e estudo, principalmente brasileira"
  },
  {
    icon: CompassIcon,
    title: "Esportes",
    description: "Gosto de praticar esportes, principalmente volei e basquete"
  },
]

export default function Sobre() {
  return (
    <section className="py-16 min-h-[calc(100vh-72px)] bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(34,211,238,0.08),transparent),var(--color-background)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">
          Sobre Mim
          <span className="block w-15 h-0.5 bg-gradient-to-r from-primary to-accent mt-4 rounded-full" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 items-start">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4 tracking-tight">
              Quem sou eu?
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-8">
              Ola! Sou Leonardo Monteiro, um estudante apaixonado por tecnologia e desenvolvimento web.
              Atualmente estou cursando Engenharia de Software na Uninter, no meu tempo livre gosto principalmente de jogar videogames e praticar esportes.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4 tracking-tight">
              Meus Hobbies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {hobbies.map((hobby) => (
                <div
                  key={hobby.title}
                  className="group relative bg-card p-6 rounded-lg border border-border overflow-hidden transition-all duration-200 hover:border-primary hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(56,189,248,0.2)]"
                >
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-primary to-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 text-primary mb-4">
                    <hobby.icon />
                  </div>
                  <h4 className="text-base font-semibold text-foreground mb-2">{hobby.title}</h4>
                  <p className="text-sm text-foreground-muted leading-relaxed">{hobby.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 order-first lg:order-last">
            <div className="flex justify-center">
              <Image
                src="/profile.png"
                alt="Foto de Leonardo Monteiro"
                width={220}
                height={220}
                className="rounded-lg border-3 border-border object-cover transition-all duration-300 hover:border-primary hover:shadow-[0_20px_40px_-10px_rgba(56,189,248,0.3)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
