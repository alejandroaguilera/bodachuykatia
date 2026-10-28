'use client';
import { useState } from 'react';

export default function Copy({ value, label = 'Copiar', className = 'btn btn-small' }: { value: string; label?: string; className?: string }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); } catch {
      const t = document.createElement('textarea'); t.value = value; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
    }
    setOk(true); setTimeout(() => setOk(false), 1800);
  };
  return <button type="button" className={className} onClick={copy}>{ok ? '¡Copiado!' : label}</button>;
}
