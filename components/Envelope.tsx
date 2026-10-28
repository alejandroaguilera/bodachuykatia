'use client';
import { useEffect, useState } from 'react';
import { useLenis } from './SmoothScroll';

// Sobre de apertura: el sello se rompe, la solapa se abre y la carta sale
export default function Envelope() {
  const lenis = useLenis();
  const [stage, setStage] = useState(0); // 0 cerrado · 1 sello · 2 solapa · 3 carta · 4 salida · 5 fuera
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('kj-opened')) { setHidden(true); return; }
    document.documentElement.classList.add('locked');
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (hidden) document.documentElement.classList.remove('locked');
    if (stage === 0 && !hidden) lenis?.stop();
    else lenis?.start();
  }, [lenis, stage, hidden]);

  const open = () => {
    if (stage) return;
    setStage(1);
    const steps: [number, number][] = [[2, 450], [3, 1250], [4, 2700], [5, 3700]];
    steps.forEach(([s, t]) => setTimeout(() => setStage(s), t));
    setTimeout(() => { sessionStorage.setItem('kj-opened', '1'); setHidden(true); }, 3800);
    setTimeout(() => document.documentElement.classList.remove('locked'), 2700);
  };

  if (hidden) return null;

  return (
    <div className={`env-overlay s${stage}`} aria-label="Invitación" role="dialog">
      <div className="env-top">
        <p className="eyebrow">Katia &amp; Jesús</p>
        <p className="env-hint script">Tienes una invitación</p>
      </div>

      <div className="env" onClick={open}>
        <div className="env-back" />
        <div className="env-letter">
          <span className="eyebrow">Nos casamos</span>
          <span className="env-letter-names">
            Katia <em className="amp">&amp;</em> Jesús
          </span>
          <span className="env-letter-date">30 · 01 · 2027</span>
          <span className="eyebrow">Monterrey, N.L.</span>
        </div>
        <div className="env-pocket" />
        <div className="env-flap" />
        <button className="env-seal" aria-label="Abrir la invitación" onClick={open}>
          <img src="/art/seal.png" alt="" draggable={false} onError={(e) => (e.currentTarget.style.display = 'none')} />
          <span className="env-seal-fallback script">K&amp;J</span>
        </button>
      </div>

      <button className="env-cta" onClick={open}>
        <span className="pulse" /> Toca el sello para abrir
      </button>
    </div>
  );
}
