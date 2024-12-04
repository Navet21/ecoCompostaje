<?php

namespace App\Http\Controllers\Api;

use App\Models\Centro;
use App\Policies\CentroPolicy;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\RelationController;
class CentroComposterasController extends RelationController
{
    /**
     * Fully-qualified model class name
     */
    protected $model = Centro::class; // or "App\Models\Post"

    /**
     * Name of the relationship as it is defined on the Post model
     */
    protected $relation = 'composteras';

    protected $policy = CentroPolicy::class;
}