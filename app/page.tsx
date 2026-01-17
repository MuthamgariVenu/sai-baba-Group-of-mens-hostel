import DashboardHero from "@/components/DashboardHero";
import CommonFacilities from "@/components/CommonFacilities";
import WomenLifeGallery from "@/components/WomenLifeGallery";
import PlatinumCategories from "@/components/PlatinumCategories";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <DashboardHero />
      <CommonFacilities />
    
      <PlatinumCategories />
      <Footer />
    </main>
  );
}
