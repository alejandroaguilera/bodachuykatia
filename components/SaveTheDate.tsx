'use client';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { WEDDING_DATE } from '@/lib/info';
import { Reveal } from './Reveal';

const gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent('Boda Katia & Jesús') +
  '&dates=20270130T213000Z/20270131T080000Z&details=' + encodeURIComponent('https://katiayjesus.com') +
  '&location=' + encodeURIComponent('Capilla Santa María del Fuego Nuevo, Monterrey, N.L.');

const ics = 'data:text/calendar;charset=utf-8,' + encodeURIComponent([
  'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//KJ//Boda//ES', 'BEGIN:VEVENT', 'UID:boda-katia-jesus-20270130',
  'DTSTAMP:20261028T000000Z', 'DTSTART:20270130T213000Z', 'DTEND:20270131T080000Z', 'SUMMARY:Boda Katia & Jesús',
  'LOCATION:Capilla Santa María del Fuego Nuevo\\, Monterrey\\, N.L.', 'DESCRIPTION:https://katiayjesus.com',
  'END:VEVENT', 'END:VCALENDAR'].join('\r\n'));

export default function SaveTheDate() {
  const row = useRef<HTMLDivElement>(null);
  const seen = useInView(row, { once: true, amount: 0.6 });

  return (
    <section className="std" id="fecha">
      <div className="std-grain" />
      <Reveal><p className="eyebrow light">Reserva la fecha</p></Reveal>
      <Reveal delay={0.1}><h2 className="std-title script">Save the Date</h2></Reveal>

      <div className="std-after">
        {seen && <Petals />}
        <div className="std-row" ref={row}>
          {([['30', 'sábado', ''], ['Enero', 'invierno', 'sm'], ['2027', 'Monterrey', 'sm']] as const).map(([v, l, c], i) => (
            <motion.div key={v} className="std-circle" initial={{ opacity: 0, scale: 0.8 }} animate={seen ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}>
              <b className={c}>{v}</b><span>{l}</span>
            </motion.div>
          ))}
        </div>
        <Reveal delay={0.3}><p className="std-sub">Guárdala en tu calendario</p></Reveal>
        <Reveal delay={0.4} className="std-actions">
          <a className="btn btn-light" href={gcal} target="_blank" rel="noreferrer">Google Calendar</a>
          <a className="btn btn-ghost-light" href={ics} download="boda-katia-jesus.ics">Apple / Outlook</a>
        </Reveal>
      </div>

      <Countdown />
    </section>
  );
}

function Petals() {
  return (
    <div className="petals" aria-hidden>
      {Array.from({ length: 26 }).map((_, i) => (
        <motion.i key={i} initial={{ y: -40, x: 0, opacity: 0, rotate: 0 }}
          animate={{ y: 520, x: (i % 2 ? 1 : -1) * (30 + (i * 37) % 90), opacity: [0, 1, 1, 0], rotate: 360 + i * 40 }}
          transition={{ duration: 3.4 + (i % 5) * 0.4, delay: (i % 9) * 0.12, ease: 'easeOut' }}
          style={{ left: `${(i * 97) % 100}%` }} />
      ))}
    </div>
  );
}

function Countdown() {
  const target = new Date(WEDDING_DATE).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const diff = Math.max(0, target - (now ?? target));
  const parts = [
    ['Días', Math.floor(diff / 864e5)], ['Horas', Math.floor(diff / 36e5) % 24],
    ['Minutos', Math.floor(diff / 6e4) % 60], ['Segundos', Math.floor(diff / 1e3) % 60],
  ] as const;

  return (
    <div className="cd">
      <Reveal><p className="eyebrow light">Faltan</p></Reveal>
      <div className="cd-row">
        {parts.map(([label, v], i) => (
          <Reveal key={label} delay={i * 0.1} className="cd-unit">
            <div className="cd-num">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={now === null ? '—' : v} initial={{ y: '-60%', opacity: 0, filter: 'blur(4px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} exit={{ y: '60%', opacity: 0, filter: 'blur(4px)' }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                  {now === null ? '—' : String(v).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="cd-label">{label}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
