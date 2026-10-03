Inscrito<?php

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
        Schema::create('ene_entrada_estoque', function (Blueprint $table) {
            $table->Increments('ene_id_ene');
            $table->unsignedBigInteger('ene_id_liv');
            $table->integer('ene_qtde');
            $table->decimal('ene_valor_unit',10,2);
            $table->decimal('ene_valor_total',10,2);
            $table->decimal('ene_saida',10,2)->nullable();
            $table->timestamp('ene_created_at');
            $table->timestamp('ene_updated_at')->nullable();
            $table->timestamp('ene_deleted_at')->nullable();
            $table->primary(array('ene_id_ene'));
            $table->foreign('ene_id_liv')->references('liv_id_liv')->on('liv_livros');
        });
    }
    /**
     * Renerse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ene_eneartamento');
    }
};
