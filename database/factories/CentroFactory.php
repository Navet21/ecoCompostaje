<?php

namespace Database\Factories;

use App\Models\Centro;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Centro>
 */
class CentroFactory extends Factory
{
    protected $model = Centro::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => fake()->company(),
            'direccion' => fake()->address(),
            'codigo' => fake()->unique()->numberBetween(1000000000, 9999999999),
            // 'logotipo' => fake()->url(),
            // 'personaResponsable' => fake()->name(),
        ];
    }
}
