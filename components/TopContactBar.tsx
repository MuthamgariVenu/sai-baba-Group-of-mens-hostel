"use client";

import { Phone, Mail } from "lucide-react";

export default function TopContactBar() {
  return (
    <div className="w-full bg-indigo-900 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

        {/* Left */}
        <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
          <span className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            89784 99854
          </span>

          <span className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            99854 99864
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center justify-center sm:justify-end gap-2">
          <Mail className="w-4 h-4" />
          <span>info@saibabagroupofhostels.in</span>
        </div>

      </div>
    </div>
  );
}
