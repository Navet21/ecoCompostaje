<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Durante extends Model
{
    use HasFactory;

    protected $fillable = [
        'registro_id',
        'riego',
        'revolver',
        'aporte_verde',
        'tipo_aporte_verde',
        'aporte_seco',
        'tipo_aporte_seco',
        // 'foto',
        'observacion'
    ];

    public function registro()
    {
        return $this->belongsTo(Registro::class, 'registro_id');
    }
}
