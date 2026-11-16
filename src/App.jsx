// NavLink: enlace del menú (sabe cuál es la ruta activa).
// Route y Routes: definen qué componente se muestra para cada URL.
import { NavLink, Route, Routes } from 'react-router-dom';

// Importamos las "pantallas" que vamos a enrutar.
import Inicio from './components/Inicio';
import Puntos from './components/Puntos';


// Hoja de estilos de la aplicación. 
import './App.css';

export default function App() {
  return (
    // Un fragmento <>...</> permite devolver varios elementos
    // sin añadir un <div> extra al HTML.
    <>
      {/* <header> es la cabecera de la página. Es una etiqueta semántica:
          ayuda a lectores de pantalla y buscadores a entender la estructura. */}
      <header className="nav">
      <nav className="nav__inner" aria-label="Principal">
        {/* Nombre real del proyecto */}
        <span className="nav__brand">EcoPuntos</span>

        <div className="nav__links">
          {/* "end" aquí SÍ: si no, "/" coincidiría con todas las URLs
              y Inicio se vería activo siempre. */}
          <NavLink to="/" end>Inicio</NavLink>

          {/* Sin "end": se mantiene activo en /puntos, /puntos/nuevo
              y /puntos/editar/:id, o sea, en toda la sección de puntos. */}
          <NavLink to="/puntos">Puntos de acopio</NavLink>
        </div>
      </nav>
      </header>

      {/* <main> es el contenido principal. Lo que cambia entre pantallas
          aparece aquí dentro, mientras el menú de arriba permanece fijo. */}
      <main className="page">
        {/* Routes revisa la URL y muestra UNA sola Route. */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          
          {/* toda la gestion(ver,crear,editar,eliminar) */}
          <Route path="/puntos" element={<Puntos />} />

          <Route path = "*" element={<h1>404: Página no encontrada</h1>} />
        </Routes>
      </main>
    </>
  );
}