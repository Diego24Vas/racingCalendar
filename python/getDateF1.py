import requests
from bs4 import BeautifulSoup
import json

url = 'https://www.formula1.com/en/latest/article/fia-and-formula-1-announces-calendar-for-2025.48ii9hOMGxuOJnjLgpA5qS'
respuesta = requests.get(url)

if respuesta.status_code == 200:
    soup = BeautifulSoup(respuesta.text, 'html.parser')
    print("Título de la página:", soup.title.string)

    # Buscar elementos <td> con la clase específica
    celdas = soup.find_all('td', class_='p-[15px] font-titillium text-15 text-gray60 break-words text-left')

    # Extraer texto de cada celda
    textos = [celda.get_text(strip=True) for celda in celdas]

    # Diccionario para convertir nombres de meses a números
    meses = {
        "January": "01", "February": "02", "March": "03", "April": "04",
        "May": "05", "June": "06", "July": "07", "August": "08",
        "September": "09", "October": "10", "November": "11", "December": "12"
    }

    # Dividir en grupos de 3 y asignar etiquetas
    carreras = []
    for i in range(0, len(textos), 3):
        grupo = textos[i:i+3]
        if len(grupo) == 3:  # Asegurarse de que el grupo tenga 3 elementos
            fecha_texto, pais, circuito = grupo

            # Procesar la fecha para convertirla a formato DD/MM/2025
            try:
                partes_fecha = fecha_texto.split(" ")  # Dividir por espacio
                if len(partes_fecha) == 2:
                    rango_dias = partes_fecha[1]  # Ejemplo: "11-13"
                    mes_nombre = partes_fecha[0]  # Ejemplo: "April"
                    dia_final = rango_dias.split("-")[-1]  # Último día del rango
                    mes_numero = meses[mes_nombre]  # Convertir mes a número
                    fecha_formateada = f"{dia_final}/{mes_numero}/2025"
                else:
                    fecha_formateada = "Fecha inválida"  # No tiene el formato esperado
            except (ValueError, KeyError):
                fecha_formateada = "Fecha inválida"

            # Agregar al listado de carreras
            carreras.append({"fecha": fecha_formateada, "pais": pais, "circuito": circuito})

    # Crear la estructura del JSON
    calendario = {
        "temporada": "Formula 1 World Championship 2025",
        "carreras": carreras
    }

    # Guardar los datos en un archivo JSON
    with open('calendarioF1_2025.json', 'w', encoding='utf-8') as archivo_json:
        json.dump(calendario, archivo_json, ensure_ascii=False, indent=4)

    print("Datos guardados en 'calendario_f1_2025.json'.")

else:
    print("Error en la petición:", respuesta.status_code)
