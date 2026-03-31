import fs from 'fs';
import path from 'path';
import { connectDB } from './mongodb';
import { HostelDataModel } from './models/HostelData';

type Branch = {
  id: string;
  title: string;
  location: string;
  badge: string;
  icon: string;
  bg: string;
  href: string;
};

// Reads from MongoDB; seeds from hostelData.json on first run
export async function getFullHostelData() {
  await connectDB();

  let doc = await HostelDataModel.findOne().lean();

  if (!doc) {
    const filePath = path.join(process.cwd(), 'data', 'hostelData.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const seed = JSON.parse(raw);
    const created = await HostelDataModel.create(seed);
    return { branches: created.branches, branchDetails: created.branchDetails as Record<string, unknown> };
  }

  return {
    branches: doc.branches as Branch[],
    branchDetails: doc.branchDetails as Record<string, unknown>,
  };
}

export async function getBranches(): Promise<Branch[]> {
  const data = await getFullHostelData();
  return data.branches;
}

export async function getBranchDetail(id: string) {
  const data = await getFullHostelData();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.branchDetails[id] as any) ?? null;
}
