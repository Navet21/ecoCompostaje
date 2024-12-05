<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bolo extends Model
{

    use HasFactory;

    protected $fillable = [
        'nombre',
        'datos_relevantes',
<<<<<<< HEAD
        'terminado',
        'ciclo1',
        'ciclo2',
        'ciclo3',
        ];
=======
    ];
>>>>>>> 72032a42015e112b254a16f254acea6e70a24d48

    public function ciclos()
    {
        return $this->hasMany(Ciclo::class);
    }
}
