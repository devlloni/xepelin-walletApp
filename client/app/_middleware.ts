import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const { pathname } = req.nextUrl;

    if (!token && req.nextUrl.pathname.startsWith('/transactions')) {
        const url = req.nextUrl.clone();
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
      }

    return NextResponse.next();
}