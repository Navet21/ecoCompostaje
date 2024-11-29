<div class="space-y-6">
    
    <div>
        <x-input-label for="name" :value="__('Name')"/>
        <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $user?->name)" autocomplete="name" placeholder="Name"/>
        <x-input-error class="mt-2" :messages="$errors->get('name')"/>
    </div>
    <div>
        <x-input-label for="email" :value="__('Email')"/>
        <x-text-input id="email" name="email" type="text" class="mt-1 block w-full" :value="old('email', $user?->email)" autocomplete="email" placeholder="Email"/>
        <x-input-error class="mt-2" :messages="$errors->get('email')"/>
    </div>
        <div>
        <x-input-label for="password" :value="__('Password')"/>
        <x-text-input id="password" name="password" type="password" class="mt-1 block w-full" :value="old('password', $user?->password)" autocomplete="password" placeholder="Password"/>
        <x-input-error class="mt-2" :messages="$errors->get('password')"/>
    </div>
    <div>
        <x-input-label for="admin" :value="__('Admin')"/>
        <x-text-input id="admin" name="admin" type="text" class="mt-1 block w-full" :value="old('admin', $user?->admin)" autocomplete="admin" placeholder="Admin"/>
        <x-input-error class="mt-2" :messages="$errors->get('admin')"/>
    </div>

    <div class="flex items-center gap-4">
        <x-primary-button>Submit</x-primary-button>
    </div>
</div>