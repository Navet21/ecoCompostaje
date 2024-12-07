<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Análisis de Temperaturas') }}
        </h2>
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            <!-- Formulario con el desplegable para seleccionar el Bolo -->
            <form method="GET" action="{{ route('analisis') }}">
                <div>
                    <label for="bolo_id" class="block text-sm font-medium text-gray-700">Selecciona el Bolo</label>
                    <select name="bolo_id" id="bolo_id" onchange="this.form.submit()" class="mt-1 block w-full">
                        @foreach ($bolos as $bolo)
                            <option value="{{ $bolo->id }}" {{ request('bolo_id') == $bolo->id ? 'selected' : '' }}>
                                {{ $bolo->nombre }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </form>

            <!-- Gráfico de Temperatura -->
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mt-4">
                <canvas id="graficaTemperaturas"></canvas>
            </div>

        </div>
    </div>

    @section('scripts')
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script> <!-- Chart.js -->

        <script>
            const temperaturas = @json($temperaturas);
            const fechas = temperaturas.map(item => item.fecha);
            const dataTemperaturas = temperaturas.map(item => item.temperatura);

            const ctx = document.getElementById('graficaTemperaturas').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: fechas,
                    datasets: [{
                        label: 'Temperatura Compostera',
                        data: dataTemperaturas,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                title: function(tooltipItem) {
                                    return tooltipItem[0].label;
                                },
                                label: function(tooltipItem) {
                                    return 'Temperatura: ' + tooltipItem.raw + '°C';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Fecha'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Temperatura (°C)'
                            },
                            min: 0
                        }
                    }
                }
            });
        </script>
    @endsection
</x-app-layout>
