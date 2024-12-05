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



        // Crear un centro
        $centro = Centro::factory()->create([
            'codigo' => 35003630,
            'nombre' => 'San Diego De Alacala',
            'direccion' => 'Primero de Mayo',
        ]);

        // Crear un usuario administrador asociado al centro
        $adminUser = User::factory()->create([
            'name' => 'M',
            'email' => 'm@m.es',
            'password' => bcrypt('1'),
            'admin' => 1,
            'id_centros' => $centro->id,
        ]);

        // Crear 3 composteras asociadas al centro
        $composteras = Compostera::factory()->count(3)->state(new \Illuminate\Database\Eloquent\Factories\Sequence(
            ['url' => 'https://www.compostera1.es', 'tipo' => 'aporte'],
            ['url' => 'https://www.compostera2.es', 'tipo' => 'maduracion'],
            ['url' => 'https://www.compostera3.es', 'tipo' => 'degradacion']
        ))->create([
            'centro_id' => $centro->id,
        ]);

        // Crear un bolo
        $bolo = Bolo::factory()->create([
            'nombre' => 'Bolo enero',
            'datos_relevantes' => 'perfecto',
            'terminado' => 1,
            'ciclo1' => 1,
            'ciclo2' => 1,
            'ciclo3' => 1,
        ]);
        // Crear bolos adicionales
        $bolo1 = Bolo::factory()->create([
            'nombre' => 'Bolo febrero',
            'datos_relevantes' => 'En proceso',
            'terminado' => 0,
            'ciclo1' => 1,
            'ciclo2' => 1,
            'ciclo3' => 0,
        ]);

        $bolo2 = Bolo::factory()->create([
            'nombre' => 'Bolo marzo',
            'datos_relevantes' => 'Listo para uso',
            'terminado' => 1,
            'ciclo1' => 1,
            'ciclo2' => 1,
            'ciclo3' => 1,
        ]);

        $bolo3 = Bolo::factory()->create([
            'nombre' => 'Bolo abril',
            'datos_relevantes' => 'Compostaje avanzado',
            'terminado' => 0,
            'ciclo1' => 1,
            'ciclo2' => 0,
            'ciclo3' => 0,
        ]);

        // Crear un ciclo asociado al bolo y a una compostera
        $ciclo = Ciclo::factory()->create([
            'fecha_inicio' => '2024-01-05',
            'fecha_fin' => '2024-03-05',
            'terminado' => 1,
            'bolo_id' => $bolo->id,
            'compostera_id' => $composteras->random()->id,
        ]);

        // Crear ciclos adicionales
        $ciclo1 = Ciclo::factory()->create([
            'fecha_inicio' => '2024-02-01',
            'fecha_fin' => '2024-04-01',
            'terminado' => 1,
            'bolo_id' => $bolo1->id, // Asignado al bolo de febrero
            'compostera_id' => $composteras->random()->id,
        ]);

        $ciclo2 = Ciclo::factory()->create([
            'fecha_inicio' => '2024-03-01',
            'fecha_fin' => '2024-05-01',
            'terminado' => 0,
            'bolo_id' => $bolo2->id, // Asignado al bolo de marzo
            'compostera_id' => $composteras->random()->id,
        ]);

        $ciclo3 = Ciclo::factory()->create([
            'fecha_inicio' => '2024-04-01',
            'fecha_fin' => '2024-06-01',
            'terminado' => 0,
            'bolo_id' => $bolo3->id, // Asignado al bolo de abril
            'compostera_id' => $composteras->random()->id,
        ]);


        // Crear un registro asociado al ciclo, usuario y compostera
        $registro = Registro::factory()->create([
            'ciclo_id' => $ciclo->id,
            'user_id' => $adminUser->id,
            'compostera_id' => $composteras->random()->id,
        ]);

        // Crear datos "Antes"
        Antes::factory()->create([
            'registro_id' => $registro->id,
            'temperaturaAmbiental' => fake()->numberBetween(10, 40),
            'temperaturaCompostera' => fake()->numberBetween(10, 70),
            'nivelLlenadoInicial' => fake()->randomElement([
                '0',
                '12,5',
                '25',
                '37.5',
                '50',
                '67.5',
                '75',
                '87.5',
                '100'
            ]),
            'olor' => fake()->randomElement(['Podrido', 'Sin olor', 'Amoniaco']),
            'insectos' => fake()->randomElement(['Si', 'No']),
            'humedad' => fake()->randomElement(['Exceso', 'Buena', 'Defecto']),
            'observacion' => fake()->text(200),
        ]);

        // Crear datos "Durante"
        Durante::factory()->create([
            'registro_id' => $registro->id,
            'riego' => fake()->randomElement(['si', 'no']),
            'revolver' => fake()->randomElement(['si', 'no']),
            'aporte_verde' => fake()->numberBetween(0, 127),
            'tipo_aporte_verde' => fake()->text(50),
            'aporte_seco' => fake()->numberBetween(0, 127),
            'tipo_aporte_seco' => fake()->text(50),
            'observacion' => fake()->text(200),
        ]);

        // Crear datos "Después"
        Despues::factory()->create([
            'registro_id' => $registro->id,
            'nivelLlenadoFinal' => fake()->randomElement([
                '0',
                '12,5',
                '25',
                '37.5',
                '50',
                '67.5',
                '75',
                '87.5',
                '100'
            ]),
            'observacion' => fake()->text(200),
        ]);
    }
}
