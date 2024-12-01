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
        Schema::create('composteras', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('url');
            $table->enum('tipo',['aporte','degradacion','maduracion']);
            $table->unsignedBigInteger('centro_id');
            $table->foreign('centro_id')->references('id')->on('centros')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('composteras');
    }
};
