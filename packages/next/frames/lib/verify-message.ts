import { TrustedData } from "../types";

export default async function verifyFrameAction(
    trustedDataMessage: string
): Promise<TrustedData> {
    const binaryData = new Uint8Array(
        trustedDataMessage
            .match(/.{1,2}/g)!
            .map((byte: string) => parseInt(byte, 16))
    );
    const trustedDataResult = await fetch(
        `${process.env.HUB_URL}/v1/validateMessage`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
            },
            body: binaryData,
        }
    );
    const trustedData = await trustedDataResult.json();
    if (trustedData.valid) {
        return trustedData;
    } else {
        throw new Error("Invalid message");
    }
}
