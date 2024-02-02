import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function framesMiddleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);

    const url = new URL(request.url);
    const rawUrl = (process.env.BASE_URL ?? url.origin) + url.pathname;
    requestHeaders.set("x-url", rawUrl);
    requestHeaders.set("x-origin", process.env.BASE_URL ?? url.origin);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}
