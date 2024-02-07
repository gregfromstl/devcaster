import React from "react";
import { FrameConfig } from "..";

export function FrameLink({
    children,
    href,
    onClick,
}: {
    children: string | number;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
    return <></>;
}

export function HydratedFrameLink<S>({
    index,
    children,
    href,
    onClick,
    frame,
}: {
    index: number;
    children: string | number;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    frame: FrameConfig<S>;
}) {
    return (
        <>
            <meta
                property={`fc:frame:button:${index}`}
                content={`${children}`}
            />
            <meta
                property={`fc:frame:button:${index}:action`}
                content={"link"}
            />
            <meta
                property={`fc:frame:button:${index}:target`}
                content={
                    href +
                    `?state=${encodeURIComponent(JSON.stringify(frame.state))}`
                }
            />
        </>
    );
}
