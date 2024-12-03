<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registro extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'compostera_id',
        'ciclo_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function compostera()
    {
        return $this->belongsTo(Compostera::class);
    }

    public function antes()
    {
        return $this->hasMany(Antes::class);
    }

    public function durante()
    {
        return $this->hasMany(Durante::class);
    }

    public function despues()
    {
        return $this->hasMany(Despues::class);
    }
}
