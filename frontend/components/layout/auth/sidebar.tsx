"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	ClipboardCheck,
	GraduationCap,
	HardHat,
	Home,
	LucideIcon,
	MapPin,
	Menu,
	Users,
	X,
} from "lucide-react";

type Modulo = {
	nome: string;
	url: string;
	icone: LucideIcon;
	isAdmin: boolean;
};

const modulos: Modulo[] = [
	{ nome: "Início", url: "/", icone: Home, isAdmin: false },
	{
		nome: "Auditoria",
		url: "/auditoria",
		icone: ClipboardCheck,
		isAdmin: false,
	},
	{
		nome: "Capacitações",
		url: "/capacitacoes",
		icone: GraduationCap,
		isAdmin: false,
	},
	{ nome: "Operadores", url: "/operadores", icone: HardHat, isAdmin: false },
	{
		nome: "Pontos Focais",
		url: "/pontos-focais",
		icone: MapPin,
		isAdmin: false,
	},
	{ nome: "Usuários", url: "/usuarios", icone: Users, isAdmin: true },
];

export function Sidebar({ isAdmin }: { isAdmin: boolean }) {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				aria-label="Abrir menu"
				className="fixed left-4 top-4 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border bg-surface text-text-secondary hover:text-text md:hidden"
			>
				<Menu className="h-5 w-5" />
			</button>

			{isOpen && (
				<div
					onClick={() => setIsOpen(false)}
					aria-hidden="true"
					className="fixed inset-0 z-40 bg-black/40 md:hidden"
				/>
			)}

			<aside
				className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-border bg-surface transition-transform duration-200 md:static md:translate-x-0 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex h-16 items-center justify-between border-b border-border px-6">
					<span className="text-lg font-semibold text-text">
						Gestão da Qualidade
					</span>
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						aria-label="Fechar menu"
						className="cursor-pointer text-text-secondary hover:text-text md:hidden"
					>
						<X className="h-5 w-5" />
					</button>
				</div>
				<nav className="flex flex-1 flex-col gap-1 p-3">
					{modulos
						.filter((modulo) => !modulo.isAdmin || isAdmin)
						.map((modulo) => {
							const isActive = pathname === modulo.url;
							const Icone = modulo.icone;

							return (
								<Link
									key={modulo.url}
									href={modulo.url}
									onClick={() => setIsOpen(false)}
									className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
										isActive
											? "bg-primary-100 text-primary"
											: "text-text-secondary hover:bg-surface-muted hover:text-text"
									}`}
								>
									<Icone className="h-4.5 w-4.5" />
									{modulo.nome}
								</Link>
							);
						})}
				</nav>
			</aside>
		</>
	);
}
