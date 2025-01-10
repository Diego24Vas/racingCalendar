// Objetivo: Mostrar y ocultar el dropdown de filtros


document.addEventListener('DOMContentLoaded', function() {

    // Obtenemos los elementos del DOM
    const filtroButton = document.getElementById('filtro');
    const dropdownMenu = document.getElementById('dropdown-menu');


    // Mostrar u ocultar el dropdown al hacer clic en el botón
    filtroButton.addEventListener('click', function(event) {
        event.stopPropagation(); 

        // Mostrar u ocultar el dropdown
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        
        // Si el dropdown está oculto, mostrarlo
        } else {
            dropdownMenu.style.display = 'block';
        }
    });

    // Ocultar el dropdown al hacer clic fuera del botón o del menú
    document.addEventListener('click', function(event) {
        if (!filtroButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});
