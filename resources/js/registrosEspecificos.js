const botonDatos = document

const datos = [];

// Función para consultar datos desde la API
async function consulta(url) {
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            return null; // Lugar no encontrado
        }
        throw new Error("Error en la consulta de la API.");
    }
    return await response.json();
}

// Realizamos la consulta a la API
const registros = await consulta("/api/registros");

// Iterar los datos recibidos y guardarlos en la lista `datos`
registros.data.forEach(registro => {
    datos.push({
        id: registro.id,
        user_id: registro.user_id,
        compostera_id: registro.compostera_id,
        bolo_id: registro.bolo_id
    });
});

// Función para generar la tabla en el DOM
function generarTabla() {
    // Seleccionamos el contenedor donde estará la tabla
    const contenedor = document.querySelector("#Datos");

    // Creamos la tabla
    const tabla = document.createElement("table");
    tabla.style.border = "1px solid black";
    tabla.style.width = "100%";
    tabla.style.borderCollapse = "collapse";

    // Agregar cabeceras a la tabla
    const cabecera = `
        <thead>
            <tr>
                <th style="border: 1px solid black; padding: 8px;">ID Registro</th>
                <th style="border: 1px solid black; padding: 8px;">ID Usuario</th>
                <th style="border: 1px solid black; padding: 8px;">ID Compostera</th>
                <th style="border: 1px solid black; padding: 8px;">ID Bolo</th>
            </tr>
        </thead>
    `;
    tabla.innerHTML += cabecera;

    // Agregar los datos como filas
    const cuerpo = document.createElement("tbody");
    datos.forEach(dato => {
        const fila = `
            <tr id="${dato.id}">
                <td style="border: 1px solid black; padding: 8px;">${dato.id}</td>
                <td style="border: 1px solid black; padding: 8px;">${dato.user_id}</td>
                <td style="border: 1px solid black; padding: 8px;">${dato.compostera_id}</td>
                <td style="border: 1px solid black; padding: 8px;">${dato.bolo_id}</td>
            </tr>
        `;
        cuerpo.innerHTML += fila;
    });
    tabla.appendChild(cuerpo);

    // Agregar la tabla al contenedor
    contenedor.appendChild(tabla);
}

// Seleccionamos el botón y le añadimos un evento
const boton = document.querySelector("#enviardatos");

generarTabla();
