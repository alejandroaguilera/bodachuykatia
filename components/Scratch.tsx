'use client';
import { useEffect, useRef, useState } from 'react';

// Círculo de "rasca y descubre" con lámina dorada
export default function Scratch({ children, onReveal, label }: { children: React.ReactNode; onReveal: () => void; label: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = canvas.current!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = c.clientWidth;
    c.width = c.height = size * dpr;
    const ctx = c.getContext('2d')!;
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, size, size);
    g.addColorStop(0, '#d9c19c'); g.addColorStop(0.35, '#f3e4c4'); g.addColorStop(0.55, '#c5a888');
    g.addColorStop(0.8, '#ead6b2'); g.addColorStop(1, '#b8986f');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); ctx.fill();
    // brillo / textura
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.18})`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 1.2, 1.2);
    }
    ctx.fillStyle = 'rgba(101,98,67,.75)';
    ctx.font = `500 ${Math.round(size * 0.075)}px ${getComputedStyle(document.body).fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillText(label.toUpperCase().split('').join(' '), size / 2, size / 2 + size * 0.03);
  }, [label]);

  const pos = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const scratch = (e: React.PointerEvent) => {
    if (!drawing.current || done) return;
    const c = canvas.current!;
    const ctx = c.getContext('2d')!;
    const p = pos(e);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = c.clientWidth * 0.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(last.current?.x ?? p.x, last.current?.y ?? p.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };

  const check = () => {
    drawing.current = false;
    last.current = null;
    if (done) return;
    const c = canvas.current!;
    const data = c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data;
    let clear = 0, total = 0;
    for (let i = 3; i < data.length; i += 64) { total++; if (data[i] < 40) clear++; }
    // el círculo ocupa ~78.5% del cuadrado
    if (clear / total > 0.21 + 0.3) { setDone(true); onReveal(); }
  };

  return (
    <div className={`scratch ${done ? 'done' : ''}`}>
      <div className="scratch-under">{children}</div>
      <canvas ref={canvas}
        onPointerDown={(e) => { drawing.current = true; (e.target as Element).setPointerCapture(e.pointerId); scratch(e); }}
        onPointerMove={scratch} onPointerUp={check} onPointerCancel={check}
        aria-label={`Rasca para descubrir: ${label}`} />
    </div>
  );
}
