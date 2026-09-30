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
        Schema::create('eve_evento', function (Blueprint $table) {
            $table->Increments('eve_id_eve');
            $table->unsignedBigInteger('eve_id_puf');
            $table->unsignedBigInteger('eve_id_cae');
            $table->unsignedBigInteger('eve_estado');
            $table->unsignedBigInteger('eve_cidade');
            $table->string('eve_titulo',500);
            $table->string('eve_foco',500);
            $table->date('eve_data_inicio');
            $table->date('eve_data_fim');
            $table->timestamp('eve_hora_inicio')->nullable();
            $table->timestamp('eve_hora_fim')->nullable();
            $table->string('eve_local',500);
            $table->char('eve_concluido',1);
            $table->timestamp('eve_created_at');
            $table->timestamp('eve_updated_at')->nullable();
            $table->timestamp('eve_deleted_at')->nullable();
            $table->primary(array('eve_id_eve'));
            $table->foreign('eve_id_puf')->references('puf_id_puf')->on('puf_publico_foco');
            $table->foreign('eve_estado')->references('est_id_est')->on('est_estados');
            $table->foreign('eve_cidade')->references('cid_id_cid')->on('cid_cidades');
            $table->foreign('eve_id_cae')->references('cae_id_cae')->on('cae_categoria_evento');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eve_evento');
    }
};
