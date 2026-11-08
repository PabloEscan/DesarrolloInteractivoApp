export default function ListarTareas({ tareas, cargando, alEliminarTarea, alAlternarEstado, alIniciarEdicion }) {
    if (cargando) {
        return <p className="mensaje-carga">Cargando tareas...</p>;
    }

    const convertirFechaAObjeto = (fechaStr) => {
        if (!fechaStr) return new Date(0);
        const [dia, mes, anio] = fechaStr.split('/');
        return new Date(`${anio}-${mes}-${dia}`);
    };

    const tareasOrdenadas = [...tareas].sort((a, b) => {
        const fechaA = convertirFechaAObjeto(a.fecha);
        const fechaB = convertirFechaAObjeto(b.fecha);
        return fechaB - fechaA; 
    });

    const esFechaVencida = (fechaStr) => {
        if (!fechaStr) return false;
        const [dia, mes, anio] = fechaStr.split('/');
        const fechaTarea = new Date(`${anio}-${mes}-${dia}`);
        
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        return fechaTarea < hoy;
    };

    return (
        <div className="contenedor-lista">
            <h2 className="titulo-lista">Lista de tareas</h2>
            <ul className="lista-tareas">
                {tareasOrdenadas.map((tarea) => {
                    const vencida = esFechaVencida(tarea.fecha);

                    let estadoTexto = '';
                    let claseEstado = '';

                    if (tarea.completed) {
                        estadoTexto = 'Completada';
                        claseEstado = 'estado-completada';
                    } else if (vencida) {
                        estadoTexto = 'Fallida';
                        claseEstado = 'estado-fallida';
                    } else {
                        estadoTexto = 'Pendiente';
                        claseEstado = 'estado-pendiente';
                    }

                    return (
                        <li key={tarea.id} className="item-tarea">
                            <div className="info-tarea">
                                <span className={tarea.completed ? 'texto-tarea completada' : 'texto-tarea'}>
                                    {tarea.title}
                                </span>
                                {tarea.fecha && (
                                    <span className="fecha-tarea">
                                        {tarea.fecha}
                                    </span>
                                )}
                            </div>
                            
                            <div className="acciones-tarea">
                                <button 
                                    className={`badge-estado ${claseEstado}`}
                                    onClick={() => alAlternarEstado(tarea.id, tarea.completed)}
                                    title="Haz clic para cambiar estado"
                                >
                                    {estadoTexto}
                                </button>

                                <button 
                                    className="boton-accion"
                                    onClick={() => alIniciarEdicion(tarea)}
                                    title="Editar tarea"
                                >
                                    Editar
                                </button>

                                <button 
                                    className="boton-accion eliminar"
                                    onClick={() => alEliminarTarea(tarea.id)}
                                    title="Eliminar tarea"
                                >
                                    X
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}