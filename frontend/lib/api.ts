import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const ENDPOINT_PUBLICO = ["/auth/login"];

export class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
	) {
		super(message);
		this.name = "ApiError";
	}
}

type RequestOptions = Omit<RequestInit, "method" | "body">;

async function request<T>(
	method: string,
	path: string,
	body?: unknown,
	options?: RequestOptions,
): Promise<T> {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		method,
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});

	if (response.status === 401 && !ENDPOINT_PUBLICO.includes(path)) {
		redirect("/login");
	}

	const data = await response.json().catch(() => null);

	if (!response.ok) {
		const message = Array.isArray(data?.message)
			? data.message.join(" ")
			: (data?.message ?? "Não foi possível completar a requisição.");
		throw new ApiError(message, response.status);
	}

	return data as T;
}

export const api = {
	get: <T>(path: string, options?: RequestOptions) =>
		request<T>("GET", path, undefined, options),
	post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>("POST", path, body, options),
	patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>("PATCH", path, body, options),
	put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>("PUT", path, body, options),
	delete: <T>(path: string, options?: RequestOptions) =>
		request<T>("DELETE", path, undefined, options),
};
