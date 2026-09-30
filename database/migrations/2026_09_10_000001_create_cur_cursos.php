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
        Schema::create('cur_cursos', function (Blueprint $table) {
            $table->Increments('cur_id_cur');
            $table->unsignedBigInteger('cur_id_puf');
            $table->unsignedBigInteger('cur_id_cae');
            $table->unsignedBigInteger('cur_id_col');
            $table->unsignedBigInteger('cur_id_est');
            $table->unsignedBigInteger('cur_id_cid');
            $table->string('cur_titulo',500);
            $table->string('cur_descricao',2000);
            $table->string('cur_conteudo',3000)->nullable();
            $table->string('cur_programacao',3000)->nullable();
            $table->string('cur_galeria',3000)->nullable();
            $table->date('cur_data_inicio');
            $table->date('cur_data_fim');
            $table->timestamp('cur_hora_inicio')->nullable();
            $table->timestamp('cur_hora_fim')->nullable();
            $table->string('cur_local',500);
            $table->char('cur_concluido',1);
            $table->timestamp('cur_created_at');
            $table->timestamp('cur_updated_at')->nullable();
            $table->timestamp('cur_deleted_at')->nullable();
            $table->primary(array('cur_id_cur'));
            $table->foreign('cur_id_puf')->references('puf_id_puf')->on('puf_publico_foco');
            $table->foreign('cur_id_est')->references('est_id_est')->on('est_estados');
            $table->foreign('cur_id_cid')->references('cid_id_cid')->on('cid_cidades');
            $table->foreign('cur_id_cae')->references('cae_id_cae')->on('cae_categoria_evento');
            $table->foreign('cur_id_col')->references('col_id_col')->on('col_colaborador');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cur_cursos');
    }
};
