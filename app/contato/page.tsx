"use client"

import { useState } from "react"

export default function Contato() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-16 min-h-[calc(100vh-72px)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 text-center">
          Contato
        </h2>
        <p className="text-center text-foreground-muted max-w-lg mx-auto mb-12 leading-relaxed">
          Entre em contato comigo para discutir projetos, oportunidades ou apenas para trocar uma ideia.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6">Informacoes de Contato</h3>
            
            <div className="space-y-4">
              <div className="flex items-center p-6 bg-card border border-border rounded-lg transition-colors hover:border-primary">
                <span className="text-xl w-10 text-center mr-4">📧</span>
                <div>
                  <h4 className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-0.5">Email</h4>
                  <a href="mailto:leonardo@email.com" className="text-foreground hover:text-primary transition-colors">
                    leonardo@email.com
                  </a>
                </div>
              </div>

              <div className="flex items-center p-6 bg-card border border-border rounded-lg transition-colors hover:border-primary">
                <span className="text-xl w-10 text-center mr-4">📱</span>
                <div>
                  <h4 className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-0.5">Telefone</h4>
                  <p className="text-foreground">(11) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-center p-6 bg-card border border-border rounded-lg transition-colors hover:border-primary">
                <span className="text-xl w-10 text-center mr-4">📍</span>
                <div>
                  <h4 className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-0.5">Localizacao</h4>
                  <p className="text-foreground">Sao Paulo, Brasil</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6">Envie uma Mensagem</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 text-base font-sans text-foreground bg-card border border-border rounded-lg transition-all focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 placeholder:text-foreground-muted"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 text-base font-sans text-foreground bg-card border border-border rounded-lg transition-all focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 placeholder:text-foreground-muted"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Sua mensagem..."
                  className="w-full px-4 py-3 text-base font-sans text-foreground bg-card border border-border rounded-lg transition-all resize-y min-h-35 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 placeholder:text-foreground-muted"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-7 py-3 text-base font-semibold rounded-lg bg-primary text-background hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(56,189,248,0.4)] transition-all duration-200"
              >
                Enviar Mensagem
              </button>

              {submitted && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-1">Mensagem enviada!</h4>
                  <p className="text-sm">Obrigado pelo contato. Responderei em breve.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
