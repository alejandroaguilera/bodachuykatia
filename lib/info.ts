// Fecha de la ceremonia en hora de Monterrey (UTC-6)
export const WEDDING_DATE = '2027-01-30T15:30:00-06:00';

export const couple = { bride: 'Katia', groom: 'Jesús', brideFull: 'Katia Lacavex Caballero', groomFull: 'Jesús Cavazos' };

export const parents = {
  groom: ['Luis Cavazos', 'Lorena Muñoz'],
  bride: ['Ricardo Lacavex', 'Patricia Caballero'],
};

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const embed = (q: string) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

const chapel = 'Capilla Santa María del Fuego Nuevo, Antiguo Camino a Villa de Santiago 1011, El Encino, Monterrey, N.L.';
const aura = 'Casa Aura, Paseo del Acueducto, Lomas de Valle Alto, Monterrey, N.L.';

export const events = [
  {
    key: 'ceremonia', time: '3:30', ampm: 'P.M.', title: 'Ceremonia religiosa', place: 'Capilla Santa María del Fuego Nuevo',
    address: 'Antiguo Camino a Villa de Santiago 1011, El Encino, 64986 Monterrey, N.L.',
    map: maps(chapel), embed: embed(chapel), art: '/art/capilla',
  },
  {
    key: 'coctel', time: '5:00', ampm: 'P.M.', title: 'Cóctel', place: 'Casa Aura',
    address: 'P.º del Acueducto, Lomas de Valle Alto, 64989 Monterrey, N.L.',
    map: maps(aura), embed: embed(aura), art: '/art/casa-aura',
  },
  {
    key: 'recepcion', time: '6:30', ampm: 'P.M.', title: 'Recepción', place: 'Casa Aura',
    address: 'P.º del Acueducto, Lomas de Valle Alto, 64989 Monterrey, N.L.',
    map: maps(aura), embed: embed(aura), art: '/art/casa-aura',
  },
];

export const registries = [
  { name: 'Target', note: 'Mesa de regalos', url: 'https://www.target.com/gift-registry/gift/katia-jesus' },
  { name: 'Amazon México', note: 'Mesa de regalos', url: 'https://link.amazon/B0eRRyfH6' },
];

export const accounts = [
  { bank: 'Banregio', holder: 'Katia Lacavex Caballero', clabe: '058580599859400151' },
  { bank: 'Banregio', holder: 'Jesús Cavazos', clabe: '058580000012632831' },
];

export const hotels = {
  code: '0E58',
  validity: 'Del 28 de enero al 1 de febrero de 2027',
  email: 'reservaciones5@safihotel.com',
  phone: '8181007000',
  phoneLabel: '81 8100 7000 · Opción 1',
  whatsapp: '528119749306',
  whatsappLabel: '+52 81 1974 9306',
  list: [
    { name: 'Safi Metropolitan', price: '$3,250', extra: 'Persona extra $500 MXN + imp.' },
    { name: 'Safi Valle', price: '$2,250', extra: 'Persona extra $400 MXN + imp.' },
  ],
};
