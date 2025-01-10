document.addEventListener('DOMContentLoaded', function() {
    const filtroButton = document.getElementById('filtro');
    const dropdownMenu = document.getElementById('dropdown-menu');

    filtroButton.addEventListener('click', function(event) {
        event.stopPropagation(); 
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        } else {
            dropdownMenu.style.display = 'block';
        }
    });

    document.addEventListener('click', function(event) {
        if (!filtroButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});
