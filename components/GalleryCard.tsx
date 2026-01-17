"use client";

import Image from "next/image";

export type GalleryItem = {
  src: string;
  label: string;
};

type Props = {
  data: GalleryItem[];
};

export default function GalleryCard({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mt-4">
      <div className="flex justify-between items-center mb-2">
        {/* ✅ FIX #1: title contrast */}
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
            className="relative min-w-[120px] h-[90px] rounded-xl overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-cover"
            />

            {/* Overlay label – already Safari safe */}
            <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 rounded">
              {img.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
