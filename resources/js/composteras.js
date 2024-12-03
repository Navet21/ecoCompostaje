import { consultarADD } from "/resources/js/registrosEspecificos";
import { generarFormularioRegistro } from "/resources/js/formulario";

let datos = []; // Array para almacenar los datos de la API
const boton = document.querySelector('#nuevoRegistro');
const contenedor = document.querySelector("#Datos");

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
function generarComposteras() {
    // Limpiar el contenedor
    contenedor.innerHTML = "";

    // Crear un fragmento para construir la tabla
    const fragmento = document.createDocumentFragment();

    // Crear y agregar las cards 
    datos.forEach(dato => { 
        const card = document.createElement("div"); 
        card.className = "bg-white shadow-md rounded-lg p-4 border border-gray-300 w-60 flex justify-between items-center";

        const contenido = document.createElement("div");
        const tipo = document.createElement("h2"); 
        tipo.className = "text-xl font-bold mb-2"; 
        tipo.textContent = `Tipo: ${dato.tipo}`; 
        card.appendChild(tipo); 
        
        const centroId = document.createElement("p"); 
        centroId.className = "text-gray-700"; 
        centroId.textContent = `Centro ID: ${dato.centro_id}`; 
        card.appendChild(centroId); 

        const boton = document.createElement("button"); 
        boton.className = "bg-green-500 text-white px-4 py-2 rounded"; 
        boton.textContent = "Nuevo Registro";
        boton.addEventListener("click", () => { console.log("Botón clicado en la tarjeta de", dato.tipo); }); card.appendChild(contenido); card.appendChild(boton); fragmento.appendChild(card);
        card.appendChild(contenido);
        card.appendChild(boton);
        
        fragmento.appendChild(card); });

    // Agregar el fragmento al contenedor
    contenedor.appendChild(fragmento);
}

async function cargarComposteras() {
    try {
        const url = `/api/composteras`;
        const registros = await consulta(url);
        // Limpiar y actualizar los datos
        datos = [];
        registros.data.forEach(registro => {
            datos.push({
                tipo: registro.tipo,
                centro_id: registro.centro_id,
            });
        });

        // Actualizar la tabla con los nuevos datos
        generarComposteras();

    } catch (error) {
        console.error("Error al cargar datos:", error.message);
    }
}




export {cargarComposteras};