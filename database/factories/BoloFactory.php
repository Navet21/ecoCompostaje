<?php

namespace Database\Factories;

use App\Models\Bolo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bolo>
 */
class BoloFactory extends Factory
{
    protected $model = Bolo::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->sentence,
            'created_at' => fake()->date(),
            'updated_at' => fake()->date(),
            'datos_relevantes' => $this->faker->sentence,
            'terminado' => fake()->boolean(),
        ];
    }
}
