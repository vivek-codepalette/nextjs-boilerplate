import { NextResponse } from "next/server";

export async function middleware() {
    // Introucing auth middleware breaks the application
    // TODO: Fix this
    return NextResponse.next();
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}