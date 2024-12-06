<?php

namespace App\Http\Controllers\Api;

use App\Models\Antes;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;

class AntesController extends Controller
{

    protected $model = Antes::class; // or "App\Models\Post"

}