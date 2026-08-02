"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme";

function applyTheme(theme: Theme) {
	document.documentElement.dataset.theme = theme;
	document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		// Reads the theme from localStorage/matchMedia (external browser APIs) once
		// hydration is complete; the blocking inline script in layout.tsx already
		// applied it to the DOM to avoid a flash, this just syncs React state.
		const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
		const initial =
			stored ??
			(window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light");
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setTheme(initial);
	}, []);

	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setTheme((current) => {
			const next = current === "dark" ? "light" : "dark";
			localStorage.setItem(STORAGE_KEY, next);
			return next;
		});
	}, []);

	const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme deve ser usado dentro de um ThemeProvider.");
	}
	return context;
}
