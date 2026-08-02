"use client";

import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
import { logout } from "@/store/auth-store";

type UserMenuUser = {
	name: string;
	email: string;
};

function getInitials(name: string) {
	const parts = name.trim().split(/\s+/);
	const first = parts[0]?.[0] ?? "";
	const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
	return (first + last).toUpperCase();
}

export function UserMenu({ user }: { user: UserMenuUser }) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={containerRef} className="relative">
			<button
				type="button"
				onClick={() => setIsOpen((v) => !v)}
				aria-label="Menu do usuário"
				className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-primary-100 text-sm font-semibold text-primary transition-colors hover:bg-surface-muted"
			>
				{getInitials(user.name)}
			</button>

			{isOpen && (
				<div className="absolute  right-0 top-11 w-48 rounded-md border border-border bg-surface py-1 shadow-md">
					<div className="border-b  border-border px-3 py-2">
						<p className="truncate text-sm font-medium text-text">
							{user.name}
						</p>
						<p className="truncate text-xs text-text-muted">{user.email}</p>
					</div>
					<button
						type="button"
						onClick={() => logout()}
						className="flex cursor-pointer w-full items-center gap-2 px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-muted hover:text-text"
					>
						<LogOut className="h-4 w-4" />
						Sair
					</button>
				</div>
			)}
		</div>
	);
}
