import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // CVE-2025-29927: Block x-middleware-subrequest header spoofing
  if (request.headers.has("x-middleware-subrequest")) {
    return new NextResponse(null, { status: 403 });
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|icons/|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
