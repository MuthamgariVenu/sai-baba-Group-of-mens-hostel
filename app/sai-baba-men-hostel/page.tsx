import PgPage from "@/components/PgPage";
import { getBranchDetail } from "@/lib/getData";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SaiBabaMensHostelPage() {
  const data = await getBranchDetail("sai-baba-men-hostel");
  if (!data) return notFound();
  return <PgPage data={data} />;
}
