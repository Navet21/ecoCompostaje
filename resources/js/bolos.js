import { consulta } from "/resources/js/composteras";
import { manejarBotones } from "/resources/js/registros";

let datos = [];
const contenedor = document.querySelector("#Datos");
const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente");
const spanPaginaActual = document.querySelector("#paginaActual");

export async function cargarBolos(pagina) {
    try {
        const url = `/api/bolos?page=${pagina}&per_page=20`;
        const registros = await consulta(url);
        console.log(registros.meta);
        // Limpiar y actualizar los datos
        datos = [];
        registros.data.forEach(registro => {
            datos.push({
                id: registro.id,
                nombre: registro.nombre,
                datos_relevantes: registro.datos_relevantes,
                ciclo1: registro.ciclo1,
                ciclo2: registro.ciclo2,
                ciclo3: registro.ciclo3,
                terminado: registro.terminado,
                fecha_inicio : registro.created_at
            });
        });

        //Actualizar la tabla con los nuevos datos
        generarTablaBolos();


        // Actualizar botones de paginación y número de página
        manejarBotones(registros.meta);
    } catch (error) {
        console.error("Error al cargar datos:", error.message);
    }
}

function generarTablaBolos() {
    // Limpiar el contenedor
    contenedor.innerHTML = "";
    btnAnterior.classList.remove("hidden");
    btnSiguiente.classList.remove("hidden");
    spanPaginaActual.classList.remove("hidden");

    // Crear un contenedor para hacer la tabla responsive
    const tablaWrapper = document.createElement("div");
    tablaWrapper.className = "overflow-x-auto";

    // Crear un fragmento para construir la tabla
    const fragmento = document.createDocumentFragment();

    // Crear la tabla
    const tabla = document.createElement("table");
    tabla.className = "w-full border-collapse border border-gray-300";

    // Crear y agregar cabeceras a la tabla
    const cabecera = document.createElement("thead");
    const filaCabecera = document.createElement("tr");
    filaCabecera.className = "bg-green-500 text-black font-bold"; // Fondo verde y texto negro

    const cabeceras = [
        "ID Bolo",
        "Nombre",
        "Datos Relevantes",
        "Ciclo en Curso",
        "Estado",
        "Fecha Inicio"
    ];
    cabeceras.forEach(texto => {
        const th = document.createElement("th");
        th.className = "border border-gray-300 px-4 py-2 text-center"; // Centramos cabeceras
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
        celdaId.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
        celdaId.textContent = dato.id;
        fila.appendChild(celdaId);

        const celdaNombre = document.createElement("td");
        celdaNombre.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
        celdaNombre.textContent = dato.nombre;
        fila.appendChild(celdaNombre);

        const celdaDatosRelevantes = document.createElement("td");
        celdaDatosRelevantes.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
        celdaDatosRelevantes.textContent = dato.datos_relevantes;
        fila.appendChild(celdaDatosRelevantes);

        // Lógica para determinar el Ciclo en Curso
        const celdaCicloEnCurso = document.createElement("td");
        celdaCicloEnCurso.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
        if (dato.ciclo1 && dato.ciclo2 && dato.ciclo3) {
            celdaCicloEnCurso.textContent = "Todos Completados";
        } else if (dato.ciclo1 && dato.ciclo2) {
            celdaCicloEnCurso.textContent = "Ciclo 3";
        } else if (dato.ciclo1) {
            celdaCicloEnCurso.textContent = "Ciclo 2";
        } else {
            celdaCicloEnCurso.textContent = "Ciclo 1";
        }
        fila.appendChild(celdaCicloEnCurso);

        const celdaTerminado = document.createElement("td");
        celdaTerminado.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
        celdaTerminado.textContent = dato.terminado ? "Terminado" : "Abierto";
        fila.appendChild(celdaTerminado);

        // Formatear la fecha
        const fecha = new Date(dato.fecha_inicio);
        const dia = String(fecha.getDate()).padStart(2, "0");
        const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
        const anio = fecha.getFullYear();
        const fechaFormateada = `${dia}-${mes}-${anio}`;

        const celdaFechaInicio = document.createElement("td");
        celdaFechaInicio.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
        celdaFechaInicio.textContent = fechaFormateada;
        fila.appendChild(celdaFechaInicio);

        cuerpo.appendChild(fila);
    });

    // Agregar el cuerpo a la tabla
    tabla.appendChild(cuerpo);

    // Envolver la tabla en el contenedor responsivo
    tablaWrapper.appendChild(tabla);

    // Agregar el contenedor responsivo al fragmento
    fragmento.appendChild(tablaWrapper);

    // Agregar el fragmento al contenedor
    contenedor.appendChild(fragmento);
}



