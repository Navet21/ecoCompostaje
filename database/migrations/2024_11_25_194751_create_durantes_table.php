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
            $table->foreign('registro_id')->references('id')->on('registros')->onDelete('cascade');
            $table->enum('riego',['Si','No'])->nullable();
            $table->enum('revolver',['Si','No'])->nullable();
            $table->tinyInteger('aporte_verde')->index()->nullable();
            $table->tinyText('tipo_aporte_verde')->nullable();
            $table->tinyInteger('aporte_seco')->index()->nullable();
            $table->tinyText('tipo_aporte_seco')->nullable();
            $table->tinyText('observacion')->nullable();
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
