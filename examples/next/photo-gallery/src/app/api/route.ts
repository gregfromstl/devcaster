import { NextResponse } from "next/server";

export async function POST(request: Request) {
    console.log("IN API");
    return NextResponse.redirect(process.env.BASE_URL as string, {
        status: 302,
    });
}
