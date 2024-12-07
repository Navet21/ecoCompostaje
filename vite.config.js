import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    build: {
        target: "esnext",
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js','resources/js/registros.js','resources/js/registrosEspecificos.js','resources/js/formulario.js','resources/js/mode.js','resources/js/composteras.js','resources/js/bolos.js','resources/js/ciclosBolos.js','resources/js/registrosCiclos.js'],
            refresh: true,
        }),
    ],
});
