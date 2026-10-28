'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { accounts, registries } from '@/lib/info';
import Copy from './Copy';
import { Reveal, SplitTitle } from './Reveal';

export default function Gifts({ botanical }: { botanical?: string }) {
  return (
    <section className="gifts" id="regalos">
      <div className="section-head">
        <Reveal><p className="eyebrow">Mesa de regalos</p></Reveal>
        <h2 className="title"><SplitTitle text="Con amor" /></h2>
        <Reveal delay={0.2}><p className="lede">Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, aquí te dejamos algunas opciones.</p></Reveal>
      </div>

      <div className="gifts-reg">
        {registries.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.12}>
            <a className="reg" href={r.url} target="_blank" rel="noreferrer">
              <span className="eyebrow">{r.note}</span>
              <span className="reg-name">{r.name}</span>
              <span className="reg-go">Ver mesa <i>→</i></span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal><p className="gifts-or script">o si prefieres, en un sobre…</p></Reveal>
      <div className="gifts-acc">
        {accounts.map((a, i) => <Reveal key={a.clabe} delay={i * 0.12}><MiniEnvelope a={a} /></Reveal>)}
      </div>
      {botanical && <div className="gifts-bot" aria-hidden dangerouslySetInnerHTML={{ __html: botanical }} />}
    </section>
  );
}

function MiniEnvelope({ a }: { a: (typeof accounts)[number] }) {
  const [open, setOpen] = useState(false);
  const pretty = a.clabe.replace(/(\d{3})(\d{3})(\d{11})(\d)/, '$1 $2 $3 $4');
  return (
    <div className={`menv ${open ? 'open' : ''}`}>
      <button className="menv-shell" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="menv-flap" />
        <span className="menv-front">
          <span className="eyebrow">Transferencia · {a.bank}</span>
          <span className="menv-name">{a.holder}</span>
          <span className="menv-hint">{open ? 'Cerrar' : 'Toca para abrir'}</span>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="menv-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="eyebrow">CLABE interbancaria</span>
            <span className="menv-clabe">{pretty}</span>
            <span className="menv-meta">{a.bank} · {a.holder}</span>
            <Copy value={a.clabe} label="Copiar CLABE" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
