<?php

namespace App\Http\Controllers\Api;

use App\Models\Centro;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;

class CentrosController extends Controller
{

    use DisableAuthorization;
    protected $model = Centro::class; // or "App\Models\Post"

}