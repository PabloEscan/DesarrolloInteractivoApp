import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch"; 
import dayGridPlugin from "@fullcalendar/react/daygrid";
import esLocale from "@fullcalendar/core/locales/es"; // Importar idioma español para los nombres de los meses

// stylesheets
import '@fullcalendar/react/skeleton.css'; 
import '@fullcalendar/react/themes/monarch/theme.css'; 
import '@fullcalendar/react/themes/monarch/palettes/purple.css'; 

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[themePlugin, dayGridPlugin]}
      initialView="dayGridMonth"
      initialDate="2027-03-01" // Forzar la fecha inicial en marzo de 2027 como en la imagen
      locale={esLocale}        // Idioma español (traduce días y meses automáticamente)
      firstDay={1}             // Hace que la semana empiece en Lunes (Lun - Dom)
      headerToolbar={{
        left: 'prev',          // Botón izquierdo (mes anterior)
        center: 'title',       // Título centrado (ej. "marzo 2027")
        right: 'next'          // Botón derecho (mes siguiente)
      }}
      titleFormat={{ year: 'numeric', month: 'long' }} // Formato del título: mes y año
    />
  );
}