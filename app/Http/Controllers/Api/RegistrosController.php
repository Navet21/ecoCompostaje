<?php

namespace App\Http\Controllers\Api;

use App\Models\Registro;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;

class RegistrosController extends Controller
{

    use DisableAuthorization;
    protected $model = Registro::class; // or "App\Models\Post"

    public function ultimoRegistro(){
        $ultimoRegistro = Registro::latest('id')->first();
        return response()->json($ultimoRegistro,200);
    }

}