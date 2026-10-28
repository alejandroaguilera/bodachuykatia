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
await sharp(`${src}/UIwgDXFe.jpg`).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 80 }).toFile(`${out}/og.jpg`);
