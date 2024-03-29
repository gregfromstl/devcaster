import React from "react";
import { FrameConfig, FrameLink } from "..";
import {
    FrameButton,
    HydratedFrameButton,
    HydratedFrameRedirectButton,
} from "./frame-button";
import { HydratedFrameLink } from "./frame-link";

export async function Frame<S>({
    frame,
    children,
}: {
    frame: FrameConfig<S>;
    children: React.ReactNode;
}) {
    let redirects: Record<number, string> = {};
    let buttonIndex = 1;

    const hydratedChildren = React.Children.map(children, (child) => {
        if (
            React.isValidElement<React.ComponentProps<typeof FrameButton>>(
                child
            ) &&
            child.type === FrameButton
        ) {
            if (child.props.href && child.props.onClick)
                throw new Error(
                    "A redirect button cannot have onClick functionality"
                );

            if (child.props.href) {
                redirects[buttonIndex] =
                    child.props.href + `?state=${JSON.stringify(frame.state)}`; // will be encoded later with all the redirects
                return (
                    <HydratedFrameRedirectButton
                        {...child.props}
                        index={buttonIndex++}
                    />
                );
            } else {
                return (
                    <HydratedFrameButton
                        {...child.props}
                        index={buttonIndex++}
                        frame={frame}
                    />
                );
            }
        }
        if (
            React.isValidElement<React.ComponentProps<typeof FrameLink>>(
                child
            ) &&
            child.type === FrameLink
        ) {
            return (
                <HydratedFrameLink
                    {...child.props}
                    index={buttonIndex++}
                    frame={frame}
                />
            );
        }
        return child;
    });

    return (
        <>
            <meta name="fc:frame" content="vNext" />
            <meta
                name="fc:frame:post_url"
                content={`${frame.origin}/frames?url=${
                    frame.url
                }&state=${encodeURIComponent(
                    JSON.stringify(frame.state)
                )}&redirects=${encodeURIComponent(JSON.stringify(redirects))}`}
            />
            {hydratedChildren}
        </>
    );
}
