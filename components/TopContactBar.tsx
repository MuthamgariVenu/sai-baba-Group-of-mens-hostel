"use client";

import { Phone } from "lucide-react";

export default function TopContactBar() {
  return (
    <div className="w-full sticky top-0 z-50 bg-[#4b3f72]">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col items-center gap-1">

        {/* Phone Numbers */}
        <div className="flex items-center gap-6 text-sm font-semibold">

          {/* Number 1 */}
          <a
            href="tel:8978499854"
            className="flex items-center gap-1 text-amber-300 animate-pulse hover:text-amber-200 transition"
          >
            <Phone className="w-4 h-4" />
            89784 99854
          </a>

          {/* Number 2 */}
          <a
            href="tel:9985499864"
            className="flex items-center gap-1 text-emerald-300 animate-pulse hover:text-emerald-200 transition"
          >
            <Phone className="w-4 h-4" />
            99854 99864
          </a>
        </div>

        {/* Tagline */}
        <p className="text-[11px] text-white/80 tracking-wide">
          Sai Baba Men’s PG • Hyderabad
        </p>

      </div>
    </div>
  );
}
