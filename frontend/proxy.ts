import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login"];
const ACCESS_TOKEN_COOKIE = "accessToken";

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
	const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

	if (!token && !isPublicRoute) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (token && isPublicRoute) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
