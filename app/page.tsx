// app/page.tsx
import DashboardHero from "@/components/DashboardHero";
import PlatinumCategories from "@/components/PlatinumCategories";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <DashboardHero />
      <PlatinumCategories />
      <Footer />
    </main>
  );
}
