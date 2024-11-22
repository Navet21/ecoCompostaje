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
        Schema::create('compostera', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->enum('tipo',['aporte: código 11','degradación: código 22','maduración: código 33']);
            $table->unsignedBigInteger('centro_id');
            $table->foreign('centro_id')->references('id')->on('centro');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compostera');
    }
};
