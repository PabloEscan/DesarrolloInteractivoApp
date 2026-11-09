export function filtrarTareas(tareas, filtro) {
    if (filtro === 'pendientes') {
        return tareas.filter((tarea) => !tarea.completed);
    }

    if (filtro === 'hechas') {
        return tareas.filter((tarea) => tarea.completed);
    }

    return tareas;
}