<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gráficas de Temperaturas</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body>
    <div style="width: 80%; margin: 0 auto;">
        <canvas id="graficaTemperaturas"></canvas>
    </div>

    <script>
        // Obtener los datos desde el servidor (Laravel)
        const datos = @json($datos);

        // Extraer las fechas, temperaturas y ciclos
        const fechas = datos.map(item => item.fecha);
        const temperaturaAmbiental = datos.map(item => item.temperaturaAmbiental);
        const temperaturaCompostera = datos.map(item => item.temperaturaCompostera);
        const ciclos = datos.map(item => ({
            inicio: item.fecha_inicio,
            fin: item.fecha_fin
        }));

        // Crear la gráfica
        const ctx = document.getElementById('graficaTemperaturas').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: fechas,
                datasets: [{
                        label: 'Temperatura Ambiental',
                        data: temperaturaAmbiental,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'Temperatura Compostera',
                        data: temperaturaCompostera,
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        fill: false,
                    },
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Temperaturas a lo largo de los ciclos de compostera'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'll',
                        },
                        title: {
                            display: true,
                            text: 'Fecha',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Temperatura (°C)',
                        }
                    }
                }
            }
        });

        // Resaltar los ciclos en el gráfico
        ciclos.forEach(ciclo => {
            const inicio = new Date(ciclo.inicio);
            const fin = new Date(ciclo.fin);

            // Agregar un área sombreada para representar el ciclo
            chart.data.datasets.push({
                label: 'Ciclo Compostera',
                data: [inicio, fin],
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                fill: true,
                borderWidth: 0,
            });

            // Actualizar el gráfico
            chart.update();
        });
    </script>
</body>

</html>
