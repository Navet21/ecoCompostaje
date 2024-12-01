<?php

namespace App\Http\Controllers\Api;

use App\Models\Bolo;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;

class BoloController extends Controller
{

    use DisableAuthorization;
    protected $model = Bolo::class; // or "App\Models\Post"

    public function ultimoBolo(){
        $ultimoBolo = Bolo::latest('id')->first();
        return response()->json($ultimoBolo,200);
    }

}