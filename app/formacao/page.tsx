export default function Formacao() {
  return (
    <section className="py-16 min-h-[calc(100vh-72px)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12 text-center">
          Formacao Academica
        </h2>

        <div className="mb-16">
          <h3 className="text-lg font-semibold text-foreground-muted mb-6 pb-4 border-b border-border uppercase tracking-widest">
            Educacao Formal
          </h3>
          
          <div className="bg-card p-8 rounded-lg border border-border transition-colors hover:border-primary mb-4">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <h4 className="text-lg font-semibold text-foreground">Engenharia de Software</h4>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                2023 - Presente
              </span>
            </div>
            <p className="font-medium text-foreground-muted mb-2">Uninter</p>
            <p className="text-foreground-muted text-base leading-relaxed">
              Cursando Engenharia de Software, com foco em desenvolvimento de sistemas e boas praticas de programacao.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-lg font-semibold text-foreground-muted mb-6 pb-4 border-b border-border uppercase tracking-widest">
            Cursos Complementares
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "React Completo", platform: "Udemy" },
              { title: "Node.js Avancado", platform: "Rocketseat" },
              { title: "TypeScript", platform: "Origamid" },
            ].map((course) => (
              <div key={course.title} className="bg-card p-6 rounded-lg border border-border transition-all hover:border-primary hover:-translate-y-0.5">
                <h4 className="text-base font-semibold text-foreground mb-2">{course.title}</h4>
                <p className="text-sm text-foreground-muted">{course.platform}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground-muted mb-6 pb-4 border-b border-border uppercase tracking-widest">
            Idiomas
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Portugues", level: "Nativo", skills: ["Leitura", "Escrita", "Conversacao"] },
              { name: "Ingles", level: "Intermediario", skills: ["Leitura", "Escrita", "Conversacao basica"] },
            ].map((lang) => (
              <div key={lang.name} className="bg-card p-6 rounded-lg border border-border text-center transition-colors hover:border-primary">
                <h4 className="text-lg font-semibold text-foreground mb-4">{lang.name}</h4>
                <div className="mb-4">
                  <span className="text-sm text-foreground-muted">Nivel:</span>
                  <span className="font-semibold text-primary ml-2">{lang.level}</span>
                </div>
                <div className="flex flex-col gap-1">
                  {lang.skills.map((skill) => (
                    <span key={skill} className="text-sm text-foreground-muted">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
