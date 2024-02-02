import React from "react";
import { redirect } from "next/navigation";
import { FrameConfig } from "../frame-config";
import { FrameAction } from "../types";

type FrameButtonProps<S> = {
    children: string | number;
    href?: string;
    onClick?: (
        frame: FrameConfig<S> & { action: FrameAction }
    ) => Promise<string | void> | string | void;
};

export function FrameButton<S>({ children, onClick }: FrameButtonProps<S>) {
    return <></>;
}

export async function HydratedFrameButton<S>({
    frame,
    onClick,
    index,
    children,
}: {
    children: string | number;
    onClick?: (
        frame: FrameConfig<S> & { action: FrameAction }
    ) => Promise<string | void> | string | void;
    frame: FrameConfig<S>;
    index: number;
}) {
    if (index > 4) {
        throw new Error("Too many buttons in frame (max is 4)");
    }

    while (!frame.initialized) {
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const fulfillAction = async (frame: FrameConfig<S>) => {
        if (!frame.action || !onClick) throw new Error("No action to fulfill");

        const result = await onClick(
            frame as FrameConfig<S> & { action: FrameAction }
        );
        const redirectUrl =
            (result ?? frame.url) +
            `?state=${encodeURIComponent(JSON.stringify(frame.state))}`;
        console.log(redirectUrl);
        const bytes = new TextEncoder().encode(redirectUrl).length;
        if (bytes > 256)
            throw new Error(
                "The redirect URL exceeds 256 bytes, consider reducing the size of your state and fetching more data only when its needed"
            );

        redirect(redirectUrl);
    };

    if (
        frame.action &&
        frame.action.untrustedData.buttonIndex === index &&
        onClick
    ) {
        await fulfillAction(frame);
    }

    return (
        <>
            <meta
                property={`fc:frame:button:${index}`}
                content={`${children}`}
            />
            <meta
                property={`fc:frame:button:${index}:action`}
                content={"post"}
            />
        </>
    );
}

export function HydratedFrameRedirectButton<S>({
    frame,
    index,
    children,
}: {
    children: string | number;
    frame: FrameConfig<S>;
    index: number;
}) {
    return (
        <>
            <meta
                property={`fc:frame:button:${index}`}
                content={`${children}`}
            />
            <meta
                property={`fc:frame:button:${index}:action`}
                content={"post_redirect"}
            />
        </>
    );
}
