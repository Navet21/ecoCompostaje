<?php

namespace App\Http\Controllers;

use App\Models\Bolo;
use App\Models\Ciclo;
use App\Models\Registro;
use App\Models\Antes;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AnalisisController extends Controller
{
    public function index(Request $request)
    {
        // Obtener todos los bolos disponibles
        $bolos = Bolo::all();  // Esto traerá todos los bolos registrados en la base de datos

        // Si no se pasa un bolo_id en la solicitud, se podría seleccionar el primer bolo por defecto
        $boloId = $request->get('bolo_id', $bolos->first()->id);  // Si no hay bolo seleccionado, tomamos el primero

        // Obtener los ciclos relacionados con el bolo seleccionado
        $ciclos = Ciclo::where('bolo_id', $boloId)
            ->with('registros') // Eager load "registros"
            ->orderBy('fecha_inicio') // Ordenamos por fecha de inicio del ciclo
            ->get();

        // Recopilar las temperaturas de cada ciclo
        $temperaturas = [];

        foreach ($ciclos as $ciclo) {
            // Iteramos sobre los registros de cada ciclo
            foreach ($ciclo->registros as $registro) {
                // Obtenemos los datos "Antes" relacionados con el registro
                $antes = Antes::where('registro_id', $registro->id)->get();

                // Para cada dato de "Antes", almacenamos la fecha y la temperatura
                foreach ($antes as $datoAntes) {
                    $temperaturas[] = [
                        'fecha' => Carbon::parse($datoAntes->created_at)->format('Y-m-d'), // Formateamos la fecha
                        'temperatura' => $datoAntes->temperaturaCompostera,
                    ];
                }
            }
        }

        // Ordenar las temperaturas por fecha para la gráfica
        usort($temperaturas, function ($a, $b) {
            return strtotime($a['fecha']) - strtotime($b['fecha']);
        });

        // Pasar los datos a la vista
        return view('analisis', compact('temperaturas', 'bolos'));
    }
}
