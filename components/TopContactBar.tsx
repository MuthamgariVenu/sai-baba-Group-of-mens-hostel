"use client";

import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export default function TopContactBar() {
  return (
    <div className="w-full bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo/sb-pgs-logo.png"
            alt="SB PG's Logo"
            width={140}
            height={44}
            priority
            className="object-contain h-9 sm:h-11"
          />
        </div>

        {/* RIGHT: CONTACT (secondary) */}
        <div className="flex items-center gap-4 text-xs sm:text-sm">

          {/* Phones */}
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1 opacity-90">
              <Phone className="w-3.5 h-3.5" />
              89784 99854
            </span>
            <span className="flex items-center gap-1 opacity-90">
              <Phone className="w-3.5 h-3.5" />
              99854 99864
            </span>
          </div>

          {/* Email */}
          <div className="hidden sm:flex items-center gap-1 opacity-80">
            <Mail className="w-3.5 h-3.5" />
            info@saibabagroupofhostels.in
          </div>

          {/* Mobile: phone icon only */}
          <a
            href="tel:8978499854"
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/10"
            aria-label="Call"
          >
            <Phone className="w-4 h-4" />
          </a>

        </div>
      </div>
    </div>
  );
}
