import { useState, useEffect } from 'react';
import Calendar from './components/Calendar'
import ListarTareas from './components/ListarTareas'
import CrearTarea from './components/CrearTarea'

export default function App() {
    const [tareas, setTareas] = useState([]);
    const [cargando, setCargando] = useState(true);

    // 1. Cargar tareas desde la API al iniciar
    useEffect(() => {
        fetch('http://localhost:3000/tareas')
            .then((res) => res.json())
            .then((data) => {
                setTareas(data);
                setCargando(false);
            })
            .catch((err) => {
                console.error('Error al obtener tareas:', err);
                setCargando(false);
            });
    }, []);

    // 2. Agregar la nueva tarea directamente al estado
    const agregarTareaAlEstado = (nuevaTarea) => {
        setTareas((tareasAnteriores) => [...tareasAnteriores, nuevaTarea]);
    };

    return (
        <div className="contenedor-principal">
            <h1 className="titulo-principal">Mi Aplicación de Tareas</h1>

            <Calendar/>
            
            {/* Formulario para agregar tareas */}
            <CrearTarea alAgregarTarea={agregarTareaAlEstado} />
            
            {/* Lista para mostrar las tareas */}
            <ListarTareas tareas={tareas} cargando={cargando} />
        </div>
    );
}