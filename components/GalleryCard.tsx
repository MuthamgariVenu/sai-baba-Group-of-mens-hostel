"use client";

import { useState } from "react";
import Image from "next/image";

export type GalleryItem = {
  src: string;
  label: string;
};

type Props = {
  data: GalleryItem[];
};

export default function GalleryCard({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activeImage =
    activeIndex !== null ? data[activeIndex] : null;

  // 👉 Swipe logic
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || activeIndex === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Swipe threshold
    if (diff > 50) {
      // Swipe Left → Next
      setActiveIndex((prev) =>
        prev! === data.length - 1 ? 0 : prev! + 1
      );
    } else if (diff < -50) {
      // Swipe Right → Previous
      setActiveIndex((prev) =>
        prev! === 0 ? data.length - 1 : prev! - 1
      );
    }

    setTouchStartX(null);
  };

  return (
    <>
      {/* 🔹 GALLERY CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-4 mt-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-extrabold text-gray-900">
            🖼️ Photo Gallery
          </h2>
          <span className="text-xs text-blue-600 font-medium">
            Tap to view
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto">
          {data.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className="relative min-w-[120px] h-[90px] 
              rounded-xl overflow-hidden cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover"
              />

              <span className="absolute bottom-1 left-1 
              bg-black/60 text-white text-xs px-2 rounded">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 FULLSCREEN PREVIEW + SWIPE */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 
          flex items-center justify-center"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close */}
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-4 right-4 
              bg-black/70 text-white w-9 h-9 
              rounded-full flex items-center justify-center z-50"
            >
              ✕
            </button>

            {/* Image */}
            <div className="relative w-full h-[85vh] max-w-xl">
              <Image
                src={activeImage.src}
                alt={activeImage.label}
                fill
                className="object-contain"
              />
            </div>

            {/* Label */}
            <div className="absolute bottom-6 
            text-white text-sm font-medium">
              {activeImage.label}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
