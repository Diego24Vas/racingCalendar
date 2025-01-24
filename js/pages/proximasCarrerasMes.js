function showCurrentMonthRaces() {
    const container = document.getElementById('carreras-mes');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos

    // Obtener la fecha actual
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); 
    const currentYear = currentDate.getFullYear();

    // Filtrar los eventos para encontrar las carreras del mes actual
    const currentMonthRaces = events.filter(event => {
        const [day, month, year] = event.fecha.split('/').map(Number);
        const eventDate = new Date(year, month - 1, day); // Convertir la fecha al formato YYYY-MM-DD
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });

    // Separar las carreras pasadas y futuras
    const pastRaces = currentMonthRaces.filter(event => {
        const [day, month, year] = event.fecha.split('/').map(Number);
        const eventDate = new Date(year, month - 1, day);
        return eventDate < currentDate;
    });

    const futureRaces = currentMonthRaces.filter(event => {
        const [day, month, year] = event.fecha.split('/').map(Number);
        const eventDate = new Date(year, month - 1, day);
        return eventDate >= currentDate;
    });



    // Mostrar las carreras futuras
    if (futureRaces.length > 0) {
        futureRaces.forEach(event => {

            const eventDiv = document.createElement('div');
            eventDiv.className = 'event-details';

            const title = document.createElement('h3');
            title.textContent = event.nombre;

            const date = document.createElement('p');
            date.textContent = `Fecha: ${event.fecha}`;

            const country = document.createElement('p');
            country.textContent = `País: ${event.pais}`;

            const image = document.createElement('img');
            image.src = event.imagen;
            image.alt = event.nombre;

            // Agregar los elementos al contenedor
            eventDiv.appendChild(title);
            eventDiv.appendChild(date);
            //eventDiv.appendChild(country);
            eventDiv.appendChild(image);
            container.appendChild(eventDiv);

            // Agregar evento de clic para mostrar detalles
            eventDiv.addEventListener('click', () => mostrarInformacionCarrera(event));
        });
    } else {
        const noEventsMessage = document.createElement('p');
        noEventsMessage.textContent = 'No hay carreras programadas para este mes.';
        container.appendChild(noEventsMessage);
    }

    // Mostrar las carreras pasadas
    if (pastRaces.length > 0) {
        pastRaces.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event-details';

            const title = document.createElement('h3');
            title.textContent = event.nombre;

            const date = document.createElement('p');
            date.textContent = `Fecha: ${event.fecha}`;

            const country = document.createElement('p');
            country.textContent = `País: ${event.pais}`;

            const image = document.createElement('img');
            image.src = event.imagen;
            image.alt = event.nombre;

            const finishedMessage = document.createElement('p');
            finishedMessage.textContent = 'Carrera terminada';

            // Agregar los elementos al contenedor
            eventDiv.appendChild(title);
            eventDiv.appendChild(date);
            //eventDiv.appendChild(country);
            eventDiv.appendChild(image);
            eventDiv.appendChild(finishedMessage);
            container.appendChild(eventDiv);

            // Agregar evento de clic para mostrar detalles
            eventDiv.addEventListener('click', () => mostrarInformacionCarrera(event));
        });
    }
}

// Cargar las carreras del mes actual al cargar la página
document.addEventListener('DOMContentLoaded', showCurrentMonthRaces);

// Función para generar tarjetas de carreras en el contenedor
function generarTarjetasCarreras(carreras) {
    const carrerasMesContainer = document.getElementById('carreras-mes');
    carrerasMesContainer.innerHTML = ''; // Limpiar contenedor
    carreras.forEach(carrera => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-carrera'); // Clase para el estilo de la tarjeta
        tarjeta.innerHTML = `
            <h4>${carrera.nombre}</h4>
            <p>${carrera.fecha}</p>
            <p>${carrera.pais}</p>
        `;
        // Agregar evento de clic para mostrar detalles
        tarjeta.addEventListener('click', () => mostrarInformacionCarrera(carrera));
        carrerasMesContainer.appendChild(tarjeta);
    });

    if (carreras.length === 0) {
        carrerasMesContainer.innerHTML = '<p>No hay carreras disponibles para las categorías seleccionadas.</p>';
    }
}


// Función para mostrar información detallada de una carrera
function mostrarInformacionCarrera(carrera) {
    const informacionCarrera = document.getElementById('informacion-carrera');

    // Crear el elemento para la bandera
    const flagDiv = document.createElement('span');
    flagDiv.className = `flag-icon flag-icon-${carrera.code_pais.toLowerCase()}`;
    
    // Calcular la cuenta regresiva en días
    const [day, month, year] = carrera.fecha.split('/').map(Number);
    const eventDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    const timeDifference = eventDate - currentDate;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    let countdownMessage;
    if (daysRemaining > 0) {
        countdownMessage = `<div id="restantes"> <p>${daysRemaining} <br> <strong>Días <br> restantes</strong> </p> </div> `;
    } else {
        countdownMessage = `<div id="atras">
                                <p>${Math.abs(daysRemaining)} <br> <strong>Diás <br> atras</strong></p>
                                <img src="../../img/fin_race.png" alt="Fin">  
                            </div> 
                            <div id="atras-mensaje">
                                <p>La carrera ya ah finalizado!!!</p>
                            </div>
                            
                            `;
    }

    informacionCarrera.innerHTML = `
        <div id="container-fecha">
            <div id="fecha"></div>
        </div>
        <div class="detalle-carrera">

            <div id="titulo-info">
                <h2>${carrera.nombre}</h2>
            </div>
            
            <div id="fecha-info">
                <p><strong></strong> ${carrera.fecha}</p>
            </div>
            
            <div id="pais-info">
                <p><strong></strong> ${carrera.pais}</p>
            </div>

            ${countdownMessage}
        </div>
    `;

    // Agregar la bandera al contenedor de información de la carrera
    informacionCarrera.querySelector('#titulo-info').appendChild(flagDiv);

    mostrarFechaActual(); // Asegurarse de que la fecha se muestre correctamente
}