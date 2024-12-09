import {consultarRegistrosCiclo, generarTablasRegistrosCiclo} from "/resources/js/registrosCiclos";

const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente");
const spanPaginaActual = document.querySelector("#paginaActual");
const token = sessionStorage.getItem("token");


async function consulta(url) { // Reemplaza con tu token real

    const response = await fetch(url, {
        method: "GET", // O el método que necesites (por defecto es GET)
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json", // Opcional, si estás enviando o esperando JSON
        },
    });

    if (!response.ok) {
        if (response.status === 404) {
            return null; // Lugar no encontrado
        }
        throw new Error("Error en la consulta de la API.");
    }
    return await response.json();
}


// Función para consultar y generar las tablas
async function consultarCiclosBolo(e) {
    e.preventDefault();
    let ciclos = [];
    let id = e.target.textContent;

    // Consulta y filtra registros de 'antes'
    const registros = await consulta(`/api/bolos/${id}/ciclos`);
    console.log(registros);
    registros.data.forEach(registro => {
        ciclos.push({
            id: registro.id,
            fecha_inicio: registro.fecha_inicio,
            fecha_fin: registro.fecha_fin,
            terminado: registro.terminado,
            compostera_id: registro.compostera_id,
        });
    });
    generarTablasCiclos(ciclos)
}

// Función para generar las tablas en el DOM
function generarTablasCiclos(ciclos) {
    // Ocultar botones de paginación y limpiar el contenedor
    btnAnterior.classList.add("hidden");
    btnSiguiente.classList.add("hidden");
    spanPaginaActual.classList.add("hidden");
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear un contenedor para hacer la tabla responsive
    const tablaWrapper = document.createElement("div");
    tablaWrapper.className = "overflow-x-auto mt-8 px-4"; // Márgenes laterales y superior añadidos

    // Crear la tabla
    const tabla = document.createElement("table");
    tabla.className = "w-full border-collapse border border-gray-300 rounded-lg shadow-lg"; // Bordes redondeados y sombra

    // Crear y agregar cabeceras a la tabla
    const cabecera = document.createElement("thead");
    const filaCabecera = document.createElement("tr");
    filaCabecera.className = "bg-green-500 text-white font-bold"; // Fondo verde claro y texto blanco

    const cabeceras = ["Ciclo ID", "Fecha Inicio", "Fecha Fin", "Terminado", "Tipo Compostera"];
    cabeceras.forEach((texto) => {
        const th = document.createElement("th");
        th.className = "border border-gray-300 px-4 py-2 text-center"; // Centramos cabeceras
        th.textContent = texto;
        filaCabecera.appendChild(th);
    });
    cabecera.appendChild(filaCabecera);
    tabla.appendChild(cabecera);

    // Crear cuerpo de la tabla
    const cuerpo = document.createElement("tbody");
    ciclos.forEach((registro) => {
        const fila = document.createElement("tr");

        // Crear celda para ciclo_id con enlace
        const celdaCicloId = document.createElement("td");
        celdaCicloId.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
        const enlace = document.createElement("a");
        enlace.textContent = registro.id;
        enlace.href = "#";
        enlace.className = "text-blue-600 hover:underline"; // Enlace azul subrayado al pasar el cursor
        enlace.addEventListener("click", consultarRegistrosCiclo);
        celdaCicloId.appendChild(enlace);
        fila.appendChild(celdaCicloId);

        // Crear las demás celdas
        const celdas = [
            registro.fecha_inicio,
            registro.fecha_fin || "N/A", // Mostrar "N/A" si no hay fecha de fin
            registro.terminado ? "Sí" : "No",
        ];

        celdas.forEach((valor) => {
            const celda = document.createElement("td");
            celda.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        // Determinar el tipo de compostera
        const tipoCompostera = registro.compostera_id === 1
            ? "Aporte"
            : registro.compostera_id === 2
            ? "Degradación"
            : "Maduración";

        const celdaTipoCompostera = document.createElement("td");
        celdaTipoCompostera.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
        celdaTipoCompostera.textContent = tipoCompostera;
        fila.appendChild(celdaTipoCompostera);

        cuerpo.appendChild(fila);
    });

    // Agregar el cuerpo a la tabla
    tabla.appendChild(cuerpo);

    // Envolver la tabla en el contenedor responsivo
    tablaWrapper.appendChild(tabla);

    // Agregar el contenedor responsivo al contenedor principal
    contenedor.appendChild(tablaWrapper);
}








export {consultarCiclosBolo, generarTablasCiclos};
