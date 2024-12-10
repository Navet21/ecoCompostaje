<?php

namespace Database\Seeders;

use App\Models\Centro;
use App\Models\Registro;
use App\Models\Antes;
use App\Models\Durante;
use App\Models\Despues;
use App\Models\Compostera;
use App\Models\Bolo;
use App\Models\Ciclo;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Vaciar tablas (en orden para evitar problemas de FK)
        DB::table('antes')->delete();
        DB::table('durantes')->delete();
        DB::table('despues')->delete();
        DB::table('registros')->delete();
        DB::table('ciclos')->delete();
        DB::table('bolos')->delete();
        DB::table('composteras')->delete();
        DB::table('users')->delete();
        DB::table('centros')->delete();

        // Crear el centro principal y usuario administrador
        $centroPrincipal = Centro::factory()->create([
            'codigo' => 35003630,
            'nombre' => 'San Diego De Alacala',
            'direccion' => 'Primero de Mayo',
        ]);

        $adminUser = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@administrador.es',
            'password' => bcrypt('1234'),
            'admin' => 1,
            'id_centros' => $centroPrincipal->id,
        ]);

        // Crear 25 usuarios no administradores
        User::factory()->count(25)->create([
            'admin' => 0,
            'id_centros' => $centroPrincipal->id,
        ]);

        // Crear 3 centros adicionales en Puerto del Rosario (Fuerteventura)

        // $centros = Centro::factory()->count(3)->state(new \Illuminate\Database\Eloquent\Factories\Sequence(
        //     ['codigo' => 12345601, 'nombre' => 'I.E.S. Santo Tomás de Aquino', 'direccion' => 'Calle Primero de Mayo'],
        //     ['codigo' => 12345602, 'nombre' => 'I.E.S. Puerto del Rosario', 'direccion' => 'Calle Gran Canaria'],
        //     ['codigo' => 12345603, 'nombre' => 'I.E.S. Puerto Cabras Rafael Báez', 'direccion' => 'Calle Aragón']
        // ))->create();

        // Incluir el centro principal en la lista (modificado para crear un centro, cambiar variable a $centros si se quiere añadir más centros)
        // $centroPrincipal->push($centroPrincipal);
        $centros = [$centroPrincipal];

        // Crear 3 composteras para cada centro (modificado para crear un centro, cambiar variable a $centros si se quiere añadir más centros)
        // foreach ($centroPrincipal as $centro) {
        //     $composteras = Compostera::factory()->count(3)->state(new \Illuminate\Database\Eloquent\Factories\Sequence(
        //         ['url' => 'https://compostera1.es', 'tipo' => 'aporte'],
        //         ['url' => 'https://compostera2.es', 'tipo' => 'maduracion'],
        //         ['url' => 'https://compostera3.es', 'tipo' => 'degradacion']
        //     ))->create(['centro_id' => $centro->id]);

        // Crear 3 composteras para cada centro
        foreach ($centros as $centro) {
            // Crear composteras con IDs fijos (1, 2, 3) para cada centro
            $composterasData = [
                ['id' => 1, 'url' => 'https://compostera1.es', 'tipo' => 'aporte', 'centro_id' => $centro->id],
                ['id' => 2, 'url' => 'https://compostera2.es', 'tipo' => 'maduracion', 'centro_id' => $centro->id],
                ['id' => 3, 'url' => 'https://compostera3.es', 'tipo' => 'degradacion', 'centro_id' => $centro->id]
            ];

            // Crear las composteras con los datos fijos
            foreach ($composterasData as $compostera) {
                Compostera::create($compostera);
            }

            // Crear 10 bolos para cada centro
            $bolos = Bolo::factory()->count(10)->state(function () {
                return [
                    'nombre' => fake()->words(2, true),
                    'datos_relevantes' => fake()->sentence(),
                    'terminado' => '1',
                    'ciclo1' => '1',
                    'ciclo2' => '1',
                    'ciclo3' => '1',
                ];
            })->create();

            foreach ($bolos as $bolo) {
                // Crear 3 ciclos para el bolo, uno por cada compostera
                $ciclo1 = Ciclo::factory()->create([
                    'fecha_inicio' => now()->subMonths(3),
                    'fecha_fin' => now()->subMonths(2),
                    'terminado' => '1',
                    'bolo_id' => $bolo->id,
                    'compostera_id' => 1,
                ]);

                $ciclo2 = Ciclo::factory()->create([
                    'fecha_inicio' => now()->subMonths(2),
                    'fecha_fin' => now()->subMonth(),
                    'terminado' => '1',
                    'bolo_id' => $bolo->id,
                    'compostera_id' => 2,
                ]);

                $ciclo3 = Ciclo::factory()->create([
                    'fecha_inicio' => now()->subMonth(),
                    'fecha_fin' => now(),
                    'terminado' => '1',
                    'bolo_id' => $bolo->id,
                    'compostera_id' => 3,
                    // $composteras[2]->id
                ]);

                // Crear registros y datos asociados para cada ciclo
                foreach ([$ciclo1, $ciclo2, $ciclo3] as $ciclo) {
                    $registro = Registro::factory()->create([
                        'ciclo_id' => $ciclo->id,
                        'user_id' => User::inRandomOrder()->first()->id,
                        'compostera_id' => $ciclo->compostera_id,
                    ]);

                    // Inicializar la fecha base para este registro
                    $fechaBase = $ciclo->fecha_inicio;

                    // Crear 4 datos "Antes" para cada registro con fechas progresivas
                    foreach (range(1, 4) as $indice) {
                        Antes::factory()->create([
                            'registro_id' => $registro->id,
                            'temperaturaAmbiental' => fake()->numberBetween(10, 40),
                            'temperaturaCompostera' => fake()->numberBetween(10, 70),
                            'nivelLlenadoInicial' => fake()->randomElement(['0', '12.5', '25', '37.5', '50', '67.5', '75', '87.5', '100']),
                            'olor' => fake()->randomElement(['Podrido', 'Sin olor', 'Amoniaco']),
                            'insectos' => fake()->randomElement(['Si', 'No']),
                            'humedad' => fake()->randomElement(['Exceso', 'Buena', 'Defecto']),
                            'observacion' => fake()->sentence(),
                            'created_at' => $fechaBase->addDays(fake()->numberBetween(1, 5)), // Incrementa la fecha base
                            'updated_at' => $fechaBase,
                        ]);
                    }

                    // Crear 4 datos "Durante" para cada registro
                    Durante::factory()->count(4)->create([
                        'registro_id' => $registro->id,
                        'riego' => fake()->randomElement(['si', 'no']),
                        'revolver' => fake()->randomElement(['si', 'no']),
                        'aporte_verde' => fake()->numberBetween(0, 127),
                        'tipo_aporte_verde' => fake()->text(50),
                        'aporte_seco' => fake()->numberBetween(0, 127),
                        'tipo_aporte_seco' => fake()->text(50),
                        'observacion' => fake()->sentence(),
                    ]);

                    // Crear 4 datos "Después" para cada registro
                    Despues::factory()->count(4)->create([
                        'registro_id' => $registro->id,
                        'nivelLlenadoFinal' => fake()->randomElement(['0', '12.5', '25', '37.5', '50', '67.5', '75', '87.5', '100']),
                        'observacion' => fake()->sentence(),
                    ]);
                }
            }
        }
    }
}
