import { NextRequest, NextResponse } from 'next/server';

// www.katiayjesus.com → katiayjesus.com
export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  if (host.startsWith('www.')) {
    return NextResponse.redirect(`https://${host.slice(4)}${req.nextUrl.pathname}${req.nextUrl.search}`, 308);
  }
}
