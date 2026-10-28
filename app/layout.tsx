import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Pinyon_Script, Jost } from 'next/font/google';
import './globals.css';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600'], style: ['normal', 'italic'], variable: '--f-serif' });
const script = Pinyon_Script({ subsets: ['latin'], weight: '400', variable: '--f-script' });
const sans = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--f-sans' });

export const metadata: Metadata = {
  metadataBase: new URL('https://bodachuykatia.mrhapps.mx'),
  title: 'Katia & Jesús · 30.01.2027',
  description: 'Nos casamos. Acompáñanos el 30 de enero de 2027 en Monterrey, N.L.',
  openGraph: {
    title: 'Katia & Jesús · Nos casamos',
    description: '30 de enero de 2027 · Monterrey, N.L. Confirma tu asistencia.',
    images: [{ url: '/photos/og.jpg', width: 1200, height: 630 }],
    locale: 'es_MX',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#F1E8D5' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${script.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
