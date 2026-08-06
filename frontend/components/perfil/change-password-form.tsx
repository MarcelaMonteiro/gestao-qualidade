"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { changePassword } from "@/store/auth-store";
import { PasswordInput } from "@/components/ui/password-input";

const changePasswordSchema = z
  .object({
    password: z.string().min(1, "Informe a senha atual."),
    newPassword: z
      .string()
      .min(6, "A nova senha deve ter no mínimo 6 caracteres."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type changePasswordFormData = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<changePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onSubmit(data: changePasswordFormData) {
    const result = await changePassword({
      password: data.password,
      newPassword: data.newPassword,
    });
    if (!result.success) {
      setError("password", { message: result.message });
      return;
    }

    toast.success("Senha alterada com sucesso!");
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 rounded-lg border border-border p-4"
    >
      <h2 className="text-sm font-medium text-text">Alterar senha</h2>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="current-password"
          className="text-sm font-medium text-text"
        >
          Senha atual
        </label>
        <PasswordInput
          id="current-password"
          registration={register("password")}
          autoComplete="current-password"
        />
        {errors.password && (
          <p role="alert" className="text-sm text-danger">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="new-password" className="text-sm font-medium text-text">
          Nova senha
        </label>
        <PasswordInput
          id="new-password"
          registration={register("newPassword")}
          autoComplete="new-password"
        />
        {errors.newPassword && (
          <p role="alert" className="text-sm text-danger">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="confirm-password"
          className="text-sm font-medium text-text"
        >
          Confirmar nova senha
        </label>
        <PasswordInput
          id="confirm-password"
          registration={register("confirmPassword")}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <p role="alert" className="text-sm text-danger">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 cursor-pointer self-start rounded-md bg-primary px-4 py-2.5 font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Salvando..." : "Alterar senha"}
      </button>
    </form>
  );
}
