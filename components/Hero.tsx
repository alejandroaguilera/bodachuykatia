'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.32]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const ampX = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const ampXr = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <section ref={ref} className="hero" id="inicio">
      <motion.div className="hero-media" style={{ scale, y: imgY }}>
        <picture>
          <source media="(max-width: 760px)" srcSet="/photos/encino-800.webp 800w, /photos/encino-1600.webp 1600w" sizes="100vw" />
          <img src="/photos/caminando-1600.webp" srcSet="/photos/caminando-800.webp 800w, /photos/caminando-1600.webp 1600w" sizes="100vw" alt="Katia y Jesús caminando de la mano en el campo" />
        </picture>
      </motion.div>
      <div className="hero-shade" />

      <motion.div className="hero-text" style={{ y: textY, opacity: fade }}>
        <motion.p className="eyebrow light" initial={{ opacity: 0, letterSpacing: '0.8em' }} animate={{ opacity: 1, letterSpacing: '0.42em' }} transition={{ duration: 2, delay: 0.4 }}>
          Nos casamos
        </motion.p>
        <h1 className="hero-names">
          <motion.span style={{ x: ampXr }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}>Katia</motion.span>
          <motion.em className="amp" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, delay: 1.1 }}>&amp;</motion.em>
          <motion.span style={{ x: ampX }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}>Jesús</motion.span>
        </h1>
        <motion.p className="hero-date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 1.6 }}>
          Sábado 30 de enero de 2027 <span>·</span> Monterrey, N.L.
        </motion.p>
      </motion.div>

      <motion.div className="hero-scroll" style={{ opacity: fade }}>
        <span>Desliza</span>
        <i />
      </motion.div>
    </section>
  );
}
