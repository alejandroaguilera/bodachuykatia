import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/admin';

export const dynamic = 'force-dynamic';

const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;

export async function GET() {
  if (!(await isAdmin())) return new Response('No autorizado', { status: 401 });
  const rows = await prisma.rsvp.findMany({ orderBy: { createdAt: 'asc' } });
  const csv = [
    ['Nombre', 'Asiste', 'Personas', 'Teléfono', 'Mensaje', 'Fecha'].map(esc).join(','),
    ...rows.map((r) => [r.name, r.attending ? 'Sí' : 'No', r.guests, r.phone, r.message, r.createdAt.toISOString()].map(esc).join(',')),
  ].join('\n');
  return new Response('﻿' + csv, {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="confirmaciones-katia-jesus.csv"' },
  });
}
