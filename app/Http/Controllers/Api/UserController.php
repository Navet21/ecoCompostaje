<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Orion\Http\Controllers\Controller;

class UserController extends Controller
{

    protected $model = User::class; // or "App\Models\Post"
    

}