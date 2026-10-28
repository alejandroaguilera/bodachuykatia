import sharp from 'sharp';
const src = process.argv[2], out = process.argv[3];
const map = {
  'IMG_3127.JPG':'caminando', 'IMG_3160.JPG':'abrazo', 'IMG_3243.JPG':'cardos',
  'IMG_3253.JPG':'pasto', 'IMG_3291.JPG':'movimiento', 'IMG_3301.JPG':'beso', 'UIwgDXFe.jpg':'encino'
};
for (const [f, n] of Object.entries(map)) {
  for (const w of [800, 1600]) {
    await sharp(`${src}/${f}`).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(`${out}/${n}-${w}.webp`);
  }
}
// OG: IMG_3253, recorte manual con las caras centradas (top 16%)
await sharp(`${src}/IMG_3253.JPG`).rotate().extract({ left: 0, top: 328, width: 1366, height: 717 }).resize(1200, 630).jpeg({ quality: 80 }).toFile(`${out}/og-pareja.jpg`);
