'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Reveal, SplitTitle } from './Reveal';

type State = 'idle' | 'sending' | 'done';

export default function Rsvp() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [state, setState] = useState<State>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (name.trim().length < 3) return setError('Escribe tu nombre completo.');
    if (phone.replace(/\D/g, '').length < 10) return setError('Escribe un teléfono de 10 dígitos.');
    if (attending === null) return setError('Cuéntanos si podrás acompañarnos.');
    setState('sending');
    try {
      const res = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, guests, attending, message }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No pudimos guardar tu respuesta.');
      setState('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo salió mal, intenta de nuevo.');
      setState('idle');
    }
  };

  return (
    <section className="rsvp" id="rsvp">
      <div className="rsvp-bg"><img src="/photos/beso-1600.webp" alt="" loading="lazy" /></div>
      <div className="rsvp-inner">
        <div className="section-head">
          <Reveal><p className="eyebrow light">R · S · V · P</p></Reveal>
          <h2 className="title light"><SplitTitle text="¿Nos acompañas?" /></h2>
          <Reveal delay={0.2}><p className="lede light">Por favor ayúdanos confirmando tu asistencia. Esta celebración es solo para adultos.</p></Reveal>
        </div>

        <AnimatePresence mode="wait">
          {state !== 'done' ? (
            <motion.form key="form" className="rsvp-form" onSubmit={submit} exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }} transition={{ duration: 0.5 }}>
              <Reveal>
                <label className="field">
                  <span>Nombre completo</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Como aparece en tu invitación" maxLength={120} />
                </label>
              </Reveal>
              <Reveal delay={0.05}>
                <label className="field">
                  <span>Teléfono</span>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="81 1234 5678" maxLength={20} />
                </label>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="field-label">Confirmación de asistencia</p>
                <div className="choice">
                  <button type="button" className={attending === true ? 'on' : ''} onClick={() => setAttending(true)}>
                    <i>✓</i> Asistiré
                  </button>
                  <button type="button" className={attending === false ? 'on' : ''} onClick={() => setAttending(false)}>
                    No podré asistir
                  </button>
                </div>
              </Reveal>

              <AnimatePresence>
                {attending && (
                  <motion.div className="stepper-wrap" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45 }}>
                    <p className="field-label">¿Cuántas personas asistirán, incluyéndote?</p>
                    <div className="stepper">
                      <button type="button" aria-label="Menos" onClick={() => setGuests(Math.max(1, guests - 1))} disabled={guests <= 1}>−</button>
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.b key={guests} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}>{guests}</motion.b>
                      </AnimatePresence>
                      <button type="button" aria-label="Más" onClick={() => setGuests(Math.min(10, guests + 1))} disabled={guests >= 10}>+</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Reveal delay={0.15}>
                <label className="field">
                  <span>Mensaje para los novios <em>(opcional)</em></span>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} maxLength={1000} placeholder="Unas palabras de cariño…" />
                </label>
              </Reveal>

              {error && <motion.p className="rsvp-error" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: [8, -6, 4, 0] }}>{error}</motion.p>}

              <button className="btn btn-light btn-block" disabled={state === 'sending'}>
                {state === 'sending' ? 'Enviando…' : 'Enviar confirmación'}
              </button>
            </motion.form>
          ) : (
            <motion.div key="done" className="rsvp-done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div className="rsvp-seal" initial={{ scale: 2.4, opacity: 0, rotate: -25 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ delay: 0.3, type: 'spring', stiffness: 160, damping: 12 }}>
                <img src="/art/seal.png" alt="" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </motion.div>
              <h3 className="script">{attending ? '¡Gracias!' : 'Te extrañaremos'}</h3>
              <p>
                {attending
                  ? `${name.split(' ')[0]}, recibimos tu confirmación para ${guests} ${guests === 1 ? 'persona' : 'personas'}. ¡Nos vemos el 30 de enero!`
                  : `${name.split(' ')[0]}, gracias por avisarnos. Te llevaremos en el corazón ese día.`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
