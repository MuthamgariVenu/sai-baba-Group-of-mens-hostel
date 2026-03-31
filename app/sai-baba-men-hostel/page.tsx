import PgPage from "@/components/PgPage";
import { getBranchDetail } from "@/lib/getData";

export default function SaiBabaMensHostelPage() {
  const data = getBranchDetail("sai-baba-men-hostel");
  return <PgPage data={data} />;
}
