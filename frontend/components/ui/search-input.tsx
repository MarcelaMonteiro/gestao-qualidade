"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { inputClassName } from "./form-styles";

export function SearchInput({
	defaultValue,
	onChange,
	placeholder = "Buscar...",
}: {
	defaultValue: string;
	onChange: (value: string) => void;
	placeholder?: string;
}) {
	const [value, setValue] = useState(defaultValue);

	return (
		<div className="relative">
			<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
			<input
				type="text"
				value={value}
				onChange={(event) => {
					setValue(event.target.value);
					onChange(event.target.value);
				}}
				placeholder={placeholder}
				className={`${inputClassName} w-full pl-9`}
			/>
		</div>
	);
}
