import { useEffect, useState } from 'react';
import api from '../api';

export default function Puntos() {
  // ----- MEMORIA DEL COMPONENTE -----
  const [puntos, setPuntos] = useState([]);       // la lista que viene de Django
  const [mostrarForm, setMostrarForm] = useState(false); // ¿se ve el formulario?
  const [editandoId, setEditandoId] = useState(null);    // null = creando, número = editando
  const [nombre, setNombre] = useState('');       // lo escrito en el campo nombre
  const [direccion, setDireccion] = useState(''); // lo escrito en el campo dirección

  // ----- TRAER LA LISTA (GET) -----
  const cargar = async () => {
    const { data } = await api.get('puntos/');
    setPuntos(Array.isArray(data) ? data : data.results);
  };

  // Se ejecuta una vez, cuando la pantalla aparece.
  useEffect(() => {
    cargar();
  }, []);

  // ----- ABRIR EL FORMULARIO -----
  const nuevo = () => {
    setEditandoId(null); // sin id, o sea, creando
    setNombre('');  // campo vacío
    setDireccion('');
    setMostrarForm(true); // mostrar el formulario
  };

  const editar = (punto) => { 
    setEditandoId(punto.id); // con id, o sea, editando
    setNombre(punto.nombre); // rellenar el campo con lo que ya había
    setDireccion(punto.direccion);
    setMostrarForm(true);
  };

  // ----- GUARDAR (POST o PUT) -----
  const guardar = async (e) => {
    e.preventDefault();
    const datos = { nombre, direccion };

    if (editandoId) {
      await api.put(`puntos/${editandoId}/`, datos);
    } else {
      await api.post('puntos/', datos);
    }

    setMostrarForm(false);
    cargar();
  };

  // ----- ELIMINAR (DELETE) -----
  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar este punto?')) return;
    await api.delete(`puntos/${id}/`);
    cargar();
  };

  // ----- LO QUE SE VE EN PANTALLA -----
  return (
    <section>
      <div className="page__head">
        <h1>Puntos de acopio</h1>
        <button className="btn btn--primary" onClick={nuevo}>Nuevo punto</button>
      </div>

      {mostrarForm && (
        <form className="card" onSubmit={guardar}>
          <h2>{editandoId ? 'Editar punto' : 'Nuevo punto'}</h2>

          <div className="field">
            <label>Nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>

          <div className="field">
            <label>Dirección</label>
            <input value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
          </div>

          <div className="form__actions">
            <button type="button" className="btn" onClick={() => setMostrarForm(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary">Guardar</button>
          </div>
        </form>
      )}

      {puntos.length === 0 && <p className="empty">Aún no hay puntos.</p>}

      <ul className="list">
        {puntos.map((p) => (
          <li key={p.id} className="row">
            <div className="row__text">
              <strong>{p.nombre}</strong>
              <span>{p.direccion}</span>
            </div>
            <div className="row__actions">
              <button className="btn" onClick={() => editar(p)}>Editar</button>
              <button className="btn btn--ghost-danger" onClick={() => eliminar(p.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}