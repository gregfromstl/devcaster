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

```TypeScript
import type { NextRequest } from "next/server";
import { framesMiddleware } from "@devcaster/next/frames";

export async function middleware(request: NextRequest) {
    return await framesMiddleware(request);
}
```

Finally, create a single `frames` folder inside your `app` directory, and add a `route.ts` file to it. Add the post handler to the route:

```TypeScript
import { NextRequest } from "next/server";
import { framesPOST } from "@devcaster/next/frames";

export async function POST(request: NextRequest) {
    return await framesPOST(request);
}
```

## Creating a Frame

To add a frame to a page, create a new `FrameConfig` in any `page.ts` file. Pass the config your initial state and the page's unaltered `searchParams` object:

```TypeScript
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

```JSX
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

> Note: For testing locally via tunneling, set a BASE_URL environment variable to your tunnel's url to override localhost.

To route to a new page after updating state, you can return a pathname from your `onClick` function:

```JSX
<FrameButton
	onClick={(f: typeof frame) => {
		f.state.fid = f.action!.untrustedData.fid;
		return "/result";
	}}
>
```

On the `/result` page, you can continue to use the same state as long as the state object is consistent:

```TypeScript
const frame = new FrameConfig<{
	fid: number;
}>({ fid: -1 }, searchParams);
if (frame.state.fid === -1) throw new Error("Failed to get FID");

const pokemon = await getPokemon(frame.state.fid);
```

You can also create a redirect button by providing an `href` prop rather than `onClick`. You can dynamically generate this link using both your frame state and the returned action data:

```JSX
<FrameButton
	href={`${frame.origin}?index=${frame.state.index}&fid=${frame.action?.trustedData.message.data.fid}`}
>
	Visit
</FrameButton>
```

> Note: The redirect URL must have the same base domain as your site, per the Frame standard.

See more [examples](https://github.com/gregfromstl/devcaster/tree/main/examples/next)

Contact [@gregfromstl](https://warpcast.com/gregfromstl) for any support.

_More docs and examples coming soon..._
