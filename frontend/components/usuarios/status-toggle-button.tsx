"use client";

import { useState, useTransition } from "react";
import { setUserStatus } from "@/store/users-store";

export function StatusToggleButton({
	userId,
	isActive,
	disabled,
}: {
	userId: string;
	isActive: boolean;
	disabled: boolean;
}) {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	function handleClick() {
		startTransition(async () => {
			const result = await setUserStatus(userId, !isActive);
			if (!result.success) {
				setError(result.message);
			}
		});
	}

	return (
		<div className="inline-flex flex-col items-start gap-1">
			<button
				type="button"
				disabled={disabled || isPending}
				onClick={handleClick}
				title={disabled ? "Você não pode alterar a própria conta" : undefined}
				className="cursor-pointer rounded-md border border-border px-2.5 py-1 text-sm text-text-secondary transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
			>
				{isPending ? "Aguarde..." : isActive ? "Desativar" : "Ativar"}
			</button>
			{error && <p className="text-xs text-danger">{error}</p>}
		</div>
	);
}
