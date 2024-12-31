function showNextRace() {
    const today = new Date();
    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.fecha.split('/').reverse().join('-'));
        return eventDate >= today;
    });

    if (upcomingEvents.length > 0) {
        upcomingEvents.sort((a, b) => {
            const dateA = new Date(a.fecha.split('/').reverse().join('-'));
            const dateB = new Date(b.fecha.split('/').reverse().join('-'));
            return dateA - dateB;
        });

        const nextEvent = upcomingEvents[0];
        const container = document.getElementById('proximas-carreras');
        container.innerHTML = ''; // Limpiar contenido previo

        

        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-details';

        const title = document.createElement('h3');
        title.textContent = nextEvent.nombre;

        const date = document.createElement('p');
        date.textContent = `Fecha: ${nextEvent.fecha}`;

        /*
        const time = document.createElement('p');
        time.textContent = `Hora: ${nextEvent.hora_chile}`;
        */

        const circuit = document.createElement('p');
        circuit.textContent = `Circuito: ${nextEvent.circuito}`;

        const country = document.createElement('p');
        country.textContent = `País: ${nextEvent.pais}`;

        const image = document.createElement('img');
        image.src = nextEvent.imagen;
        image.alt = nextEvent.nombre;

        eventDiv.appendChild(title);
        eventDiv.appendChild(date);
        //eventDiv.appendChild(time);
        eventDiv.appendChild(circuit);
        eventDiv.appendChild(country);
        eventDiv.appendChild(image);

        container.appendChild(eventDiv);
    }
}