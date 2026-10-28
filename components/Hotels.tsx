'use client';
import { hotels } from '@/lib/info';
import Copy from './Copy';
import { Reveal, SplitTitle } from './Reveal';

export default function Hotels() {
  return (
    <section className="hotels" id="hospedaje">
      <div className="section-head">
        <Reveal><p className="eyebrow">¿Vienes de fuera?</p></Reveal>
        <h2 className="title"><SplitTitle text="Hospedaje" /></h2>
        <Reveal delay={0.2}><p className="lede">Tenemos tarifa especial en Safi Royal Luxury Hotels · {hotels.validity}.</p></Reveal>
      </div>

      <div className="hotels-row">
        {hotels.list.map((h, i) => (
          <Reveal key={h.name} delay={i * 0.12} className="hotel">
            <p className="eyebrow">Tarifa especial</p>
            <h3 className="hotel-name">{h.name}</h3>
            <p className="hotel-price">{h.price}<small> MXN + imp.</small></p>
            <p className="hotel-note">Habitación estándar por noche · 1 o 2 personas</p>
            <p className="hotel-note">{h.extra}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="hotel-code">
        <div>
          <p className="eyebrow">Clave de convenio</p>
          <p className="hotel-code-v">{hotels.code}</p>
        </div>
        <Copy value={hotels.code} label="Copiar clave" />
      </Reveal>

      <Reveal className="hotel-contact">
        <p>Hoteles 5 estrellas con conexión directa a Metropolitan Center · Room service 24 h · Estacionamiento de cortesía. Pregunta por tarifas especiales en suites.</p>
        <div className="hotel-btns">
          <a className="btn" href={`https://wa.me/${hotels.whatsapp}?text=${encodeURIComponent(`Hola, quiero reservar con la tarifa convenio de la boda Katia & Jesús (clave ${hotels.code}).`)}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="btn btn-ghost" href={`tel:+52${hotels.phone}`}>{hotels.phoneLabel}</a>
          <a className="btn btn-ghost" href={`mailto:${hotels.email}?subject=${encodeURIComponent(`Reservación boda Katia & Jesús · Clave ${hotels.code}`)}`}>{hotels.email}</a>
        </div>
      </Reveal>
    </section>
  );
}
