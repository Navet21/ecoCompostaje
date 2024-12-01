// Cambia entre modo oscuro y claro
const toggleDarkMode = () => {
    const body = document.body;
    const icon = document.getElementById("theme-icon");

    // Alterna la clase dark en el body
    body.classList.toggle("dark");

    // Cambia el ícono dependiendo del modo
    if (body.classList.contains("dark")) {
        icon.textContent = "dark_mode"; // Ícono de luna para modo oscuro
        localStorage.setItem("theme", "dark");
    } else {
        icon.textContent = "sunny"; // Ícono de sol para modo claro
        localStorage.setItem("theme", "light");
    }
};

// Verificar si hay una preferencia guardada en localStorage al cargar la página
window.onload = () => {
    const savedTheme = localStorage.getItem("theme");
    const body = document.body;
    const icon = document.getElementById("theme-icon");

    // Si hay un tema guardado, aplicar la clase correspondiente
    if (savedTheme) {
        body.classList.add(savedTheme);
        // Cambiar el ícono basado en la preferencia
        if (savedTheme === "dark") {
            icon.textContent = "dark_mode"; // Luna para modo oscuro
        } else {
            icon.textContent = "sunny"; // Sol para modo claro
        }
    } else {
        // Si no hay preferencia, aplicar 'light' por defecto
        body.classList.add("light");
        icon.textContent = "sunny"; // Sol para modo claro por defecto
    }
};

// Añadir el evento al icono para alternar entre los modos
document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleDarkMode);
