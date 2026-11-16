// Importamos la librería axios que instalamos en el paso 1.
import axios from 'axios';

// axios.create() fabrica una "copia" de axios con ajustes propios.
// Todas las peticiones que hagamos con `api` heredan esta configuración.
const api = axios.create({
  // baseURL es el prefijo que se antepone a cada petición.
  // Así, api.get('puntos/') pide realmente:
  //   http://127.0.0.1:8000/api/puntos/
  // Importante: termina con "/" para que se una bien con 'puntos/'.
  baseURL: 'http://127.0.0.1:8000/api/',
});

// Exportamos la instancia como valor por defecto.
// Desde cualquier componente la usaremos así:
//   import api from '../api';
export default api;