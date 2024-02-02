import React from "react";

export function FrameImage({ src }: { src: string }) {
    return (
        <>
            <meta property="og:image" content={src} />
            <meta property="fc:frame:image" content={src} />
        </>
    );
}
