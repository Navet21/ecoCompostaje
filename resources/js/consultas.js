const datos = [];

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

const centro = await consulta("http://ecocompostaje.test/api/centros");

console.log(centro.data);

const boton = document.querySelector("#enviardatos");
const mostrarDatos = document.querySelector("#DatosCentro");

function enseñarInstituto(){
    mostrarDatos.innerHTML=`<p>${centro.data[0].nombre}</p>`
}

boton.addEventListener("click",enseñarInstituto);