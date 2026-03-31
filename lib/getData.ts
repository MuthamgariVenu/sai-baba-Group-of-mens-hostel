import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'hostelData.json');

export function getFullHostelData() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

export function getBranches() {
  return getFullHostelData().branches as Array<{
    id: string;
    title: string;
    location: string;
    badge: string;
    icon: string;
    bg: string;
    href: string;
  }>;
}

export function getBranchDetail(id: string) {
  const data = getFullHostelData();
  return data.branchDetails[id] ?? null;
}
