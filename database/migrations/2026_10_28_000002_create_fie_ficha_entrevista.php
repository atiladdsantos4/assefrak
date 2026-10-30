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
        Schema::create('fie_ficha_entrevista', function (Blueprint $table) {
            $table->Increments('fie_id_fie');
            $table->unsignedBigInteger('fie_id_aco');
            $table->unsignedBigInteger('fie_id_col');
            $table->unsignedBigInteger('fie_id_tra')->nullable();
            $table->string('fie_motivo',2000);
            $table->string('fie_humor',2000);
            $table->string('fie_desc_humor',2000);
            $table->string('fie_reativos',2000);
            $table->string('fie_desc_reativos',2000);
            $table->string('fie_passivos',2000);
            $table->string('fie_desc_passivos',2000);
            $table->string('fie_sono',2000);
            $table->string('fie_desc_sono',2000);
            $table->string('fie_gravidade',2000);
            $table->string('fie_desc_gravidade',2000);
            $table->string('fie_percebidas',2000);
            $table->string('fie_desc_percebidas',2000);
            $table->string('fie_diapasse',2000);
            $table->string('fie_orientacoes_casa',2000);
            $table->string('fie_orientacoes_externa',2000);
            $table->string('fie_anotacao',2000);
            $table->char('fie_ativo',1);
            $table->timestamp('fie_created_at');
            $table->timestamp('fie_updated_at')->nullable();
            $table->timestamp('fie_deleted_at')->nullable();
            $table->primary(array('fie_id_fie'));
            $table->foreign('fie_id_tra')->references('tra_id_tra')->on('tra_tratamento');
            $table->foreign('fie_id_col')->references('col_id_col')->on('col_colaborador');
            $table->foreign('fie_id_aco')->references('aco_id_aco')->on('aco_acolhido');
        });
    }
    /**
     * Rfierse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fie_ficha_entrevista');
    }
};
