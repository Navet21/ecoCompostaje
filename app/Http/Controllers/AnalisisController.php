<?php

namespace App\Http\Controllers;

use App\Models\Bolo;
use App\Models\Ciclo;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AnalisisController extends Controller
{
    public function index(Request $request)
    {

        $bolos = Bolo::all();

        $boloId = $request->get('bolo_id');

        if (!$boloId) {
            return view('analisis', ['temperaturas' => [], 'bolos' => $bolos]);
        }

        $ciclos = Ciclo::where('bolo_id', $boloId)
            ->with(['registros.antes'])
            ->orderBy('fecha_inicio')
            ->get();

        $temperaturas = [];
        foreach ($ciclos as $ciclo) {
            foreach ($ciclo->registros as $registro) {
                foreach ($registro->antes as $datoAntes) {
                    $temperaturas[] = [
                        'fecha' => Carbon::parse($datoAntes->created_at)->format('Y-m-d'),
                        'temperatura' => $datoAntes->temperaturaCompostera,
                    ];
                }
            }
        }

        usort($temperaturas, fn($a, $b) => strtotime($a['fecha']) - strtotime($b['fecha']));

        return view('analisis', compact('temperaturas', 'bolos'));
    }
}
