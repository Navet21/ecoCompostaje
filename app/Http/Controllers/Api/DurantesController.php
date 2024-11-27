<?php

namespace App\Http\Controllers\Api;

use App\Models\Durantes;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;

class DurantesController extends Controller
{

    use DisableAuthorization;
    protected $model = Durantes::class; // or "App\Models\Post"

}