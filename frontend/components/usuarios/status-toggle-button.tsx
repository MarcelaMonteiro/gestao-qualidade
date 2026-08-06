"use client";

import { useTransition } from "react";
import { setUserStatus } from "@/store/users-store";
import { toast } from "sonner";

export function StatusToggleButton({
  userId,
  isActive,
  disabled,
}: {
  userId: string;
  isActive: boolean;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = await setUserStatus(userId, !isActive);
      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success(isActive ? "Usuário desativado." : "Usuário ativado.");
      }
    });
  }

  return (
    <button
      type="button"
      disabled={disabled || isPending}
      onClick={handleClick}
      title={disabled ? "Você não pode alterar a própria conta" : undefined}
      className="cursor-pointer rounded-md border border-border px-2.5 py-1 text-sm text-text-secondary transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Aguarde..." : isActive ? "Desativar" : "Ativar"}
    </button>
  );
}
