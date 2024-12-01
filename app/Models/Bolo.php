<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bolo extends Model
{
    protected $fillable = [
        'nombre',
        'datos_relevantes',
        ];

    public function ciclos(){
        return $this->hasMany(Ciclo::class);
    } 
}
