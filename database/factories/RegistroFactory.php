<?php

namespace Database\Factories;

use App\Models\Registro;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Registro>
 */
class RegistroFactory extends Factory
{
    protected $model = Registro::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ciclo_id' => \App\Models\Ciclo::all()->random()->id,
            'user_id' => \App\Models\User::all()->random()->id,
            'compostera_id' => \App\Models\Compostera::all()->random()->id,
        ];
    }
}
