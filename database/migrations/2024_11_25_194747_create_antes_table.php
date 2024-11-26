<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('antes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('registro_id');
            $table->foreign('registro_id')->references('id')->on('registros');
            $table->tinyInteger('temperaturaAmbiental')->index();
            $table->tinyInteger('temperaturaCompostera')->index();
            $table->enum('nivelLlenadoInical',['0','12,5','25']);
            $table->enum('olor',['Podrido','Sin olor','Amoníaco']);
            $table->enum('insectos',['Si','No']);
            $table->enum('humedad',['Exceso','Buena','Defecto']);
            $table->binary('foto');
            $table->tinyText('observacion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antes');
    }
};
