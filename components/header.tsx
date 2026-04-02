"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/sobre", label: "Sobre" },
  { href: "/formacao", label: "Formacao" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contato", label: "Contato" },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border">
      <nav className="max-w-[1100px] mx-auto px-6 flex justify-between items-center h-18">
        <div className="logo">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Leonardo Monteiro
          </h1>
        </div>

        <button
          className="flex md:hidden bg-transparent border-none text-foreground cursor-pointer p-2"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <ul className={`
          md:flex list-none gap-1
          ${menuOpen ? "flex" : "hidden"}
          max-md:fixed max-md:top-18 max-md:left-0 max-md:right-0 
          max-md:bg-background max-md:border-b max-md:border-border 
          max-md:flex-col max-md:p-4 max-md:gap-0
        `}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`
                  relative inline-block text-sm font-medium px-4 py-2 rounded-md
                  transition-all duration-200
                  max-md:block max-md:text-center max-md:py-3
                  ${pathname === link.href
                    ? "text-primary"
                    : "text-foreground-muted hover:text-foreground"
                  }
                `}
              >
                {link.label}
                <span className={`
                  absolute bottom-1 left-4 right-4 h-0.5 bg-primary 
                  transition-transform duration-200 origin-left
                  max-md:hidden
                  ${pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                `} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
