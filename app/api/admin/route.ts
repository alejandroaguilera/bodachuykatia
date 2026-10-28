import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminToken } from '@/lib/admin';

// Login: guarda una cookie con el hash de la contraseña de admin
export async function POST(req: Request) {
  const form = await req.formData();
  const ok = process.env.ADMIN_PASSWORD && form.get('password') === process.env.ADMIN_PASSWORD;
  const res = NextResponse.redirect(new URL('/admin', req.url), 303);
  if (ok) {
    (await cookies()).set('kj_admin', adminToken(), { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 90, path: '/' });
  }
  return res;
}
