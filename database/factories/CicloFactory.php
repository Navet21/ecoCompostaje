<?php

namespace Database\Factories;

use App\Models\Ciclo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ciclo>
 */
class CicloFactory extends Factory
{
    protected $model = Ciclo::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fecha_inicio' => fake()->date(),
            'fecha_fin' => fake()->date(),
            'terminado' => fake()->boolean(),
            'bolo_id' => \App\Models\Bolo::all()->random()->id,
        ];
    }
}
