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
        Schema::create('ciclos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->unsignedBigInteger('bolo_id');
            $table->boolean('terminado')->default(0);
            $table->foreign('bolo_id')->references('id')->on('bolos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ciclos');
    }
};
