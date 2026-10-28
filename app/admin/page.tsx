import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/admin';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Confirmaciones · Katia & Jesús', robots: { index: false } };

export default async function Admin() {
  if (!(await isAdmin())) {
    return (
      <main className="admin">
        <h1>Confirmaciones</h1>
        <form method="post" action="/api/admin" className="admin-login">
          <input type="password" name="password" placeholder="Contraseña" autoFocus required />
          <button type="submit">Entrar</button>
        </form>
      </main>
    );
  }

  const rows = await prisma.rsvp.findMany({ orderBy: { createdAt: 'desc' } });
  const yes = rows.filter((r) => r.attending);
  const people = yes.reduce((n, r) => n + r.guests, 0);

  return (
    <main className="admin">
      <h1>Confirmaciones</h1>
      <div className="admin-stats">
        <div><b>{people}</b><span>personas confirmadas</span></div>
        <div><b>{yes.length}</b><span>respuestas “asistiré”</span></div>
        <div><b>{rows.length - yes.length}</b><span>no podrán asistir</span></div>
      </div>
      <a className="admin-csv" href="/api/rsvp/export">Descargar CSV</a>
      <div className="admin-table">
        <table>
          <thead><tr><th>Nombre</th><th>Asiste</th><th>Personas</th><th>Teléfono</th><th>Mensaje</th><th>Fecha</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.attending ? 'Sí' : 'No'}</td>
                <td>{r.guests}</td>
                <td><a href={`tel:${r.phone}`}>{r.phone}</a></td>
                <td>{r.message}</td>
                <td>{r.createdAt.toLocaleString('es-MX', { timeZone: 'America/Monterrey', dateStyle: 'short', timeStyle: 'short' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
