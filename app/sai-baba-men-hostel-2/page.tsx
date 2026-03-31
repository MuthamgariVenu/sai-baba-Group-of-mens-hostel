import PgPage from "@/components/PgPage";
import { getBranchDetail } from "@/lib/getData";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SaiBabaMensHostel2Page() {
  const data = await getBranchDetail("sai-baba-men-hostel-2");
  if (!data) return notFound();
  return <PgPage data={data} />;
}
