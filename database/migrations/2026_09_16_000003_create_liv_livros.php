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
        Schema::create('liv_livros', function (Blueprint $table) {
            $table->Increments('liv_id_liv');
            $table->unsignedBigInteger('liv_id_aut');
            $table->unsignedBigInteger('liv_id_edi');
            $table->string('liv_titulo',500);
            $table->string('liv_traducao',500)->nullable();
            $table->string('liv_sinopse',2000);
            $table->string('liv_isbn',13)->nullable();
            $table->integer('liv_paginas');
            $table->integer('liv_edicao');
            $table->string('liv_imagem',500)->nullable();
            $table->timestamp('liv_created_at');
            $table->timestamp('liv_updated_at')->nullable();
            $table->timestamp('liv_deleted_at')->nullable();
            $table->primary(array('liv_id_liv'));
            $table->foreign('liv_id_aut')->references('aut_id_aut')->on('aut_autor');
            $table->foreign('liv_id_edi')->references('edi_id_edi')->on('edi_editora');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('liv_livros');
    }
};
