import { headers } from "next/headers";
import verifyFrameAction from "./lib/verify-message";
import { FrameAction } from "./types";

export class FrameConfig<S> {
    state: S;
    url: string;
    action?: FrameAction;
    redirects: Record<number, string>;
    initialized = false;

    constructor(initialState: S, searchParams: Record<string, string>) {
        const currentState = searchParams.state
            ? JSON.parse(decodeURIComponent(searchParams.state))
            : {};
        const action = searchParams.action
            ? JSON.parse(decodeURIComponent(searchParams.action))
            : undefined;
        const headersList = headers();
        this.url = headersList.get("x-url") || "";

        this.state = { ...initialState, ...currentState };
        this.redirects = {};
        if (action) {
            const trustedData = verifyFrameAction(
                action.trustedData.messageBytes
            );
            trustedData.then((data) => {
                this.action = action
                    ? { ...action, trustedData: data }
                    : undefined;
                this.initialized = true;
            });
        } else {
            this.initialized = true;
        }
    }
}
