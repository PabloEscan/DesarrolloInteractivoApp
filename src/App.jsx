import { useState, useEffect } from 'react';
import ListarTareas from './components/ListarTareas';
import CrearTarea from './components/CrearTarea';
import './App.css';

export default function App() {
    const [tareas, setTareas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [tareaAEditar, setTareaAEditar] = useState(null);

    useEffect(() => {
        fetch('https://apitareas-6fki.onrender.com/tareas')
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

    const agregarTareaAlEstado = (nuevaTarea) => {
        setTareas((tareasAnteriores) => [...tareasAnteriores, nuevaTarea]);
    };

    const actualizarTareaEnAPI = (id, datosActualizados, onTerminado) => {
        let fechaFormateada = datosActualizados.fecha;

        if (datosActualizados.fecha && datosActualizados.fecha.includes('-')) {
            const [anio, mes, dia] = datosActualizados.fecha.split('-');
            fechaFormateada = `${dia}/${mes}/${anio}`;
        }

        const datosParaEnviar = {
            title: datosActualizados.titulo,
            fecha: fechaFormateada
        };

        console.log("Enviando PATCH a la API con:", datosParaEnviar);

        fetch(`https://apitareas-6fki.onrender.com/tareas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosParaEnviar)
        })
            .then((respuesta) => {
                console.log("Estado de la respuesta HTTP:", respuesta.status);
                if (!respuesta.ok) {
                    throw new Error('Error al actualizar la tarea en el servidor');
                }
                return respuesta.json();
            })
            .then((tareaActualizada) => {
                console.log("Respuesta exitosa de la API (tarea actualizada):", tareaActualizada);

                setTareas((tareasAnteriores) =>
                    tareasAnteriores.map((t) => (t.id === id ? tareaActualizada : t))
                );

                setTareaAEditar(null);
                if (onTerminado) onTerminado();
            })
            .catch((error) => {
                console.error('Error detallado al actualizar la tarea:', error);
                if (onTerminado) onTerminado();
            });
    };

    const eliminarTarea = (id) => {
        fetch(`https://apitareas-6fki.onrender.com/tareas/${id}`, {
            method: 'DELETE',
        })
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('Error al eliminar la tarea en el servidor');
                }
                setTareas((tareasAnteriores) => tareasAnteriores.filter((tarea) => tarea.id !== id));
            })
            .catch((error) => {
                console.error('Error al eliminar la tarea:', error);
            });
    };

    const alternarCompletada = (id, estadoActual) => {
        const nuevoEstado = !estadoActual;

        fetch(`https://apitareas-6fki.onrender.com/tareas/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: nuevoEstado
            })
        })
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('Error al actualizar el estado de la tarea');
                }
                return respuesta.json();
            })
            .then((tareaActualizada) => {
                setTareas((tareasAnteriores) =>
                    tareasAnteriores.map((t) => (t.id === id ? tareaActualizada : t))
                );
            })
            .catch((error) => {
                console.error('Error al actualizar la tarea:', error);
            });
    };

    return (
        <div className="contenedor-principal">
            <h1 className="titulo-principal">Mi Aplicación de Tareas</h1>

            <div className="layout-principal">
                <aside className="aside-formulario">
                    <h2>{tareaAEditar ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
                    <CrearTarea
                        alAgregarTarea={agregarTareaAlEstado}
                        tareaAEditar={tareaAEditar}
                        alActualizarTarea={actualizarTareaEnAPI}
                        onCancelarEdicion={() => setTareaAEditar(null)}
                    />
                </aside>

                <main className="seccion-tareas">
                    <ListarTareas
                        tareas={tareas}
                        cargando={cargando}
                        alEliminarTarea={eliminarTarea}
                        alAlternarEstado={alternarCompletada}
                        alIniciarEdicion={setTareaAEditar}
                    />
                </main>
            </div>
        </div>
    );
}