document.addEventListener('DOMContentLoaded', () => {
  fetch('../json/calendarioF1_2025.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('banderas-container');
      data.carreras.forEach(carrera => {
        const carreraElement = document.createElement('p');
        carreraElement.innerHTML = `${carrera.nombre}: <span class="flag-icon flag-icon-${carrera.codigo_pais.toLowerCase()}"></span>`;
        container.appendChild(carreraElement);
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
});