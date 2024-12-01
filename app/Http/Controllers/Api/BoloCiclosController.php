<?php

namespace App\Http\Controllers\Api;

use App\Models\Bolo;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\RelationController;

class BoloCiclosController extends RelationController
{
    /**
     * Fully-qualified model class name
     */
    use DisableAuthorization;
    protected $model = Bolo::class; // or "App\Models\Post"

    /**
     * Name of the relationship as it is defined on the Post model
     */
    protected $relation = 'ciclos';

    public function ultimoCiclo($boloId)
    {
        $bolo = Bolo::findOrFail($boloId); // Encuentra el bolo por su ID
        $ultimoCiclo = $bolo->ciclos()->latest()->first(); // Obtiene el último ciclo

        if (!$ultimoCiclo) {
            return response()->json(['message' => 'No hay ciclos asociados'], 404);
        }

        return response()->json($ultimoCiclo);
    }
}