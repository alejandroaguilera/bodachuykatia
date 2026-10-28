import { readFile } from 'fs/promises';
import path from 'path';
import SmoothScroll from '@/components/SmoothScroll';
import Envelope from '@/components/Envelope';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import SaveTheDate from '@/components/SaveTheDate';
import Gallery from '@/components/Gallery';
import Itinerary from '@/components/Itinerary';
import Details from '@/components/Details';
import Gifts from '@/components/Gifts';
import Hotels from '@/components/Hotels';
import Rsvp from '@/components/Rsvp';
import Footer from '@/components/Footer';

// Lee un SVG de /public/art para poder animar sus trazos inline
async function art(name: string) {
  try {
    const svg = await readFile(path.join(process.cwd(), 'public/art', name), 'utf8');
    return svg.replace(/<\?xml[^>]*>/, '').replace(/<!DOCTYPE[^>]*>/i, '');
  } catch {
    return '';
  }
}

export default async function Home() {
  const [b1, b2, b3, mountains] = await Promise.all(['botanical-1.svg', 'botanical-2.svg', 'botanical-3.svg', 'mountains.svg'].map(art));
  return (
    <SmoothScroll>
      <Envelope />
      <Nav />
      <main>
        <Hero />
        <Intro botanical={[b1, b2]} />
        <SaveTheDate />
        <Gallery />
        <Itinerary />
        <Details />
        <Gifts botanical={b3} />
        <Hotels />
        <Rsvp />
      </main>
      <Footer mountains={mountains} />
    </SmoothScroll>
  );
}
