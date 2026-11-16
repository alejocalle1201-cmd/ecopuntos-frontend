import { useEffect, useState } from 'react';
import api from '../api';

export default function Entregas() {
  // ----- MEMORIA DEL COMPONENTE -----
  const [entregas, setEntregas] = useState([]); // Lista de entregas desde Django
  const [puntos, setPuntos] = useState([]);     // Lista de puntos para el selector (ForeignKey)
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // ----- TRAER ENTREGAS Y PUNTOS (GET) -----
  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError('');
      const [resEntregas, resPuntos] = await Promise.all([
        api.get('entregas/'),
        api.get('puntos/'),
      ]);
      setEntregas(Array.isArray(resEntregas.data) ? resEntregas.data : resEntregas.data.results);
      setPuntos(Array.isArray(resPuntos.data) ? resPuntos.data : resPuntos.data.results);
    } catch (err) {
      setError('No se pudieron cargar las entregas. Verifica que el servidor Django esté encendido.');
    } finally {
      setCargando(false);
    }
  };

  // Se ejecuta una vez cuando se abre la pantalla de Entregas
  useEffect(() => {
    cargarDatos();
  }, []);

  // ----- LO QUE SE VE EN PANTALLA -----
  return (
    <section>
      <div className="page__head">
        <h1>Entregas de reciclaje</h1>
      </div>

      {cargando && <p className="empty">Cargando entregas...</p>}
      {error && <p className="empty" style={{ color: '#c0392b' }}>{error}</p>}

      {!cargando && !error && entregas.length === 0 && (
        <p className="empty">Aún no hay entregas registradas.</p>
      )}

      <ul className="list">
        {entregas.map((ent) => (
          <li key={ent.id} className="row">
            <div className="row__text">
              <strong>{ent.material} — {ent.peso_kg} kg</strong>
              <span>
                Punto: {ent.punto_acopio_nombre || `ID #${ent.punto_acopio}`} | Fecha: {ent.fecha}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}