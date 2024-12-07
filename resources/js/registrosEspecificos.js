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
async function consultarADD(e) {
    e.preventDefault();

    let antes = [];
    let durante = [];
    let despues = [];
    let id = e.target.textContent;

    // Consulta y filtra registros de 'antes'
    const registros = await consulta(`/api/registros/${id}/antes`);
    console.log(registros);
    registros.data.forEach(registro => {
        antes.push({
            registro_id: registro.registro_id,
            temperaturaAmbiental: registro.temperaturaAmbiental,
            temperaturaCompostera: registro.temperaturaCompostera,
            nivelLlenadoInicial: registro.nivelLlenadoInicial,
            olor: registro.olor,
            insectos: registro.insectos,
            humedad: registro.humedad,
            observacion: registro.observacion,
        });
    });
    console.log(antes);

    // Consulta y filtra registros de 'durante'
    const registros2 = await consulta(`/api/registros/${id}/durantes`);
    registros2.data.forEach(registro => {
        durante.push({
            registro_id: registro.registro_id,
            revolver: registro.revolver,
            aporte_verde: registro.aporte_verde,
            tipo_aporte_verde: registro.tipo_aporte_verde,
            aporte_seco: registro.aporte_seco,
            tipo_aporte_seco: registro.tipo_aporte_seco,
            observacion: registro.observacion,
        });
    });
    console.log(durante);

    // Consulta y filtra registros de 'despues'
    const registros3 = await consulta(`/api/registros/${id}/despues`);
    registros3.data.forEach(registro => {
        despues.push({
            registro_id: registro.registro_id,
            nivelLlenadoFinal: registro.nivelLlenadoFinal,
            observacion: registro.observacion,
        });
    });
    console.log(despues);

    // Generar las tablas con los datos filtrados
    generarTablasRegistros(antes, durante, despues);
}

// Función para generar las tablas en el DOM
function generarTablasRegistros(antes, durante, despues) {
    // Seleccionamos el contenedor donde estarán las tablas
    btnAnterior.classList.add("hidden");
    btnSiguiente.classList.add("hidden");
    spanPaginaActual.classList.add("hidden");
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Añadimos padding lateral al contenedor
    contenedor.className = "px-6"; // Ajusta el padding según necesidad

    // Función para crear una tabla
    function crearTabla(datos, cabeceraTexto) {
        // Crear un fragmento para optimizar la manipulación del DOM
        const fragmento = document.createDocumentFragment();

        // Crear la tabla y configurarla
        const tabla = document.createElement("table");
        tabla.style.border = "1px solid gray"; // Líneas grises
        tabla.style.width = "100%";
        tabla.style.borderCollapse = "collapse";
        tabla.style.marginBottom = "20px"; // Espaciado entre tablas

        // Crear y agregar cabecera
        const cabecera = document.createElement("thead");
        const filaCabecera = document.createElement("tr");
        cabeceraTexto.forEach((texto) => {
            const th = document.createElement("th");
            th.textContent = texto;
            th.style.border = "1px solid gray"; // Líneas grises
            th.style.padding = "8px";
            th.style.backgroundColor = "#32CD32"; // Fondo verde claro
            th.style.color = "white"; // Texto blanco
            th.style.textAlign = "center"; // Centrar texto
            filaCabecera.appendChild(th);
        });
        cabecera.appendChild(filaCabecera);
        tabla.appendChild(cabecera);

        // Crear y agregar cuerpo de la tabla
        const cuerpo = document.createElement("tbody");
        datos.forEach((dato) => {
            const fila = document.createElement("tr");
            Object.values(dato).forEach((valor) => {
                const celda = document.createElement("td");
                celda.textContent = valor || "No registrado"; // Reemplazar valores vacíos
                celda.style.border = "1px solid gray"; // Líneas grises
                celda.style.padding = "8px";
                celda.style.textAlign = "center"; // Centrar texto
                fila.appendChild(celda);
            });
            cuerpo.appendChild(fila);
        });
        tabla.appendChild(cuerpo);

        // Agregar la tabla al fragmento
        fragmento.appendChild(tabla);

        return fragmento;
    }

    // Función para crear un título antes de cada tabla
    function crearTitulo(texto) {
        const titulo = document.createElement("h3");
        titulo.textContent = texto;
        titulo.style.margin = "20px 0 10px";
        titulo.style.fontSize = "1.5rem";
        titulo.style.color = "#333";
        return titulo;
    }

    // Crear y agregar la tabla de 'antes'
    contenedor.appendChild(crearTitulo("Datos de antes del Registro"));
    const cabeceraAntes = [
        "ID Registro",
        "Temperatura Ambiental",
        "Temperatura Compostera",
        "Nivel Llenado Inicial",
        "Olor",
        "Insectos",
        "Humedad",
        "Observación",
    ];
    const tablaAntes = crearTabla(antes, cabeceraAntes);
    contenedor.appendChild(tablaAntes);

    // Crear y agregar la tabla de 'durante'
    contenedor.appendChild(crearTitulo("Datos durante el Registro"));
    const cabeceraDurante = [
        "ID Registro",
        "Revolver",
        "Aporte Verde",
        "Tipo Aporte Verde",
        "Aporte Seco",
        "Tipo Aporte Seco",
        "Observación",
    ];
    const tablaDurante = crearTabla(durante, cabeceraDurante);
    contenedor.appendChild(tablaDurante);

    // Crear y agregar la tabla de 'después'
    contenedor.appendChild(crearTitulo("Datos después del Registro"));
    const cabeceraDespues = ["ID Registro", "Nivel Llenado Final", "Observación"];
    const tablaDespues = crearTabla(despues, cabeceraDespues);
    contenedor.appendChild(tablaDespues);

    // Crear y agregar el botón de edición
    const botonEditarWrapper = document.createElement("div");
    botonEditarWrapper.className = "flex justify-center mt-4"; // Centrar el botón

    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar Datos";
    botonEditar.className =
        "bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700";
    botonEditar.addEventListener("click", () => {
        console.log("Editar datos presionado.");
        // Aquí puedes agregar la lógica para editar los datos
    });

    botonEditarWrapper.appendChild(botonEditar);
    contenedor.appendChild(botonEditarWrapper);
}





export {consultarADD, generarTablasRegistros};
