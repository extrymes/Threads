import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let isAuthenticated = false;

  // Check if is invited user
  const invited = request.cookies.get("guest");
  if (invited) isAuthenticated = true;

  // Check if user is connected
  const token = request.cookies.get("next-auth.session-token");
  if (token) isAuthenticated = true;

  // Check if isAuthenticated
  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/search"],
};
