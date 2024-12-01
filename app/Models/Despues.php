<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Despues extends Model
{
    protected $fillable = [
        'registro_id',
        'nivelLlenadoFinal',
        'foto',
        'observacion'
        ];

    public function registro(){
        return $this->belongsTo(Registro::class,'registro_id');
    }
}
