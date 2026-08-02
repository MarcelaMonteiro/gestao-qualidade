export function Footer() {
	return (
		<footer className="border-t border-border bg-surface">
			<div className="mx-auto w-full max-w-6xl px-6 py-6 text-center text-sm text-text-muted">
				© {new Date().getFullYear()} Secretaria de Transformação Digital - SETD.
			</div>
		</footer>
	);
}
