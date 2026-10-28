'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { WEDDING_DATE } from '@/lib/info';
import Scratch from './Scratch';
import { Reveal } from './Reveal';

const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const OFFSET = 4; // el 1 de enero de 2027 es viernes

const gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent('Boda Katia & Jesús') +
  '&dates=20270130T213000Z/20270131T080000Z&details=' + encodeURIComponent('https://bodachuykatia.mrhapps.mx') +
  '&location=' + encodeURIComponent('Capilla Santa María del Fuego Nuevo, Monterrey, N.L.');

const ics = 'data:text/calendar;charset=utf-8,' + encodeURIComponent([
  'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//KJ//Boda//ES', 'BEGIN:VEVENT', 'UID:boda-katia-jesus-20270130',
  'DTSTAMP:20261028T000000Z', 'DTSTART:20270130T213000Z', 'DTEND:20270131T080000Z', 'SUMMARY:Boda Katia & Jesús',
  'LOCATION:Capilla Santa María del Fuego Nuevo\\, Monterrey\\, N.L.', 'DESCRIPTION:https://bodachuykatia.mrhapps.mx',
  'END:VEVENT', 'END:VCALENDAR'].join('\r\n'));

export default function SaveTheDate() {
  const [found, setFound] = useState(0);
  const all = found >= 3;
  const reveal = () => setFound((n) => n + 1);

  return (
    <section className="std" id="fecha">
      <div className="std-grain" />
      <Reveal><p className="eyebrow light">Reserva la fecha</p></Reveal>
      <Reveal delay={0.1}><h2 className="std-title script">Save the Date</h2></Reveal>
      <Reveal delay={0.2}><p className="std-sub">Rasca los tres círculos para descubrir el día</p></Reveal>

      <div className="std-row">
        <Scratch label="día" onReveal={reveal}><b>30</b><span>sábado</span></Scratch>
        <Scratch label="mes" onReveal={reveal}><b className="sm">Enero</b><span>invierno</span></Scratch>
        <Scratch label="año" onReveal={reveal}><b className="sm">2027</b><span>Monterrey</span></Scratch>
      </div>

      <AnimatePresence>
        {all && (
          <motion.div className="std-after" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <Petals />
            <div className="cal">
              <p className="cal-head"><span className="script">Enero</span> 2027</p>
              <div className="cal-grid">
                {days.map((d, i) => <span key={i} className="cal-dow">{d}</span>)}
                {Array.from({ length: OFFSET }).map((_, i) => <span key={`e${i}`} />)}
                {Array.from({ length: 31 }).map((_, i) => (
                  <span key={i} className={`cal-day ${i === 29 ? 'is' : ''}`}>
                    {i + 1}
                    {i === 29 && (
                      <svg viewBox="0 0 60 60" className="cal-ring"><motion.path d="M30 6c14 0 25 10 24 23-1 14-12 25-26 24C15 52 5 42 6 29 7 16 18 5 33 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.8 }} /></svg>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className="std-actions">
              <a className="btn btn-light" href={gcal} target="_blank" rel="noreferrer">Google Calendar</a>
              <a className="btn btn-ghost-light" href={ics} download="boda-katia-jesus.ics">Apple / Outlook</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!all && found > 0 && <p className="std-count">{found} de 3</p>}

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
