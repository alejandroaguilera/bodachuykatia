import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim().slice(0, 120);
  const phone = String(body.phone ?? '').trim().slice(0, 30);
  const message = String(body.message ?? '').trim().slice(0, 1000) || null;
  const attending = body.attending === true;
  const guests = attending ? Math.min(10, Math.max(1, Math.round(Number(body.guests) || 1))) : 0;

  if (name.length < 3) return NextResponse.json({ error: 'Escribe tu nombre completo' }, { status: 400 });
  if (phone.replace(/\D/g, '').length < 10) return NextResponse.json({ error: 'Escribe un teléfono de 10 dígitos' }, { status: 400 });
  if (typeof body.attending !== 'boolean') return NextResponse.json({ error: 'Indica si podrás asistir' }, { status: 400 });

  await prisma.rsvp.create({ data: { name, phone, guests, attending, message } });
  return NextResponse.json({ ok: true });
}
