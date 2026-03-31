import PgPage from "@/components/PgPage";
import { getBranchDetail } from "@/lib/getData";

export default async function SaiBabaMensHostelPage() {
  const data = await getBranchDetail("sai-baba-men-hostel");
  return <PgPage data={data} />;
}
