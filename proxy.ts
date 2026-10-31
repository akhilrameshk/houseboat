// Next.js 16 "proxy" (formerly middleware). On Next.js 15 rename this file to middleware.ts
// and the function to `middleware`. It is only a first layer: every admin API route and the
// admin layout ALSO verify the session on the server.
import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_session")?.value;
    let ok = false;
    if (token && process.env.AUTH_SECRET) {
      try {
        await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET), { algorithms: ["HS256"] });
        ok = true;
      } catch {
        ok = false;
      }
    }
    if (!ok) return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
