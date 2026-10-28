# Arte · Katia & Jesús

Assets para la boda del 30 de enero de 2027, Monterrey, N.L.

## Entrega

| Archivo | Dimensiones | Uso |
| --- | --- | --- |
| seal.png / seal.webp | 800 × 800 | Lacre oliva, monograma K & J, canal alfa transparente. |
| capilla.png / capilla.webp | 1000 × 1250 | Acuarela de capilla moderna de piedra, encinos y sierra. |
| casa-aura.png / casa-aura.webp | 1000 × 1250 | Acuarela de terrazas, recepción de jardín y luces colgantes. |
| botanical-1.svg | 400 × 800 | Olivo con hojas lanceoladas y frutos. |
| botanical-2.svg | 400 × 800 | Dos ramillas de eucalipto. |
| botanical-3.svg | 440 × 800 | Flores silvestres y cardo. |
| mountains.svg | 1600 × 600 | Sierra en tres capas para parallax. |
| paper.png / paper.webp | 512 × 512 | Papel algodón crema repetible. |

Todos los PNG pesan menos de 600 KB. Las versiones WebP de las acuarelas conservan más gradaciones de pigmento que los PNG indexados. Las acuarelas son interpretaciones de los espacios descritos, no reproducciones documentales de su arquitectura.

## Integración

- Paleta de dirección: #656243, #A0A559, #F1E8D5, #D5C6AC, #C5A888. Los raster incluyen variaciones tonales de luz y pigmento; los SVG usan los valores hex exactos.
- Botánicos sin rellenos: todos los elementos visibles son paths con stroke y `pathLength="1"`. Para dibujarlos, animar cada path de `stroke-dasharray: 1; stroke-dashoffset: 1` a `stroke-dashoffset: 0`. Insertar el SVG inline para acceder a los paths. Respetar prefers-reduced-motion.
- mountains.svg: `layer1` = plano lejano arena, `layer2` = plano medio oliva, `layer3` = primer plano oliva oscuro. Insertar inline para transformar cada grupo.
- Papel: repetir a tamaño nativo con `background-size: 512px 512px; background-repeat: repeat` sobre #F1E8D5. PNG y WebP sin pérdida comparten píxeles opuestos idénticos para evitar costuras.
- Sello: conservar alfa; no añadir fondo a la imagen.

## Generación y prompts de dirección

Se utilizó la herramienta integrada image_gen para los cuatro raster; SVG dibujados a mano con curvas Bézier. Preparación y optimización con Sharp.

1. Sello: vista frontal de lacre oliva #656243, bordes orgánicos irregulares, brillo satinado discreto, doble círculo y monograma serif exacto “K & J”, fondo verdaderamente transparente.
2. Capilla: ilustración editorial de acuarela y tinta oliva, capilla contemporánea de piedra entre encinos y Sierra Madre, pigmentos de la paleta de boda, sin personas ni texto, composición 4:5, bordes disueltos en crema.
3. Casa Aura: acuarela y tinta a juego con la capilla, jardín de recepción escalonado en Valle Alto con muros de piedra, mesas, encinos, luces colgantes y montañas; sin personas ni texto, paleta restringida y bordes suaves sobre crema.
4. Papel: textura uniforme de algodón crema #F1E8D5, grano y fibras muy sutiles, iluminación plana, sin objetos ni viñeta, repetible. Preparación final: normalización suave de crema y conciliación de píxeles opuestos; repetición verificada.

Se inspeccionaron visualmente los raster finales, los botánicos, la cordillera y un mosaico 2 × 2 del papel. No se modificaron archivos fuera de public/art/.
