"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { updateProfile } from "@/store/auth-store";
import { inputClassName } from "@/components/ui/form-styles";

const profileSchema = z.object({
  name: z.string().min(2, "Informe o nome completo."),
  email: z.email("Informe um e-mail inválido"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm({ name, email }: { name: string; email: string }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name,
      email,
    },
  });

  async function onSubmit(data: ProfileFormData) {
    const result = await updateProfile(data);

    if (!result.success) {
      setError("root", { message: result.message });
      return;
    }
    toast.success("Perfil atualizado com sucesso!");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 rounded-lg border border-border p-4"
    >
      <h2 className="text-sm font-medium text-text">Dados pessoais</h2>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="profile-name" className="text-sm font-medium text-text">
          Nome
        </label>

        <input
          id="profile-name"
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
          htmlFor="profile-email"
          className="text-sm font-medium text-text"
        >
          E-mail
        </label>
        <input
          id="profile-email"
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

      {errors.root && (
        <p role="alert" className="text-sm text-danger">
          {errors.root.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 cursor-pointer self-start rounded-md bg-primary px-4 py-2.5 font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Salvando..." : "Salvar alterações"}
      </button>
    </form>
  );
}
