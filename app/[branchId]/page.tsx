import PgPage from "@/components/PgPage";
import { getBranchDetail } from "@/lib/getData";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DynamicBranchPage({
  params,
}: {
  params: Promise<{ branchId: string }>;
}) {
  const { branchId } = await params;
  const data = await getBranchDetail(branchId);
  if (!data) return notFound();
  return <PgPage data={data} />;
}
