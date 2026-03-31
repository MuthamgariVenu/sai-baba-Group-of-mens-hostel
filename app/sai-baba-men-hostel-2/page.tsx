import PgPage from "@/components/PgPage";
import { getBranchDetail } from "@/lib/getData";

export default async function SaiBabaMensHostel2Page() {
  const data = await getBranchDetail("sai-baba-men-hostel-2");
  return <PgPage data={data} />;
}
