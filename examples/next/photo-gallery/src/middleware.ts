import type { NextRequest } from "next/server";
import { framesMiddleware } from "@devcaster/next/frames";

export async function middleware(request: NextRequest) {
    return await framesMiddleware(request);
}
