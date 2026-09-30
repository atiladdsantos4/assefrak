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
        Schema::create('pal_palestra', function (Blueprint $table) {
            $table->Increments('pal_id_pal');
            $table->unsignedBigInteger('pal_id_col');
            $table->unsignedBigInteger('pal_id_cae');
            $table->unsignedBigInteger('pal_estado');
            $table->unsignedBigInteger('pal_cidade');
            $table->string('pal_tema',1000);
            $table->string('pal_texto',1000);
            $table->string('pal_folder',500)->nullable();
            $table->date('pal_data_inicio');
            $table->date('pal_data_fim');
            $table->timestamp('pal_hora_inicio')->nullable();
            $table->timestamp('pal_hora_fim')->nullable();
            $table->string('pal_local',500);
            $table->char('pal_concluido',1);
            $table->timestamp('pal_created_at');
            $table->timestamp('pal_updated_at')->nullable();
            $table->timestamp('pal_deleted_at')->nullable();
            $table->primary(array('pal_id_pal'));
            $table->foreign('pal_id_col')->references('col_id_col')->on('col_colaborador');
            $table->foreign('pal_estado')->references('est_id_est')->on('est_estados');
            $table->foreign('pal_cidade')->references('cid_id_cid')->on('cid_cidades');
            $table->foreign('pal_id_cae')->references('cae_id_cae')->on('cae_categoria_evento');
        });
    }
    /**
     * Rpalrse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pal_palestra');
    }
};
