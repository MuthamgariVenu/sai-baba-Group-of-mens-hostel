"use client";

import { Phone, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopContactBar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="w-full sticky top-0 z-50
                    bg-gradient-to-r from-[#2b2a7a] to-[#3a2f9b]
                    shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3
                      flex flex-col sm:flex-row
                      sm:items-center sm:justify-between gap-2">

        {/* LEFT SIDE */}
        <div className="flex flex-wrap items-center gap-6 justify-center sm:justify-start">

          {/* Phone 1 – Yellow */}
          <a
            href="tel:8978499854"
            className="flex items-center gap-1 font-semibold
                       text-yellow-400 animate-pulse
                       hover:text-yellow-300 transition"
          >
            <Phone className="w-4 h-4" />
            89784 99854
          </a>

          {/* Phone 2 – Cyan */}
          <a
            href="tel:9985499864"
            className="flex items-center gap-1 font-semibold
                       text-cyan-300 animate-pulse
                       hover:text-cyan-200 transition"
          >
            <Phone className="w-4 h-4" />
            99854 99864
          </a>

          {/* HOME BUTTON – only on other pages */}
          {!isHomePage && (
            <Link
              href="/"
              className="flex items-center gap-1 px-3 py-1
                         rounded-full bg-white/20
                         text-white font-medium
                         hover:bg-white hover:text-[#2b2a7a]
                         transition"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          )}
        </div>

        {/* RIGHT SIDE TEXT */}
        <div className="text-xs text-white/90 text-center sm:text-right tracking-wide">
          Sai Baba Men’s PG • Hyderabad
        </div>

      </div>
    </div>
  );
}
