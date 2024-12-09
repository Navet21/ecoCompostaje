<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Policies\UserPolicy;
use Orion\Http\Controllers\RelationController;

class UserCentroController extends RelationController
{
    /**
     * Fully-qualified model class name
     */
    protected $model = User::class; // or "App\Models\Post"

    /**
     * Name of the relationship as it is defined on the Post model
     */
    protected $relation = 'centro';

    
}