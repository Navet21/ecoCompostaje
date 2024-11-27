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
}
