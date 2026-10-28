'use client';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { useRef, useState } from 'react';
import { events } from '@/lib/info';
import { Reveal, SplitTitle } from './Reveal';

const icons: Record<string, React.ReactNode> = {
  ceremonia: (
    <svg viewBox="0 0 64 64"><circle cx="25" cy="38" r="14" /><circle cx="39" cy="38" r="14" /><path d="M32 12l4 6h-8zM28 18l4 6 4-6" /></svg>
  ),
  coctel: (
    <svg viewBox="0 0 64 64"><path d="M14 10h18l-2 16a7 7 0 01-14 0zM23 33v18M16 52h14M34 14h18l-2 14a7 7 0 01-14 0zM43 35v16M36 52h14" /><path d="M30 6l4 4M36 6l-2 4" /></svg>
  ),
  recepcion: (
    <svg viewBox="0 0 64 64"><path d="M8 44h48M12 44a20 20 0 0140 0M32 20v4M29 18h6" /><path d="M6 50h52" /><path d="M40 28c4 2 6 6 7 10" /></svg>
  ),
};

export default function Itinerary() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });

  return (
    <section className="itin" id="itinerario">
      <div className="section-head">
        <Reveal><p className="eyebrow">El gran día</p></Reveal>
        <h2 className="title"><SplitTitle text="Itinerario" /></h2>
        <Reveal delay={0.2}><p className="lede">Sábado 30 de enero de 2027</p></Reveal>
      </div>

      <div className="itin-list" ref={ref}>
        <div className="itin-line"><motion.i style={{ scaleY: scrollYProgress }} /></div>
        {events.map((e, i) => <Event key={e.key} e={e} i={i} />)}
      </div>
    </section>
  );
}

function Event({ e, i }: { e: (typeof events)[number]; i: number }) {
  const [map, setMap] = useState(false);
  return (
    <div className={`itin-item ${i % 2 ? 'rev' : ''}`}>
      <Reveal className="itin-art" y={60}>
        <picture>
          <source srcSet={`${e.art}.webp`} type="image/webp" />
          <img src={`${e.art}.png`} alt={`Ilustración de ${e.place}`} loading="lazy" />
        </picture>
      </Reveal>
      <motion.span className="itin-dot" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: '-30% 0px' }} transition={{ type: 'spring', stiffness: 200, damping: 14 }} />
      <Reveal className="itin-card" delay={0.15}>
        <div className="itin-icon">{icons[e.key]}</div>
        <p className="itin-time">{e.time}<small>{e.ampm}</small></p>
        <h3 className="itin-title script">{e.title}</h3>
        <p className="itin-place">{e.place}</p>
        <p className="itin-addr">{e.address}</p>
        <div className="itin-btns">
          <a className="btn" href={e.map} target="_blank" rel="noreferrer">Cómo llegar</a>
          <button className="btn btn-ghost" onClick={() => setMap(!map)}>{map ? 'Ocultar mapa' : 'Ver mapa'}</button>
        </div>
        <AnimatePresence>
          {map && (
            <motion.div className="itin-map" initial={{ height: 0, opacity: 0 }} animate={{ height: 260, opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <iframe src={e.embed} loading="lazy" title={`Mapa de ${e.place}`} referrerPolicy="no-referrer-when-downgrade" />
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </div>
  );
}
