<?php

namespace App\Http\Controllers\Api;

use App\Models\Compostera;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\RelationController;

class ComposteraRegistrosController extends RelationController
{
    /**
     * Fully-qualified model class name
     */
    // use DisableAuthorization;
    protected $model = Compostera::class; // or "App\Models\Post"

    /**
     * Name of the relationship as it is defined on the Post model
     */
    protected $relation = 'registros';
}