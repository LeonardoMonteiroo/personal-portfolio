import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Leonardo Monteiro - Desenvolvedor Full Stack",
  description: "Portfolio pessoal de Leonardo Monteiro, desenvolvedor Full Stack com experiencia em React e Node.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans`}>
        <Header />
        <main className="min-h-screen pt-18">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
