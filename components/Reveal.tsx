'use client';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 40, className, as = 'div' }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'p' | 'h2';
}) {
  const M = motion[as];
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: 1.1, delay, ease }}>
      {children}
    </M>
  );
}

// Título que aparece letra por letra
export function SplitTitle({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ staggerChildren: 0.045 }} aria-label={text} style={{ display: 'inline-block' }}>
      {text.split('').map((c, i) => (
        <motion.span key={i} aria-hidden style={{ display: 'inline-block', whiteSpace: 'pre' }}
          variants={{ hidden: { opacity: 0, y: '0.5em', rotate: 4, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' } }}
          transition={{ duration: 0.9, ease }}>
          {c}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Párrafo cuyas palabras se iluminan conforme haces scroll
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

// Imagen ilustrada que se "dibuja" con un barrido de abajo hacia arriba
export function Wipe({ src, alt = '', className }: { src: string; alt?: string; className?: string }) {
  return (
    <motion.img src={src} alt={alt} className={className} loading="lazy"
      initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.2 }} whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 2.2, ease }} />
  );
}
