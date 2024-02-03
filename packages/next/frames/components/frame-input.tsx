import React from "react";

export function FrameInput({ placeholder }: { placeholder: string }) {
    return <meta property="fc:frame:input:text" content={placeholder} />;
}
