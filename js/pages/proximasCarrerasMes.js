 // Objetivo: Mostrar las carreras programadas para el mes actual


// 
function showCurrentMonthRaces() {
    const container = document.getElementById('carreras-mes');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos

    // Obtener la fecha actual
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); 
    const currentYear = currentDate.getFullYear();

    // console.log('Current Date:', currentDate);
    // console.log('Current Month:', currentMonth);
    // console.log('Current Year:', currentYear);
    // console.log('Events:', events); 

    // Filtrar los eventos para encontrar las carreras del mes actual
    const currentMonthRaces = events.filter(event => {
        const eventDate = new Date(event.fecha.split('/').reverse().join('-')); // Convertir la fecha al formato YYYY-MM-DD
        console.log('Event Date:', eventDate);
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });

    // console.log('Current Month Races:', currentMonthRaces);

    // Mostrar las carreras del mes actual
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

            // Agregar los elementos al contenedor
            eventDiv.appendChild(title);
            eventDiv.appendChild(date);
            eventDiv.appendChild(circuit);
            eventDiv.appendChild(country);
            eventDiv.appendChild(image);

            container.appendChild(eventDiv);
        });

    // Mostrar un mensaje si no hay carreras programadas para el mes actual
    } else {
        const noEventsMessage = document.createElement('p');
        noEventsMessage.textContent = 'No hay carreras programadas para este mes.';
        container.appendChild(noEventsMessage);
    }
}


// Cargar las carreras del mes actual al cargar la página
document.addEventListener('DOMContentLoaded', showCurrentMonthRaces);