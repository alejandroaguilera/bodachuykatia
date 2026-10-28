'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Reveal, SplitTitle } from './Reveal';

function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current!; const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    el.style.setProperty('--gx', `${(x + 0.5) * 100}%`); el.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
  };
  const leave = () => { ref.current!.style.transform = ''; };
  return <div ref={ref} className={`tilt ${className ?? ''}`} onPointerMove={move} onPointerLeave={leave}>{children}</div>;
}

export default function Details() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section ref={ref} className="details" id="detalles">
      <motion.div className="details-bg" style={{ y }}>
        <img src="/photos/cardos-1600.webp" alt="" loading="lazy" />
      </motion.div>
      <div className="section-head">
        <Reveal><p className="eyebrow light">Para que todo sea perfecto</p></Reveal>
        <h2 className="title light"><SplitTitle text="Detalles" /></h2>
      </div>
      <div className="details-row">
        <Reveal delay={0.1}>
          <Tilt className="dcard">
            <svg viewBox="0 0 64 64" className="dcard-icon"><path d="M22 10l10 8 10-8M32 18v6M24 24c-6 4-8 14-6 30h28c2-16 0-26-6-30M32 24v30" /><path d="M14 22l8-12M50 22l-8-12" /></svg>
            <p className="eyebrow">Código de vestimenta</p>
            <h3 className="dcard-title">Formal</h3>
            <p className="dcard-copy">Vístete para una noche de gala bajo las montañas.</p>
          </Tilt>
        </Reveal>
        <Reveal delay={0.25}>
          <Tilt className="dcard">
            <svg viewBox="0 0 64 64" className="dcard-icon"><path d="M22 46c-6-2-10-8-10-14 0-10 8-16 20-16s20 6 20 16c0 6-4 12-10 14" /><path d="M24 30c2-2 4-2 6 0M34 30c2-2 4-2 6 0M26 38c4 3 8 3 12 0M20 54h24" /></svg>
            <p className="eyebrow">Celebración</p>
            <h3 className="dcard-title">Solo adultos</h3>
            <p className="dcard-copy">Con mucho cariño, les pedimos que esta noche sea solo para adultos. ¡No niños!</p>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}
