import HeroCard from "@/components/HeroCard";
import FacilitiesCard from "@/components/FacilitiesCard";
import FoodMenuCard from "@/components/FoodMenuCard";
import RoomsCard from "@/components/RoomsCard";
import GalleryCard from "@/components/GalleryCard";
import LocationCard from "@/components/LocationCard";

type PgPageProps = {
  data: {
    hero: any;   // ✅ IMPORTANT FIX
    food: any;
    rooms: any;
    gallery: any;
  };
};

export default function PgPage({ data }: PgPageProps) {
  return (
    <main className="max-w-md mx-auto p-3 pb-24">
      <HeroCard {...data.hero} />

      <FacilitiesCard />

      <FoodMenuCard data={data.food} />

      <RoomsCard data={data.rooms} />

      <GalleryCard data={data.gallery} />

      <LocationCard
        address={data.hero.address}
        landmark={data.hero.landmark}
        nearby={data.hero.nearby}
        mapUrl={data.hero.mapUrl}
      />
    </main>
  );
}
