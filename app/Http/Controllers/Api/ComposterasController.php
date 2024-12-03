<?php

namespace App\Http\Controllers\Api;

use App\Models\Compostera;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;

class ComposterasController extends Controller
{

    use DisableAuthorization;
    protected $model = Compostera::class; // or "App\Models\Post"

    public function ultimoCiclo(){
        $ultimoCiclo = Compostera::latest('id')->first();
        return response()->json($ultimoCiclo,200);
    }

}