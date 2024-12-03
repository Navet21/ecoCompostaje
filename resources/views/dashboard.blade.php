<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <button id="nuevoRegistro" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Nuevo Registro
                </button>
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <input id="user_id" value="{{Auth::user()->id}}" name="user_id" type="hidden">
                <button id="composteras">Composteras</button>
                <div id="Datos"></div>
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