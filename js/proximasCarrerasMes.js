function showCurrentMonthRaces() {
    const container = document.getElementById('carreras-mes');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Los meses en JavaScript son 0-11
    const currentYear = currentDate.getFullYear();

    console.log('Current Date:', currentDate);
    console.log('Current Month:', currentMonth);
    console.log('Current Year:', currentYear);
    console.log('Events:', events); // Verificar que los eventos se carguen correctamente

    const currentMonthRaces = events.filter(event => {
        const eventDate = new Date(event.fecha.split('/').reverse().join('-')); // Convertir la fecha al formato YYYY-MM-DD
        console.log('Event Date:', eventDate);
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });

    console.log('Current Month Races:', currentMonthRaces);

    if (currentMonthRaces.length > 0) {
        currentMonthRaces.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event-details';

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
        noEventsMessage.textContent = 'No hay carreras programadas para este mes.';
        container.appendChild(noEventsMessage);
    }
}

document.addEventListener('DOMContentLoaded', showCurrentMonthRaces);