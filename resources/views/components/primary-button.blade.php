<button
    {{ $attributes->merge(['type' => 'submit', 'class' => 'inline-flex items-center px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-green-400 hover:bg-green-500 active:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150']) }}>
    {{ $slot }}
</button>
