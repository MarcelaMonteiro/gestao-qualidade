"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	ClipboardCheck,
	GraduationCap,
	HardHat,
	Home,
	LucideIcon,
	MapPin,
	Users,
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

	return (
		<aside className="flex w-64 shrink-0 flex-col border-r border-border bg-surface">
			<div className="flex h-16 items-center border-b border-border px-6">
				<span className="text-lg font-semibold text-text">
					Gestão da Qualidade
				</span>
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
	);
}
