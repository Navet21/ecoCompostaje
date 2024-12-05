<?php

namespace Database\Factories;

use App\Models\Despues;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Despues>
 */
class DespuesFactory extends Factory
{
    protected $model = Despues::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'registro_id' => \App\Models\Registro::all()->random()->id,
            'nivelLlenadoFinal' => fake()->randomElement([0, 12.5, 25, 37.5, 50, 67.5, 75, 87.5, 100]),
            'observacion' => fake()->text(fake()->numberBetween(50, 200))
        ];
    }
}
