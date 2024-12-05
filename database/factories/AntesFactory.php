<?php

namespace Database\Factories;


use App\Models\Antes;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Antes>
 */
class AntesFactory extends Factory
{

    protected $model = Antes::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'registro_id' => \App\Models\Registro::all()->random()->id,
            'temperaturaAmbiental' => fake()->numberBetween(10, 40),
            'temperaturaCompostera' => fake()->numberBetween(10, 70),
            'nivelLlenadoInicial' => fake()->numberBetween(10, 40),
            'olor' => fake()->text(fake()->numberBetween(50, 200)),
            'insectos' => fake()->randomElement(['hormigas', 'moscas', 'mosquitos', 'gusanos', 'arañas', 'cucarachas', 'otros']),
            'humedad' => fake()->randomElement(['Exceso', 'Buena', 'Defecto']),
            //'foto' => fake()->url(),
            'observacion' => fake()->text(fake()->numberBetween(50, 200)),
        ];
    }
}
