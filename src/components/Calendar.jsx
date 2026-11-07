import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch"; 
import dayGridPlugin from "@fullcalendar/react/daygrid";
import esLocale from "@fullcalendar/core/locales/es";

// stylesheets
import '@fullcalendar/react/skeleton.css'; 
import '@fullcalendar/react/themes/monarch/theme.css'; 
import '@fullcalendar/react/themes/monarch/palettes/purple.css'; 

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[themePlugin, dayGridPlugin]}
      initialView="dayGridMonth"
      initialDate="2027-03-01" 
      locale={esLocale}        
      firstDay={1}             
      headerToolbar={{
        left: 'prev',       
        center: 'title',     
        right: 'next'         
      }}
      titleFormat={{ year: 'numeric', month: 'long' }}
    />
  );
}