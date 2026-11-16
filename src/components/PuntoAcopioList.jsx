import { useState, useEffect } from 'react'; // Importamos useState y useEffect desde React para manejar el estado y los efectos secundarios
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP a nuestro backend Django

function PuntoAcopioList() { // Definimos el componente funcional PuntoAcopioList
    // Aquí guardaremos los datos que lleguen de Django
    const [puntos, setPuntos] = useState([]); // Inicializamos el estado 'puntos' como un arreglo vacío y 'setPuntos' como la función para actualizarlo

    // useEffect hace que esto se ejecute apenas cargue la página
    useEffect(() => { // useEffect se ejecuta después de que el componente se monta, ideal para hacer solicitudes de datos
        // Axios va a tocar la puerta de tu servidor Django
        axios.get('http://127.0.0.1:8000/api/puntos/') // Hacemos una solicitud GET a la URL de nuestra API en Django
            .then(response => {
                setPuntos(response.data); // Guardamos los datos
            })
            .catch(error => {
                console.error("Hubo un error trayendo los datos:", error);
            });
    }, []);

    return ( // Renderizamos la lista de puntos de acopio
        <div>
            <h3>Lista de Puntos de Acopio Registrados</h3>
            <ul>
                {puntos.map(punto => (  // Iteramos sobre el arreglo 'puntos' y renderizamos cada punto de acopio en un elemento de lista
                    <li key={punto.id}> 
                        <strong>{punto.nombre}</strong> - {punto.direccion} 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PuntoAcopioList; // Exportamos el componente PuntoAcopioList para que pueda ser utilizado en otras partes de la aplicación