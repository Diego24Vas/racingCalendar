// Dependencias: flag-icon-css
// Obtiene los datos de las carreras de F1 y muestra las banderas de los países en la página

document.addEventListener('DOMContentLoaded', () => {
  fetch('../json/calendarioF1_2025.json')
    .then(response => response.json())
    .then(data => {
      // Obtenemos el contenedor donde se mostrarán las banderas
      const container = document.getElementById('banderas-container');
      data.carreras.forEach(carrera => {
        // Creamos un elemento para mostrar la bandera 
        const carreraElement = document.createElement('p');
        carreraElement.innerHTML = `${carrera.nombre}: <span class="flag-icon flag-icon-${carrera.code_pais.toLowerCase()}"></span>`;
        container.appendChild(carreraElement);    // Agregamos el elemento al contenedor
      });
    })

    // Mostrar un mensaje de error si no se puede cargar el archivo JSON
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
});