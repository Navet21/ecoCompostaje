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
        Schema::create('despues', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('registro_id');
            $table->foreign('registro_id')->references('id')->on('registros');
            $table->enum('nivelLlenadoFinal',['0','12.5','25','37.5','50','67.5','75','87.5','100'])->nullable();
            $table->tinyText('observacion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('despues');
    }
};
