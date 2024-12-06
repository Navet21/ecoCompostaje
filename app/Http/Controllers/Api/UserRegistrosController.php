<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\RelationController;

class UserRegistrosController extends RelationController
{
    /**
     * Fully-qualified model class name
     */
    protected $model = User::class; // or "App\Models\Post"

    /**
     * Name of the relationship as it is defined on the Post model
     */
    protected $relation = 'registros';
}
