import { consultarADD } from "/resources/js/registrosEspecificos";
import { generarFormularioRegistro } from "/resources/js/formulario";
import { cargarComposteras } from "/resources/js/composteras";

let datos = []; // Array para almacenar los datos de la API
let paginaActual = 1; // Página inicial
const boton = document.querySelector('#nuevoRegistro');
const contenedor = document.querySelector("#Datos");
const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente");
const spanPaginaActual = document.querySelector("#paginaActual");
const btnComposteras = document.querySelector("#composteras");

btnComposteras.addEventListener("click", cargarComposteras);

boton.addEventListener("click", generarFormularioRegistro);

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

// Función para cargar datos de una página específica
async function cargarDatos(pagina) {
    try {
        const url = `/api/registros?page=${pagina}&per_page=3`;
        const registros = await consulta(url);
        console.log(registros.meta);
        // Limpiar y actualizar los datos
        datos = [];
        registros.data.forEach(registro => {
            datos.push({
                id: registro.id,
                user_id: registro.user_id,
                compostera_id: registro.compostera_id,
                bolo_id: registro.bolo_id
            });
        });

        // Actualizar la tabla con los nuevos datos
        generarTabla();

        // Actualizar botones de paginación y número de página
        manejarBotones(registros.meta);
    } catch (error) {
        console.error("Error al cargar datos:", error.message);
    }
}

// Función para generar la tabla en el DOM
function generarTabla() {
    // Limpiar el contenedor
    contenedor.innerHTML = "";

    // Crear un fragmento para construir la tabla
    const fragmento = document.createDocumentFragment();

    // Crear la tabla
    const tabla = document.createElement("table");
    tabla.className = "w-full border-collapse border border-gray-300";

    // Crear y agregar cabeceras a la tabla
    const cabecera = document.createElement("thead");
    const filaCabecera = document.createElement("tr");
    filaCabecera.className = "bg-green-500 text-white font-bold";

    const cabeceras = ["ID Registro", "Username", "ID Compostera", "ID Bolo"];
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

// Función para manejar los botones "Siguiente" y "Anterior"
function manejarBotones(meta) {
    btnAnterior.disabled = meta.current_page === 1; // Deshabilitar si está en la primera página
    btnSiguiente.disabled = meta.current_page === meta.last_page; // Deshabilitar si está en la última página
    spanPaginaActual.textContent = meta.current_page; // Actualizar número de página
}

// Eventos de los botones
btnAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        cargarDatos(paginaActual);
    }
});

btnSiguiente.addEventListener("click", () => {
    paginaActual++;
    cargarDatos(paginaActual);
});

// Cargar los datos iniciales
cargarDatos(paginaActual);


export{cargarDatos,generarTabla};