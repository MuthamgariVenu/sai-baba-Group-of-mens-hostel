import PgPage from "@/components/PgPage";
import { getBranchDetail } from "@/lib/getData";
import { notFound } from "next/navigation";

export default async function SaiBabaMensHostel2Page() {
  const data = await getBranchDetail("sai-baba-men-hostel-2");
  if (!data) return notFound();
  return <PgPage data={data} />;
}
