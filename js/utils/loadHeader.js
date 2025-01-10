// Objetivo: Cargar el header en todas las páginas

document.addEventListener('DOMContentLoaded', function() {
    fetch('../../html/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el header:', error));
});


