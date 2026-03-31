"use client";

import { Mail, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-md mx-auto px-4 py-8 text-center space-y-6">

        {/* PG BRAND */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Sai Baba Men’s PG
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Comfortable • Secure • Premium Living
          </p>
        </div>

        {/* DIVIDER */}
        <div className="w-20 h-[1px] bg-gray-300 mx-auto" />

        {/* 👨‍💻 DEVELOPER CONTACT (ONLY WHATSAPP + EMAIL) */}
        <div>
          <p className="text-xs text-gray-500 mb-2">
            Website developed & maintained by
          </p>

          <p className="text-sm font-medium text-gray-800">
            Muthamgari Venu
          </p>

          {/* Contact Icons */}
          <div className="flex justify-center gap-4 mt-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/9963643062"
              target="_blank"
              className="p-2 rounded-full bg-green-50 hover:bg-green-100 transition"
              aria-label="WhatsApp"
            >
              <PhoneCall className="w-4 h-4 text-green-600" />
            </a>

            {/* Email */}
            <a
              href="mailto:muthamgarivenu234@gmail.com"
              className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 text-blue-600" />
            </a>
          </div>

          {/* Contact Text */}
          <p className="text-xs text-gray-500 mt-2">
            WhatsApp / Email for website support & updates
          </p>
        </div>

        {/* COPYRIGHT */}
        <p className="text-xs text-gray-400 pt-2">
          © 2026 Sai Baba Men’s Living. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
