<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Antes extends Model
{
    protected $fillable = [
        'registro_id',
        'temperaturaAmbiental',
        'temperaturaCompostera',
        'nivelLlenadoInical',
        'olor',
        'insectos',
        'humedad',
        'foto',
        'observacion'
        ];

    public function registro(){
        return $this->belongsTo(Registro::class,'registro_id');
    }
}

