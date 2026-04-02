export function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border py-6 text-center">
      <div className="max-w-[1100px] mx-auto px-6">
        <p className="text-sm text-foreground-muted">
          &copy; {new Date().getFullYear()} Leonardo Monteiro. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
