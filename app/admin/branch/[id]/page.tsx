import BranchEditor from "./BranchEditor";

export default async function BranchEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BranchEditor id={id} />;
}
