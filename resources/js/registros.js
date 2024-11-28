import {consultarADD, generarTablas} from "/resources/js/registrosEspecificos";

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

    // Limpiamos el contenedor antes de agregar la tabla
    contenedor.innerHTML = "";

    // Creamos un fragmento para construir la tabla
    const fragmento = document.createDocumentFragment();

    // Creamos la tabla
    const tabla = document.createElement("table");
    tabla.className = "w-full border-collapse border border-gray-300";

    // Crear y agregar cabeceras a la tabla
    const cabecera = document.createElement("thead");
    const filaCabecera = document.createElement("tr");
    filaCabecera.className = "bg-green-500 text-white font-bold"; // Cabecera verde claro con texto blanco

    const cabeceras = ["ID Registro", "ID Usuario", "ID Compostera", "ID Bolo"];
    cabeceras.forEach(texto => {
        const th = document.createElement("th");
        th.className = "border border-gray-300 px-4 py-2 text-left";
        th.textContent = texto;
        filaCabecera.appendChild(th);
    });
    cabecera.appendChild(filaCabecera);
    tabla.appendChild(cabecera);

    // Crear cuerpo de la tabla
    const cuerpo = document.createElement("tbody");
    datos.forEach(dato => {
        const fila = document.createElement("tr");

        const celdaId = document.createElement("td");
        celdaId.className = "border border-gray-300 px-4 py-2";
        const enlace = document.createElement("a");
        enlace.id = dato.id;
        enlace.href = "#";
        enlace.textContent = dato.id;
        enlace.className = "text-blue-600 hover:underline";
        enlace.addEventListener("click", consultarADD);
        celdaId.appendChild(enlace);
        fila.appendChild(celdaId);

        const celdaUserId = document.createElement("td");
        celdaUserId.className = "border border-gray-300 px-4 py-2";
        celdaUserId.textContent = dato.user_id;
        fila.appendChild(celdaUserId);

        const celdaComposteraId = document.createElement("td");
        celdaComposteraId.className = "border border-gray-300 px-4 py-2";
        celdaComposteraId.textContent = dato.compostera_id;
        fila.appendChild(celdaComposteraId);

        const celdaBoloId = document.createElement("td");
        celdaBoloId.className = "border border-gray-300 px-4 py-2";
        celdaBoloId.textContent = dato.bolo_id;
        fila.appendChild(celdaBoloId);

        cuerpo.appendChild(fila);
    });

    // Agregar el cuerpo a la tabla
    tabla.appendChild(cuerpo);

    // Agregar la tabla al fragmento
    fragmento.appendChild(tabla);

    // Agregar el fragmento al contenedor
    contenedor.appendChild(fragmento);
}




generarTabla();
