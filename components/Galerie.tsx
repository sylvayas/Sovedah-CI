"use client";

import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import type { RenderPhotoProps } from "react-photo-album";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Define the photo type to match the structure
type Photo = {
    src: string;
    width: number;
    height: number;
    srcSet?: { src: string; width: number; height: number; }[];
    blurDataURL?: string;
};

export default function Galerie({ slides }: { slides: Photo[] }) {
    const [index, setIndex] = useState(-1);

    return (
        <>
            <PhotoAlbum 
                photos={slides} 
                layout="rows" 
                targetRowHeight={150} 
                onClick={({ index }) => setIndex(index)}
                renderPhoto={NextJsImage}
                defaultContainerWidth={1200}
                sizes={{
                    size: "calc(100vw - 40px)",
                    sizes: [
                        { viewport: "(max-width: 299px)", size: "calc(100vw - 10px)" },
                        { viewport: "(max-width: 599px)", size: "calc(100vw - 20px)" },
                        { viewport: "(max-width: 1199px)", size: "calc(100vw - 30px)" },
                    ],
                }}
            />

            <Lightbox
                slides={slides}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
        </>
    );
}

export function NextJsImage({
    photo,
    imageProps: { alt, title, sizes, className, onClick },
    wrapperStyle,
}: RenderPhotoProps<Photo>) {
    return (
        <div 
            style={{ ...wrapperStyle, position: "relative" }}
            className="border-2 border-transparent hover:border-novis_orange 
            transition-all duration-300 shadow-2xl hover:shadow-amber-500/30"
        >
            <Image
                fill
                src={photo.src}
                alt={alt || ""}
                title={title}
                sizes={sizes}
                className={`object-cover ${className || ''}`}
                onClick={onClick}
                placeholder={photo.blurDataURL ? "blur" : undefined}
                blurDataURL={photo.blurDataURL}
            />
        </div>
    );
}