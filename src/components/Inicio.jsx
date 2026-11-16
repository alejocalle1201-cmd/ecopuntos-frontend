import { Link } from 'react-router-dom';

// Las tarjetas viven en un arreglo de objetos.
// Para agregar o quitar una, solo editas este arreglo:
// no hay que copiar y pegar HTML.
const tarjetas = [
  // Lo que puedes hacer en la app (las 4 acciones del CRUD)
  { icono: '🔎', titulo: 'Consulta',  texto: 'Mira todos los puntos de acopio registrados.' },
  { icono: '➕', titulo: 'Crea',      texto: 'Agrega un punto nuevo con su nombre y dirección.' },
  { icono: '✏️', titulo: 'Edita',     texto: 'Actualiza los datos de un punto cuando cambien.' },
  { icono: '🗑️', titulo: 'Elimina',   texto: 'Quita los puntos que ya no existen.' },

  { icono: '🌱', titulo: 'Cuida el medio ambiente', texto: 'Cada pequeña acción cuenta para un planeta más sano.' },
  { icono: '📍', titulo: 'Ven a nuestros puntos',   texto: 'Encuentra el punto de acopio más cercano a ti.' },
  { icono: '🤝', titulo: 'Hazlo en comunidad',      texto: 'Juntos logramos mucho más que cada uno por separado.' },
  { icono: '🌎', titulo: 'Piensa en el futuro',     texto: 'Lo que hoy cuidamos es lo que heredarán los demás.' },
  { icono: '♻️', titulo: 'Reciclar es fácil',       texto: 'Un hábito sencillo que hace una gran diferencia.' },
  { icono: '💚', titulo: 'Sé parte del cambio',     texto: 'Súmate a quienes ya están cuidando su entorno.' },
];

export default function Inicio() {
  return (
    // Fragmento <>...</>: devolvemos dos bloques (hero y tarjetas)
    // sin agregar una etiqueta extra al HTML.
    <>
      <section className="hero">
        <h1>Puntos de acopio para reciclaje</h1>
        <p>Consulta, crea y administra los puntos de acopio en un solo lugar.</p>

        <div className="hero__actions">
          <Link to="/puntos" className="btn btn--primary">Ver puntos</Link>
        </div>
      </section>

      <section className="features">
        {/* .map recorre el arreglo y dibuja una tarjeta por cada objeto.
            "t" es la tarjeta de esa vuelta; "i" es su posición (0, 1, 2...).
            key es obligatorio en listas: una etiqueta única por elemento. */}
        {tarjetas.map((t, i) => (
          <article
            key={t.titulo}
            className="feature"
            // Retraso de entrada según la posición: cada tarjeta aparece
            // 60ms después de la anterior. Así funciona con cualquier
            // cantidad de tarjetas, sin escribir una regla CSS por cada una.
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="feature__icono">{t.icono}</span>
            <h3>{t.titulo}</h3>
            <p>{t.texto}</p>
          </article>
        ))}
      </section>
    </>
  );
}