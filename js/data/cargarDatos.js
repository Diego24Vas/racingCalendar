let events = [];  // Almacenaremos todos los eventos de los archivos JSON

// Lista de archivos JSON que queremos cargar
const jsonFiles = [
    '../../json/calendarioF1_2025.json',
    '../../json/calendarioF2_2025.json',  // Asegúrate de que este archivo esté incluido
    '../../json/calendarioFE_2025.json',
    '../../json/calendarioNAS_2025.json',
    '../../json/calendarioINDY_2025.json',
    '../../json/calendarioWRC_2025.json',
    '../../json/calendarioWEC_2025.json'

];

// Cargar todos los archivos JSON y combinar los eventos
Promise.all(jsonFiles.map(file => fetch(file).then(response => response.json())))
  .then(dataArray => {
    // Combinar los eventos de todos los archivos JSON
    dataArray.forEach(data => {
      events = events.concat(data.carreras);  // Asumimos que cada JSON tiene la clave 'carreras'
    });
    console.log('Loaded Events:', events); // Verificar que los eventos se carguen correctamente
    showCurrentMonthRaces();  // Llamar a showCurrentMonthRaces después de cargar los datos
    const today = new Date();
    createCalendar(today.getFullYear(), today.getMonth());
  })
  .catch(error => {
    console.error('Error al cargar los archivos JSON:', error);
  });