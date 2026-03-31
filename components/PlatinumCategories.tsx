"use client";

import { useRouter } from "next/navigation";
import { Sparkles, Crown, Building2, Star, Home, MapPin as MapPinIcon, Hotel } from "lucide-react";
import { MapPin } from "lucide-react";

type Branch = {
  id: string;
  title: string;
  location: string;
  badge: string;
  icon: string;
  bg: string;
  href: string;
};

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Crown,
  Building2,
  Star,
  Home,
  Hotel,
  MapPin: MapPinIcon,
};

export default function PlatinumCategories({ branches }: { branches: Branch[] }) {
  const router = useRouter();

  return (
    <section className="mt-20 px-4">
      <h2 className="text-xl font-semibold text-gray-900 text-center">
        Sai Baba Men's PG Categories
      </h2>
      <p className="text-sm text-gray-600 text-center mt-1">
        Choose the lifestyle that fits you best
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {branches.map((item, index) => {
          const Icon = ICON_MAP[item.icon] ?? Building2;

          return (
            <div
              key={index}
              onClick={() => router.push(item.href)}
              className={`cursor-pointer rounded-3xl p-5
              bg-gradient-to-r ${item.bg}
              shadow-md hover:shadow-lg transition`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-indigo-600 shadow">
                  {item.badge}
                </span>
              </div>

              {/* Location */}
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-700">
                <MapPin className="w-3.5 h-3.5" />
                <span>{item.location}</span>
              </div>

              {/* CTA */}
              <div className="mt-3">
                <span className="text-xs font-medium text-indigo-600">
                  View details →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
