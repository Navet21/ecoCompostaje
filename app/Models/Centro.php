<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Centro extends Model
{
    protected $fillable = [
        'nombre',
        'direccion',
        'codigo'
        ];

    public function usuarios(){
        return $this->hasMany(User::class);
    }

    public function composteras(){
        return $this->hasMany(Compostera::class);
    }
}
