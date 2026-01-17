"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export type FoodData = {
  subtitle: string;
  daily: string;
  nonVeg: string[];
  snacks: string;
  note: string;
};

type Props = {
  data: FoodData;
};

export default function FoodMenuCard({ data }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔹 Card */}
      <motion.div
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        className="bg-gradient-to-br from-white to-slate-50 
        rounded-2xl shadow-lg p-4 mt-4 cursor-pointer"
      >
        <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
          🍽️ Food Menu
        </h2>

        {/* ✅ FIX #1: subtitle contrast */}
        <p className="text-sm text-gray-700 font-medium mt-1">
          {data.subtitle}
        </p>

        <p className="text-xs text-indigo-600 font-medium mt-2">
          👉 Tap to view full food details
        </p>
      </motion.div>

      {/* 🔹 Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 
            flex items-center justify-center px-3"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-md w-full 
              rounded-2xl shadow-xl overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* 🔹 Header */}
              <div className="flex items-center justify-between 
              px-5 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  🍽️ Food Details
                </h3>

                {/* ❌ Close Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full 
                  hover:bg-gray-100 transition"
                >
                  {/* ✅ FIX #2: close icon contrast */}
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* 🔹 Content */}
              <div className="p-5 space-y-4 text-sm text-gray-800">
                <div className="bg-green-50 border border-green-100 
                p-4 rounded-xl">
                  <p className="font-medium text-green-800">
                    Daily Meals
                  </p>
                  <p className="mt-1 text-gray-700">
                    {data.daily}
                  </p>
                </div>

                <div className="bg-rose-50 border border-rose-100 
                p-4 rounded-xl">
                  <p className="font-medium text-rose-800">
                    Non-Veg Options
                  </p>
                  <ul className="list-disc ml-5 mt-2 text-gray-700">
                    {data.nonVeg.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-100 
                p-4 rounded-xl">
                  <p className="font-medium text-yellow-800">
                    Snacks
                  </p>
                  <p className="mt-1 text-gray-700">
                    {data.snacks}
                  </p>
                </div>

                {/* ✅ FIX #3: note contrast */}
                <div className="bg-blue-50 border border-blue-100 
                p-4 rounded-xl text-xs text-gray-700 font-medium">
                  ℹ️ {data.note}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
