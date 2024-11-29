<?php

use App\Http\Controllers\Api\AntesController;
use App\Http\Controllers\Api\RegistroAntesController;
use App\Http\Controllers\Api\RegistroDurantesController;
use App\Http\Controllers\Api\RegistroDespuesController;
use App\Http\Controllers\Api\RegistrosController;
use App\Http\Controllers\Api\UserRegistrosController;
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

//Relaciones

Route::group(['as' => 'api.'], function() {
    Orion::hasManyResource('users', 'registros', UserRegistrosController::class);
    Orion::hasManyResource('registros', 'antes', RegistroAntesController::class);
    Orion::hasManyResource('registros', 'durantes', RegistroDurantesController::class);
    Orion::hasManyResource('registros', 'despues', RegistroDespuesController::class);
});

//Obtener ultimo registro
Route::get('registro/last', [RegistrosController::class,'ultimoRegistro']);