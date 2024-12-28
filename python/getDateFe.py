import requests
from bs4 import BeautifulSoup
import json

# URL de la página
url = "https://lat.motorsport.com/formula-e/schedule/2025/"

# Realizar la solicitud
resultados = requests.get(url)

# Comprobar si la solicitud fue exitosa
if resultados.status_code == 200:
    soup = BeautifulSoup(resultados.text, 'html.parser')

    # Extraer todos los eventos y fechas
    eventos = soup.find_all('div', class_="ms-schedule-table-item-main__event")
    fechas = soup.find_all('div', class_="ms-schedule-table-date ms-schedule-table-date--local")

    # Diccionario final
    datos_f1 = {
        "temporada": "Formula E World Championship 2025",
        "carreras": []
    }

    if len(eventos) == len(fechas):
        for evento, fecha in zip(eventos, fechas):
            # Extraer el texto del evento y la fecha
            nombre_evento = evento.get_text(strip=True) if evento else "N/A"
            fecha_evento = fecha.get_text(strip=True) if fecha else "N/A"

            # Agregar datos al diccionario
            datos_f1["carreras"].append({
                "nombre": nombre_evento,
                "fecha": fecha_evento,
                "pais": "N/A",  # Puede ser agregado si se obtiene de otra parte del HTML
                "circuito": "N/A",  # Puede ser agregado si se obtiene de otra parte del HTML
                "imagen": "../img/fe.png"  # Imagen predeterminada
            })

        # Guardar los datos en un archivo JSON
        with open('f1_schedule_2025.json', 'w', encoding='utf-8') as f:
            json.dump(datos_f1, f, ensure_ascii=False, indent=4)

        print("Archivo JSON generado con éxito: f1_schedule_2025.json")
    else:
        print("La cantidad de eventos y fechas no coincide. Verifica la estructura HTML de la página.")

else:
    print(f"Error en la petición: Código de estado {resultados.status_code}")
