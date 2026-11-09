import { describe, it, expect } from 'vitest';
import { filtrarTareas } from './filtrarTareas';
describe('filtrarTareas', () => {
    const tareas = [
        { id: 1, title: 'Estudiar React', completed: false },
        { id: 2, title: 'Hacer las pruebas', completed: true },
        { id: 3, title: 'Desplegar la app', completed: false },
    ];

    it('con el filtro "pendientes" devuelve solo las tareas no completadas', () => {
        const resultado = filtrarTareas(tareas, 'pendientes');
        expect(resultado).toEqual([
            { id: 1, title: 'Estudiar React', completed: false },
            { id: 3, title: 'Desplegar la app', completed: false },
        ]);
    });

    it('con el filtro "hechas" devuelve solo las tareas que se han completado', () => {
        const resultado = filtrarTareas(tareas, 'hechas');
        expect(resultado).toEqual([
            { id: 2, title: 'Hacer las pruebas', completed: true }
        ]);
    });

    it('con el filtro "todas" devuelve todas las tareas', () => {
        const resultado = filtrarTareas(tareas, 'todas');
        expect(resultado).toEqual(tareas);
    });

});