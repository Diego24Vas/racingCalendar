function showEventDetails(events) {
    const container = document.getElementById('datosCarrera-container');
    container.innerHTML = ''; // Limpiar contenido previo

    // Ordenar los eventos por hora
    events.sort((a, b) => {
        const timeA = a.hora_chile.split(':').map(Number);
        const timeB = b.hora_chile.split(':').map(Number);
        return timeA[0] - timeB[0] || timeA[1] - timeB[1];
    });

    // Mostrar los detalles de cada evento
    events.forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-details';

        // Crear elementos HTML para mostrar los detalles del evento
        const title = document.createElement('h3');
        title.textContent = event.nombre;

        const date = document.createElement('p');
        date.textContent = `Fecha: ${event.fecha}`;

        const time = document.createElement('p');
        time.textContent = `Hora: ${event.hora_chile}`;

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
       //ventDiv.appendChild(time);
        eventDiv.appendChild(circuit);
        eventDiv.appendChild(country);
        eventDiv.appendChild(image);

        container.appendChild(eventDiv);

        // Agregar una línea divisoria después de cada evento, excepto el último
        if (index < events.length - 1) {
            const hr = document.createElement('hr');
            hr.className = 'event-divider';
            container.appendChild(hr);
        }
    });
}