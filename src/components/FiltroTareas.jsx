export default function FiltroTareas({ filtroActual, alCambiarFiltro }) {
  return (
    <div className="filtro-tareas">
      <button
        type="button"
        aria-pressed={filtroActual === "todas"}
        onClick={() => alCambiarFiltro("todas")}
      >
        Todas
      </button>
      <button
        type="button"
        aria-pressed={filtroActual === "pendientes"}
        onClick={() => alCambiarFiltro("pendientes")}
      >
        Pendientes
      </button>
      <button
        type="button"
        aria-pressed={filtroActual === "hechas"}
        onClick={() => alCambiarFiltro("hechas")}
      >
        Hechas
      </button>
    </div>
  );
}
