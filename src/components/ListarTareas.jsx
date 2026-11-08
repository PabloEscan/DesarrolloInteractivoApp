//Se importa el useEffect y el useState
import { useState, useEffect } from 'react';
import './ListarTareas.css';

export default function ListarTareas({ tareas, cargando }) {
    if (cargando) {
        return <p className="mensaje-carga">Cargando tareas...</p>;
    }

    return (
        <div className="contenedor-lista">
            <h2 className="titulo-lista">Lista de tareas</h2>
            <ul>
                {tareas.map((tarea) => (
                    <li key={tarea.id} className="item-tarea">
                        <span className={tarea.completed ? 'texto-tarea completada' : 'texto-tarea'}>
                            {tarea.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}