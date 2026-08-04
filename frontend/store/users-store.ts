"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { api, ApiError } from "@/lib/api";
import type { User } from "@/types/user";

const ACCESS_TOKEN_COOKIE = "accessToken";

type ActionResult = { success: true } | { success: false; message: string };

async function authHeader() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  return { Authorization: `Bearer ${token}` };
}

export async function getUsers(): Promise<User[]> {
  return api.get<User[]>("/users", { headers: await authHeader() });
}

export async function setUserStatus(
  id: string,
  isActive: boolean,
): Promise<ActionResult> {
  try {
    await api.patch(
      `/users/${id}/status`,
      { isActive },
      { headers: await authHeader() },
    );
    revalidatePath("/usuarios");
    return { success: true };
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.message
        : "Não foi possível atualizar o status.";
    return { success: false, message };
  }
}

export async function deleteUser(id: string): Promise<ActionResult> {
  try {
    await api.delete(`/users/${id}`, { headers: await authHeader() });
    revalidatePath("/usuarios");
    return { success: true };
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.message
        : "Não foi possível excluir o usuário.";
    return { success: false, message };
  }
}

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

export async function createUser(data: CreateUserInput): Promise<ActionResult> {
  try {
    await api.post("/users", data, { headers: await authHeader() });
    revalidatePath("/usuarios");
    return { success: true };
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.message
        : "Não foi possível criar o usuário.";
    return { success: false, message };
  }
}
export type UpdateUserInput = {
  name?: string;
  email?: string;
  role?: "USER" | "ADMIN";
};

export async function updateUser(
  id: string,
  data: UpdateUserInput,
): Promise<ActionResult> {
  try {
    await api.patch(`/users/${id}`, data, { headers: await authHeader() });
    revalidatePath("/usuarios");
    return { success: true };
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.message
        : "Não foi possível atualizar o usuário.";
    return { success: false, message };
  }
}
