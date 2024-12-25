console.log("Archivo calendario.js cargado");

const calendarContainer = document.getElementById('calendar-container');

// Función para crear el calendario
function createCalendar(year, month) {
  console.log(`Creando calendario para ${year}-${month}`);
  calendarContainer.innerHTML = "";

  // Header del calendario
  const header = document.createElement("div");
  header.className = "calendar-header";

  // Reemplaza los símbolos '<' y '>' con los botones estilizados
  const prevButton = document.createElement('button');
  prevButton.className = 'prevButton';
  prevButton.textContent = '<';
  prevButton.onclick = () => updateCalendar(year, month - 1);

  const nextButton = document.createElement('button');
  nextButton.className = 'nextButton';
  nextButton.textContent = '>';
  nextButton.onclick = () => updateCalendar(year, month + 1);

  const title = document.createElement("h3");
  title.textContent = `${year}-${String(month + 1).padStart(2, "0")}`;

  header.appendChild(prevButton);
  header.appendChild(title);
  header.appendChild(nextButton);
  calendarContainer.appendChild(header);

  // Días de la semana (inicia en lunes)
  const daysHeader = document.createElement("div");
  daysHeader.className = "calendar-days";
  ["Viernes", "Sabado", "Domingo"].forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    daysHeader.appendChild(dayElement);
  });
  calendarContainer.appendChild(daysHeader);

  // Días del mes
  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  // Ajustar el inicio del mes para comenzar en lunes
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Ajusta domingo a ser el último
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Rellenar días vacíos antes del inicio del mes
  for (let i = 0; i < firstDay; i++) {
    grid.appendChild(document.createElement("div"));
  }

  // Agregar solo viernes, sábado y domingo visibles
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

    const dayElement = document.createElement("div");
    dayElement.className = "day";
    
    // Mostrar solo viernes, sábado y domingo
    if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
      dayElement.textContent = day;
      
      // Verificar eventos para la fecha
      const dateString = `${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}/${year}`;
      
      // Filtrar todos los eventos que coinciden con la fecha
      const eventsOnDay = events.filter((e) => e.fecha === dateString);

      // Si hay eventos para este día, agregarlos al día
      if (eventsOnDay.length > 0) {
        eventsOnDay.forEach(event => {
          const eventElement = document.createElement("div");
          eventElement.className = "event";

          // Mostrar la imagen del evento
          const image = document.createElement("img");
          image.src = event.imagen;
          image.alt = event.nombre;
          
          // Mostrar el nombre y la hora del evento
          const eventDetails = document.createElement("p");

          
          eventElement.appendChild(image);
          eventElement.appendChild(eventDetails);
          dayElement.appendChild(eventElement);
        });

        // Agregar evento de clic para mostrar detalles del evento
        dayElement.addEventListener('click', () => {
          showEventDetails(eventsOnDay);
        });
      }
    } else {
      // Si el día no es viernes, sábado ni domingo, lo ocultamos visualmente
      dayElement.style.visibility = 'hidden';
    }

    grid.appendChild(dayElement);
  }

  calendarContainer.appendChild(grid);
}

// Función para actualizar el calendario
function updateCalendar(year, month) {
  if (month < 0) {
    year--;
    month = 11;
  } else if (month > 11) {
    year++;
    month = 0;
  }
  createCalendar(year, month);
}

document.addEventListener('DOMContentLoaded', () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  createCalendar(currentYear, currentMonth);
});