"use client";

import { Phone, Mail } from "lucide-react";

export default function TopContactBar() {
  return (
    <div className="w-full bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LEFT: PHONE NUMBERS */}
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            89784 99854
          </span>

          <span className="hidden sm:flex items-center gap-1">
            <Phone className="w-4 h-4" />
            99854 99864
          </span>
        </div>

        {/* RIGHT: EMAIL */}
        <div className="hidden sm:flex items-center gap-1 text-sm">
          <Mail className="w-4 h-4" />
          info@saibabagroupofhostels.in
        </div>

        {/* MOBILE: CALL ICON */}
        <a
          href="tel:8978499854"
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/15"
          aria-label="Call"
        >
          <Phone className="w-4 h-4" />
        </a>

      </div>
    </div>
  );
}
