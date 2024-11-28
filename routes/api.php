<?php

use App\Http\Controllers\Api\AntesController;
use App\Http\Controllers\Api\RegistrosController;
use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;
use App\Http\Controllers\Api\CentrosController;
use App\Http\Controllers\Api\DespuesController;
use App\Http\Controllers\Api\DurantesController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Rutas para los centros, no nos interesa
Route::group(['as' => 'api.'], function() {
    Orion::resource('centros', CentrosController::class);
});

//Rutas para los Registros, importante
Route::group(['as' => 'api.'], function() {
    Orion::resource('registros', RegistrosController::class);
});

//Rutas para los registros antes
Route::group(['as' => 'api.'], function() {
    Orion::resource('antes', AntesController::class);
});

//Rutas para los registros durantes
Route::group(['as' => 'api.'], function() {
    Orion::resource('durantes', DurantesController::class);
});

//Rutas para los registros antes
Route::group(['as' => 'api.'], function() {
    Orion::resource('despues', DespuesController::class);
});