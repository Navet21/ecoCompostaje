<?php

namespace App\Http\Controllers;

use App\Models\Bolo;
use App\Models\Ciclo;
use App\Models\Antes;
use App\Models\Registro;
use App\Models\Compostera;
use Illuminate\Http\Request;
use Torann\Orion\Orion;

class AnalisisController extends Controller
{
    public function index()
    {
        $datos = Antes::join('registros', 'antes.registro_id', '=', 'registros.id')
            ->join('ciclos', 'registros.ciclo_id', '=', 'ciclos.id')
            ->join('composteras', 'ciclos.compostera_id', '=', 'composteras.id')
            ->select(
                'antes.created_at',
                'antes.temperaturaAmbiental',
                'antes.temperaturaCompostera',
                'ciclos.fecha_inicio',
                'ciclos.fecha_fin',
                'composteras.tipo as compostera_nombre'
            )
            ->orderBy('antes.created_at')
            ->get();

        // Pasar los datos a la vista
        return view('analisis', compact('datos'));
    }
}
