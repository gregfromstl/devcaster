# @devcaster/next

Devcaster allows anyone to declaratively create frames inside their existing Next.js sites, with just a few lines of code.

This library is intended for **Next.js only** (v14). We're working on future releases that can be used in other frameworks.

## Getting Started

Install using your package manager of choice:

```
npm i @devcaster/next
yarn add @devcaster/next
pnpm i @devcaster/next
bun install @devcaster/next
```

Create a `middleware.ts` file at the same level as your app directory. [More on Next.js middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

Inside your `middleware.ts`, add the frames middleware function:

```
import type { NextRequest } from "next/server";
import { framesMiddleware } from "@devcaster/next/frames";

export async function middleware(request: NextRequest) {
    return await framesMiddleware(request);
}
```

To add a frame to a page, create a new `FrameConfig` in any `page.ts` file. Pass the config your initial state and the page's unaltered `searchParams` object:

```
export default function Home({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) {
    const frame = new FrameConfig({ count: 0 }, searchParams);
```

> Note: All frames must be created in server-side components.

In the above example, we have a simple frame state with a single `count` variable.

To create the frame elements, add a `Frame` component to your JSX, passing in your `FrameConfig`. Within your `Frame`, you can add buttons and images that will appear in the frame in a supported client:

```
<Frame frame={frame}>
	<FrameButton
		onClick={(f: typeof frame) => {
			f.state.count -= 1;
		}}
	>
		-
	</FrameButton>
	<FrameButton
		onClick={(f: typeof frame) => {
			f.state.count += 1;
		}}
	>
		+
	</FrameButton>
	<FrameImage src={`${process.env.BASE_URL}/image?count=${frame.state.count}`} />
</Frame>
```

You can pass your `FrameButton` components an `onClick` function to update the frames state, fetch the `action` sent by the Farcaster client, or even fetch external data.

You can use your frame's state to dynamically generate the returned image.

> Note: The image must be an absolute URL, so you may need to create a `BASE_URL` environment variable.

You can also create a redirect button by providing an `href` prop rather than `onClick`. You can dynamically generate this link using both your frame state and the returned action data:

```
<FrameButton
	href={`${process.env.BASE_URL}?index=${frame.state.index}&fid=${frame.action?.trustedData.message.data.fid}`}
>
	Visit
</FrameButton>
```

> Note: The redirect URL must have the same base domain as your site, per the Frame standard.

See more [examples](https://github.com/gregfromstl/devcaster/tree/main/examples/next)

_More docs and examples coming soon..._
