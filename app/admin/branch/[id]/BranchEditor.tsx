"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, LogOut } from "lucide-react";

// ---- Types ----
type FacilityItem = {
  title: string;
  sub: string;
  icon: string;
  bg: string;
  iconBg: string;
  badge?: string;
};

type BranchDetail = {
  hero: {
    image: string;
    rating: string;
    area: string;
    address: string;
    landmark: string;
    nearby: string[];
    mapUrl: string;
    title: string;
    subtitle: string;
    primaryPhone: string;
    secondaryPhone: string;
  };
  facilities: FacilityItem[];
  electricity: { included: boolean; text: string };
  food: {
    subtitle: string;
    daily: string;
    nonVeg: string[];
    snacks?: string;
    note?: string;
  };
  rooms: {
    subtitle: string;
    prices: { type: string; price: string }[];
    note: string;
  };
  gallery: { src: string; label: string }[];
};

// ---- Available icons for facilities ----
const FACILITY_ICONS = [
  { value: "security", label: "Security/CCTV" },
  { value: "wifi", label: "WiFi" },
  { value: "washing", label: "Washing Machine" },
  { value: "shoe", label: "Cupboard/Shoe Rack" },
  { value: "geyser", label: "Geyser" },
  { value: "cleaning", label: "Cleaning" },
  { value: "fridge", label: "Refrigerator" },
  { value: "water", label: "Water Dispenser" },
  { value: "tv", label: "Television" },
  { value: "power", label: "Power Backup" },
  { value: "gym", label: "Gym" },
  { value: "fingerprint", label: "Fingerprint Access" },
  { value: "food", label: "Food" },
  { value: "bed", label: "Bed" },
];

const COLOR_SCHEMES = [
  { label: "Blue", bg: "from-blue-50 to-blue-100", iconBg: "bg-blue-200" },
  { label: "Indigo", bg: "from-indigo-50 to-indigo-100", iconBg: "bg-indigo-200" },
  { label: "Cyan", bg: "from-cyan-50 to-cyan-100", iconBg: "bg-cyan-200" },
  { label: "Orange", bg: "from-orange-50 to-orange-100", iconBg: "bg-orange-200" },
  { label: "Emerald", bg: "from-emerald-50 to-emerald-100", iconBg: "bg-emerald-200" },
  { label: "Sky", bg: "from-sky-50 to-sky-100", iconBg: "bg-sky-200" },
  { label: "Teal", bg: "from-teal-50 to-teal-100", iconBg: "bg-teal-200" },
  { label: "Purple", bg: "from-purple-50 to-purple-100", iconBg: "bg-purple-200" },
  { label: "Violet", bg: "from-violet-50 to-violet-100", iconBg: "bg-violet-200" },
  { label: "Gray", bg: "from-gray-50 to-gray-100", iconBg: "bg-gray-200" },
  { label: "Pink", bg: "from-pink-50 to-pink-100", iconBg: "bg-pink-200" },
];

// ---- Input component ----
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";

// ---- Main Component ----
export default function BranchEditor({ id }: { id: string }) {
  const router = useRouter();
  const [data, setData] = useState<BranchDetail | null>(null);
  const [hostelData, setHostelData] = useState<Record<string, unknown> | null>(null);
  const [activeTab, setActiveTab] = useState<"hero" | "facilities" | "food" | "rooms" | "gallery">("hero");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showAddFacility, setShowAddFacility] = useState(false);
  const [newFacility, setNewFacility] = useState<FacilityItem>({
    title: "",
    sub: "",
    icon: "security",
    bg: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-200",
    badge: "",
  });

  const showMsg = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/admin/hostel");
    if (res.status === 401) { router.push("/admin"); return; }
    const full = await res.json();
    setHostelData(full);
    setData((full.branchDetails as Record<string, BranchDetail>)[id] ?? null);
  }, [id, router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async () => {
    if (!data || !hostelData) return;
    setSaving(true);
    const updated = {
      ...hostelData,
      branchDetails: {
        ...(hostelData.branchDetails as object),
        [id]: data,
      },
    };
    const res = await fetch("/api/admin/hostel", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) showMsg("✅ Changes saved!");
    else showMsg("❌ Failed to save");
    setSaving(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading branch data...</p>
      </div>
    );
  }

  const tabs = [
    { key: "hero", label: "Hero / Contact" },
    { key: "facilities", label: "Facilities" },
    { key: "food", label: "Food Menu" },
    { key: "rooms", label: "Rooms & Rent" },
    { key: "gallery", label: "Gallery" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-sm font-bold">{data.hero.title || id}</h1>
              <p className="text-indigo-200 text-[11px]">Branch Editor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Toast */}
      {message && (
        <div className="fixed top-16 right-4 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl">
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[60px] z-30">
        <div className="max-w-3xl mx-auto px-4 flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 px-4 py-3 text-xs font-medium border-b-2 transition ${
                activeTab === tab.key
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">

        {/* ---- HERO TAB ---- */}
        {activeTab === "hero" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h2 className="font-semibold text-gray-900">Hero & Contact Info</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Branch Title">
                <input className={inputCls} value={data.hero.title}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })} />
              </Field>
              <Field label="Subtitle">
                <input className={inputCls} value={data.hero.subtitle}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })} />
              </Field>
              <Field label="Area / Zone">
                <input className={inputCls} value={data.hero.area}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, area: e.target.value } })} />
              </Field>
              <Field label="Rating (e.g. 4.6)">
                <input className={inputCls} value={data.hero.rating}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, rating: e.target.value } })} />
              </Field>
              <Field label="Primary Phone">
                <input className={inputCls} value={data.hero.primaryPhone}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, primaryPhone: e.target.value } })} />
              </Field>
              <Field label="Alternate Phone">
                <input className={inputCls} value={data.hero.secondaryPhone}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, secondaryPhone: e.target.value } })} />
              </Field>
            </div>

            <Field label="Full Address">
              <input className={inputCls} value={data.hero.address}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, address: e.target.value } })} />
            </Field>

            <Field label="Landmark">
              <input className={inputCls} value={data.hero.landmark}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, landmark: e.target.value } })} />
            </Field>

            <Field label="Google Maps URL">
              <input className={inputCls} value={data.hero.mapUrl}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, mapUrl: e.target.value } })} />
            </Field>

            <Field label="Hero Image Path (e.g. /images/s1.jpg)">
              <input className={inputCls} value={data.hero.image}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, image: e.target.value } })} />
            </Field>

            {/* Nearby items */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Nearby Highlights
              </label>
              <div className="space-y-2">
                {data.hero.nearby.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className={inputCls}
                      value={item}
                      onChange={(e) => {
                        const updated = [...data.hero.nearby];
                        updated[i] = e.target.value;
                        setData({ ...data, hero: { ...data.hero, nearby: updated } });
                      }}
                    />
                    <button
                      onClick={() => {
                        const updated = data.hero.nearby.filter((_, idx) => idx !== i);
                        setData({ ...data, hero: { ...data.hero, nearby: updated } });
                      }}
                      className="p-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setData({ ...data, hero: { ...data.hero, nearby: [...data.hero.nearby, ""] } })}
                  className="flex items-center gap-1.5 text-indigo-600 text-xs font-medium hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> Add nearby highlight
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---- FACILITIES TAB ---- */}
        {activeTab === "facilities" && (
          <>
            {/* Electricity setting */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Electricity Setting</h2>
              <div className="flex items-center gap-3 mb-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.electricity.included}
                    onChange={(e) => setData({ ...data, electricity: { ...data.electricity, included: e.target.checked } })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
                <span className="text-sm font-medium text-gray-700">Show electricity highlight</span>
              </div>
              {data.electricity.included && (
                <Field label="Electricity highlight text">
                  <input className={inputCls} value={data.electricity.text}
                    onChange={(e) => setData({ ...data, electricity: { ...data.electricity, text: e.target.value } })} />
                </Field>
              )}
            </div>

            {/* Facilities list */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Facilities ({data.facilities.length})</h2>
                <button
                  onClick={() => setShowAddFacility(true)}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-2 rounded-xl transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="space-y-3">
                {data.facilities.map((fac, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-3 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-700">{fac.title || `Facility ${i + 1}`}</span>
                      <button
                        onClick={() => {
                          const updated = data.facilities.filter((_, idx) => idx !== i);
                          setData({ ...data, facilities: updated });
                        }}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Name">
                        <input className={inputCls} value={fac.title}
                          onChange={(e) => {
                            const updated = [...data.facilities];
                            updated[i] = { ...fac, title: e.target.value };
                            setData({ ...data, facilities: updated });
                          }} />
                      </Field>
                      <Field label="Subtitle">
                        <input className={inputCls} value={fac.sub}
                          onChange={(e) => {
                            const updated = [...data.facilities];
                            updated[i] = { ...fac, sub: e.target.value };
                            setData({ ...data, facilities: updated });
                          }} />
                      </Field>
                      <Field label="Icon">
                        <select className={inputCls} value={fac.icon}
                          onChange={(e) => {
                            const updated = [...data.facilities];
                            updated[i] = { ...fac, icon: e.target.value };
                            setData({ ...data, facilities: updated });
                          }}>
                          {FACILITY_ICONS.map((ic) => (
                            <option key={ic.value} value={ic.value}>{ic.label}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Color">
                        <select className={inputCls} value={fac.bg}
                          onChange={(e) => {
                            const scheme = COLOR_SCHEMES.find((s) => s.bg === e.target.value);
                            const updated = [...data.facilities];
                            updated[i] = { ...fac, bg: e.target.value, iconBg: scheme?.iconBg ?? fac.iconBg };
                            setData({ ...data, facilities: updated });
                          }}>
                          {COLOR_SCHEMES.map((s) => (
                            <option key={s.bg} value={s.bg}>{s.label}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Badge (optional)">
                        <input className={inputCls} value={fac.badge ?? ""}
                          placeholder="e.g. Secure, Popular"
                          onChange={(e) => {
                            const updated = [...data.facilities];
                            updated[i] = { ...fac, badge: e.target.value };
                            setData({ ...data, facilities: updated });
                          }} />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Facility Modal */}
            {showAddFacility && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
                onClick={() => setShowAddFacility(false)}>
                <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6"
                  onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Add Facility</h3>
                  <div className="space-y-3">
                    <Field label="Name *">
                      <input className={inputCls} value={newFacility.title}
                        onChange={(e) => setNewFacility({ ...newFacility, title: e.target.value })}
                        placeholder="e.g. Gym" />
                    </Field>
                    <Field label="Subtitle">
                      <input className={inputCls} value={newFacility.sub}
                        onChange={(e) => setNewFacility({ ...newFacility, sub: e.target.value })}
                        placeholder="e.g. Each floor" />
                    </Field>
                    <Field label="Icon">
                      <select className={inputCls} value={newFacility.icon}
                        onChange={(e) => setNewFacility({ ...newFacility, icon: e.target.value })}>
                        {FACILITY_ICONS.map((ic) => (
                          <option key={ic.value} value={ic.value}>{ic.label}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Color">
                      <select className={inputCls} value={newFacility.bg}
                        onChange={(e) => {
                          const scheme = COLOR_SCHEMES.find((s) => s.bg === e.target.value);
                          setNewFacility({ ...newFacility, bg: e.target.value, iconBg: scheme?.iconBg ?? newFacility.iconBg });
                        }}>
                        {COLOR_SCHEMES.map((s) => (
                          <option key={s.bg} value={s.bg}>{s.label}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Badge (optional)">
                      <input className={inputCls} value={newFacility.badge ?? ""}
                        placeholder="e.g. Secure"
                        onChange={(e) => setNewFacility({ ...newFacility, badge: e.target.value })} />
                    </Field>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button onClick={() => setShowAddFacility(false)}
                      className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50 transition">
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!newFacility.title) { showMsg("Please enter facility name"); return; }
                        setData({ ...data, facilities: [...data.facilities, { ...newFacility }] });
                        setNewFacility({ title: "", sub: "", icon: "security", bg: "from-blue-50 to-blue-100", iconBg: "bg-blue-200", badge: "" });
                        setShowAddFacility(false);
                      }}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-xl transition">
                      Add Facility
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ---- FOOD TAB ---- */}
        {activeTab === "food" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h2 className="font-semibold text-gray-900">Food Menu</h2>

            <Field label="Summary line (shown on card)">
              <input className={inputCls} value={data.food.subtitle}
                onChange={(e) => setData({ ...data, food: { ...data.food, subtitle: e.target.value } })}
                placeholder="e.g. Homely food • 3 times daily" />
            </Field>

            <Field label="Daily Meals Description">
              <input className={inputCls} value={data.food.daily}
                onChange={(e) => setData({ ...data, food: { ...data.food, daily: e.target.value } })}
                placeholder="e.g. Breakfast, Lunch & Dinner" />
            </Field>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Non-Veg Items</label>
              <div className="space-y-2">
                {(data.food.nonVeg ?? []).map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input className={inputCls} value={item}
                      onChange={(e) => {
                        const updated = [...(data.food.nonVeg ?? [])];
                        updated[i] = e.target.value;
                        setData({ ...data, food: { ...data.food, nonVeg: updated } });
                      }} />
                    <button
                      onClick={() => {
                        const updated = (data.food.nonVeg ?? []).filter((_, idx) => idx !== i);
                        setData({ ...data, food: { ...data.food, nonVeg: updated } });
                      }}
                      className="p-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setData({ ...data, food: { ...data.food, nonVeg: [...(data.food.nonVeg ?? []), ""] } })}
                  className="flex items-center gap-1.5 text-indigo-600 text-xs font-medium hover:underline">
                  <Plus className="w-3.5 h-3.5" /> Add non-veg item
                </button>
              </div>
            </div>

            <Field label="Snacks (optional)">
              <input className={inputCls} value={data.food.snacks ?? ""}
                onChange={(e) => setData({ ...data, food: { ...data.food, snacks: e.target.value } })}
                placeholder="e.g. Snacks on weekends" />
            </Field>

            <Field label="Note (optional)">
              <input className={inputCls} value={data.food.note ?? ""}
                onChange={(e) => setData({ ...data, food: { ...data.food, note: e.target.value } })}
                placeholder="e.g. Menu may vary on festivals" />
            </Field>
          </div>
        )}

        {/* ---- ROOMS TAB ---- */}
        {activeTab === "rooms" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h2 className="font-semibold text-gray-900">Rooms & Rent</h2>

            <Field label="Subtitle (shown on card)">
              <input className={inputCls} value={data.rooms.subtitle}
                onChange={(e) => setData({ ...data, rooms: { ...data.rooms, subtitle: e.target.value } })}
                placeholder="e.g. Room 2 / 3 / 4 Sharing Available" />
            </Field>

            {/* Room prices */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-600">Room Types & Prices</label>
                <button
                  onClick={() => setData({ ...data, rooms: { ...data.rooms, prices: [...data.rooms.prices, { type: "", price: "" }] } })}
                  className="flex items-center gap-1 text-indigo-600 text-xs font-medium hover:underline">
                  <Plus className="w-3.5 h-3.5" /> Add room type
                </button>
              </div>
              <div className="space-y-2">
                {data.rooms.prices.map((room, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input className={inputCls} value={room.type}
                      placeholder="e.g. 2 Sharing"
                      onChange={(e) => {
                        const updated = [...data.rooms.prices];
                        updated[i] = { ...room, type: e.target.value };
                        setData({ ...data, rooms: { ...data.rooms, prices: updated } });
                      }} />
                    <input className={inputCls} value={room.price}
                      placeholder="e.g. ₹9500 /Month"
                      onChange={(e) => {
                        const updated = [...data.rooms.prices];
                        updated[i] = { ...room, price: e.target.value };
                        setData({ ...data, rooms: { ...data.rooms, prices: updated } });
                      }} />
                    <button
                      onClick={() => {
                        const updated = data.rooms.prices.filter((_, idx) => idx !== i);
                        setData({ ...data, rooms: { ...data.rooms, prices: updated } });
                      }}
                      className="p-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Field label="Advance / Notice Note">
              <input className={inputCls} value={data.rooms.note}
                onChange={(e) => setData({ ...data, rooms: { ...data.rooms, note: e.target.value } })}
                placeholder="e.g. Advance ₹3,000 • 1 Month notice mandatory" />
            </Field>
          </div>
        )}

        {/* ---- GALLERY TAB ---- */}
        {activeTab === "gallery" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Gallery Images</h2>
              <button
                onClick={() => setData({ ...data, gallery: [...data.gallery, { src: "", label: "" }] })}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-2 rounded-xl transition">
                <Plus className="w-3.5 h-3.5" /> Add Image
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Enter paths like <code className="bg-gray-100 px-1 rounded">/images/s1.jpg</code> — upload images to the <code className="bg-gray-100 px-1 rounded">public/images/</code> folder.
            </p>
            <div className="space-y-2">
              {data.gallery.map((img, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input className={inputCls} value={img.src}
                    placeholder="/images/photo.jpg"
                    onChange={(e) => {
                      const updated = [...data.gallery];
                      updated[i] = { ...img, src: e.target.value };
                      setData({ ...data, gallery: updated });
                    }} />
                  <input className={`${inputCls} w-32`} value={img.label}
                    placeholder="Label"
                    onChange={(e) => {
                      const updated = [...data.gallery];
                      updated[i] = { ...img, label: e.target.value };
                      setData({ ...data, gallery: updated });
                    }} />
                  <button
                    onClick={() => {
                      const updated = data.gallery.filter((_, idx) => idx !== i);
                      setData({ ...data, gallery: updated });
                    }}
                    className="p-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save button at bottom */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3.5 rounded-2xl transition"
        >
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
