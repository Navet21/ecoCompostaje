<?php

namespace Database\Factories;

use App\Models\Compostera;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Compostera>
 */
class ComposteraFactory extends Factory
{
    protected $model = Compostera::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'url' => fake()->uuid(),
            'tipo' => fake()->randomElement(['aporte', 'degradacion', 'maduracion']),
            'centro_id' => \App\Models\Centro::all()->random()->id,
        ];
    }
}
