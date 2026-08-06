"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pencil } from "lucide-react";
import { updateUser } from "@/store/users-store";
import { Modal } from "@/components/ui/modal";
import { inputClassName } from "@/components/ui/form-styles";
import { toast } from "sonner";

const editUserSchema = z.object({
  name: z.string().min(2, "Informe o nome completo."),
  email: z.email("Informe um e-mail válido."),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

type EditUserFormData = z.infer<typeof editUserSchema>;

export function EditUserDialog({
  userId,
  name,
  email,
  role,
  isSelf,
}: {
  userId: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  isSelf: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: { name, email, role },
  });

  function close() {
    setIsOpen(false);
    reset({ name, email, role });
  }

  async function onSubmit(data: EditUserFormData) {
    const result = await updateUser(userId, {
      name: data.name,
      email: data.email,
      role: data.role,
    });

    if (!result.success) {
      setError("root", { message: result.message });
      return;
    }

    toast.success("Usuário atualizado com sucesso.");

    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Editar usuário"
        title="Editar usuário"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-muted hover:text-text"
      >
        <Pencil className="h-4 w-4" />
      </button>

      {isOpen && (
        <Modal title="Editar usuário" onClose={close}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`edit-name-${userId}`}
                className="text-sm font-medium text-text"
              >
                Nome
              </label>
              <input
                id={`edit-name-${userId}`}
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
              <label
                htmlFor={`edit-email-${userId}`}
                className="text-sm font-medium text-text"
              >
                E-mail
              </label>
              <input
                id={`edit-email-${userId}`}
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
              <label
                htmlFor={`edit-role-${userId}`}
                className="text-sm font-medium text-text"
              >
                Perfil
              </label>
              <select
                id={`edit-role-${userId}`}
                {...register("role", { disabled: isSelf })}
                className={inputClassName}
              >
                <option value="USER">Usuário</option>
                <option value="ADMIN">Administrador</option>
              </select>
              {isSelf && (
                <p className="text-xs text-text-muted">
                  Você não pode alterar seu próprio perfil.
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
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
