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
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //eliminar datos y volverlos a crear
        // DB::table('registros')->delete();
        // DB::table('antes')->delete();
        // DB::table('durantes')->delete();
        // DB::table('despues')->delete();
        // DB::table('composteras')->delete();
        // DB::table('bolos')->delete();
        // DB::table('ciclos')->delete();
        // DB::table('users')->delete();
        // DB::table('centros')->delete();


        // Centro::factory()->create([
        //     'codigo' => 35003630,
        //     'nombre' => 'San Diego De Alacala',
        //     'direccion' => 'Primero de Mayo',
        // ]);

        // User::factory()->create([
        //     'name' => 'M',
        //     'email' => 'm@m.es',
        //     'password' => bcrypt('1'),
        //     'admin' => 1,
        //     'id_centros' => Centro::all()->random()->id
        // ]);

        // Compostera::factory()->create([
        //     'url' => 'https://wwww.compostera2.es',
        //     'tipo' => 'maduracion',
        //     'centro_id' => Centro::all()->random()->id,
        // ]);

        // Compostera::factory()->create([
        //     'url' => 'https://wwww.compostera3.es',
        //     'tipo' => 'degradacion',
        //     'centro_id' => Centro::all()->random()->id,
        // ]);

        // Compostera::factory()->create([
        //     'url' => 'https://wwww.compostera1.es',
        //     'tipo' => 'aporte',
        //     'centro_id' => Centro::all()->random()->id,
        // ]);



        // Bolo::factory()->create([
        //     'nombre' => 'Bolo enero',
        //     'datos_relevantes' => 'perfecto',
        //     'terminado' => '1',
        // ]);

        // Ciclo::factory()->create([
        //     'fecha_inicio' => '2024-01-05',
        //     'fecha_fin' => '2024-03-05',
        //     'terminado' => '1',
        //     'bolo_id' => Bolo::all()->random()->id,
        //     'compostera_id' => Compostera::all()->random()->id,
        // ]);

        //despues de crear los datos anteriores, se crean los registros:

        // Registro::factory()->create([
        //     'ciclo_id' => Ciclo::all()->random()->id,
        //     'user_id' => User::all()->random()->id,
        //     'compostera_id' => Compostera::all()->random()->id,
        // ]);

        //despues introducimos datos en las tablas:

        // Antes::factory()->create([
        //     'registro_id' => Registro::all()->random()->id,
        // ]);

        // Durante::factory()->create([
        //     'registro_id' => Registro::all()->random()->id,
        // ]);

        // Despues::factory()->create([
        //     'registro_id' => Registro::all()->random()->id,
        // ]);









        // // DB::delete('delete from community_links');
        // Compostera::factory(3)->create();
        // Bolo::factory(1)->create();

        // // Registro::factory(50)->create();
        // // Antes::factory(50)->create();
        // // Durante::factory(50)->create();
        // // Despues::factory(50)->create();
        // Ciclo::factory(3)->create();

        /*


        $composterasCodigos = ['aporte', 'degradacion', 'maduracion'];
        $primerCentro = Centro::factory()->create([
            'codigo' => 35003630,
            'nombre' => 'San Diego De Alacala',
            'direccion' => 'Primero de Mayo',
        ]);

        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'M',
            'email' => 'm@m.es',
            'password' => bcrypt('1'),
            'admin' => 1,
            //'centros_id' => $primerCentro->id
        ]);

        $centros = Centro::factory()->count(3)->create();

        // foreach ($centros as $centro) {
        //     $users = User::factory()->count(4)->create([
        //         'centros_id' => $centro->id
        //     ]);

        $composteras = [];

        foreach (['aporte', 'degradacion', 'maduracion'] as $tipo) {
            $composteras[] = Compostera::factory()->create([
                'tipo' => $tipo,
                'centros_id' => $centro->id
            ]);
        };

        $bolos = Bolo::factory()->count(4)->create(['terminado' => 1]);
        // $bolos = Bolo::factory()->count(4)->create(['ciclo1'=>1]);
        // $bolos = Bolo::factory()->count(4)->create(['ciclo2'=>1]);
        // $bolos = Bolo::factory()->count(4)->create(['ciclo3'=>1]);


        // BOLOS TERMINADOS
        foreach ($bolos->take(3) as $indice => $bolo) {

            $ciclos = Ciclo::factory(3)->create([
                'bolos_id' => $bolo->id,
                'composteras_id' => $composteras[$indice]->id
            ]);



            foreach ($ciclos as $ciclo) {
                $registros = Registro::factory(3)->create([
                    'ciclos_id' => $ciclo->id,
                    'users_id' => $users->random()->id,
                    'composteras_id' =>  $composteras[$indice]->id
                ]);

                foreach ($registros as $registro) {
                    Antes::factory()->create([
                        'registros_id' => $registro->id,
                    ]);

                    Durante::factory()->create([
                        'registros_id' => $registro->id,
                    ]);

                    Despues::factory()->create([
                        'registros_id' => $registro->id,
                    ]);
                }
            }
        }
        function crearCompostera($fecha, $ciclos)
        {

            $bolo = Bolo::factory()->create([
                'fecha_inicio' => $fecha,
                'fecha_fin' => null,
                'terminado' => 0
            ]);


            $fechaInicioCiclo = $fecha;

            $primerCiclo = true;


            for ($i = 0; $i < $ciclos; $i++) {
                $fechaFinDeciclo;
                $fechaFinDeciclo = $i + 1 == $ciclos ? null : date('Y-m-d', strtotime($fechaInicioCiclo . ' + 30 days'));
                $iniciodeCiclo;

                $tipo;
                if ($i == 0) {
                    $tipo = '11';
                } else if ($i == 1) {
                    $tipo = '22';
                } else if ($i == 2) {
                    $tipo = '33';
                }

                $ciclo = Ciclo::factory()->create([
                    'bolos_id' => $bolo->id,
                    'composteras_id' => Compostera::where('tipo', $tipo)->first()->id,
                    'fecha_inicio' => $fechaInicioCiclo,
                    'fecha_fin' => $fechaFinDeciclo,
                    'terminado' => 1
                ]);

                if ($i == $ciclos - 1) {
                    $ciclo->terminado = 0;
                    $ciclo->save();
                }

                $registros = Registro::factory(3)->create([
                    'ciclos_id' => $ciclo->id,
                    'users_id' => User::all()->random()->id,
                    'composteras_id' => Compostera::where('tipo', $tipo)->first()->id,
                    'fecha_hora' => $fechaInicioCiclo,
                ]);

                $fechasRegistros = [$fechaInicioCiclo, date('Y-m-d', strtotime($fechaInicioCiclo . ' + 15 days')), date('Y-m-d', strtotime($fechaInicioCiclo . ' + 30 days'))];

                foreach ($registros as $indice => $registro) {
                    $registro->fecha_hora = $fechasRegistros[$indice];
                    $registro->inicio_ciclo = 0;
                    $registro->save();
                };
                if ($i == 0) {
                    $registros[0]->inicio_ciclo = 1;
                }

                foreach ($registros as $indice => $registro) {
                    Antes::factory()->create([
                        'registros_id' => $registro->id,
                    ]);

                    Durante::factory()->create([
                        'registros_id' => $registro->id,
                    ]);

                    Despues::factory()->create([
                        'registros_id' => $registro->id,
                    ]);
                }
                $fechaInicioCiclo = $fechaFinDeciclo;
            }
        }

        crearCompostera('2023-01-01', 3);
        crearCompostera('2023-02-01', 2);
        crearCompostera('2023-03-01', 1);
    }

    */
    }
}
