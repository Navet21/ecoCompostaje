<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center space-x-4">
            <h2 id="Composteras" class="text-lg text-gray-800 dark:text-gray-200 leading-tight font-normal">
                <a href="#Composteras">Composteras</a>
            </h2>
            <h2 id="Registros" class="text-lg text-gray-800 dark:text-gray-200 leading-tight font-normal">
                <a href="#Registros">Registros</a>
            </h2>
            <h2 id="Bolos" class="text-lg text-gray-800 dark:text-gray-200 leading-tight font-normal">
                <a href="#Bolos">Bolos</a>
            </h2>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            @if (session('token'))
                <script>
                    sessionStorage.setItem('idUsuario', {{ Auth::user()->id }});
                    sessionStorage.setItem('token', @json(session('token')));
                </script>
            @endif
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <input id="user_id" value="{{ Auth::user()->id }}" name="user_id" type="hidden">
                <div id="Datos">
                </div>
                <div id="paginacion" class="flex justify-between mt-4">
                    <button id="btnAnterior"
                        class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" disabled>
                        Anterior
                    </button>
                    <span id="paginaActual" class="font-bold text-lg">1</span>
                    <button id="btnSiguiente"
                        class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                        Siguiente
                    </button>
                </div>

            </div>
        </div>
    </div>
</x-app-layout>