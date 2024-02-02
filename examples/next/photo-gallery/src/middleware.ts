import { NextResponse, type NextRequest } from "next/server";
// import { framesMiddleware } from "@devcaster/next/frames";

async function framesMiddleware(request: NextRequest) {
    console.log(request.url);
    const method = request.method;
    const newUrl = new URL(request.url);

    if (
        method === "POST" &&
        !parseInt(newUrl.searchParams.get("request_complete") ?? "0")
    ) {
        const body = await request.json();
        console.log("body", body);

        const redirects = newUrl.searchParams.get("redirects");
        if (redirects) {
            console.log("redirects", redirects);
            const redirectsObj = JSON.parse(decodeURIComponent(redirects));
            if (redirectsObj[`${body.untrustedData.buttonIndex}`]) {
                const redirectUrl = new URL(
                    redirectsObj[`${body.untrustedData.buttonIndex}`]
                );
                redirectUrl.searchParams.set("request_complete", "1");
                console.log("redirecting to", redirectUrl.toString());
                return NextResponse.redirect(process.env.BASE_URL + "/api", {
                    status: 302,
                });
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

export async function middleware(request: NextRequest) {
    return await framesMiddleware(request);
}
