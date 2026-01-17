"use client";

import { useState } from "react";

type RoomPrice = {
  type: string;
  price: string;
};

type RoomsData = {
  subtitle: string;
  prices: RoomPrice[];
};

export default function RoomsCard({ data }: { data: RoomsData }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MAIN CARD */}
      <div
        onClick={() => setOpen(true)}
        className="bg-white rounded-2xl shadow-lg p-4 mt-4 cursor-pointer"
      >
        {/* ✅ FIX #1: title color */}
        <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
          🛏️ Rooms & Rent
        </h2>

        <p className="text-sm text-gray-700 mt-1">
          {data?.subtitle}
        </p>

        <p className="text-xs text-blue-600 mt-2">
          👉 Tap to view room details
        </p>
      </div>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-2xl p-5"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">
                🛏️ Room Details
              </h3>

              {/* ✅ FIX #2: close icon contrast */}
              <button
                onClick={() => setOpen(false)}
                className="text-xl text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* ROOM LIST */}
            <div className="space-y-3">
              {data?.prices?.length > 0 ? (
                data.prices.map((room, i) => (
                  <div
                    key={i}
                    className="border rounded-xl p-3 bg-gray-50"
                  >
                    <p className="font-semibold text-gray-900">
                      {room.type}
                    </p>
                    <p className="text-sm text-gray-700">
                      Rent: {room.price}
                    </p>
                  </div>
                ))
              ) : (
                /* ✅ FIX #3: empty state readability */
                <p className="text-sm text-gray-700 font-medium">
                  Room details not available
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
