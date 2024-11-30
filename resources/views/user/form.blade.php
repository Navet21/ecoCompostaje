<div class="space-y-6">

    <div>
        <x-input-label for="name" :value="__('Nombre')" />
        <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $user?->name)"
            autocomplete="name" />
        <x-input-error class="mt-2" :messages="$errors->get('name')" />
    </div>
    <div>
        <x-input-label for="email" :value="__('Email')" />
        <x-text-input id="email" name="email" type="text" class="mt-1 block w-full" :value="old('email', $user?->email)"
            autocomplete="email" />
        <x-input-error class="mt-2" :messages="$errors->get('email')" />
    </div>
    <div>
        <x-input-label for="password" :value="__('Contraseña')" />
        <x-text-input id="password" name="password" type="password" class="mt-1 block w-full" :value="old('password', $user?->password)"
            autocomplete="password" />
        <x-input-error class="mt-2" :messages="$errors->get('password')" />
    </div>

    <div>
        <x-input-label for="admin" :value="__('')" />
        <div class="flex items-center space-x-2">
            <input type="checkbox" id="admin" name="admin" value="1" class="hidden peer"
                {{ old('admin', $user?->admin) == 1 ? 'checked' : '' }} />
            <label for="admin"
                class="relative flex items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-6 h-6 cursor-pointer border-2 bg-green-500 border rounded-md overflow-hidden shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-full fill-white" viewBox="0 0 520 520">
                    <path
                        d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                        data-name="7-Check" data-original="#000000" />
                </svg>
            </label>
            <p class="text-sm text-black ml-4">Marcar si el usuario es administrador</p>
        </div>

        <x-input-error class="mt-2" :messages="$errors->get('admin')" />
    </div>



    <div class="flex items-center gap-4">
        <x-primary-button
            class="block rounded-md bg-green-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            Enviar
        </x-primary-button>
    </div>

</div>
