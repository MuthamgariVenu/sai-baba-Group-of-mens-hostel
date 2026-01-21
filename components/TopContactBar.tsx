"use client";

import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export default function TopContactBar() {
  return (
    <div className="w-full bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* LEFT: Logo + Phones */}
        <div className="flex items-center gap-4">
          
          {/* LOGO */}
          <Image
            src="/logo/sb-pgs-logo.png"
            alt="SB PG's Logo"
            width={90}
            height={32}
            priority
          />

          {/* Phones */}
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              89784 99854
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              99854 99864
            </span>
          </div>
        </div>

        {/* RIGHT: Email */}
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4" />
          info@saibabagroupofhostels.in
        </div>
      </div>
    </div>
  );
}
