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
        Schema::create('durantes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('registro_id');
            $table->foreign('registro_id')->references('id')->on('registros');
            $table->enum('riego',['Si','No']);
            $table->enum('revolver',['Si','No']);
            $table->tinyInteger('aporte_verde')->index();
            $table->tinyText('tipo_aporte_verde');
            $table->tinyInteger('aporte_seco')->index();
            $table->tinyText('tipo_aporte_seco');
            $table->binary('foto');
            $table->tinyText('observacion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('durantes');
    }
};
