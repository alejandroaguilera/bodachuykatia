import { createHash } from 'crypto';
import { cookies } from 'next/headers';

export const adminToken = () => createHash('sha256').update(`kj:${process.env.ADMIN_PASSWORD ?? ''}`).digest('hex');

export async function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;
  return (await cookies()).get('kj_admin')?.value === adminToken();
}
