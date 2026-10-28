'use client';
import { useEffect, useRef } from 'react';

// Inserta un SVG de arte lineal y dibuja sus trazos cuando entra en pantalla
export default function DrawSvg({ svg, className }: { svg: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const shapes = el.querySelectorAll<SVGGeometryElement>('path, line, polyline, circle, ellipse');
    shapes.forEach((p) => {
      const len = typeof p.getTotalLength === 'function' ? p.getTotalLength() : 0;
      if (!len) return;
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      shapes.forEach((p, i) => {
        p.style.transition = `stroke-dashoffset ${2.4 + (i % 5) * 0.3}s cubic-bezier(.4,0,.2,1) ${Math.min(i * 0.04, 1.6)}s`;
        p.style.strokeDashoffset = '0';
      });
      io.disconnect();
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [svg]);

  return <div ref={ref} className={`draw ${className ?? ''}`} aria-hidden dangerouslySetInnerHTML={{ __html: svg }} />;
}
