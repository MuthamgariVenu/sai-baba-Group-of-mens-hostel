import PgPage from "@/components/PgPage";
import { getBranchDetail } from "@/lib/getData";

export default function PlatinumNestMensHostelPage() {
  const data = getBranchDetail("platinum-nest-men-hostel");
  return <PgPage data={data} />;
}
