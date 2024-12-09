import { generarComposteras } from "./composteras";
import { cargarComposteras } from "/resources/js/composteras";


const token = sessionStorage.getItem("token");
const paginacion = document.querySelector('#paginacion');
let datosBolo ={};
let datosCiclo ={};
let datosFormularioRegistro = {}; // Objeto para almacenar los datos del primer formulario
let datosFormularioAntes = {};
let datosFormularioDespues = {};
let datosFormularioDurante = {};
let compostera_id ;
const contenedor = document.querySelector("#Datos");
const user_id = sessionStorage.getItem('idUsuario');

export function generarFormularioBolo(compostera_seleccionada) {
    compostera_id = compostera_seleccionada;
    if (compostera_id == 1) {
        console.log(compostera_id);
        contenedor.innerHTML = "";
<<<<<<< HEAD
        
=======

        // Contenedor del formulario
        const formularioWrapper = document.createElement("div");
        formularioWrapper.classList.add(
            "max-w-md", // Ancho máximo del formulario
            "mx-auto", // Centramos horizontalmente
            "mt-8", // Margen superior
            "p-6", // Espaciado interno
            "bg-white", // Fondo blanco
            "rounded-lg", // Bordes redondeados
            "shadow-xl", // Sombra más destacada
            "relative" // Posición relativa para manejo de sombras
        );

        // Añadir sombra adicional a los lados
        formularioWrapper.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";

        // Label y input para el nombre del bolo
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
        const labelNombreBolo = document.createElement("label");
        labelNombreBolo.textContent = "Nombre del bolo:";
        labelNombreBolo.classList.add(
            "block",
            "text-gray-700",
            "text-sm",
            "font-bold",
            "mb-2"
        );
        formularioWrapper.appendChild(labelNombreBolo);

        const inputNombreBolo = document.createElement("input");
        inputNombreBolo.type = "text";
        if(Object.keys(datosBolo).length > 0){
            inputNombreBolo.value = datosBolo.nombre;
        }
        else{
            inputNombreBolo.placeholder = "Nombre del bolo";
        }
        inputNombreBolo.classList.add(
            "shadow",
            "appearance-none",
            "border",
            "rounded",
            "w-full",
            "py-2",
            "px-3",
            "text-gray-700",
            "leading-tight",
            "focus:outline-none",
            "focus:shadow-outline"
        );
        formularioWrapper.appendChild(inputNombreBolo);

<<<<<<< HEAD
=======
        // Espaciado entre el input del nombre y el siguiente label
        const spacer = document.createElement("div");
        spacer.classList.add("mt-4"); // Espaciado adicional
        formularioWrapper.appendChild(spacer);

        // Label y textarea para la descripción del bolo
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
        const labelDescripcionBolo = document.createElement("label");
        labelDescripcionBolo.textContent = "Descripción del bolo:";
        labelDescripcionBolo.classList.add(
            "block",
            "text-gray-700",
            "text-sm",
            "font-bold",
            "mb-2"
        );
        formularioWrapper.appendChild(labelDescripcionBolo);

        const inputDescripcionBolo = document.createElement("textarea");
<<<<<<< HEAD
        inputDescripcionBolo.placeholder = "Descripción del bolo";
=======
        if(Object.keys(datosBolo).length > 0){
            inputDescripcionBolo.value = datosBolo.datos_relevantes;
        }
        else{
            inputDescripcionBolo.placeholder = "Descripción del bolo";
        }
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
        inputDescripcionBolo.classList.add(
            "shadow",
            "appearance-none",
            "border",
            "rounded",
            "w-full",
            "py-2",
            "px-3",
            "text-gray-700",
            "leading-tight",
            "focus:outline-none",
            "focus:shadow-outline"
        );
<<<<<<< HEAD
        contenedor.appendChild(inputDescripcionBolo);
=======
        formularioWrapper.appendChild(inputDescripcionBolo);
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950

        // Contenedor para los botones
        const botonesWrapper = document.createElement("div");
        botonesWrapper.classList.add("flex", "justify-between", "mt-6");

        // Botón de "Atrás"
        const botonAtras = document.createElement("button");
        botonAtras.type = "button";
        botonAtras.textContent = "Atrás";
        botonAtras.classList.add(
            "bg-gray-500",
            "hover:bg-gray-700",
            "text-white",
            "font-bold",
            "py-2",
            "px-4",
            "rounded",
            "focus:outline-none",
            "focus:shadow-outline",
            "border",
            "border-gray-600"
        );
        botonesWrapper.appendChild(botonAtras);

        // Botón de "Siguiente"
        const botonSiguiente = document.createElement("button");
        botonSiguiente.type = "button";
        botonSiguiente.textContent = "Siguiente";
        botonSiguiente.classList.add(
            "bg-green-500",
            "hover:bg-green-700",
            "text-white",
            "font-bold",
            "py-2",
            "px-4",
            "rounded",
            "focus:outline-none",
            "focus:shadow-outline",
            "mt-4"
        );
<<<<<<< HEAD
        contenedor.appendChild(botonSiguiente);

        botonSiguiente.addEventListener("click", () => {
            datosBolo = {
                nombre: document.querySelector("input[placeholder='Nombre del bolo']").value,
                datos_relevantes: document.querySelector("textarea[placeholder='Descripción del bolo']").value
=======
        botonesWrapper.appendChild(botonSiguiente);

        // Añadimos los botones al formulario
        formularioWrapper.appendChild(botonesWrapper);

        // Agregamos el formulario al contenedor principal
        contenedor.appendChild(formularioWrapper);

        // Evento para el botón "Siguiente"
        botonSiguiente.addEventListener("click", () => {
            datosBolo = {
                nombre: inputNombreBolo.value,
                datos_relevantes: inputDescripcionBolo.value,
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
            };
            console.log(datosBolo);
            generarFormularioAntes(compostera_id);
        });
<<<<<<< HEAD
=======
        botonAtras.addEventListener("click",() => {
            generarComposteras();
        })
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
    }
}


<<<<<<< HEAD
export function generarFormularioAntes(compostera_seleccionada) {
    compostera_id = compostera_seleccionada;
=======

export function generarFormularioAntes(compostera_seleccionada) {
    compostera_id = compostera_seleccionada;

    // Seleccionamos el contenedor donde estará el formulario
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = "";

<<<<<<< HEAD
=======
    // Crear un contenedor para el formulario
    const formularioWrapper = document.createElement("div");
    formularioWrapper.classList.add(
        "max-w-md", // Ancho máximo del formulario
        "mx-auto", // Centramos horizontalmente
        "mt-8", // Margen superior
        "p-6", // Espaciado interno
        "bg-white", // Fondo blanco
        "rounded-lg", // Bordes redondeados
        "shadow-xl" // Sombra destacada
    );

    // Añadir un título al formulario
    const tituloFormulario = document.createElement("h2");
    tituloFormulario.textContent = "Formulario: Datos Iniciales";
    tituloFormulario.classList.add("text-xl", "font-bold", "text-gray-700", "mb-6");
    formularioWrapper.appendChild(tituloFormulario);

    // Crear el formulario
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
    const formulario = document.createElement("form");
    formulario.classList.add("space-y-4");

    const campos = [
        { label: "Temperatura Ambiental:", type: "number", name: "temperaturaAmbiental" },
        { label: "Temperatura Compostera:", type: "number", name: "temperaturaCompostera" },
        { label: "Nivel Llenado Inicial:", type: "select", name: "nivelLlenadoInicial", options: ['0', '12.5', '25', '37.5', '50', '67.5', '75', '87.5', '100'] },
        { label: "Olor:", type: "select", name: "olor", options: ["Podrido", "Sin olor", "Amoníaco"] },
        { label: "Insectos:", type: "select", name: "insectos", options: ["Sí", "No"] },
        { label: "Humedad:", type: "select", name: "humedad", options: ["Exceso", "Buena", "Defecto"] },
        { label: "Observación:", type: "textarea", name: "observacion" }
    ];

    const inputs = {};

<<<<<<< HEAD
    campos.forEach(campo => {
        const divCampo = document.createElement("div");

        const label = document.createElement("label");
        label.textContent = campo.label;
        label.classList.add("block", "text-gray-700", "text-sm", "font-bold", "mb-2");
        divCampo.appendChild(label);
=======
    campos.forEach((campo) => {
        const label = document.createElement("label");
        label.textContent = campo.label;
        label.classList.add("block", "text-gray-700", "text-sm", "font-bold", "mb-2");
        formulario.appendChild(label);
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950

        let input;
        if (campo.type === "select") {
            input = document.createElement("select");
<<<<<<< HEAD
            input.classList.add("block", "w-full", "bg-white", "border", "border-gray-300", "rounded", "shadow-sm", "focus:outline-none", "focus:shadow-outline");
            campo.options.forEach(option => {
=======
            input.classList.add(
                "shadow",
                "appearance-none",
                "border",
                "rounded",
                "w-full",
                "py-2",
                "px-3",
                "text-gray-700",
                "leading-tight",
                "focus:outline-none",
                "focus:shadow-outline"
            );
            campo.options.forEach((option) => {
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                // Verificar si hay datos previos y asignarlos como seleccionados
                if (datosFormularioAntes && datosFormularioAntes[campo.name] === option) {
                    optionElement.selected = true;
                }
                input.appendChild(optionElement);
            });
        } else if (campo.type === "textarea") {
            input = document.createElement("textarea");
            input.classList.add(
                "shadow",
                "appearance-none",
                "border",
                "rounded",
                "w-full",
                "py-2",
                "px-3",
                "text-gray-700",
                "leading-tight",
                "focus:outline-none",
                "focus:shadow-outline"
            );
<<<<<<< HEAD
=======
            // Verificar si hay datos previos y asignarlos
            if (datosFormularioAntes && datosFormularioAntes[campo.name]) {
                input.value = datosFormularioAntes[campo.name];
            }
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
        } else {
            input = document.createElement("input");
            input.type = campo.type;
            input.classList.add(
                "shadow",
                "appearance-none",
                "border",
                "rounded",
                "w-full",
                "py-2",
                "px-3",
                "text-gray-700",
                "leading-tight",
                "focus:outline-none",
                "focus:shadow-outline"
            );
<<<<<<< HEAD
=======
            // Verificar si hay datos previos y asignarlos
            if (datosFormularioAntes && datosFormularioAntes[campo.name]) {
                input.value = datosFormularioAntes[campo.name];
            }
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
        }

        input.name = campo.name;
<<<<<<< HEAD
        inputs[campo.name] = input;
        divCampo.appendChild(input);
        formulario.appendChild(divCampo);
=======
        inputs[campo.name] = input; // Guardar referencia al input
        formulario.appendChild(input);

        // Espaciado entre campos
        const spacer = document.createElement("div");
        spacer.classList.add("mb-4");
        formulario.appendChild(spacer);
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
    });

    // Contenedor de los botones
    const botonesWrapper = document.createElement("div");
    botonesWrapper.classList.add("flex", "justify-between", "mt-6");

    // Botón "Atrás"
    const botonAtras = document.createElement("button");
    botonAtras.type = "button";
    botonAtras.textContent = "Atrás";
<<<<<<< HEAD
    botonAtras.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline");

    const botonSiguiente = document.createElement("button");
    botonSiguiente.type = "button";
    botonSiguiente.textContent = "Siguiente";
    botonSiguiente.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline");

    botonSiguiente.addEventListener("click", function () {
        let temperaturaAmbiental = parseInt(inputs.temperaturaAmbiental.value);
        let temperaturaCompostera = parseInt(inputs.temperaturaCompostera.value);
=======
    botonAtras.classList.add(
        "bg-gray-500",
        "hover:bg-gray-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded",
        "focus:outline-none",
        "focus:shadow-outline",
        "border",
        "border-gray-600"
    );
    botonAtras.addEventListener("click", () => {
        if (Object.keys(datosFormularioAntes).length > 0) {
            generarFormularioBolo(compostera_id, datosBolo);
        } else {
            generarComposteras();
        }
    });

    // Botón "Siguiente"
    const botonSiguiente = document.createElement("button");
    botonSiguiente.type = "button";
    botonSiguiente.textContent = "Siguiente";
    botonSiguiente.classList.add(
        "bg-green-500",
        "hover:bg-green-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded",
        "focus:outline-none",
        "focus:shadow-outline",
        "border",
        "border-green-600"
    );
    botonSiguiente.addEventListener("click", () => {
        // Guardar los datos del formulario en la variable datosFormularioAntes
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
        datosFormularioAntes = {
            temperaturaAmbiental: parseInt(inputs.temperaturaAmbiental.value),
            temperaturaCompostera: parseInt(inputs.temperaturaCompostera.value),
            nivelLlenadoInicial: inputs.nivelLlenadoInicial.value,
            olor: inputs.olor.value,
            insectos: inputs.insectos.value,
            humedad: inputs.humedad.value,
            observacion: inputs.observacion.value
        };
        console.log(datosFormularioAntes);
        generarFormularioDurante(compostera_id);
    });

<<<<<<< HEAD
    botonAtras.addEventListener("click", () => {
        contenedor.innerHTML = "";
        generarFormularioRegistro();
    });

    const divBotones = document.createElement("div");
    divBotones.classList.add("flex", "justify-between");
    divBotones.appendChild(botonAtras);
    divBotones.appendChild(botonSiguiente);

    formulario.appendChild(divBotones);
    contenedor.appendChild(formulario);
=======
    // Agregar los botones al contenedor de botones
    botonesWrapper.appendChild(botonAtras);
    botonesWrapper.appendChild(botonSiguiente);

    // Agregar los botones al formulario
    formulario.appendChild(botonesWrapper);

    // Agregar el formulario al wrapper
    formularioWrapper.appendChild(formulario);

    // Agregar el wrapper al contenedor principal
    contenedor.appendChild(formularioWrapper);
>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
}



<<<<<<< HEAD
=======

>>>>>>> cb2ef23fdc523aff0194b501405ab597a54e6950
function generarFormularioDurante(compostera_seleccionada) {
    compostera_id = compostera_seleccionada;

    // Seleccionar el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear un contenedor para el formulario
    const formularioWrapper = document.createElement("div");
    formularioWrapper.classList.add(
        "max-w-md", // Ancho máximo del formulario
        "mx-auto", // Centramos horizontalmente
        "mt-8", // Margen superior
        "p-6", // Espaciado interno
        "bg-white", // Fondo blanco
        "rounded-lg", // Bordes redondeados
        "shadow-xl" // Sombra destacada
    );

    // Añadir un título al formulario
    const tituloFormulario = document.createElement("h2");
    tituloFormulario.textContent = "Formulario: Datos Durante el Ciclo";
    tituloFormulario.classList.add("text-xl", "font-bold", "text-gray-700", "mb-6");
    formularioWrapper.appendChild(tituloFormulario);

    // Crear el formulario
    const formulario = document.createElement("form");

    // Crear los campos del formulario según las especificaciones
    const campos = [
        { label: "¿Riego?:", type: "select", name: "riego", options: ["Sí", "No"] },
        { label: "¿Revolver?:", type: "select", name: "revolver", options: ["Sí", "No"] },
        { label: "Aporte Verde:", type: "number", name: "aporte_verde" },
        { label: "Tipo de Aporte Verde:", type: "text", name: "tipo_aporte_verde" },
        { label: "Aporte Seco:", type: "number", name: "aporte_seco" },
        { label: "Tipo de Aporte Seco:", type: "text", name: "tipo_aporte_seco" },
        { label: "Observación:", type: "textarea", name: "observacion" }
    ];

    const inputs = {}; // Objeto para almacenar referencias a los inputs

    campos.forEach((campo) => {
        const label = document.createElement("label");
        label.textContent = campo.label;
        label.classList.add("block", "text-gray-700", "text-sm", "font-bold", "mb-2");
        formulario.appendChild(label);

        let input;
        if (campo.type === "select") {
            input = document.createElement("select");
            input.classList.add(
                "shadow",
                "appearance-none",
                "border",
                "rounded",
                "w-full",
                "py-2",
                "px-3",
                "text-gray-700",
                "leading-tight",
                "focus:outline-none",
                "focus:shadow-outline"
            );
            campo.options.forEach((option) => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
        } else if (campo.type === "textarea") {
            input = document.createElement("textarea");
            input.classList.add(
                "shadow",
                "appearance-none",
                "border",
                "rounded",
                "w-full",
                "py-2",
                "px-3",
                "text-gray-700",
                "leading-tight",
                "focus:outline-none",
                "focus:shadow-outline"
            );
        } else {
            input = document.createElement("input");
            input.type = campo.type;
            input.classList.add(
                "shadow",
                "appearance-none",
                "border",
                "rounded",
                "w-full",
                "py-2",
                "px-3",
                "text-gray-700",
                "leading-tight",
                "focus:outline-none",
                "focus:shadow-outline"
            );
        }

        input.name = campo.name;
        inputs[campo.name] = input; // Guardar referencia al input
        formulario.appendChild(input);

        // Espaciado entre campos
        const spacer = document.createElement("div");
        spacer.classList.add("mb-4");
        formulario.appendChild(spacer);
    });

    // Contenedor de los botones
    const botonesWrapper = document.createElement("div");
    botonesWrapper.classList.add("flex", "justify-between", "mt-6");

    // Botón "Atrás"
    const botonAtras = document.createElement("button");
    botonAtras.type = "button";
    botonAtras.textContent = "Atrás";
    botonAtras.classList.add(
        "bg-gray-500",
        "hover:bg-gray-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded",
        "focus:outline-none",
        "focus:shadow-outline",
        "border",
        "border-gray-600"
    );
    botonAtras.addEventListener("click", () => {
        contenedor.innerHTML = "";
        generarFormularioAntes(compostera_id);
    });

    // Botón "Siguiente"
    const botonSiguiente = document.createElement("button");
    botonSiguiente.type = "button";
    botonSiguiente.textContent = "Siguiente";
    botonSiguiente.classList.add(
        "bg-green-500",
        "hover:bg-green-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded",
        "focus:outline-none",
        "focus:shadow-outline",
        "border",
        "border-green-600"
    );
    botonSiguiente.addEventListener("click", function () {
        // Guardar los datos del formulario en la variable datosFormularioDurante
        let aporte_seco = parseInt(inputs.aporte_seco.value);
        let aporte_verde = parseInt(inputs.aporte_verde.value);
        datosFormularioDurante = {
            riego: inputs.riego.value,
            revolver: inputs.revolver.value,
            aporte_verde: aporte_verde || null,
            tipo_aporte_verde: inputs.tipo_aporte_verde.value,
            aporte_seco: aporte_seco || null,
            tipo_aporte_seco: inputs.tipo_aporte_seco.value,
            observacion: inputs.observacion.value
        };
        console.log(datosFormularioDurante);

        // Limpiar el contenedor y generar el siguiente formulario
        generarFormularioDespues(compostera_id); // Debes implementar esta función
    });

    // Agregar los botones al contenedor de botones
    botonesWrapper.appendChild(botonAtras);
    botonesWrapper.appendChild(botonSiguiente);

    // Agregar los botones al formulario
    formulario.appendChild(botonesWrapper);

    // Agregar el formulario al wrapper
    formularioWrapper.appendChild(formulario);

    // Agregar el wrapper al contenedor principal
    contenedor.appendChild(formularioWrapper);
}


function generarFormularioDespues(compostera_seleccionada) {
    compostera_id = compostera_seleccionada;
    // Seleccionar el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear un contenedor para el formulario
    const formularioWrapper = document.createElement("div");
    formularioWrapper.classList.add(
        "max-w-md", // Ancho máximo del formulario
        "mx-auto", // Centramos horizontalmente
        "mt-8", // Margen superior
        "p-6", // Espaciado interno
        "bg-white", // Fondo blanco
        "rounded-lg", // Bordes redondeados
        "shadow-xl" // Sombra destacada
    );

    // Añadir un título al formulario
    const tituloFormulario = document.createElement("h2");
    tituloFormulario.textContent = "Formulario: Datos Finales del Ciclo";
    tituloFormulario.classList.add("text-xl", "font-bold", "text-gray-700", "mb-6");
    formularioWrapper.appendChild(tituloFormulario);

    // Crear el formulario
    const formulario = document.createElement("form");

    // Crear los campos del formulario según las especificaciones
    const campos = [
        {
            label: "Nivel de Llenado Final:",
            type: "select",
            name: "nivelLlenadoFinal",
            options: ["0", "12.5", "25","37.5","50","67.5","75","87.5","100"]
        },
        { label: "Observación:", type: "textarea", name: "observacion" },
        {
            label: "¿Quieres terminar un ciclo?",
            type: "checkbox",
            name: "terminaCiclo"
        }
    ];

    const inputs = {}; // Objeto para almacenar referencias a los inputs

    campos.forEach((campo) => {
        const campoWrapper = document.createElement("div");
        campoWrapper.classList.add("mb-4", "flex", "items-center"); // Espaciado y alineación para el checkbox

        const label = document.createElement("label");
        label.textContent = campo.label;
        label.classList.add("block", "text-gray-700", "text-sm", "font-bold", "mb-2");
        if (campo.type === "checkbox") {
            label.classList.add("ml-2", "text-sm", "font-medium"); // Ajustes específicos para checkbox
        }

        let input;
        if (campo.type === "select") {
            input = document.createElement("select");
            input.classList.add(
                "shadow",
                "appearance-none",
                "border",
                "rounded",
                "w-full",
                "py-2",
                "px-3",
                "text-gray-700",
                "leading-tight",
                "focus:outline-none",
                "focus:shadow-outline"
            );
            campo.options.forEach((option) => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
        } else if (campo.type === "textarea") {
            input = document.createElement("textarea");
            input.classList.add(
                "shadow",
                "appearance-none",
                "border",
                "rounded",
                "w-full",
                "py-2",
                "px-3",
                "text-gray-700",
                "leading-tight",
                "focus:outline-none",
                "focus:shadow-outline"
            );
        } else {
            input = document.createElement("input");
            input.type = campo.type;
            input.classList.add(
                "form-checkbox",
                "h-4",
                "w-4",
                "text-green-600", // Color verde para checkbox
                "transition",
                "duration-150",
                "ease-in-out"
            );
        }

        input.name = campo.name;
        inputs[campo.name] = input; // Guardar referencia al input

        if (campo.type === "checkbox") {
            campoWrapper.appendChild(input);
            campoWrapper.appendChild(label); // Label después del checkbox
        } else {
            campoWrapper.appendChild(label);
            campoWrapper.appendChild(input);
        }

        formulario.appendChild(campoWrapper);
    });

    // Contenedor de los botones
    const botonesWrapper = document.createElement("div");
    botonesWrapper.classList.add("flex", "justify-between", "mt-6");

    // Botón "Atrás"
    const botonAtras = document.createElement("button");
    botonAtras.type = "button";
    botonAtras.textContent = "Atrás";
    botonAtras.classList.add(
        "bg-gray-500",
        "hover:bg-gray-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded",
        "focus:outline-none",
        "focus:shadow-outline",
        "border",
        "border-gray-600"
    );
    botonAtras.addEventListener("click", () => {
        contenedor.innerHTML = "";
        generarFormularioDurante(compostera_id);
    });

    // Botón "Enviar"
    const botonEnviar = document.createElement("button");
    botonEnviar.type = "button";
    botonEnviar.textContent = "Enviar";
    botonEnviar.classList.add(
        "bg-green-500",
        "hover:bg-green-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded",
        "focus:outline-none",
        "focus:shadow-outline",
        "border",
        "border-green-600"
    );
    botonEnviar.addEventListener("click", function () {
        datosFormularioDespues = {
            nivelLlenadoFinal: inputs.nivelLlenadoFinal.value,
            observacion: inputs.observacion.value
        };
        const terminaCiclo = inputs["terminaCiclo"].checked;
        console.log(terminaCiclo);
        console.log(datosFormularioDespues);
        insertarRegistros(
            datosBolo,
            datosFormularioRegistro,
            datosFormularioAntes,
            datosFormularioDurante,
            datosFormularioDespues,
            compostera_id,
            terminaCiclo
        );
    });

    // Agregar los botones al contenedor de botones
    botonesWrapper.appendChild(botonAtras);
    botonesWrapper.appendChild(botonEnviar);

    // Agregar los botones al formulario
    formulario.appendChild(botonesWrapper);

    // Agregar el formulario al wrapper
    formularioWrapper.appendChild(formulario);

    // Agregar el wrapper al contenedor principal
    contenedor.appendChild(formularioWrapper);

    console.log(user_id);
    console.log(datosBolo);
}


function obtenerFechaFormatoCorrecto() {
    const fecha = new Date();
    return fecha.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha (YYYY-MM-DD)
}


//Primero tienes que introducir el registro a la tabla


async function insertarRegistros(datosBolo,datosFormularioRegistro, datosFormularioAntes, datosFormularioDurante, datosFormularioDespues, id_compostera, terminaCiclo) {
    try {
        compostera_id = id_compostera;
        const cicloTerminado = terminaCiclo;

        // Consultar estado actual de la compostera
        const urlCompostera = `/api/composteras/${compostera_id}`;
        const compostera = await consulta(urlCompostera);
        const estadoCompostera = compostera.data.ocupada;

        const obtenerFechaFormatoCorrecto = () => {
            const fecha = new Date();
            return fecha.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha (YYYY-MM-DD)
        };

        if (compostera_id === 1 && !estadoCompostera) {
            if (Object.keys(datosBolo).length > 0) {
                console.log(datosBolo);
                // Insertar bolo
                const urlBolo = '/api/bolos';
                const responseBolo = await fetch(urlBolo, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(datosBolo),
                });

                if (!responseBolo.ok) {
                    throw new Error("Error al insertar el Bolo.");
                }

                const BoloCreado = await responseBolo.json();
                console.log(`Bolo creado con éxito:`, BoloCreado);

                datosCiclo = {
                    fecha_inicio: obtenerFechaFormatoCorrecto(),
                    bolo_id: BoloCreado.data.id,
                    compostera_id: compostera_id,
                };
            }

            // Insertar ciclo
            const urlCiclo = '/api/ciclos';
            const responseCiclo = await fetch(urlCiclo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(datosCiclo),
            });

            if (!responseCiclo.ok) {
                throw new Error("Error al insertar el Ciclo");
            }

            const CicloCreado = await responseCiclo.json();
            console.log(`Ciclo creado con éxito:`, CicloCreado);
        } else if (compostera_id === 2 && !estadoCompostera) {
            console.log("Esta entrando aqui");
            const urlBoloCompostera2 = '/api/bolo/compostera2';
            const boloCompostera2 = await consulta(urlBoloCompostera2);
            console.log(boloCompostera2);
            const idBolo = boloCompostera2.id;
            console.log(`El id del bolo es ${idBolo}`);

            const datosCiclo = {
                fecha_inicio: obtenerFechaFormatoCorrecto(),
                bolo_id: idBolo,
                compostera_id: compostera_id,
            };

            const urlCiclo = '/api/ciclos';
            const responseCiclo = await fetch(urlCiclo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(datosCiclo),
            });

            if (!responseCiclo.ok) {
                throw new Error("Error al insertar el ciclo para compostera 2.");
            }

            const cicloCreado = await responseCiclo.json();
            console.log("Ciclo creado para compostera 2:", cicloCreado);
        } else if (compostera_id === 3 && !estadoCompostera) {
            // Obtener bolo disponible para compostera 3
            const urlBoloCompostera3 = '/api/bolo/compostera3';
            const boloCompostera3 = await consulta(urlBoloCompostera3);
            console.log(boloCompostera3);

            const idBolo = boloCompostera3.id;

            const datosCiclo = {
                fecha_inicio: obtenerFechaFormatoCorrecto(),
                bolo_id: idBolo,
                compostera_id: compostera_id,
            };

            const urlCiclo = '/api/ciclos';
            const responseCiclo = await fetch(urlCiclo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(datosCiclo),
            });

            if (!responseCiclo.ok) {
                throw new Error("Error al insertar el ciclo para compostera 3.");
            }

            const cicloCreado = await responseCiclo.json();
            console.log("Ciclo creado para compostera 3:", cicloCreado);
        }

        // Consultar el último ciclo asociado a la compostera
        const urlConsultaCiclo = `/api/compostera/${id_compostera}/ciclos?limit=100`;
        const todosCiclo = await consulta(urlConsultaCiclo);
        const ultimoCiclo = todosCiclo.data.sort((a, b) => b.id - a.id)[0];

        if (!ultimoCiclo) {
            throw new Error("No se encontró el último Ciclo.");
        }

        const ultimobolo_id = ultimoCiclo.bolo_id;
        const ultimociclo_id = ultimoCiclo.id;

        datosFormularioRegistro = {
            ciclo_id: ultimociclo_id,
            user_id: user_id,
            compostera_id: compostera_id,
        };

        console.log(datosFormularioRegistro);

        // Insertar el registro inicial
        const urlRegistro = '/api/registros';
        const responseRegistro = await fetch(urlRegistro, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosFormularioRegistro),
        });

        if (!responseRegistro.ok) {
            throw new Error("Error al insertar el registro inicial.");
        }

        const registroCreado = await responseRegistro.json();
        console.log('Registro creado con éxito:', registroCreado);

        // Consultar el último registro insertado
        const urlConsultaRegistro = '/api/registro/last';
        const ultimoRegistro = await consulta(urlConsultaRegistro);

        if (!ultimoRegistro) {
            throw new Error("No se encontró el último Registro.");
        }

        const registro_id = ultimoRegistro.id;
        console.log("ID del último Registro:", registro_id);

        // Actualizar formularios con el ID del registro
        datosFormularioAntes.registro_id = registro_id;
        datosFormularioDurante.registro_id = registro_id;
        datosFormularioDespues.registro_id = registro_id;

        // Insertar datos adicionales en las tablas relacionadas
        await insertarTabla('api/antes', datosFormularioAntes, 'antes');
        await insertarTabla('api/durantes', datosFormularioDurante, 'durante');
        await insertarTabla('api/despues', datosFormularioDespues, 'despues');

        //Logica para cerrar bolos y ciclos

        // Finalizar ciclo y bolo si corresponde
        if(cicloTerminado){
            if(id_compostera == 1){
                const urlConsultaCiclo = `/api/compostera/${id_compostera}/ciclos?limit=100`;
                const todosCiclo = await consulta(urlConsultaCiclo);
                const ultimoregistro = todosCiclo.data.filter(ciclo => !ciclo.terminado).sort((a, b) => b.id - a.id)[0];
                const ultimobolo_id = ultimoregistro.bolo_id;
                const ultimociclo_id = ultimoregistro.id;
                console.log("Esta entrando");
                console.log(ultimobolo_id);
                console.log(ultimociclo_id);
                const estado_bolo = {
                    "ciclo1": true
                }
                const estado_ciclo = {
                    "fecha_fin": obtenerFechaFormatoCorrecto(),
                    "terminado": 1,
                }
                const estado_compostera ={
                    "ocupada": false
                }
                console.log("Estado enviado:", JSON.stringify(estado_bolo));
                await cerrarBolo(ultimobolo_id,estado_bolo);
                await cerrarCiclo(ultimociclo_id,estado_ciclo);
                await actualizarEstadoCompostera(compostera_id, estado_compostera) ;
            }
            else if(compostera_id == 2){
                const urlConsultaCiclo = `/api/compostera/${id_compostera}/ciclos?limit=100`;
                const todosCiclo = await consulta(urlConsultaCiclo);
                const ultimoregistro = todosCiclo.data.filter(ciclo => !ciclo.terminado).sort((a, b) => b.id - a.id)[0];
                const ultimobolo_id = ultimoregistro.bolo_id;
                const ultimociclo_id = ultimoregistro.id;
                console.log("Esta entrando");
                console.log(ultimobolo_id);
                console.log(ultimociclo_id);
                const estado_bolo = {
                    "ciclo2": true
                }
                const estado_ciclo = {
                    "fecha_fin": obtenerFechaFormatoCorrecto(),
                    "terminado": 1,
                }
                const estado_compostera ={
                    "ocupada": false
                }
                console.log("Estado enviado:", JSON.stringify(estado_bolo));
                await cerrarBolo(ultimobolo_id,estado_bolo);
                await cerrarCiclo(ultimociclo_id,estado_ciclo);
                await actualizarEstadoCompostera(compostera_id, estado_compostera) ;
            }
            else if(compostera_id == 3){
                console.log("Entra aqui");
                const urlConsultaCiclo = `/api/compostera/${id_compostera}/ciclos?limit=100`;
                const todosCiclo = await consulta(urlConsultaCiclo);
                console.log(todosCiclo);
                const ultimoregistro = todosCiclo.data.filter(ciclo => !ciclo.terminado).sort((a, b) => b.id - a.id)[0];
                const ultimobolo_id = ultimoregistro.bolo_id;
                const ultimociclo_id = ultimoregistro.id;
                console.log("Esta entrando");
                console.log(ultimobolo_id);
                console.log(ultimociclo_id);
                const estado_bolo = {
                    "ciclo3": true,
                    "terminado": true
                }
                const estado_ciclo = {
                    "fecha_fin": obtenerFechaFormatoCorrecto(),
                    "terminado": 1,
                }
                const estado_compostera ={
                    "ocupada": false
                }
                console.log("Estado enviado:", JSON.stringify(estado_bolo));
                await cerrarBolo(ultimobolo_id,estado_bolo);
                await cerrarCiclo(ultimociclo_id,estado_ciclo);
                await actualizarEstadoCompostera(compostera_id, estado_compostera) ;
            }
        }

        // Actualizar compostera si estaba libre
        if (!estadoCompostera) {
            const estado_compostera = { ocupada: true };
            await actualizarEstadoCompostera(compostera_id, estado_compostera);
        }

        cargarComposteras("Has guardado el registro con éxito");
    } catch (error) {
        console.error('Error en el proceso:', error);
    }
}



// Función auxiliar para insertar en una tabla
async function insertarTabla(url, datos, nombreTabla) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos),
    });

    if (!response.ok) {
        throw new Error(`Error al insertar en la tabla '${nombreTabla}'.`);
    }

    const resultado = await response.json();
    console.log(`Éxito en tabla ${nombreTabla}:`, resultado);
}

// Función auxiliar para consultar datos desde la API
async function consulta(url) {
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        if (response.status === 404) {
            return null; // Registro no encontrado
        }
        throw new Error("Error en la consulta de la API.");
    }
    return await response.json();
}

async function actualizarEstadoCompostera(compostera_id, estado_compostera) {
    const urlCambiarestado = `/api/composteras/${compostera_id}`;

    try {
        const response = await fetch(urlCambiarestado, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(estado_compostera),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la compostera');
        }

        const data = await response.json();
        console.log('Compostera actualizada con éxito:', data);
        return data; // Retorna la respuesta si es necesario
    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanza el error para que pueda ser manejado en otro lugar si es necesario
    }
}

async function cerrarBolo(bolo_id,estado_bolo) {
    const urlCerrarBolo = `/api/bolos/${bolo_id}`;
    try {
        const response = await fetch(urlCerrarBolo, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(estado_bolo),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar los datos del bolo');
        }

        const data = await response.json();
        console.log('Bolo actualizado con exito:', data);
        return data; // Retorna la respuesta si es necesario
    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanza el error para que pueda ser manejado en otro lugar si es necesario
    }
}

async function cerrarCiclo(ciclo_id,estado_ciclo) {
    const urlCerrarCiclo = `/api/ciclos/${ciclo_id}`;
    try {
        const response = await fetch(urlCerrarCiclo, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(estado_ciclo),
        });

        if (!response.ok) {
            throw new Error('Error al cerrar el ciclo 1 del bolo');
        }

        const data = await response.json();
        console.log('Ciclo cerrado con exito:', data);
        return data; // Retorna la respuesta si es necesario
    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanza el error para que pueda ser manejado en otro lugar si es necesario
    }
}





