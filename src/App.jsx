// NavLink: enlace del menú (sabe cuál es la ruta activa).
// Route y Routes: definen qué componente se muestra para cada URL.
import { NavLink, Route, Routes } from 'react-router-dom';

// Importamos las "pantallas" que vamos a enrutar.
import Inicio from './components/Inicio';
import Puntos from './components/Puntos';
import Entregas from './components/Entregas';

// Hoja de estilos de la aplicación. 
import './App.css';

export default function App() {
  return (
    <>
      <header className="nav">
        <nav className="nav__inner" aria-label="Principal">
          {/* Nombre real del proyecto */}
          <span className="nav__brand">EcoPuntos</span>

          <div className="nav__links">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/puntos">Puntos de acopio</NavLink>
            <NavLink to="/entregas">Entregas</NavLink>
          </div>
        </nav>
      </header>

      <main className="page">
        <Routes>
          <Route path="/" element={<Inicio />} />
          
          {/* Gestión completa de Puntos de acopio (Alejandro) */}
          <Route path="/puntos" element={<Puntos />} />

          {/* Gestión completa de Entregas con ForeignKey (Tu parte) */}
          <Route path="/entregas" element={<Entregas />} />

          <Route path="*" element={<h1>404: Página no encontrada</h1>} />
        </Routes>
      </main>
    </>
  );
}