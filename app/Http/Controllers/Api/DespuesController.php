<?php

namespace App\Http\Controllers\Api;

use App\Models\Despues;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;

class DespuesController extends Controller
{

    use DisableAuthorization;
    protected $model = Despues::class; // or "App\Models\Post"

}