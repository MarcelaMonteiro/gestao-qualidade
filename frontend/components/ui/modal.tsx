"use client";

import { X } from "lucide-react";

export function Modal({
	title,
	onClose,
	children,
}: {
	title: string;
	onClose: () => void;
	children: React.ReactNode;
}) {
	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
			<div onClick={onClose} aria-hidden="true" className="absolute inset-0 bg-black/40" />

			<div className="relative w-full max-w-sm rounded-lg border border-border bg-surface p-6 shadow-md">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold text-text">{title}</h2>
					<button
						type="button"
						onClick={onClose}
						aria-label="Fechar"
						className="cursor-pointer text-text-secondary transition-colors hover:text-text"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				<div className="mt-4">{children}</div>
			</div>
		</div>
	);
}
