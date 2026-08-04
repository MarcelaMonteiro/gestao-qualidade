export function StatusBadge({ isActive }: { isActive: boolean }) {
	return (
		<span
			className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
				isActive ? "bg-primary-100 text-primary" : "bg-danger/10 text-danger"
			}`}
		>
			{isActive ? "Ativo" : "Inativo"}
		</span>
	);
}
