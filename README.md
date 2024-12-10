
# ecoCompostaje
### Badges

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![PHP Version](https://img.shields.io/badge/PHP-8.3-blue)
![Laravel Version](https://img.shields.io/badge/Laravel-11-orange)

## Introducción

ecoCompostaje es una aplicación web para la gestión del ciclo de compostaje en centros educativos. Esta herramienta permite gestionar usuarios, realizar registros sobre el estado de las composteras y visualizar gráficas relacionadas con los datos registrados. 

## Tecnologías Utilizadas

- **Framework**: Laravel 11
- **Lenguaje de programación**: PHP 8.3
- **Base de datos**: MySQL
- **Front-end**: JavaScript, Chart.js y AdminLTE
- **Estilos**: Tailwind CSS
- **Gestión de dependencias**: Composer y NPM

## Instalación y Configuración

### Clonar el repositorio

```bash
git clone https://github.com/Navet21/ecoCompostaje.git
cd ecoCompostaje
```

### Instalar dependencias

```bash
composer install
npm install
```

### Configurar el entorno

1. Copia el archivo `.env.example` y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Genera una clave de aplicación:
   ```bash
   php artisan key:generate
   ```

3. Configura las credenciales de la base de datos en el archivo `.env`.

4. Realiza las migraciones y seeders para la base de datos:
   ```bash
   php artisan migrate --seed
   ```

### Ejecutar el servidor de desarrollo

```bash
php artisan serve
npm run dev
```

## Funcionalidades

### Funcionalidades mínimas

- Inicio de sesión para usuarios registrados.
- Gestión de usuarios por el admin a través de un CRUD en el dashboard.
- Creación y visualización de registros de composteras.
- Gráficas de temperatura para cada bolo.

### Funcionalidades técnicas implementadas

- Uso de seeders y factories para la generación de datos.
- Rutas protegidas con middleware `auth`.
- Autenticación mediante Sanctum con Personal Access Token.
- Validación de datos en el servidor.
- Recursos compilados con Vite.
- Autorización en la API mediante policies.
- Búsqueda y filtrado con Laravel Orion.

### Funcionalidades adicionales

- Gráficas avanzadas utilizando Chart.js y AdminLTE.
- Visualización SPA con JavaScript y Tailwind.

## Despliegue

### Configuración del servidor

1. Asegúrate de que el servidor tenga las siguientes configuraciones:
   - HTTPS habilitado.
   - Variables de entorno configuradas adecuadamente.
   - `OpCache` habilitado para mejorar el rendimiento.

2. Configura el archivo `.env` en el servidor de producción.

### Automatización CI/CD

Se ha implementado GitHub Actions para automatizar el despliegue en producción cuando se realiza un merge en la rama `production`.

## Acceso al Proyecto

- **Repositorio**: [ecoCompostaje en GitHub](https://github.com/Navet21/ecoCompostaje)
- **Despliegue**: [URL del proyecto desplegado](pablo.informaticamajada.es)
   - Usuario admin: admin@administrador.es
   - Contraseña: 1234

## Créditos

Este proyecto fue desarrollado por el equipo de desarrollo (Pablo Santana Suárez y Miriam Guerra Guerra) para la gestión de composteras en entornos educativos.


