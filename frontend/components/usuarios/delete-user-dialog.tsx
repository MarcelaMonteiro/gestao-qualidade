"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteUser } from "@/store/users-store";
import { Modal } from "@/components/ui/modal";

export function DeleteUserDialog({
	userId,
	userName,
	disabled,
}: {
	userId: string;
	userName: string;
	disabled: boolean;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	function close() {
		setIsOpen(false);
		setError(null);
	}

	function handleConfirm() {
		startTransition(async () => {
			const result = await deleteUser(userId);
			if (!result.success) {
				setError(result.message);
				return;
			}
			setIsOpen(false);
		});
	}

	return (
		<>
			<button
				type="button"
				disabled={disabled}
				onClick={() => setIsOpen(true)}
				aria-label="Excluir usuário"
				title={disabled ? "Você não pode excluir a própria conta" : "Excluir usuário"}
				className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-danger transition-colors hover:bg-danger/10 disabled:cursor-not-allowed disabled:text-text-muted disabled:hover:bg-transparent"
			>
				<Trash2 className="h-4 w-4" />
			</button>

			{isOpen && (
				<Modal title="Excluir usuário" onClose={close}>
					<p className="text-sm text-text-secondary">
						Tem certeza que deseja excluir{" "}
						<span className="font-medium text-text">{userName}</span>? Essa ação não pode ser
						desfeita.
					</p>
					{error && <p className="mt-2 text-sm text-danger">{error}</p>}
					<div className="mt-6 flex justify-end gap-2">
						<button
							type="button"
							onClick={close}
							className="cursor-pointer rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-muted"
						>
							Cancelar
						</button>
						<button
							type="button"
							disabled={isPending}
							onClick={handleConfirm}
							className="cursor-pointer rounded-md bg-danger px-3 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{isPending ? "Excluindo..." : "Confirmar exclusão"}
						</button>
					</div>
				</Modal>
			)}
		</>
	);
}
