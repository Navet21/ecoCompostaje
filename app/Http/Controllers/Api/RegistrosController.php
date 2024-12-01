<?php

namespace App\Http\Controllers\Api;

use App\Models\Registro;
use Orion\Concerns\DisableAuthorization;
use Orion\Concerns\DisablePagination;
use Orion\Http\Controllers\Controller;

class RegistrosController extends Controller
{
    use DisableAuthorization;
    protected $model = Registro::class; // or "App\Models\Post"

    protected function perPage(){
        return 10;
    }

    public function ultimoRegistro(){
        $ultimoRegistro = Registro::latest('id')->first();
        return response()->json($ultimoRegistro,200);
    }

}