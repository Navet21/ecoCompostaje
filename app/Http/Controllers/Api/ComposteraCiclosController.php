<?php

namespace App\Http\Controllers\Api;
use App\Models\Ciclo;
use Illuminate\Http\Request;
use App\Models\Compostera;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\RelationController;

class ComposteraCiclosController extends RelationController
{
    /**
     * Fully-qualified model class name
     */
    // use DisableAuthorization;
    protected $model = Compostera::class; // or "App\Models\Post"

    /**
     * Name of the relationship as it is defined on the Post model
     */
    protected $relation = 'ciclos';

    public function ultimoCiclo($compostera_id)
{
    try {
        // Buscar el último ciclo asociado a la compostera
        dd($compostera_id); // Verifica el valor recibido
        $ultimoCiclo = Ciclo::where('compostera_id', $compostera_id)
            ->orderBy('id', 'desc')
            ->firstOrFail(); // Lanza una excepción si no hay resultados

        // Devolver el último ciclo encontrado
        return response()->json($ultimoCiclo);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        // Devolver un error 404 si no se encuentra ningún ciclo
        return response()->json([
            'message' => 'No se encontró ningún ciclo para esta compostera.'
        ], 404);
    }
}

}