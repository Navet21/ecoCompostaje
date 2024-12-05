<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ciclo extends Model
{

    use HasFactory;

    protected $fillable = [
        'fecha_inicio',
        'fecha_fin',
        'terminado',
        'bolo_id',
    ];

    public function registros()
    {
        return $this->hasMany(Registro::class);
    }
}
