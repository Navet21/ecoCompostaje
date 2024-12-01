<?php

namespace App\Http\Controllers\Api;

use App\Models\Ciclo;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;

class CiclosController extends Controller
{

    use DisableAuthorization;
    protected $model = Ciclo::class; // or "App\Models\Post"

    public function ultimoCiclo(){
        $ultimoCiclo = Ciclo::latest('id')->first();
        return response()->json($ultimoCiclo,200);
    }

}