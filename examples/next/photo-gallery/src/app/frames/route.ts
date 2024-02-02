import { NextRequest } from "next/server";
import { framesPOST } from "@devcaster/next/frames";

export async function POST(request: NextRequest) {
    return await framesPOST(request);
}
