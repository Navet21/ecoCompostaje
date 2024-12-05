<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antes extends Model
{

    use HasFactory;

    protected $fillable = [
        'registro_id',
        'temperaturaAmbiental',
        'temperaturaCompostera',
        'nivelLlenadoInicial',
        'olor',
        'insectos',
        'humedad',
        // 'foto',
        'observacion'
    ];

    public function registro()
    {
        return $this->belongsTo(Registro::class, 'registro_id');
    }
}
