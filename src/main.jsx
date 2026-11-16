// 1. IMPORTACIONES: traemos las herramientas que vamos a usar.

// StrictMode: una ayuda solo para desarrollo (explicada abajo).
import { StrictMode } from 'react';

// createRoot: la función que "conecta" React con un elemento del HTML.
import { createRoot } from 'react-dom/client';

// BrowserRouter: activa el sistema de rutas (la librería del paso 1).
import { BrowserRouter } from 'react-router-dom';

// App: nuestro componente principal, el que está en App.jsx.
import App from './App.jsx';

// 2. ARRANQUE: una sola instrucción larga, que se lee de adentro hacia afuera.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);