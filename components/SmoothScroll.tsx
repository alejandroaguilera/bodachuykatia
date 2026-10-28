'use client';
import Lenis from 'lenis';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const Ctx = createContext<Lenis | null>(null);
export const useLenis = () => useContext(Ctx);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const raf = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const l = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenis(l);
    const loop = (t: number) => { l.raf(t); raf.current = requestAnimationFrame(loop); };
    raf.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf.current); l.destroy(); };
  }, []);

  return <Ctx.Provider value={lenis}>{children}</Ctx.Provider>;
}

// Scroll suave a un ancla, con o sin Lenis
export function scrollToId(lenis: Lenis | null, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.6 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
