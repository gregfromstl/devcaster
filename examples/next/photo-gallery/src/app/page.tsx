import {
    Frame,
    FrameButton,
    FrameConfig,
    FrameImage,
} from "@devcaster/next/frames";
import Image from "next/image";

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
                            f.state.index > 0
                                ? f.state.index - 1
                                : photos.length - 1;
                    }}
                >
                    ◀️
                </FrameButton>
                <FrameButton
                    href={`${frame.origin}?index=${
                        frame.state.index % photos.length
                    }`}
                >
                    Visit
                </FrameButton>
                <FrameButton
                    onClick={(f: typeof frame) => {
                        f.state.index += 1;
                    }}
                >
                    ▶️
                </FrameButton>
                <FrameImage src={photos[frame.state.index % photos.length]} />
            </Frame>

            <div className="w-screen h-screen relative bg-gray-100">
                <Image
                    src={
                        photos[
                            parseInt(
                                searchParams.index || `${frame.state.index}`
                            )
                        ]
                    }
                    alt="Photo"
                    fill
                    className="object-cover object-center"
                />
            </div>
        </>
    );
}
