import ItemTarea from './ItemTarea'; // Asegúrate de importar el componente

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

    return (
        <div className="contenedor-lista">
            <h2 className="titulo-lista">Lista de tareas</h2>
            <ul className="lista-tareas">
                {tareasOrdenadas.map((tarea) => (
                    <ItemTarea 
                        key={tarea.id}
                        tarea={tarea}
                        alEliminar={alEliminarTarea}
                        alAlternar={alAlternarEstado}
                        alIniciarEdicion={alIniciarEdicion}
                    />
                ))}
            </ul>
        </div>
    );
}