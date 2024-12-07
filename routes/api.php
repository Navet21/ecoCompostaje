<?php

use App\Http\Controllers\Api\AntesController;
use App\Http\Controllers\Api\CentroComposterasController;
use App\Http\Controllers\Api\CicloBoloController;
use App\Http\Controllers\Api\CicloRegistrosController;
use App\Http\Controllers\Api\ComposteraRegistrosController;
use App\Http\Controllers\Api\RegistroAntesController;
use App\Http\Controllers\Api\RegistroDurantesController;
use App\Http\Controllers\Api\RegistroDespuesController;
use App\Http\Controllers\Api\RegistrosController;
use App\Http\Controllers\Api\UserRegistrosController;
use App\Http\Controllers\Api\BoloCiclosController;
use App\Http\Controllers\Api\CiclosController;
use App\Http\Controllers\Api\BoloController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ComposterasController;
use App\Http\Controllers\Api\CicloComposteraController;
use App\Http\Controllers\Api\ComposteraCiclosController;
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
    Orion::resource('composteras', ComposterasController::class);
    Orion::resource('bolos', BoloController::class);
    Orion::resource('ciclos', CiclosController::class);
    Orion::resource('registros', RegistrosController::class);
    Orion::resource('antes', AntesController::class);
    Orion::resource('durantes', DurantesController::class);
    Orion::resource('despues', DespuesController::class);
    Orion::resource('users', UserController::class);
})->middleware('auth:sanctum');

//Relaciones

Route::group(['as' => 'api.'], function() {
    Orion::hasManyResource('users', 'registros', UserRegistrosController::class);
    Orion::hasManyResource('registros', 'antes', RegistroAntesController::class);
    Orion::hasManyResource('registros', 'durantes', RegistroDurantesController::class);
    Orion::hasManyResource('registros', 'despues', RegistroDespuesController::class);
    Orion::hasManyResource('bolos', 'ciclos', BoloCiclosController::class);
    Orion::hasManyResource('composteras', 'registros', ComposteraRegistrosController::class);
    Orion::hasManyResource('centros', 'composteras', CentroComposterasController::class);
    Orion::belongsToResource('ciclos','bolos',CicloBoloController::class);
    Orion::belongsToResource('ciclo','composteras',CicloComposteraController::class);
    Orion::hasManyResource('compostera','ciclos',ComposteraCiclosController::class);
    Orion::hasManyResource('ciclo','registros',CicloRegistrosController::class);
})->middleware('auth:sanctum');

//Obtener ultimo registro
Route::get('registro/last', [RegistrosController::class,'ultimoRegistro']);
//Obtener ultimo Bolo
Route::get('bolo/last', [BoloController::class,'ultimoBolo']);
//Obtener ultimo registro
Route::get('ciclo/last', [CiclosController::class,'ultimoCiclo']);
//Obtener ultimo ciclo del bolo que corresponda
Route::get('compostera/{compostera}/ciclos/ultimo', [ComposteraCiclosController::class, 'ultimoCiclo']);
//Obtener bolo para compostera 2
Route::get('bolo/compostera2', [BoloController::class, 'bolocompostera2']);
//Obtener bolo para compostera 3
Route::get('bolo/compostera3', [BoloController::class, 'bolocompostera3']);
//Obtener bolos sin terminar
Route::get('bolo/sinterminar', [BoloController::class, 'boloSinTerminar']);