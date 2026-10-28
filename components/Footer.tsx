'use client';
import { useEffect, useRef } from 'react';
import { Reveal } from './Reveal';

export default function Footer({ mountains }: { mountains?: string }) {
  const ref = useRef<HTMLElement>(null);

  // Parallax por capas de la cordillera
  useEffect(() => {
    const el = ref.current;
    if (!el || !mountains) return;
    const layers = [1, 2, 3].map((n) => el.querySelector<SVGGElement>(`#layer${n}`));
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, 1 - r.top / window.innerHeight));
      layers.forEach((l, i) => { if (l) l.style.transform = `translateY(${(1 - p) * (i + 1) * 40}px)`; });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mountains]);

  return (
    <footer ref={ref} className="foot">
      <Reveal><p className="foot-mono script">K <span className="amp">&amp;</span> J</p></Reveal>
      <Reveal delay={0.1}><p className="foot-date">30 · 01 · 2027</p></Reveal>
      <Reveal delay={0.2}><p className="eyebrow">Monterrey, Nuevo León</p></Reveal>
      {mountains && <div className="foot-mtn" aria-hidden dangerouslySetInnerHTML={{ __html: mountains }} />}
    </footer>
  );
}
