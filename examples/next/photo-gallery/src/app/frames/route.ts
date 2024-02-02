import { framesPOST } from "@devcaster/next/frames";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    return await framesPOST(request);
}
