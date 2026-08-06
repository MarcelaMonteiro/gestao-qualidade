"use client";

import { useCallback, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SEARCH_DEBOUNCE_MS = 400;

export function useTableQueryParams() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const page = Number(searchParams.get("page") ?? "1");
	const search = searchParams.get("search") ?? "";

	const getFilter = useCallback(
		(key: string) => searchParams.get(key) ?? "",
		[searchParams],
	);

	const pushParams = useCallback(
		(
			updates: Record<string, string | undefined>,
			{ resetPage = false }: { resetPage?: boolean } = {},
		) => {
			const params = new URLSearchParams(searchParams.toString());

			for (const [key, value] of Object.entries(updates)) {
				if (!value) {
					params.delete(key);
				} else {
					params.set(key, value);
				}
			}

			if (resetPage) {
				params.delete("page");
			}

			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		},
		[pathname, router, searchParams],
	);

	const setSearch = useCallback(
		(value: string) => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
			debounceRef.current = setTimeout(() => {
				pushParams({ search: value }, { resetPage: true });
			}, SEARCH_DEBOUNCE_MS);
		},
		[pushParams],
	);

	const setFilter = useCallback(
		(key: string, value: string) => {
			pushParams({ [key]: value }, { resetPage: true });
		},
		[pushParams],
	);

	const setPage = useCallback(
		(nextPage: number) => {
			pushParams({ page: String(nextPage) });
		},
		[pushParams],
	);

	return { page, search, getFilter, setSearch, setFilter, setPage };
}
