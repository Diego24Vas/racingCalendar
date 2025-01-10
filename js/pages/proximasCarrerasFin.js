// Objetivo: Mostrar las carreras del fin de semana actual

// Lista de eventos
function showCurrentWeekRaces() {
    const container = document.getElementById('carreras-semana');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos


    // Obtener la fecha actual y el rango de fechas de la semana
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Día de la semana (0-6)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay); // Primer día de la semana (domingo)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Último día de la semana (sábado)

    // Filtrar los eventos para encontrar las carreras de la semana actual
    console.log('Current Date:', currentDate);
    console.log('Start of Week:', startOfWeek);
    console.log('End of Week:', endOfWeek);
    console.log('Events:', events); 

    // Filtrar los eventos para encontrar las carreras de la semana actual
    const currentWeekRaces = events.filter(event => {
        const eventDate = new Date(event.fecha.split('/').reverse().join('-')); // Convertir la fecha al formato YYYY-MM-DD
        console.log('Event Date:', eventDate);
        return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });

    console.log('Current Week Races:', currentWeekRaces);

    // Mostrar las carreras de la semana actual
    if (currentWeekRaces.length > 0) {
        currentWeekRaces.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event-details-fin';

            const title = document.createElement('h3');
            title.textContent = event.nombre;

            const date = document.createElement('p');
            date.textContent = `Fecha: ${event.fecha}`;

            const circuit = document.createElement('p');
            circuit.textContent = `Circuito: ${event.circuito}`;

            const country = document.createElement('p');
            country.textContent = `País: ${event.pais}`;

            const image = document.createElement('img');
            image.src = event.imagen;
            image.alt = event.nombre;

            // Agregar los elementos al contenedor
            eventDiv.appendChild(title);
            eventDiv.appendChild(date);
            eventDiv.appendChild(circuit);
            eventDiv.appendChild(country);
            eventDiv.appendChild(image);

            container.appendChild(eventDiv);
        });

    // Mostrar un mensaje si no hay carreras programadas para el
    } else {
        const noEventsMessage = document.createElement('p');
        noEventsMessage.textContent = 'No hay carreras programadas para este fin de semana. \uD83D\uDE1E'; // 😞
        container.appendChild(noEventsMessage);
    }
}


// Ejecutar la función al cargar el contenido de la página
document.addEventListener('DOMContentLoaded', showCurrentWeekRaces);