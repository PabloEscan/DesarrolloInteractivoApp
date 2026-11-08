import { useState, useEffect } from 'react';

export default function CrearTarea({ alAgregarTarea, tareaAEditar, alActualizarTarea, onCancelarEdicion }) {
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (tareaAEditar) {
            setTitulo(tareaAEditar.title || '');
            
            if (tareaAEditar.fecha) {
                const [dia, mes, anio] = tareaAEditar.fecha.split('/');
                setFecha(`${anio}-${mes}-${dia}`);
            } else {
                setFecha('');
            }
        } else {
            setTitulo('');
            setFecha('');
        }
        setError('');
    }, [tareaAEditar]);

    const obtenerFechaHoy = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fechaMinima = obtenerFechaHoy();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!titulo.trim()) {
            setError('El título de la tarea no puede estar vacío.');
            return;
        }

        if (!fecha) {
            setError('Por favor, selecciona una fecha.');
            return;
        }

        setGuardando(true);

        if (tareaAEditar) {
            alActualizarTarea(tareaAEditar.id, { titulo, fecha }, () => {
                setGuardando(false);
            });
            return;
        }

        const [anio, mes, dia] = fecha.split('-');
        const fechaFormateada = `${dia}/${mes}/${anio}`;

        fetch('https://apitareas-6fki.onrender.com/tareas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titulo,
                completed: false,
                fecha: fechaFormateada
            })
        })
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('Error al guardar la tarea');
                }
                return respuesta.json();
            })
            .then((nuevaTarea) => {
                if (alAgregarTarea) {
                    alAgregarTarea(nuevaTarea);
                }

                setTitulo('');
                setFecha('');
                setGuardando(false);
            })
            .catch((err) => {
                console.error('Error al crear la tarea:', err);
                setError('Hubo un error al conectar con el servidor.');
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
            
            <input
                type="date"
                className="input-tarea"
                value={fecha}
                min={fechaMinima}
                onChange={(e) => setFecha(e.target.value)}
                disabled={guardando}
            />

            {error && <p className="mensaje-error">{error}</p>}

            <div className="botones-formulario" style={{ display: 'flex', gap: '8px' }}>
                <button 
                    type="submit" 
                    className="boton-crear"
                    disabled={guardando}
                    style={{ flex: 1 }}
                >
                    {guardando ? 'Guardando...' : (tareaAEditar ? 'Guardar Cambios' : 'Agregar Tarea')}
                </button>

                {tareaAEditar && (
                    <button 
                        type="button" 
                        className="boton-cancelar-edicion"
                        onClick={onCancelarEdicion}
                        disabled={guardando}
                        style={{ background: '#ccc', border: 'none', padding: '8px', cursor: 'pointer' }}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}