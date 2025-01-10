// Objetivo: Cargar el filtro en la página de inicio

document.addEventListener('DOMContentLoaded', function() {
    fetch('../html/filtro.html')
        .then(response => response.text())
        .then(data => {
            // Mostramos el filtro en la página
            document.getElementById('menu-filtro').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el filtro:', error));
});


