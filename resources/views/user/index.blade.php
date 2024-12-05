<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Usuarios') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-full mx-auto sm:px-6 lg:px-8 space-y-6">
            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div class="w-full">
                    <div class="sm:flex sm:items-center justify-between">
                        <div class="sm:flex-auto">
                            <h1 class="text-base font-semibold leading-6 text-gray-900">{{ __('Usuarios') }}</h1>
                            <p class="mt-2 text-sm text-gray-700">Lista de todos los {{ __('usuarios') }}.</p>
                        </div>
                        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <a type="button" href="{{ route('users.create') }}"
                                class="block rounded-md bg-green-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                                Añadir nuevo usuario
                            </a>
                        </div>
                    </div>

                    <!-- Filtros -->
                    <form method="GET" action="{{ route('users.index') }}" class="mt-8">
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <x-input-label for="search" :value="__('Buscar por nombre')" />
                                <x-text-input id="search" name="search" type="text"
                                    value="{{ request('search') }}" class="mt-1 block w-full" />
                            </div>

                            <div>
                                <x-input-label for="admin_filter" :value="__('Mostrar usuarios')" />
                                <select id="admin_filter" name="admin_filter" class="mt-1 block w-full">
                                    <option value="" {{ is_null(request('admin_filter')) ? 'selected' : '' }}>
                                        Todos</option>
                                    <option value="1" {{ request('admin_filter') == '1' ? 'selected' : '' }}>
                                        Administradores
                                    </option>
                                    <option value="0" {{ request('admin_filter') == '0' ? 'selected' : '' }}>No
                                        administradores
                                    </option>
                                </select>
                            </div>

                            <!-- Botón de aplicar filtros -->
                            <div class="flex items-center justify-center sm:justify-start">
                                <button type="submit"
                                    class="block rounded-md border border-green-500 bg-white px-3 py-2 text-center text-sm font-semibold text-green-500 shadow-sm hover:bg-green-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                                    {{ __('Aplicar filtros') }}
                                </button>

                            </div>
                        </div>
                    </form>

                    <div class="flow-root mt-8">
                        <div class="overflow-x-auto">
                            <div class="inline-block min-w-full py-2 align-middle">
                                <table class="w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th scope="col"
                                                class="py-3 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Nº
                                            </th>
                                            <th scope="col"
                                                class="py-3 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Nombre
                                            </th>
                                            <th scope="col"
                                                class="py-3 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Email
                                            </th>
                                            <th scope="col"
                                                class="py-3 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Admin
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white">
                                        @foreach ($users as $user)
                                            <tr class="even:bg-gray-50">
                                                <td
                                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900">
                                                    {{ ++$i }}</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {{ $user->name }}</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {{ $user->email }}</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {{ $user->admin ? 'Sí' : 'No' }}</td>
                                                <td
                                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                                    <form action="{{ route('users.destroy', $user->id) }}"
                                                        method="POST">
                                                        <a href="{{ route('users.show', $user->id) }}"
                                                            class="inline-block rounded-md border border-green-500 bg-white px-3 py-1 text-sm font-semibold text-green-500 shadow-sm hover:bg-green-400 hover:text-white mr-2">
                                                            {{ __('Ver') }}
                                                        </a>
                                                        <a href="{{ route('users.edit', $user->id) }}"
                                                            class="inline-block rounded-md border border-blue-500 bg-white px-3 py-1 text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white mr-2">
                                                            {{ __('Editar') }}
                                                        </a>

                                                        <form method="POST"
                                                            action="{{ route('users.destroy', $user->id) }}"
                                                            class="inline-block">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit"
                                                                class="rounded-md border border-red-500 bg-white px-3 py-1 text-sm font-semibold text-red-500 shadow-sm hover:bg-red-500 hover:text-white"
                                                                onclick="return confirm('¿Estás seguro de que deseas eliminar este usuario?');">
                                                                {{ __('Eliminar') }}
                                                            </button>
                                                        </form>

                                                    </form>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>

                                <div class="mt-4 px-4">
                                    {!! $users->withQueryString()->links() !!}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
