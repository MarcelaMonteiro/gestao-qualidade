"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUser } from "@/store/users-store";
import { Modal } from "@/components/ui/modal";
import { inputClassName } from "@/components/ui/form-styles";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "sonner";

const createUserSchema = z
  .object({
    name: z.string().min(2, "Informe o nome completo."),
    email: z.email("Informe um e-mail válido."),
    password: z.string().min(6, "A senha deve ter ao menos 6 caracteres."),
    confirmPassword: z.string(),
    role: z.enum(["USER", "ADMIN"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type CreateUserFormData = z.infer<typeof createUserSchema>;

export function CreateUserDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { role: "USER" },
  });

  function close() {
    setIsOpen(false);
    reset();
  }

  async function onSubmit(data: CreateUserFormData) {
    const result = await createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    });

    if (!result.success) {
      setError("root", { message: result.message });
      return;
    }

    toast.success("Usuário criado com sucesso.");
    close();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-md bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Adicionar Usuário
      </button>

      {isOpen && (
        <Modal title="Novo usuário" onClose={close}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-text">
                Nome
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                {...register("name")}
                className={inputClassName}
              />
              {errors.name && (
                <p role="alert" className="text-sm text-danger">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-text">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className={inputClassName}
              />
              {errors.email && (
                <p role="alert" className="text-sm text-danger">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="role" className="text-sm font-medium text-text">
                Perfil
              </label>
              <select
                id="role"
                {...register("role")}
                className={inputClassName}
              >
                <option value="USER">Usuário</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-text"
              >
                Senha
              </label>
              <PasswordInput
                id="password"
                registration={register("password")}
                autoComplete="new-password"
              />
              {errors.password && (
                <p role="alert" className="text-sm text-danger">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-text"
              >
                Confirmar senha
              </label>
              <PasswordInput
                id="confirmPassword"
                registration={register("confirmPassword")}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p role="alert" className="text-sm text-danger">
                  {errors.confirmPassword.message}
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
              {isSubmitting ? "Criando..." : "Criar usuário"}
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
