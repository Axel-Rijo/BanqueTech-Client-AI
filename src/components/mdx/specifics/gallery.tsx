"use client";

import { useState } from "react";

interface GalleryProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

export function Gallery({ images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="my-8">
      <div className="mb-2 overflow-hidden rounded-lg">
        <img
          src={images[activeIndex].src || "/placeholder.svg"}
          alt={images[activeIndex].alt}
          className="h-auto w-full object-cover"
        />
        {images[activeIndex].caption && (
          <p className="mt-2 text-center text-sm text-gray-500">
            {images[activeIndex].caption}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-md ${
              index === activeIndex ? "ring-2 ring-amber-500" : ""
            }`}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="h-16 w-16 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
