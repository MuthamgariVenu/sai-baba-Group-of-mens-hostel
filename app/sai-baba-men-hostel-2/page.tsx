import PgPage from "@/components/PgPage";
import { getBranchDetail } from "@/lib/getData";

export default function SaiBabaMensHostel2Page() {
  const data = getBranchDetail("sai-baba-men-hostel-2");
  return <PgPage data={data} />;
}
