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
        Schema::create('despues_de', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('registro_id');
            $table->foreign('registro_id')->references('id')->on('registro');
            $table->enum('nivelLlenadoFinal',['0','12,5','25']);
            $table->binary('foto');
            $table->tinyText('observacion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('despues_de');
    }
};
