import { useEffect, useState } from 'react';
import api from '../api';

export default function Entregas() {
  // ----- MEMORIA DEL COMPONENTE -----
  const [entregas, setEntregas] = useState([]);          // Lista de entregas desde Django
  const [puntos, setPuntos] = useState([]);              // Lista de puntos para el selector (ForeignKey)
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Estados del formulario
  const [mostrarForm, setMostrarForm] = useState(false); // ¿Se muestra el formulario?
  const [editandoId, setEditandoId] = useState(null);    // null = creando, número = editando
  const [puntoAcopio, setPuntoAcopio] = useState('');    // ID del punto seleccionado (ForeignKey)
  const [material, setMaterial] = useState('');          // Tipo de material reciclado
  const [pesoKg, setPesoKg] = useState('');              // Peso en kilogramos

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

  useEffect(() => {
    cargarDatos();
  }, []);

  // ----- ABRIR FORMULARIO PARA CREAR -----
  const nuevaEntrega = () => {
    setEditandoId(null);
    setPuntoAcopio(puntos.length > 0 ? String(puntos[0].id) : '');
    setMaterial('');
    setPesoKg('');
    setMostrarForm(true);
  };

  // ----- ABRIR FORMULARIO PARA EDITAR -----
  const editarEntrega = (entrega) => {
    setEditandoId(entrega.id);
    setPuntoAcopio(String(entrega.punto_acopio));
    setMaterial(entrega.material);
    setPesoKg(String(entrega.peso_kg));
    setMostrarForm(true);
  };

  // ----- GUARDAR ENTREGA (POST o PUT) -----
  const guardar = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const datos = {
        punto_acopio: Number(puntoAcopio),
        material,
        peso_kg: parseFloat(pesoKg),
      };

      if (editandoId) {
        await api.put(`entregas/${editandoId}/`, datos);
      } else {
        await api.post('entregas/', datos);
      }

      setMostrarForm(false);
      cargarDatos();
    } catch (err) {
      setError('Error al guardar la entrega. Revisa que hayas seleccionado un punto de acopio válido.');
    }
  };

  // ----- ELIMINAR ENTREGA (DELETE) -----
  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta entrega?')) return;
    try {
      setError('');
      await api.delete(`entregas/${id}/`);
      cargarDatos();
    } catch (err) {
      setError('No se pudo eliminar la entrega.');
    }
  };

  // ----- LO QUE SE VE EN PANTALLA -----
  return (
    <section>
      <div className="page__head">
        <h1>Entregas de reciclaje</h1>
        <button className="btn btn--primary" onClick={nuevaEntrega}>
          Nueva entrega
        </button>
      </div>

      {error && <p className="empty" style={{ color: '#c0392b' }}>{error}</p>}

      {mostrarForm && (
        <form className="card" onSubmit={guardar}>
          <h2>{editandoId ? 'Editar entrega' : 'Nueva entrega'}</h2>

          <div className="field">
            <label>Punto de acopio</label>
            <select
              value={puntoAcopio}
              onChange={(e) => setPuntoAcopio(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '1rem',
              }}
            >
              <option value="">-- Selecciona un punto de acopio --</option>
              {puntos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} ({p.direccion})
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Material</label>
            <input
              placeholder="Ej: Cartón, Plástico PET, Vidrio..."
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Peso (kg)</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              placeholder="Ej: 5.5"
              value={pesoKg}
              onChange={(e) => setPesoKg(e.target.value)}
              required
            />
          </div>

          <div className="form__actions">
            <button type="button" className="btn" onClick={() => setMostrarForm(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary">
              Guardar
            </button>
          </div>
        </form>
      )}

      {cargando && <p className="empty">Cargando entregas...</p>}

      {!cargando && entregas.length === 0 && (
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
            <div className="row__actions">
              <button className="btn" onClick={() => editarEntrega(ent)}>
                Editar
              </button>
              <button className="btn btn--ghost-danger" onClick={() => eliminar(ent.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}