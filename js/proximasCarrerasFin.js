function showCurrentWeekRaces() {
    const container = document.getElementById('carreras-semana');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos

    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Día de la semana (0-6)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay); // Primer día de la semana (domingo)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Último día de la semana (sábado)

    console.log('Current Date:', currentDate);
    console.log('Start of Week:', startOfWeek);
    console.log('End of Week:', endOfWeek);
    console.log('Events:', events); // Verificar que los eventos se carguen correctamente

    const currentWeekRaces = events.filter(event => {
        const eventDate = new Date(event.fecha.split('/').reverse().join('-')); // Convertir la fecha al formato YYYY-MM-DD
        console.log('Event Date:', eventDate);
        return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });

    console.log('Current Week Races:', currentWeekRaces);

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

            eventDiv.appendChild(title);
            eventDiv.appendChild(date);
            eventDiv.appendChild(circuit);
            eventDiv.appendChild(country);
            eventDiv.appendChild(image);

            container.appendChild(eventDiv);
        });
    } else {
        const noEventsMessage = document.createElement('p');
        noEventsMessage.textContent = 'No hay carreras programadas para este fin de semana. \uD83D\uDE1E'; // 😞
        container.appendChild(noEventsMessage);
    }
}

document.addEventListener('DOMContentLoaded', showCurrentWeekRaces);