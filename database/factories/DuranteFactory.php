<?php

namespace Database\Factories;

use App\Models\Durante;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Durante>
 */
class DuranteFactory extends Factory
{
    protected $model = Durante::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'registro_id' => \App\Models\Registro::all()->random()->id,
            'riego' => fake()->randomElement(['si', 'no']),
            'revolver' => fake()->randomElement(['si', 'no']),
            'aporte_verde' => fake()->numberBetween(1, 999),
            'tipo_aporte_verde' => fake()->text(fake()->numberBetween(5, 200)),
            'aporte_seco' => fake()->numberBetween(1, 999),
            'tipo_aporte_seco' => fake()->text(fake()->numberBetween(5, 200)),
            'observacion' => fake()->numberBetween(50, 200)
        ];
    }
}
