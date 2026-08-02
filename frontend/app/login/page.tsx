"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/store/auth-store";

const loginSchema = z.object({
	email: z.email("Informe um e-mail válido."),
	password: z.string().min(1, "Informe sua senha."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const router = useRouter();

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
				<h1 className="text-xl font-semibold text-text">Entrar</h1>
				<p className="mt-1 text-sm text-text-secondary">
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
							className="rounded-md border border-border bg-surface px-3 py-2 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-100"
						/>
						{errors.email && (
							<p role="alert" className="text-sm text-danger">
								{errors.email.message}
							</p>
						)}
					</div>

					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="password"
							className="text-sm font-medium text-text"
						>
							Senha
						</label>
						<input
							id="password"
							type="password"
							autoComplete="current-password"
							{...register("password")}
							className="rounded-md border border-border bg-surface px-3 py-2 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-100"
						/>
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
						className="mt-2 rounded-md bg-primary px-4 py-2.5 font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
					>
						{isSubmitting ? "Entrando..." : "Entrar"}
					</button>
				</form>
			</div>
		</div>
	);
}
