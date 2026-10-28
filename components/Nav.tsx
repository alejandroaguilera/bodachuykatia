'use client';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';
import { scrollToId, useLenis } from './SmoothScroll';

const links = [
  ['historia', 'Nosotros'], ['fecha', 'La fecha'], ['itinerario', 'Itinerario'],
  ['detalles', 'Detalles'], ['regalos', 'Regalos'], ['hospedaje', 'Hospedaje'],
] as const;

export default function Nav() {
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > window.innerHeight * 0.75));

  const go = (id: string) => { setOpen(false); scrollToId(lenis, id); };

  return (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <header className={`nav ${show || open ? 'on' : ''}`}>
        <button className="nav-mono script" onClick={() => go('inicio')}>K <span className="amp">&amp;</span> J</button>
        <nav className="nav-links">
          {links.map(([id, label]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
        </nav>
        <button className="btn btn-small nav-rsvp" onClick={() => go('rsvp')}>Confirmar</button>
        <button className={`burger ${open ? 'x' : ''}`} aria-label="Menú" onClick={() => setOpen(!open)}><i /><i /></button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="menu" initial={{ clipPath: 'circle(0% at 100% 0%)' }} animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }} transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}>
            {[...links, ['rsvp', 'Confirmar asistencia'] as const].map(([id, label], i) => (
              <motion.button key={id} onClick={() => go(id)} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06 }}>
                {label}
              </motion.button>
            ))}
            <p className="script menu-foot">30 · 01 · 2027</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
