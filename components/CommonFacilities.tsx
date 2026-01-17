"use client";

import {
  Shield,
  Bed,
  Utensils,
  Wifi,
  Sparkles,
  User,
} from "lucide-react";

const facilities = [
  {
    title: "24/7 Security & CCTV",
    icon: Shield,
    bg: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-200",
  },
  {
    title: "Comfort Interiors",
    icon: Bed,
    bg: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-200",
  },
  {
    title: "Healthy Food",
    icon: Utensils,
    bg: "from-pink-50 to-pink-100",
    iconBg: "bg-pink-200",
  },
  {
    title: "High-Speed WiFi",
    icon: Wifi,
    bg: "from-indigo-50 to-indigo-100",
    iconBg: "bg-indigo-200",
  },
  {
    title: "Daily Housekeeping",
    icon: Sparkles,
    bg: "from-rose-50 to-rose-100",
    iconBg: "bg-rose-200",
  },
  {
    title: "Women-Friendly Management",
    icon: User,
    bg: "from-teal-50 to-teal-100",
    iconBg: "bg-teal-200",
  },
];

export default function CommonFacilities() {
  return (
    <section className="mt-16">
      <h2 className="px-4 text-lg font-semibold text-gray-900 mb-5">
        Designed for Women’s Comfort & Safety
      </h2>

      <div className="overflow-hidden">
        <div className="flex gap-5 animate-scroll px-4">
          {[...facilities, ...facilities].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`min-w-[200px] rounded-3xl bg-gradient-to-br ${item.bg}
                shadow-md px-5 py-6 transition-transform duration-300 hover:scale-[1.03]`}
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${item.iconBg}`}
                >
                  <Icon className="w-6 h-6 text-gray-800" />
                </div>

                <p className="mt-4 text-sm text-gray-900 text-center font-medium">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAST + PREMIUM AUTO SCROLL */}
      <style jsx>{`
        .animate-scroll {
          animation: scroll 16s linear infinite;
          will-change: transform;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* Mobile little faster */
        @media (max-width: 640px) {
          .animate-scroll {
            animation-duration: 14s;
          }
        }
      `}</style>
    </section>
  );
}
