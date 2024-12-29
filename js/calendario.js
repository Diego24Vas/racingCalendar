console.log("Archivo calendario.js cargado");

const calendarContainer = document.getElementById('calendar-container');

// Función para crear el calendario
function createCalendar(year, month) {
  console.log(`Creando calendario para ${year}-${month}`);
  calendarContainer.innerHTML = "";

  // Header del calendario
  const header = document.createElement("div");
  header.className = "calendar-header";

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

  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Ajusta domingo a ser el último
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  for (let i = 0; i < firstDay; i++) {
    grid.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

    const dayElement = document.createElement("div");
    dayElement.className = "day";
    
    if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
      dayElement.textContent = day;
      
      const dateString = `${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}/${year}`;
      
      const eventsOnDay = events.filter((e) => e.fecha === dateString);

      if (eventsOnDay.length > 0) {
        eventsOnDay.forEach(event => {
          const eventElement = document.createElement("div");
          eventElement.className = "event";

          const image = document.createElement("img");
          image.src = event.imagen;
          image.alt = event.nombre;

          const eventDetails = document.createElement("p");
//          eventDetails.textContent = `${event.nombre} - ${event.circuito}`;

          eventElement.appendChild(image);
          eventElement.appendChild(eventDetails);
          dayElement.appendChild(eventElement);
        });

        dayElement.addEventListener('click', () => {
          showEventDetails(eventsOnDay);
        });
      }
    } else {
      dayElement.style.visibility = 'hidden';
    }

    if (isCurrentMonth && day === today.getDate()) {
      dayElement.classList.add('today');
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

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    // Lógica para cambiar al mes anterior
    changeMonth(-1);
  } else if (event.key === 'ArrowRight') {
    // Lógica para cambiar al mes siguiente
    changeMonth(1);
  }
});

function changeMonth(direction) {
  currentMonth += direction;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  // Lógica para actualizar el calendario con el nuevo mes y año
  updateCalendar(currentMonth, currentYear);
}