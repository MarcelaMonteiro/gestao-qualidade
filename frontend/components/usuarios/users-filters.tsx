"use client";

import { SearchInput } from "@/components/ui/search-input";
import { inputClassName } from "@/components/ui/form-styles";
import { useTableQueryParams } from "@/hooks/use-table-query-params";

export function UsersFilters() {
	const { search, getFilter, setSearch, setFilter } = useTableQueryParams();

	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
			<div className="sm:w-64">
				<SearchInput
					defaultValue={search}
					onChange={setSearch}
					placeholder="Buscar por nome ou e-mail..."
				/>
			</div>
			<select
				value={getFilter("role")}
				onChange={(event) => setFilter("role", event.target.value)}
				className={inputClassName}
			>
				<option value="">Todos os perfis</option>
				<option value="ADMIN">Admin</option>
				<option value="USER">Usuário</option>
			</select>
			<select
				value={getFilter("isActive")}
				onChange={(event) => setFilter("isActive", event.target.value)}
				className={inputClassName}
			>
				<option value="">Todos os status</option>
				<option value="true">Ativo</option>
				<option value="false">Inativo</option>
			</select>
		</div>
	);
}
