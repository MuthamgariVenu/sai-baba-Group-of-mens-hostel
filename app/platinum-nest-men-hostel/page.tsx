import PgPage from "@/components/PgPage";
import { getBranchDetail } from "@/lib/getData";

export default async function PlatinumNestMensHostelPage() {
  const data = await getBranchDetail("platinum-nest-men-hostel");
  return <PgPage data={data} />;
}
