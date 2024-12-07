<?php

namespace App\Http\Controllers\Api;

use App\Models\Bolo;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;

class BoloController extends Controller
{

    protected $model = Bolo::class; // or "App\Models\Post"

    public function ultimoBolo(){
        $ultimoBolo = Bolo::latest('id')->first();
        return response()->json($ultimoBolo,200);
    }

    public function bolocompostera2(){
        $bolo = Bolo::where('ciclo1',true)->where('terminado',false)->first();
        return response()->json($bolo,200);
    }
    public function bolocompostera3(){
        $bolo = Bolo::where('ciclo1',true)->where('ciclo2',true)->where('terminado',false)->first();
        return response()->json($bolo,200);
    }

    public function boloSinTerminar(){
        $bolo = Bolo::where('terminado', false)->get(); 
        return response()->json($bolo, 200);
    }
    

}