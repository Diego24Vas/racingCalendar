// Función para cargar el header desde un archivo HTML externo
function loadHeader() {
    fetch('../html/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el header:', error));
}

// Llamar a la función para cargar el header cuando la página se carga
window.onload = loadHeader;


