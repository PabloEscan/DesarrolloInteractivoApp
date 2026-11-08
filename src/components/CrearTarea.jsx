import { useState } from 'react';
import './CrearTarea.css';

export default function CrearTarea({ alAgregarTarea }) {
    // Estado local para guardar lo que el usuario escribe en el input
    const [titulo, setTitulo] = useState('');
    // Estado opcional para mostrar un mensaje de carga mientras se guarda en la API
    const [guardando, setGuardando] = useState(false);

    // Función que se ejecuta al enviar el formulario (onSubmit)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación básica: evitar enviar campos vacíos o con solo espacios
        if (!titulo.trim()) return;

        setGuardando(true);

        // Petición POST a la API pública
        fetch('http://localhost:3000/tareas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titulo,
                completed: false
            })
        })
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('Error al guardar la tarea');
                }
                return respuesta.json();
            })
            .then((nuevaTarea) => {
                console.log('Tarea creada con éxito:', nuevaTarea);
                
                // Si pasaste la función callback desde el componente padre, actualiza el estado principal
                if (alAgregarTarea) {
                    alAgregarTarea(nuevaTarea);
                }

                // Limpiar el campo de entrada
                setTitulo('');
                setGuardando(false);
            })
            .catch((error) => {
                console.error('Error al crear la tarea:', error);
                setGuardando(false);
            });
    };

    return (
        <form className="formulario-crear" onSubmit={handleSubmit}>
            <input
                type="text"
                className="input-tarea"
                placeholder="Escribe una nueva tarea..."
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                disabled={guardando}
            />
            <button 
                type="submit" 
                className="boton-crear"
                disabled={guardando}
            >
                {guardando ? 'Guardando...' : 'Agregar Tarea'}
            </button>
        </form>
    );
}