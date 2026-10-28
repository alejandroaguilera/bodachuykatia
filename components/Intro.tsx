'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { parents } from '@/lib/info';
import { Reveal, WordReveal } from './Reveal';
import DrawSvg from './DrawSvg';

export default function Intro({ botanical }: { botanical: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -220]);
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section ref={ref} className="intro" id="historia">
      {botanical[0] && <DrawSvg svg={botanical[0]} className="intro-bot left" />}
      {botanical[1] && <DrawSvg svg={botanical[1]} className="intro-bot right" />}

      <Reveal><p className="eyebrow">Con la bendición de Dios y de nuestros padres</p></Reveal>
      <WordReveal className="intro-lead"
        text="Tenemos el honor de invitarte a celebrar el día en que uniremos nuestras vidas para siempre. Nada nos haría más felices que compartirlo contigo." />

      <div className="intro-photos">
        <motion.figure style={{ y: y1, rotate: rot }} className="ph ph-a">
          <img src="/photos/pasto-800.webp" alt="Katia y Jesús sentados en el pasto" loading="lazy" />
        </motion.figure>
        <motion.figure style={{ y: y2 }} className="ph ph-b">
          <img src="/photos/abrazo-800.webp" alt="Katia y Jesús abrazados" loading="lazy" />
        </motion.figure>
      </div>

      <div className="parents">
        <Reveal className="parents-col">
          <h3 className="script">Padres de la novia</h3>
          {parents.bride.map((p) => <p key={p}>{p}</p>)}
        </Reveal>
        <Reveal className="parents-amp" delay={0.15}><span className="amp">&amp;</span></Reveal>
        <Reveal className="parents-col" delay={0.3}>
          <h3 className="script">Padres del novio</h3>
          {parents.groom.map((p) => <p key={p}>{p}</p>)}
        </Reveal>
      </div>
    </section>
  );
}
