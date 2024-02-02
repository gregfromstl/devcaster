import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function framesMiddleware(request: NextRequest) {
    const method = request.method;
    const newUrl = new URL(request.url);

    if (
        method === "POST" &&
        !parseInt(newUrl.searchParams.get("request_complete") ?? "0")
    ) {
        const body = await request.json();
        const redirects = newUrl.searchParams.get("redirects");
        if (redirects) {
            const redirectsObj = JSON.parse(decodeURIComponent(redirects));
            if (redirectsObj[`${body.untrustedData.buttonIndex}`]) {
                return NextResponse.redirect(
                    redirectsObj[`${body.untrustedData.buttonIndex}`],
                    { status: 302 }
                );
            }
        }
        newUrl.searchParams.set(
            "action",
            encodeURIComponent(JSON.stringify(body))
        );
    }

    newUrl.searchParams.set(
        "url",
        encodeURIComponent(process.env.BASE_URL ?? newUrl.origin)
    );
    return NextResponse.rewrite(newUrl);
}
