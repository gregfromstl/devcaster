export type TrustedData = {
    valid: boolean;
    message: {
        data: {
            type: "MESSAGE_TYPE_FRAME_ACTION";
            fid: number;
            timestamp: number;
            network: string;
            frameActionBody: {
                url: string;
                buttonIndex: number;
                inputText: string;
                castId: {
                    fid: number;
                    hash: string;
                };
            };
        };
        hash: string;
        hashScheme: string;
        signature: string;
        signatureScheme: string;
        signer: string;
    };
};

export type UntrustedData = {
    fid: number;
    url: string;
    messageHash: string;
    timestamp: number;
    network: number;
    buttonIndex: number;
    inputText: string;
    castId: {
        fid: number;
        hash: string;
    };
};

export type FrameActionResponse = {
    untrustedData: UntrustedData;
    trustedData: {
        messageBytes: string;
    };
};

export type FrameAction = {
    untrustedData: UntrustedData;
    trustedData: TrustedData;
};
