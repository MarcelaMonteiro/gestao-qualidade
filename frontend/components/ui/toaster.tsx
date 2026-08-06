"use client";

import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "@/components/theme/theme-provider";

export function Toaster() {
  const { theme } = useTheme();

  return (
    <SonnerToaster
      theme={theme}
      position="bottom-right"
      richColors={false}
      toastOptions={{
        classNames: {
          toast:
            "bg-surface border border-border text-text shadow-lg rounded-md",
          title: "text-sm font-medium",
          description: "text-sm text-text-secondary",
          success: "!border-l-4 !border-l-success",
          error: "!border-l-4 !border-l-danger",
        },
      }}
    />
  );
}
