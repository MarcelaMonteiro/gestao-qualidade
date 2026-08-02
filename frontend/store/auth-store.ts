"use server";

import { cookies } from "next/headers";
import { api, ApiError } from "@/lib/api";
import { redirect } from "next/navigation";

const ACCESS_TOKEN_COOKIE = "accessToken";

type LoginResponse = {
	accessToken: string;
};

type LoginResult = { success: true } | { success: false; message: string };

type CurrentUser = {
	id: string;
	name: string;
	email: string;
	role: "USER" | "ADMIN";
};

export async function login(
	email: string,
	password: string,
): Promise<LoginResult> {
	try {
		const { accessToken } = await api.post<LoginResponse>("/auth/login", {
			email,
			password,
		});

		const cookieStore = await cookies();
		cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});

		return { success: true };
	} catch (error) {
		const message =
			error instanceof ApiError
				? error.message
				: "Não foi possível fazer login.";
		return { success: false, message };
	}
}

export async function getCurrentUser() {
	const cookieStore = await cookies();
	const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

	if (!token) {
		redirect("/login");
	}

	return api.get<CurrentUser>("/auth/me", {
		headers: { Authorization: `Bearer ${token}` },
	});
}

export async function logout() {
	const cookieStore = await cookies();
	cookieStore.delete(ACCESS_TOKEN_COOKIE);
	redirect("/login");
}
