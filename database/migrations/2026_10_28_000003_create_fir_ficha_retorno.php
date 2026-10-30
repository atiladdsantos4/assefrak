Inscrito<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     */
    public function up(): void
    {
        Schema::create('fir_ficha_retorno', function (Blueprint $table) {
            $table->Increments('fir_id_fir');
            $table->unsignedBigInteger('fir_id_fie');
            $table->unsignedBigInteger('fir_id_col');
            $table->integer('fir_sequencia');
            $table->string('fir_observacao',2000);
            $table->date('fir_data_retorno');
            $table->timestamp('fir_created_at');
            $table->timestamp('fir_updated_at')->nullable();
            $table->timestamp('fir_deleted_at')->nullable();
            $table->primary(array('fir_id_fir'));
            $table->foreign('fir_id_fie')->references('fie_id_fie')->on('fie_ficha_entrevista');
            $table->foreign('fir_id_col')->references('col_id_col')->on('col_colaborador');
        });
    }
    /**
     * Rfirrse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fir_ficha_retorno');
    }
};
