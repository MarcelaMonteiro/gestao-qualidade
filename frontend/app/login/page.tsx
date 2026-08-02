"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/store/auth-store";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
	email: z.email("Informe um e-mail válido."),
	password: z.string().min(1, "Informe sua senha."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const router = useRouter();
	const [mostrarSenha, setMostrarSenha] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	async function onSubmit(data: LoginFormData) {
		const result = await login(data.email, data.password);

		if (!result.success) {
			setError("root", { message: result.message });
			return;
		}

		router.push("/");
	}

	return (
		<div className="flex flex-1 items-center justify-center px-6 py-12">
			<div className="w-full max-w-sm rounded-lg border border-border bg-surface p-8 shadow-md">
				<h1 className="text-xl font-semibold text-text text-center">Entrar</h1>
				<p className="mt-1 text-sm text-center text-text-secondary">
					Acesse sua conta para continuar.
				</p>

				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					className="mt-6 flex flex-col gap-4"
				>
					<div className="flex flex-col gap-1.5">
						<label htmlFor="email" className="text-sm font-medium text-text">
							E-mail
						</label>
						<input
							id="email"
							type="email"
							autoComplete="email"
							{...register("email")}
							required
							className="rounded-md border border-border bg-surface px-3 py-2 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-100"
						/>
						{errors.email && (
							<p role="alert" className="text-sm text-danger">
								{errors.email.message}
							</p>
						)}
					</div>

					<div className="flex flex-col gap-1.5">
						<label htmlFor="password" className="text-sm font-medium text-text">
							Senha
						</label>
						<div className="relative">
							<input
								id="password"
								type={mostrarSenha ? "text" : "password"}
								autoComplete="current-password"
								{...register("password")}
								required
								className="w-full rounded-md border border-border bg-surface px-3 py-2 pr-10 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-100"
							/>
							<button
								type="button"
								onClick={() => setMostrarSenha((v) => !v)}
								aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
								tabIndex={-1}
								className="absolute inset-y-0 right-0 flex items-center px-3 text-text-muted transition-colors hover:text-text"
							>
								{mostrarSenha ? (
									<EyeOff className="h-4.5 w-4.5" />
								) : (
									<Eye className="h-4.5 w-4.5" />
								)}
							</button>
						</div>
						{errors.password && (
							<p role="alert" className="text-sm text-danger">
								{errors.password.message}
							</p>
						)}
					</div>

					{errors.root && (
						<p role="alert" className="text-sm text-danger">
							{errors.root.message}
						</p>
					)}

					<button
						type="submit"
						disabled={isSubmitting}
						className="mt-2 cursor-pointer rounded-md bg-primary px-4 py-2.5 font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
					>
						{isSubmitting ? "Entrando..." : "Entrar"}
					</button>
				</form>
			</div>
		</div>
	);
}
