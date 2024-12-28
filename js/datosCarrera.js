function showEventDetails(events) {
    const container = document.getElementById('datosCarrera-container');
    container.innerHTML = ''; // Limpiar contenido previo

    // Mostrar los detalles de cada evento
    events.forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-details';

        // Crear elementos HTML para mostrar los detalles del evento
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

        // Agregar una línea divisoria después de cada evento, excepto el último
        if (index < events.length - 1) {
            const hr = document.createElement('hr');
            hr.className = 'event-divider';
            container.appendChild(hr);
        }
    });
}