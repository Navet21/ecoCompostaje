<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registro extends Model
{
    protected $fillable = [
        'inicioCiclo',
        'user_id',
        'compostera_id',
        'bolo_id',
        ];
}
