"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { inputClassName } from "./form-styles";

export function PasswordInput({
	id,
	registration,
	autoComplete,
}: {
	id: string;
	registration: UseFormRegisterReturn;
	autoComplete?: string;
}) {
	const [visible, setVisible] = useState(false);

	return (
		<div className="relative">
			<input
				id={id}
				type={visible ? "text" : "password"}
				autoComplete={autoComplete}
				{...registration}
				className={`w-full pr-10 ${inputClassName}`}
			/>
			<button
				type="button"
				onClick={() => setVisible((v) => !v)}
				aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
				tabIndex={-1}
				className="absolute inset-y-0 right-0 flex items-center px-3 text-text-muted transition-colors hover:text-text"
			>
				{visible ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
			</button>
		</div>
	);
}
