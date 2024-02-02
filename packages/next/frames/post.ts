import { NextRequest, NextResponse } from "next/server";

export async function framesPOST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const nextUrl = searchParams.get("url");
    const newUrl = new URL(nextUrl ?? "/");

    const body = await request.json();
    const redirects = searchParams.get("redirects");
    if (redirects) {
        const redirectsObj = JSON.parse(decodeURIComponent(redirects));
        if (redirectsObj[`${body.untrustedData.buttonIndex}`]) {
            return NextResponse.redirect(
                redirectsObj[`${body.untrustedData.buttonIndex}`],
                { status: 302 }
            );
        }
    }
    newUrl.searchParams.set("action", encodeURIComponent(JSON.stringify(body)));
    newUrl.searchParams.set("state", searchParams.get("state") ?? "");

    return NextResponse.redirect(newUrl.toString());
}
