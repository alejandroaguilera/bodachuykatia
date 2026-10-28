'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const photos = [
  { src: 'beso', alt: 'Katia y Jesús a punto de besarse', shape: 'tall' },
  { src: 'caminando', alt: 'Caminando de la mano en el campo', shape: 'wide' },
  { src: 'cardos', alt: 'Abrazados entre cardos silvestres', shape: 'tall' },
  { src: 'movimiento', alt: 'Riendo juntos en movimiento', shape: 'tall' },
  { src: 'encino', alt: 'Bajo un encino frente a la sierra', shape: 'tall' },
  { src: 'pasto', alt: 'Sentados en el pasto con la montaña detrás', shape: 'tall' },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const measure = () => setDist(Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth));
    measure();
    window.addEventListener('resize', measure);
    const t = setTimeout(measure, 800);
    return () => { window.removeEventListener('resize', measure); clearTimeout(t); };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bgX = useTransform(scrollYProgress, [0, 1], ['10%', '-60%']);

  return (
    <section ref={ref} className="gal" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="gal-sticky">
        <motion.p className="gal-bg script" style={{ x: bgX }} aria-hidden>Katia <span className="amp">&amp;</span> Jesús</motion.p>
        <motion.div ref={track} className="gal-track" style={{ x }}>
          <div className="gal-intro">
            <p className="eyebrow">Capítulo uno</p>
            <h2 className="title">Nuestra <em className="script">historia</em></h2>
            <p className="gal-copy">Entre encinos, montañas y risas, encontramos el lugar donde queremos quedarnos: el uno con el otro.</p>
          </div>
          {photos.map((p, i) => (
            <figure key={p.src} className={`gal-item ${p.shape}`} style={{ marginTop: i % 2 ? '8vh' : '-6vh' }}>
              <img src={`/photos/${p.src}-1600.webp`} srcSet={`/photos/${p.src}-800.webp 800w, /photos/${p.src}-1600.webp 1600w`} sizes="(max-width: 760px) 80vw, 40vw" alt={p.alt} loading="lazy" />
              <figcaption>{String(i + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</figcaption>
            </figure>
          ))}
          <div className="gal-end script">y lo que falta…</div>
        </motion.div>
      </div>
    </section>
  );
}
