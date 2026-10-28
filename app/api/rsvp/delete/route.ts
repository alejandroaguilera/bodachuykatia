import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/admin';

export async function POST(req: Request) {
  if (!(await isAdmin())) return new Response('No autorizado', { status: 401 });
  const id = String((await req.formData()).get('id') ?? '');
  if (id) await prisma.rsvp.deleteMany({ where: { id } });
  return NextResponse.redirect(new URL('/admin', req.url), 303);
}
