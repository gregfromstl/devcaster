import {
    Frame,
    FrameButton,
    FrameConfig,
    FrameImage,
} from "@devcaster/next/frames";

export default function Home({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) {
    const frame = new FrameConfig({ index: 0 }, searchParams);
    const photos = [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99",
    ];

    return (
        <>
            <Frame frame={frame}>
                <FrameButton
                    onClick={(f: typeof frame) => {
                        f.state.index =
                            (f.state.index + photos.length - 1) % photos.length;
                    }}
                >
                    ◀️
                </FrameButton>
                <FrameButton
                    href={`${process.env.BASE_URL}?index=${frame.state.index}&fid=${frame.action?.trustedData.message.data.fid}`}
                >
                    Visit
                </FrameButton>
                <FrameButton
                    onClick={(f: typeof frame) => {
                        f.state.index += 1 % photos.length;
                    }}
                >
                    ▶️
                </FrameButton>
                <FrameImage src={photos[frame.state.index]} />
            </Frame>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                {/* Your site content goes here */}
            </main>
        </>
    );
}
