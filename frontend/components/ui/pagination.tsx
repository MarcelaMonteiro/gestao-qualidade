"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTableQueryParams } from "@/hooks/use-table-query-params";

export function Pagination({ totalPages }: { totalPages: number }) {
	const { page, setPage } = useTableQueryParams();

	return (
		<div className="flex items-center justify-between gap-4 text-sm text-text-secondary">
			<span>
				Página {page} de {totalPages}
			</span>
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => setPage(page - 1)}
					disabled={page <= 1}
					aria-label="Página anterior"
					className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-text-secondary hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
				>
					<ChevronLeft className="h-4 w-4" />
				</button>
				<button
					type="button"
					onClick={() => setPage(page + 1)}
					disabled={page >= totalPages}
					aria-label="Próxima página"
					className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-text-secondary hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
				>
					<ChevronRight className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}
