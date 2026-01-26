export default function DashboardHero() {
  return (
    <section className="px-4 mt-6">
      <div
        className="
          relative max-w-5xl mx-auto
          rounded-3xl
          bg-gradient-to-r from-pink-50 via-blue-50 to-indigo-50
          p-6 sm:p-10
          shadow-lg
          border border-white/60
        "
      >
        {/* Badge – hidden on mobile */}
        <span className="hidden sm:inline-block absolute top-4 right-4 text-[10px] px-3 py-1 rounded-full bg-white text-indigo-600 shadow">
          Premium Men's PG
        </span>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900 text-center">
          Sai Baba Men’s Living
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">
          Safe, elegant & premium PG living exclusively designed for men
        </p>

        {/* Highlights */}
        <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs sm:text-sm font-medium text-indigo-700">
          <span className="flex items-center gap-1">
            <span className="text-emerald-600">✓</span> Clean Rooms
          </span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-600">✓</span> Prime Locations
          </span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-600">✓</span> Trusted Management
          </span>
        </div>
      </div>
    </section>
  );
}
