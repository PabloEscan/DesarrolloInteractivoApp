export function filtrarTareas(tareas, filtro) {
    if (filtro === 'pendientes') {
        return tareas.filter((tareas) => !tareas.completed);
    }

    if (filtro === 'hechas') {
        return tareas.filter((tareas) => tareas.completed);
    }

    return tareas;
}


