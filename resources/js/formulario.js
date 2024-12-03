import { cargarDatos } from "/resources/js/registros";

const boton = document.querySelector('#nuevoRegistro');
const paginacion = document.querySelector('#paginacion');
let user_id = document.querySelector('#user_id').value;
let nombreBolo;
let datosBolo ={};
let datosCiclo ={};
let datosFormularioRegistro = {}; // Objeto para almacenar los datos del primer formulario
let datosFormularioAntes = {};
let datosFormularioDespues = {};
let datosFormularioDurante = {};

function generarFormularioRegistro() {
    // Ocultar el botón inicial
    boton.classList.add("hidden");
    paginacion.classList.add("hidden");


    // Seleccionar el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el formulario
    const formulario = document.createElement("form");
    formulario.classList.add("bg-white", "shadow-md", "rounded", "px-8", "pt-6", "pb-8", "mb-4");

    // Crear el campo para elegir una compostera
    const labelCompostera = document.createElement("label");
    labelCompostera.textContent = "Elegir una compostera:";
    labelCompostera.classList.add("block", "text-gray-700", "text-sm", "font-bold", "mb-2");
    formulario.appendChild(labelCompostera);

    const selectCompostera = document.createElement("select");
    selectCompostera.classList.add("shadow", "appearance-none", "border", "rounded", "w-full", "py-2", "px-3", "text-gray-700", "leading-tight", "focus:outline-none", "focus:shadow-outline");
    const opcionesCompostera = ["Compostera 1", "Compostera 2", "Compostera 3"];
    opcionesCompostera.forEach(opcionTexto => {
        const opcion = document.createElement("option");
        opcion.value = opcionTexto;
        opcion.textContent = opcionTexto;
        selectCompostera.appendChild(opcion);
    });
    formulario.appendChild(selectCompostera);
    formulario.appendChild(document.createElement("br"));

    // Establecer Compostera 1 como seleccionada por defecto
    selectCompostera.value = "Compostera 1";

    // Crear contenedor dinámico para bolos
    const contenedorBolo = document.createElement("div");
    formulario.appendChild(contenedorBolo);

    // Crear el campo para marcar "Iniciar ciclo"
    const labelCiclo = document.createElement("label");
    labelCiclo.textContent = "Iniciar ciclo:";
    labelCiclo.classList.add("block", "text-gray-700", "text-sm", "font-bold", "mb-2");
    formulario.appendChild(labelCiclo);

    const checkboxCiclo = document.createElement("input");
    checkboxCiclo.type = "checkbox";
    checkboxCiclo.classList.add("mr-2"); // Espaciado ajustado
    formulario.appendChild(checkboxCiclo);

    const textoCiclo = document.createElement("span");
    textoCiclo.textContent = "Marcar si desea iniciar un ciclo";
    textoCiclo.classList.add("text-gray-700", "text-sm", "align-middle");
    formulario.appendChild(textoCiclo);

    formulario.appendChild(document.createElement("br"));

    // Función para actualizar el formulario según la compostera seleccionada
    function actualizarFormulario() {
        contenedorBolo.innerHTML = ""; // Limpiar contenido previo

        if (selectCompostera.value === "Compostera 1") {
            // Mostrar opciones para iniciar un bolo
            const labelBolo = document.createElement("label");
            labelBolo.textContent = "¿Iniciar un bolo?";
            labelBolo.classList.add("block", "text-gray-700", "text-sm", "font-bold", "mb-2");
            contenedorBolo.appendChild(labelBolo);

            const selectBolo = document.createElement("select");
            selectBolo.classList.add("shadow", "appearance-none", "border", "rounded", "w-full", "py-2", "px-3", "text-gray-700", "leading-tight", "focus:outline-none", "focus:shadow-outline");
            const opcionesBolo = ["", "Sí", "No"];
            opcionesBolo.forEach(opcionTexto => {
                const opcion = document.createElement("option");
                opcion.value = opcionTexto;
                opcion.textContent = opcionTexto === "" ? "Seleccione una opción" : opcionTexto;
                selectBolo.appendChild(opcion);
            });
            contenedorBolo.appendChild(selectBolo);

            // Mostrar campos adicionales según la selección del bolo
            selectBolo.addEventListener("change", () => {
                contenedorBolo.innerHTML = ""; // Limpiar contenido previo
                contenedorBolo.appendChild(labelBolo);
                contenedorBolo.appendChild(selectBolo);

                if (selectBolo.value === "Sí") {
                    const labelNombreBolo = document.createElement("label");
                    labelNombreBolo.textContent = "Nombre del bolo:";
                    labelNombreBolo.classList.add("block", "text-gray-700", "text-sm", "font-bold", "mb-2");
                    contenedorBolo.appendChild(labelNombreBolo);

                    const inputNombreBolo = document.createElement("input");
                    inputNombreBolo.type = "text";
                    inputNombreBolo.placeholder = "Nombre del bolo";
                    inputNombreBolo.classList.add("shadow", "appearance-none", "border", "rounded", "w-full", "py-2", "px-3", "text-gray-700", "leading-tight", "focus:outline-none", "focus:shadow-outline");
                    contenedorBolo.appendChild(inputNombreBolo);

                    const labelDescripcionBolo = document.createElement("label");
                    labelDescripcionBolo.textContent = "Descripción del bolo:";
                    labelDescripcionBolo.classList.add("block", "text-gray-700", "text-sm", "font-bold", "mb-2");
                    contenedorBolo.appendChild(labelDescripcionBolo);

                    const inputDescripcionBolo = document.createElement("textarea");
                    inputDescripcionBolo.placeholder = "Descripción del bolo";
                    inputDescripcionBolo.classList.add("shadow", "appearance-none", "border", "rounded", "w-full", "py-2", "px-3", "text-gray-700", "leading-tight", "focus:outline-none", "focus:shadow-outline");
                    contenedorBolo.appendChild(inputDescripcionBolo);
                } else if (selectBolo.value === "No") {
                    const labelPerteneceBolo = document.createElement("label");
                    labelPerteneceBolo.textContent = "¿A qué bolo pertenece?";
                    labelPerteneceBolo.classList.add("block", "text-gray-700", "text-sm", "font-bold", "mb-2");
                    contenedorBolo.appendChild(labelPerteneceBolo);

                    // Crear el select
                    const inputNombreBolo = document.createElement("select");
                    inputNombreBolo.classList.add(
                        "shadow", "appearance-none", "border", "rounded", "w-full", 
                        "py-2", "px-3", "text-gray-700", "leading-tight", 
                        "focus:outline-none", "focus:shadow-outline"
                    );
                    inputNombreBolo.setAttribute("data-placeholder", "Nombre del bolo");

                    // Añadir opción por defecto
                    const opcionDefault = document.createElement("option");
                    opcionDefault.textContent = "Seleccione un bolo";
                    opcionDefault.value = "";
                    opcionDefault.disabled = true;
                    opcionDefault.selected = true;
                    inputNombreBolo.appendChild(opcionDefault);

                // Obtener bolos con 'terminado = false' (simulación)
                    fetch('/api/bolos') // Ruta para obtener bolos desde tu backend
                        .then(response => response.json())
                        .then(bolos => {
                            // Filtrar los bolos cuyo campo 'terminado' sea false
                            const bolosDisponibles = bolos.data.filter(bolo => !bolo.terminado);
                            console.log(bolosDisponibles);

                            // Añadir opciones al select
                            bolosDisponibles.forEach(bolo => {
                                const opcion = document.createElement("option");
                                opcion.textContent = bolo.nombre; // Campo 'nombre' del bolo
                                opcion.value = bolo.nombre; // Campo 'id' del bolo (o el que necesites)
                                inputNombreBolo.appendChild(opcion);
                            });
                        })
                        .catch(error => console.error("Error al obtener los bolos:", error));

                        // Añadir el select al contenedor
                        contenedorBolo.appendChild(inputNombreBolo);
                }
            });
        } else if (selectCompostera.value === "Compostera 3") {
            // Mostrar opción para finalizar un bolo
            const labelFinalizarBolo = document.createElement("label");
            labelFinalizarBolo.textContent = "¿Finalizar bolo?";
            labelFinalizarBolo.classList.add("block", "text-gray-700", "text-sm", "font-bold", "mb-2");
            contenedorBolo.appendChild(labelFinalizarBolo);

            const selectFinalizarBolo = document.createElement("select");
            selectFinalizarBolo.classList.add("shadow", "appearance-none", "border", "rounded", "w-full", "py-2", "px-3", "text-gray-700", "leading-tight", "focus:outline-none", "focus:shadow-outline");
            const opcionesFinalizarBolo = ["", "Sí", "No"];
            opcionesFinalizarBolo.forEach(opcionTexto => {
                const opcion = document.createElement("option");
                opcion.value = opcionTexto;
                opcion.textContent = opcionTexto === "" ? "Seleccione una opción" : opcionTexto;
                selectFinalizarBolo.appendChild(opcion);
            });
            contenedorBolo.appendChild(selectFinalizarBolo);
        }
    }

    // Escuchar cambios en la compostera seleccionada
    selectCompostera.addEventListener("change", actualizarFormulario);


    const botonSiguiente = document.createElement("button");
    botonSiguiente.type = "button";
    botonSiguiente.textContent = "Siguiente";
    botonSiguiente.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");

    botonSiguiente.addEventListener("click", function() {
        let compostera_id;
        if (selectCompostera.value === "Compostera 1") {
            compostera_id = 1;
        } else if (selectCompostera.value === "Compostera 2") {
            compostera_id = 2;
        } else if (selectCompostera.value === "Compostera 3") {
            compostera_id = 3;
        }

        datosFormularioRegistro = {
            ciclo_id: checkboxCiclo.checked ? null : 1, // Ciclo iniciado o no
            user_id: parseInt(user_id), // Asegúrate de que user_id está definido previamente
            compostera_id: compostera_id,
        };
        console.log(datosFormularioRegistro);

        if (document.querySelector("textarea[placeholder='Descripción del bolo']")){
            datosBolo = { 
                nombre: document.querySelector("input[placeholder='Nombre del bolo']").value, 
                datos_relevantes: document.querySelector("textarea[placeholder='Descripción del bolo']").value 
            };
            nombreBolo = document.querySelector("input[placeholder='Nombre del bolo']").value;
            console.log(datosBolo); 
            console.log(nombreBolo);
        } else{
            nombreBolo = document.querySelector("select[data-placeholder='Nombre del bolo']").value; 
            console.log("Nombre del bolo:", nombreBolo); }
            console.log(datosBolo);
        
        // Código para redirigir o procesar siguiente formulario
        generarFormularioAntes();
    });
    formulario.appendChild(botonSiguiente);
    contenedor.appendChild(formulario);

    // Inicializar con valores por defecto
    actualizarFormulario();
}












function generarFormularioAntes() {
    // Seleccionamos el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el formulario
    const formulario = document.createElement("form");

    // Crear los campos del formulario según las especificaciones
    const campos = [
        { label: "Temperatura Ambiental:", type: "number", name: "temperaturaAmbiental" },
        { label: "Temperatura Compostera:", type: "number", name: "temperaturaCompostera" },
        { label: "Nivel Llenado Inicial:", type: "select", name: "nivelLlenadoInicial", options: ['0','12,5','25','37.5','50','67.5','75','87.5','100']},
        { label: "Olor:", type: "select", name: "olor", options: ["Podrido", "Sin olor", "Amoníaco"] },
        { label: "Insectos:", type: "select", name: "insectos", options: ["Si", "No"] },
        { label: "Humedad:", type: "select", name: "humedad", options: ["Exceso", "Buena", "Defecto"] },
        { label: "Observación:", type: "textarea", name: "observacion" }
    ];

    const inputs = {}; // Objeto para almacenar referencias a los inputs

    campos.forEach(campo => {
        const label = document.createElement("label");
        label.textContent = campo.label;
        formulario.appendChild(label);

        let input;
        if (campo.type === "select") {
            input = document.createElement("select");
            campo.options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
        } else if (campo.type === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.type = campo.type;
        }
        input.name = campo.name;
        inputs[campo.name] = input; // Guardar referencia al input
        formulario.appendChild(input);
        formulario.appendChild(document.createElement("br"));
    });

    const botonAtras = document.createElement("button");
    botonAtras.type = "button";
    botonAtras.textContent = "Atras";
    botonAtras.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");

    // Crear el botón para pasar al siguiente formulario
    const botonSiguiente = document.createElement("button");
    botonSiguiente.type = "button";
    botonSiguiente.textContent = "Siguiente";
    botonSiguiente.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");
    botonSiguiente.addEventListener("click", function () {
        // Guardar los datos del formulario en la variable datosFormularioAntes
        let temperaturaAmbiental = parseInt(inputs.temperaturaAmbiental.value);
        let temperaturaCompostera = parseInt(inputs.temperaturaCompostera.value);
        datosFormularioAntes = {
            temperaturaAmbiental: temperaturaAmbiental,
            temperaturaCompostera: temperaturaCompostera,
            nivelLlenadoInicial: inputs.nivelLlenadoInicial.value,
            olor: inputs.olor.value,
            insectos: inputs.insectos.value,
            humedad: inputs.humedad.value,
            observacion: inputs.observacion.value
        };
        console.log(datosFormularioAntes);

        // Limpiar el contenedor y generar el siguiente formulario
        generarFormularioDurante();
    });

    botonAtras.addEventListener("click",()=>{
        contenedor.innerHTML = "";
        generarFormularioRegistro();
    });
    formulario.appendChild(botonAtras);
    formulario.appendChild(botonSiguiente);
    

    // Agregar el formulario al contenedor
    contenedor.appendChild(formulario);
}


function generarFormularioDurante() {
    // Seleccionar el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el formulario
    const formulario = document.createElement("form");

    // Crear los campos del formulario según las especificaciones
    const campos = [
        { label: "¿Riego?:", type: "select", name: "riego", options: ["Si", "No"] },
        { label: "¿Revolver?:", type: "select", name: "revolver", options: ["Si", "No"] },
        { label: "Aporte Verde:", type: "number", name: "aporte_verde" },
        { label: "Tipo de Aporte Verde:", type: "text", name: "tipo_aporte_verde" },
        { label: "Aporte Seco:", type: "number", name: "aporte_seco" },
        { label: "Tipo de Aporte Seco:", type: "text", name: "tipo_aporte_seco" },
        { label: "Observación:", type: "textarea", name: "observacion" }
    ];

    const inputs = {}; // Objeto para almacenar referencias a los inputs

    campos.forEach(campo => {
        const label = document.createElement("label");
        label.textContent = campo.label;
        formulario.appendChild(label);

        let input;
        if (campo.type === "select") {
            input = document.createElement("select");
            campo.options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
        } else if (campo.type === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.type = campo.type;
        }
        input.name = campo.name;
        inputs[campo.name] = input; // Guardar referencia al input
        formulario.appendChild(input);
        formulario.appendChild(document.createElement("br"));
    });
    const botonAtras = document.createElement("button");
    botonAtras.type = "button";
    botonAtras.textContent = "Atras";
    botonAtras.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");
    // Crear el botón para pasar al siguiente formulario
    const botonSiguiente = document.createElement("button");
    botonSiguiente.type = "button";
    botonSiguiente.textContent = "Siguiente";
    botonSiguiente.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");
    botonSiguiente.addEventListener("click", function () {
        let aporte_seco = parseInt(inputs.aporte_seco.value);
        let aporte_verde = parseInt(inputs.aporte_verde.value);
        // Guardar los datos del formulario en la variable datosFormularioDurante
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

        // Limpiar el contenedor y generar el siguiente formulario (si existe)
        generarFormularioDespues(); // Puedes implementar esta función si necesitas otro formulario
    });

    botonAtras.addEventListener("click",()=>{
        contenedor.innerHTML = "";
        boton.classList.add("hidden");
        generarFormularioAntes();
    });
    formulario.appendChild(botonAtras);
    formulario.appendChild(botonSiguiente);

    // Agregar el formulario al contenedor
    contenedor.appendChild(formulario);
}

function generarFormularioDespues() {
    // Seleccionar el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el formulario
    const formulario = document.createElement("form");


    // Crear los campos del formulario según las especificaciones
    const campos = [
        { label: "Nivel de Llenado Final:", type: "select", name: "nivelLlenadoFinal", options: ["0", "12,5", "25"] },
        { label: "Observación:", type: "textarea", name: "observacion" }
    ];

    const inputs = {}; // Objeto para almacenar referencias a los inputs

    campos.forEach(campo => {
        const label = document.createElement("label");
        label.textContent = campo.label;
        formulario.appendChild(label);

        let input;
        if (campo.type === "select") {
            input = document.createElement("select");
            campo.options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
        } else if (campo.type === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.type = campo.type;
        }
        input.name = campo.name;
        inputs[campo.name] = input; // Guardar referencia al input
        formulario.appendChild(input);
        formulario.appendChild(document.createElement("br"));
    });

    // Crear el botón para enviar los datos
    const botonAtras = document.createElement("button");
    botonAtras.type = "button";
    botonAtras.textContent = "Atras";
    botonAtras.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");
    const botonEnviar = document.createElement("button");
    botonEnviar.type = "button";
    botonEnviar.textContent = "Enviar";
    botonEnviar.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");
    botonEnviar.addEventListener("click", function () {
        // Guardar los datos del formulario en la variable datosFormularioDespues
        datosFormularioDespues = {
            nivelLlenadoFinal: inputs.nivelLlenadoFinal.value,
            observacion: inputs.observacion.value
        };
        console.log(datosFormularioDespues);
        insertarRegistros(datosFormularioRegistro, datosFormularioAntes, datosFormularioDurante, datosFormularioDespues)
    });

    botonAtras.addEventListener("click",()=>{
        contenedor.innerHTML = "";
        generarFormularioDurante();
    });
    formulario.appendChild(botonAtras);
    formulario.appendChild(botonEnviar);


    // Agregar el formulario al contenedor
    contenedor.appendChild(formulario);

    console.log(user_id);
    console.log(datosBolo);
}



//Primero tienes que introducir el registro a la tabla


async function insertarRegistros(datosFormularioRegistro, datosFormularioAntes, datosFormularioDurante, datosFormularioDespues) {
    try {
        // Verificar si hay datos para un nuevo Bolo
        if (Object.keys(datosBolo).length > 0) {
            const urlBolo = 'api/bolos';
            const responseBolo = await fetch(urlBolo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosBolo),
            });

            if (!responseBolo.ok) {
                throw new Error("Error al insertar el Bolo.");
            }

            const BoloCreado = await responseBolo.json(); // Cambié a responseBolo
            console.log(`Bolo creado con éxito:`, BoloCreado);
        }

        // Consultar el bolo elegido
        const urlConsultaBolo = '/api/bolos';
        const ultimoBolo = await consulta(urlConsultaBolo);

        if (!ultimoBolo) {
            throw new Error("No se encontró el último Bolo.");
        }
        const bolosrecogidos = ultimoBolo.data;
        console.log(nombreBolo);
        console.log(bolosrecogidos);
        const boloseleccionado = bolosrecogidos.find(bolo => bolo.nombre === nombreBolo);
        console.log(boloseleccionado);
        const bolo_id = boloseleccionado.id;
        console.log("El bolo elegido es :", bolo_id);

        // Verificar si es necesario crear un nuevo Ciclo

        function obtenerFechaFormatoCorrecto() {
            const fecha = new Date();
            return fecha.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha (YYYY-MM-DD)
        }
        console.log(obtenerFechaFormatoCorrecto());

        function generarFechaAleatoria() {
            // Generar una fecha aleatoria entre 1 de enero de 2024 y 31 de diciembre de 2025
            const inicio = new Date(2024, 12, 1); // 1 de enero de 2024
            const fin = new Date(2025, 11, 31); // 31 de diciembre de 2025
        
            const fechaAleatoria = new Date(inicio.getTime() + Math.random() * (fin.getTime() - inicio.getTime()));
            return fechaAleatoria.toISOString().split('T')[0]; // Devuelve en formato YYYY-MM-DD
        }
        console.log(generarFechaAleatoria());
        
        if (datosFormularioRegistro.ciclo_id == null) {
            datosCiclo = {
                fecha_inicio: obtenerFechaFormatoCorrecto(),
                fecha_fin: generarFechaAleatoria(), // Ejemplo de fecha en formato correcto (YYYY-MM-DD)
                bolo_id: bolo_id,
            };
        
            const urlCiclo = '/api/ciclos';
            const responseCiclo = await fetch(urlCiclo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosCiclo),
            });
        
            if (!responseCiclo.ok) {
                throw new Error("Error al insertar el Ciclo.");
            }
        
            const CicloCreado = await responseCiclo.json();
            console.log(`Ciclo creado con éxito:`, CicloCreado);
        }
        

        // Consultar el último ciclo insertado en el bolo
        const urlConsultaCiclo = `/api/bolo/${boloseleccionado.id}/lastCiclo`;
        const ultimoCiclo = await consulta(urlConsultaCiclo);

        if (!ultimoCiclo) {
            throw new Error("No se encontró el último Ciclo.");
        }

        const ultimociclo_id = ultimoCiclo.id;
        console.log("ID del último Ciclo:", ultimociclo_id);
        datosFormularioRegistro.ciclo_id = ultimociclo_id;
        console.log(datosFormularioRegistro);
        // Insertar el registro inicial
        const urlRegistro = '/api/registros';
        const responseRegistro = await fetch(urlRegistro, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

        // Insertar en la tabla "antes"
        await insertarTabla('api/antes', datosFormularioAntes, 'antes');

        // Insertar en la tabla "durantes"
        await insertarTabla('api/durantes', datosFormularioDurante, 'durante');

        // Insertar en la tabla "despues"
        await insertarTabla('api/despues', datosFormularioDespues, 'despues');

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
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            return null; // Registro no encontrado
        }
        throw new Error("Error en la consulta de la API.");
    }
    return await response.json();
}




export {generarFormularioRegistro};