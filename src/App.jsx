import { useState, useEffect } from 'react';
import ListarTareas from './components/ListarTareas';
import CrearTarea from './components/CrearTarea';
import FiltroTareas from './components/FiltroTareas';
import { filtrarTareas } from './utils/filtrarTareas';
import './App.css';

export default function App() {
    const [tareas, setTareas] = useState([]);
    const [cargando, setCargando] = useState(true);
    // Mensaje de error para mostrar al usuario si falla una petición a la API
    const [errorAccion, setErrorAccion] = useState(null);

    const [tareaAEditar, setTareaAEditar] = useState(null);

    // Filtro activo: 'todas', 'pendientes' o 'hechas'
    const [filtro, setFiltro] = useState('todas');

    useEffect(() => {
        fetch('https://apitareas-6fki.onrender.com/tareas')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error en el servidor: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setTareas(data);
            })
            .catch((err) => {
                console.error('Error al obtener tareas:', err);
                setErrorAccion('No se pudieron cargar las tareas. Revisa tu conexión e intenta de nuevo.');
            })
            .finally(() => {
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

        setErrorAccion(null);

        // PATCH modifica solo los campos enviados (title y fecha) y conserva "completed"
        fetch(`https://apitareas-6fki.onrender.com/tareas/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosParaEnviar)
        })
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error(`Error en el servidor: ${respuesta.status} (${respuesta.statusText})`);
                }
                return respuesta.json();
            })
            .then((tareaActualizada) => {
                setTareas((tareasAnteriores) =>
                    tareasAnteriores.map((t) => (t.id === id ? tareaActualizada : t))
                );
                setTareaAEditar(null);
            })
            .catch((error) => {
                console.error('Error detallado al actualizar la tarea:', error);
                setErrorAccion(error.message || 'No se pudo conectar con el servidor.');
            })
            .finally(() => {
                // Se ejecuta tanto si salió bien como si falló: el formulario deja de mostrar "Guardando..."
                if (onTerminado) onTerminado();
            });
    };

    const eliminarTarea = (id) => {
        setErrorAccion(null);

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
                setErrorAccion('No se pudo eliminar la tarea. Intenta de nuevo.');
            });
    };

    const alternarCompletada = (id, estadoActual) => {
        const nuevoEstado = !estadoActual;
        setErrorAccion(null);

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
                setErrorAccion('No se pudo cambiar el estado de la tarea. Intenta de nuevo.');
            });
    };

    // Se calcula en cada render a partir de las tareas y el filtro activo
    const tareasFiltradas = filtrarTareas(tareas, filtro);

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
                    {errorAccion && (
                        <p className="mensaje-error-api" role="alert">{errorAccion}</p>
                    )}

                    <FiltroTareas
                        filtroActual={filtro}
                        alCambiarFiltro={setFiltro}
                    />

                    <ListarTareas
                        tareas={tareasFiltradas}
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