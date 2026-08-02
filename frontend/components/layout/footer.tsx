export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-6 text-sm text-text-muted">
        © {new Date().getFullYear()} Gestão da Qualidade. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
